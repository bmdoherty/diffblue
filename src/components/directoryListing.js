import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

export default class DirectoryListing extends Component {

  constructor(props) {
    super(props);

    this.changeDirectory = this.props.action.bind(this);

    this.state = {
      column: null,
      data: [],
      direction: null,
      directory: ''
    }    
  }
  
  handleSort = (clickedColumn)  => {
    const { column, data, direction } = this.state
    
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
     const { directory } = this.state

    //dont change for directory click       
    if(nextProps.directory !== directory){
      return false
    }
    return true
  }

  componentWillReceiveProps(nextProps) {
    const { column } = this.state

    this.setState({
        data: _.sortBy(nextProps.data, [column]),
        directory: nextProps.directory
    })
  }

  render() {
    const { column, data, direction } = this.state
    
    return (
      <Table sortable celled collapsing>
         <Table.Header>
          <Table.Row>
             <Table.HeaderCell sorted={column === 'files' ? direction : null} onClick={()=>this.handleSort('files')}>
              Files
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'directory' ? direction : null} onClick={()=>this.handleSort('directory')}>
              Directory
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'percent' ? direction : null} onClick={()=>this.handleSort('percent')}>
              Percent
            </Table.HeaderCell> 
          </Table.Row>
        </Table.Header>
           <Table.Body>
          {_.map(data, ({ directory, files, linesCovered, linesTotal, percent }) => (
            <Table.Row key={directory}>
              <Table.Cell>{files}</Table.Cell>
              <Table.Cell>
                <a href="#" onClick={ ()=>this.changeDirectory(directory) }>
                  {directory}
                </a>  
              </Table.Cell>
              <Table.Cell>{percent}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>    
      </Table>

    )
  }
}
