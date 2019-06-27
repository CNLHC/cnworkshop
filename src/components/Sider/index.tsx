import React from "react"
import Styles from "./index.module.scss"
import Avatar from "../../../assets/avatar.png"

class BlogSider extends React.Component<any, any> {

  render() {
    return (
      <div className={Styles.sideBody}>
        <div className={Styles.avtar}>
          <div className={Styles.imgContainer}>
            <img src={Avatar}/>
          </div>
        </div>

        <div className={Styles.menu}>
          <ul>
            <li>归档</li>
            <li>标签</li>
            <li>时间轴</li>
            <li>关于</li>
          </ul>
        </div>
        <div>
        </div>
      </div>
    )
  }

}

export default BlogSider