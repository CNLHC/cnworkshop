import React from 'react'
import { PageInfo } from "../../../templates/PostList/query"
import { navigate } from 'gatsby'
import { Pagination } from 'semantic-ui-react'


const conf = require('../../../../conf')
const { PostList } = conf

interface IProps {
    pageInfo: PageInfo
}
const Paginator: React.SFC<IProps> = (props) => {
    const { pageInfo } = props
    const navRoute = (page: number) => `/${PostList.prefix}/${page}`
    return (<Pagination
        activePage={pageInfo.currentPage}
        totalPages={pageInfo.pageCount}
        onPageChange={(_, d) => {
            return navigate(navRoute(typeof d.activePage === 'string' ? parseInt(d.activePage) : d.activePage));
        }}
    />)
}

export default Paginator
