import { PageCreator } from "./tagview"
import { CurryingUnTagedGraphql, getPostListTemplatePath, getLimitOffsetByTotal, getPostDetailTemplatePath, getPostURLPrefix } from "./util"


const DetailView: PageCreator = (props) => {
    const {
        createPage
    } = props.actions
    const graphql = CurryingUnTagedGraphql<any>(props)

    return new Promise(async (resolve, reject) => {
        // Query for markdown nodes to use in creating pages.
        const result = await graphql`query PostForDetailView{
            allMdx(limit: 1000) {
              edges {
                node {
                  fileAbsolutePath
                  frontmatter {
                    codeName
                  }
                  slug
                }
              }
            }
        }`
        if (result.errors)
            reject(result.errors)

        const mdData = result.data.allMdx.edges

        // Create detail view for each post
        mdData.forEach((e) => {
            const { node } = e
            const codeName = node.frontmatter.codeName
            createPage({
                path: `${node.slug}`,
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

        resolve()
    })
}
export default DetailView