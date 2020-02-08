import { CreatePagesArgs } from 'gatsby'
import { CurryingUnTagedGraphql, getPostListTemplatePath, getLimitOffsetByTotal } from './util'
import { AllTags } from './__generated__/AllTags'
import { qPostByTag } from './query'
import { PostByTag } from './__generated__/PostByTag'

export type PageCreator = (data: CreatePagesArgs) => Promise<void>


const TagView: PageCreator = async (props) => {
    const graphql = CurryingUnTagedGraphql<AllTags>(props)
    const { createPage } = props.actions
    const AllTags = await graphql` 
    query AllTags {
        allMarkdownRemark {
            group(field: frontmatter___tags) {
            fieldValue
            totalCount
            }
        }
    }`
    const templatePath = getPostListTemplatePath()
    AllTags.data.allMarkdownRemark.group.forEach(
        async tag => {
            const data = (await props.graphql<PostByTag>(qPostByTag)).data.allMarkdownRemark.edges
            getLimitOffsetByTotal(data.length).map(({ limit, offset }, idx) => {
                if (idx == 0) {
                    createPage({
                        path: `/tag/${tag.fieldValue}/`,
                        component: templatePath,
                        context: {
                            limit,
                            offset: idx * limit,
                            tags: [tag.fieldValue]
                        }
                    })
                    createPage({
                        path: `/tag/${tag.fieldValue}/${idx + 1}`,
                        component: templatePath,
                        context: {
                            limit,
                            offset: idx * limit,
                            tags: [tag.fieldValue]
                        }
                    })
                }
            })
        })
}

export default TagView