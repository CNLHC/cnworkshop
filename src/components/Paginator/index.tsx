import React from 'react'
import { PageInfo } from "../../templates/PostList/query"
import { navigate } from 'gatsby'
import conf from '../../conf'
import styled from 'styled-components'
import { TablePagination, useTheme, Input, Button, IconButton } from '@material-ui/core'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './style'






const { PostList } = conf

interface IProps {
    pageInfo: PageInfo
}
const Paginator: React.SFC<IProps> = (props) => {
    const { pageInfo } = props
    const navRoute = (page: number) => `/${PostList.prefix}/${page}`
    const theme = useTheme()
    const styles = useStyles(theme)
    const needLeftOmit = pageInfo.currentPage > 3
    const needRightOmit = pageInfo.pageCount - pageInfo.currentPage > 3
    return (
        <div className={styles.BlogPaginator}>
            <div>
                <span>共有{pageInfo.itemCount}篇</span>
            </div>

            <div className={styles.NumArrayArea}>
                <IconButton
                    disabled={!pageInfo.hasPreviousPage}
                    onClick={() => navigate(navRoute(pageInfo.currentPage - 1))}
                    aria-label="delete"
                    color="primary" >
                    <ArrowBackIosIcon />
                </IconButton>
                {

                    Array.from(Array(pageInfo.pageCount).keys()).map(e => {
                        const idx = e + 1;

                        if (idx === pageInfo.currentPage) {
                            return `${idx}`
                        }
                        if (needLeftOmit && idx < pageInfo.currentPage) {
                            if (idx === 1)
                                return "1"
                            else if (idx === 2)
                                return "..."
                            else
                                return null
                        }
                        if (needRightOmit && idx > pageInfo.currentPage) {
                            if (idx === pageInfo.pageCount - 1)
                                return "..."
                            else if (idx === pageInfo.pageCount)
                                return pageInfo.pageCount.toString()
                            else
                                return null
                        }
                        return idx.toString()
                    })
                        .filter(e => e !== null)
                        .map((v, idx) => < Button
                            className={styles.PaginatorNumber}
                            variant={parseInt(v) === pageInfo.currentPage ? "contained" : "text"}
                            onClick={() => {
                                const page = parseInt(v === '...' ? "1" : v)
                                if (page !== NaN) {
                                    navigate(navRoute(page))
                                }
                            }
                            }
                            color={"primary"}
                            key={`paginate-${v}-${idx}`}
                        >{v}</ Button >)
                }
                <IconButton
                    disabled={!pageInfo.hasNextPage}
                    onClick={() => navigate(navRoute(pageInfo.currentPage + 1))}
                    aria-label="delete" color="primary">
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>

            <div className={styles.QuickJumperArea}>
                <Input className={styles.QuickJumperInput}>

                </Input>
                <Button color={"primary"}
                    variant="contained"
                > Goto</Button>
            </div>


        </div>

    )
}

export default Paginator
