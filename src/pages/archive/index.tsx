import React from 'react'
import Layout from '../../components/layout'
import Paginator from '../../components/Paginator/index'
import useStyles from "./style"
import PostList from "../../components/PostList"
import { Grid, useTheme } from "@material-ui/core"
import { IQuery } from '../../templates/PostList/query'

export default function PageArchive(props: { data: IQuery }) {
    const theme = useTheme()
    const style = useStyles(theme)
    const { data } = props
    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xl={6} sm={8} md={10} xs={12}>
                    <PostList data={data} />
                    <div className={style.paginator}>
                        <Paginator pageInfo={data.allMarkdownRemark.pageInfo} />
                    </div>
                </Grid>
            </Grid>
        </Layout>

    )
}


