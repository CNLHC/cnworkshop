import React from 'react'
import Layout from '../Layout/layout'
import Paginator from '../Paginator/index'
import useStyles from "./style"
import PostList from "../PostList"
import { Grid, useTheme } from "@material-ui/core"
import { TPostListData } from '../../templates/PostList'

export default function PageArchive(props: { data: TPostListData }) {
    const theme = useTheme()
    const style = useStyles(theme)
    const { data } = props
    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xl={6} sm={8} md={10} xs={12}>
                    <PostList data={data} />
                    {
                        data.allMarkdownRemark.pageInfo ?
                            <div className={style.paginator}>
                                <Paginator pageInfo={data.allMarkdownRemark.pageInfo} />
                            </div> : null
                    }
                </Grid>
            </Grid>
        </Layout>

    )
}
