/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO() {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetQuery>(
    graphql`
      query SiteMeta{
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `)

  const metaDescription = site.siteMetadata.description

  return (
    <Helmet
      title={site.siteMetadata.title}
      titleTemplate={`%s | ${metaDescription}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
      }
    />
  )
}


export default SEO
