


export interface IQuery{
    markdownRemark: MarkdownRemark;
}

export interface MarkdownRemark {
    html:            string;
    tableOfContents: string;
}
