module.exports = {
  siteMetadata: {
    title: "cnworkshop",
    description: "CN's Blog",
    author: "CNLHC",
    lang: "zh_cn",
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-styled-components`,
    // `gatsby-plugin-less`,
    "gatsby-plugin-scss-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-posts",
        path: `./posts/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        gatsbyRemarkPlugins: [
          "gatsby-remark-graphviz",
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-responsive-image",
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "assets",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-typegen`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
}
