
import moment from 'moment'
import React from 'react'
interface IProps {
    data: Array<{
        name: string
        dblp: string
        nextUrl: string
        ddl: moment.Moment
    }>
}

export default function Timeline(props: IProps) {
    console.log(props.data)
    return (
        <div>
            hi
        </div>
    )
}
