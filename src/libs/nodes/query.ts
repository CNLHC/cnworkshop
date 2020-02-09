
const graphql = (s: TemplateStringsArray) => s.toString()

export const qPostByTag = graphql`
    query PostByTag($tags: [String]) {
        allMdx(limit: 1000, filter: {frontmatter: {tags: {in: $tags}}}) {
        edges {
            node {
            fileAbsolutePath
            frontmatter {
                codeName
                tags
            }}
        }}
    }
`
