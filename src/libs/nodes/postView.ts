import conf from "../../conf"
import { PageCreator } from "./tagview"
import { PostForDetailView } from "./__generated__/PostForDetailView"
import { CurryingUnTagedGraphql, getPostListTemplatePath, getLimitOffsetByTotal, getPostDetailTemplatePath, getPostURLPrefix } from "./util"


const DetailView: PageCreator = (props) => {
    const {
        createPage
    } = props.actions
    const graphql = CurryingUnTagedGraphql<PostForDetailView>(props)

    return new Promise((resolve, reject) => {
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql`query PostForDetailView{
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fileAbsolutePath
                  fields{
                    slug
                  }
                  frontmatter {
                    codeName
                  }
                }
              }
            }
        }`.then(result => {
                if (result.errors)
                    reject(result.errors)

                const mdData = result.data.allMarkdownRemark.edges

                // Create detail view for each post
                mdData.forEach(({
                    node
                }) => {
                    const codeName = node.frontmatter.codeName
                    createPage({
                        path: node.fields.slug,
                        component: getPostDetailTemplatePath(),
                        context: {
                            codeName
                        },
                    })
                })
                // Create pagination index view
                const prefix = getPostURLPrefix()
                const tp = getPostListTemplatePath()

                getLimitOffsetByTotal(mdData.length)
                    .map(({ limit, offset }, idx) => {
                        if (idx === 0)
                            createPage({
                                path: `/${prefix}`,
                                component: tp,
                                context: {
                                    limit,
                                    offset
                                }
                            })

                        createPage({
                            path: `/${prefix}/${idx + 1}`,
                            component: tp,
                            context: {
                                limit,
                                offset: idx * limit
                            }
                        })
                    })
            })
        )
    })
}
export default DetailView