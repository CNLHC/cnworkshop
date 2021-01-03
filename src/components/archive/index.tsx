import React from 'react'
import Layout from '../Layout/layout'
import Paginator from '../Paginator/index'
import useStyles from "./style"
import PostList from "../PostList"
import { Grid, useTheme } from "@material-ui/core"
import SEO from '../seo'

export default function PageArchive(props: { data: GatsbyTypes.PostListWithFilterQuery }) {
    const theme = useTheme()
    const style = useStyles(theme)
    const { data } = props
    return (
        <Layout>
            <SEO />
            <Grid container spacing={3}>
                <Grid item xl={6} sm={8} md={10} xs={12}>
                    <PostList data={data} />
                    {
                        data.allMdx.pageInfo ?
                            <div className={style.paginator}>
                                <Paginator pageInfo={data.allMdx.pageInfo} />
                            </div> : null
                    }
                </Grid>
            </Grid>
        </Layout>

    )
}
