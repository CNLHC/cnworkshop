
import React from 'react'
import styled from 'styled-components'
const Toc = styled.div`
      border-left: 1px solid #ebedf0;
      margin-left : 15px;
      color: #FFF;
      text-decoration: none;
      ul {
        list-style: none;
        line: 1,
      }
`
type MdxTocData = {
    url: string
    title: string
    items: Array<MdxTocData>
}
const genRecur = (entry: MdxTocData[]) => (
    <ul>
        {entry && entry.map(e => (
            <li key={e.url}>
                <a href={e.url}>{e.title}</a>
                {e.items ? genRecur(e.items) : null}
            </li>
        ))}
    </ul>
)
export default function MdxToc({ data }: { data: MdxTocData[] }) {
    return (
        <Toc>
            {genRecur(data)}
        </Toc>
    )
}
