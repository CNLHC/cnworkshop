module.exports = {
  siteMetadata: {
    title: "cnworkshop",
    description: "CN's Blog",
    author: "CNLHC",
  },
  plugins: [
    `gatsby-plugin-less`,
    "gatsby-plugin-scss-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-posts",
        path: `${__dirname}/posts/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          "gatsby-plugin-slug",
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
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data/",
      },
    },


    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
}
