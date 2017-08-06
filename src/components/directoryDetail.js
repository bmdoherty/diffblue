import React from 'react'
import FileDetail from './fileDetail'

class DirectoryDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      directory: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      files: nextProps.files,
      directory: nextProps.directory
    })
  }

  render() {
    const { files, directory } = this.state

    let total = {
      lines: 0,
      covered: 0
    }
    let rows = []    
    
    files.forEach(function(item, index) {               
      let percent = (( item.linesCovered / item.linesTotal ) * 100).toFixed(0)

      total.lines = total.lines + item.linesTotal
      total.covered = total.covered + item.linesCovered

      rows.push(
        <FileDetail key={item.key} percent={percent} name={item.fileName} linesCovered={item.linesCovered} linesTotal={item.linesTotal} />
      )
    })

    return (      
      <div>
        <h2>{directory} <span className="ratio"> { ((total.covered / total.lines) * 100).toFixed(0) } % </span></h2>

        {rows}
        <hr/>
        <span className="ratio">Total: {total.covered} / {total.lines}</span>

      </div>
    )
  }
}

export default DirectoryDetail