import React from 'react'
import { Progress } from 'semantic-ui-react'

const FileDetail = (props) => (
  <div className="FileDetail">
    <span className="name">{props.name}</span>
    <span className="ratio">{props.linesCovered} / {props.linesTotal}</span>
    <br/>      
    <Progress percent={props.percent} color='green' size='small' progress/>
  </div>
)

export default FileDetail