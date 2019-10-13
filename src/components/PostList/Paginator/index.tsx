import React from 'react'
import { PageInfo } from "../../../templates/PostList/query"
import ReactPaginate from 'react-paginate';
import { Link } from 'gatsby'
import Styles from 'index.module.scss'
import { symbol } from 'prop-types';
const conf = require('../../../../conf')

const { PostList } = conf
console.log(1111, PostList)



interface IProps {
    pageInfo: PageInfo
}
const Paginator: React.SFC<IProps> = (props) => {
    const { pageInfo } = props
    const NextButton = pageInfo.hasNextPage ?
        <Link to={`${PostList.prefix}/${pageInfo.currentPage + 1}`}>
            下一页
            </Link>
        : null
    const PreviousButton = pageInfo.hasPreviousPage ?
        <Link to={`${PostList.prefix}/${pageInfo.currentPage - 1}`}>
            上一页
            </Link>
        : null
    return (
        <div className={Styles.paginator}>
            <ReactPaginate
                pageCount={pageInfo.pageCount}
                pageRangeDisplayed={pageInfo.pageCount}
                marginPagesDisplayed={3}
                previousLabel={PreviousButton}
                nextLabel={NextButton}
                previousClassName={Styles.previous}
            />
        </div >
    )
}

export default Paginator
