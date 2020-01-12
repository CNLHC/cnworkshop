import { makeStyles, createStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core"
import styled from "styled-components"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toc: {
      borderLeft: "1px solid #ebedf0",
      marginLeft: "15px",
      color: "#FFF",
      textDecoration: "none",
      ul: {
        listStyle: "none",
        lineHeight: "1",
      },
    },
  })
)
export const PageRoot = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
`

export const PageContent = styled.div`
  @media (max-width: 600px) {
     width:100%;
     overflow-x: scroll;
  }
  width: 80%;
  color: ${props => props.theme.palette.text.primary};
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 90%;
    max-height: 40rem;
  }
  a {
    color: ${props => props.theme.palette.text.primary};
  }
`

export const FloatingRail = styled.div`
  width: 20%;
   @media (max-width: 600px) {
     display:none;
    }
`
export const FloatingArea = styled.div`

   @media (max-width: 600px) {
     display:none;
    }
  position: sticky;
  top: 2rem;
  a {
    text-decoration: none;
    color: ${props => props.theme.palette.text.primary};
  }
`
export default useStyles
