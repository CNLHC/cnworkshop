import React from 'react'
import { PageInfo } from "../../../templates/PostList/query"
import { navigate } from 'gatsby'
import { Pagination } from 'semantic-ui-react'
import conf from '../../../../conf'
import styled from 'styled-components'


const GiguePagination = styled.div`
    .ui.pagination.menu{
        background: #000;
    }
    .ui.pagination.menu :hover{
        color: white;
    }
`



const { PostList } = conf

interface IProps {
    pageInfo: PageInfo
}
const Paginator: React.SFC<IProps> = (props) => {
    const { pageInfo } = props
    const navRoute = (page: number) => `/${PostList.prefix}/${page}`
    return (
        <GiguePagination>
            <Pagination
                activePage={pageInfo.currentPage}
                totalPages={pageInfo.pageCount}
                onPageChange={(_, d) => {
                    return navigate(navRoute(typeof d.activePage === 'string' ? parseInt(d.activePage) : d.activePage));
                }} />
        </GiguePagination>
    )
}

export default Paginator
