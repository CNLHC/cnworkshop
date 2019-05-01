
const path = require('path')

export const generateURL=(absFilePath:string,codeName:string)=>{
  let categoryList = path.dirname(absFilePath).split(path.sep)
  const url=categoryList.slice(categoryList.lastIndexOf('posts')).join('/')
  return `/${url}/${codeName}`
}