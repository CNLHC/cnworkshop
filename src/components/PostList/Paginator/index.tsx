import React from 'react'
import { PageInfo } from "../../../templates/PostList/query"
import { navigate } from 'gatsby'
import { Pagination } from 'react-bootstrap';
import 'react-bootstrap/';
require('bootstrap/dist/css/bootstrap.min.css');


const conf = require('../../../../conf')
const { PostList } = conf



interface IProps {
    pageInfo: PageInfo
}
const Paginator: React.SFC<IProps> = (props) => {
    const { pageInfo } = props
    const navRoute = (page: number) => `/${PostList.prefix}/${page}`
    return (
        <Pagination>
            <Pagination.Prev
                disabled={!pageInfo.hasPreviousPage}
                onClick={() => navigate(navRoute(pageInfo.currentPage - 1))} />

            {
                Array.from(Array(pageInfo.pageCount)).map((_, idx) =>
                    <Pagination.Item
                        key={`${idx}`}
                        active={idx + 1 === pageInfo.currentPage}
                        onClick={() => navigate(navRoute(idx + 1))}
                    >{idx + 1}</Pagination.Item>
                )
            }

            <Pagination.Next
                disabled={!pageInfo.hasNextPage}
                onClick={() => navigate(navRoute(pageInfo.currentPage + 1))} />

        </Pagination>
    )
}

export default Paginator
