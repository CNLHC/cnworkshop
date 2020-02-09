import { CreatePagesArgs } from "gatsby";
import * as path from 'path'
import conf from "../../conf";

export type QueryResult<TData> = Promise<{
    errors?: any
    data?: TData
}>

type M = <TData, TVar = any>(props: CreatePagesArgs, s?: TVar) => (s: TemplateStringsArray) => QueryResult<TData>


export const CurryingUnTagedGraphql: M = (props, s) => {
    return (s) => props.graphql(s.toString(), s)
}

export const getPostListTemplatePath: () => string = () => path.resolve(`${__dirname}/../../templates/PostList/index.tsx`)
export const getPostDetailTemplatePath: () => string = () => path.resolve(`${__dirname}/../../templates/PostDetail/index.tsx`)
export const getPostURLPrefix: () => string = () => conf.PostList.prefix

type PaginationLayout = Array<{ offset: number, limit: number }>


export const getLimitOffsetByTotal: (total: number) => PaginationLayout = (total) => {
    const PostListConf = conf.PostList
    const { prefix, limit } = PostListConf
    const pages = Math.ceil(total / limit)
    return Array.from({ length: pages }).map((e, _idx) => ({
        limit,
        offset: _idx * limit
    }))
}

export const getUrlFromAbsolutePath: (fp: string) => string = (fp) => path.relative(fp, path.resolve("../../../posts"))