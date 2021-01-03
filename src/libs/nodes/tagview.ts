import { CreatePagesArgs } from 'gatsby'
import { CurryingUnTagedGraphql, getPostListTemplatePath, getLimitOffsetByTotal } from './util'
import { qPostByTag } from './query'

export type PageCreator = (data: CreatePagesArgs) => Promise<void>


const TagView: PageCreator = async (props) => {
    const graphql = CurryingUnTagedGraphql<any>(props)
    const { createPage } = props.actions
    const AllTags = await graphql` 
    query AllTags {
        allMdx{
            group(field: frontmatter___tags) {
            fieldValue
            totalCount
            }
        }
    }`
    const templatePath = getPostListTemplatePath()
    AllTags.data.allMdx.group.forEach(
        async tag => {
            const data = (await props.graphql<any>(qPostByTag)).data.allMdx.edges
            getLimitOffsetByTotal(data.length).map(({ limit, offset }, idx) => {
                if (idx == 0) {
                    createPage({
                        path: `/tag/${tag.fieldValue.toUpperCase()}/`,
                        component: templatePath,
                        context: {
                            limit,
                            offset: idx * limit,
                            tags: [tag.fieldValue]
                        }
                    })
                    createPage({
                        path: `/tag/${tag.fieldValue.toUpperCase()}/${idx + 1}`,
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