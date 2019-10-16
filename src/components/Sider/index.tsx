import React from "react"
import Avatar from "../../../assets/avatar.png"
import { Sidebar, Menu } from "semantic-ui-react"
import Styles from './index.module.scss'
import "semantic-ui-less/semantic.less"
import styled from "styled-components"

const CenterText = styled.div`
text-align:center;
`

class BlogSider extends React.Component<any, any> {

  render() {
    return (
      <Sidebar.Pusher>
        <Sidebar
          width="thin"
          as={Menu}
          visible
          animation="push"
          vertical
        >
          <div className={Styles.avtar}>
            <div className={Styles.imgContainer}>
              <img src={Avatar} />
            </div>
          </div>
          <CenterText>
              <Menu.Item as='span' color="black" header>归档</Menu.Item>
              <Menu.Item as='span'>标签</Menu.Item>
              <Menu.Item as='a'>时间</Menu.Item>
              <Menu.Item as='span'>关于</Menu.Item>
          </CenterText>
        </Sidebar>
      </Sidebar.Pusher>
    )
  }

}

export default BlogSider