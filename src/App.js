import React, { Component } from 'react';
import './css/App.css';

import {processData, directories, directoryFiles} from './utils';
import DirectoryListing from './components/directoryListing';
import DirectoryDetail from './components/directoryDetail';

class App extends Component {

  constructor (props) {
    super(props)

    this.state = { 
      data: [],
      url: 'https://gist.githubusercontent.com/royletron/f535f03830c92cf840665831e8d3d528/raw/fa5a266b9039843a92a13161bb92a7affb1f3dfc/java.json',
      directory: ''
    }  

    this.changeDirectory = this.changeDirectory.bind(this);    
  }

  componentDidMount() {
    this.loadCoverageData();
  }

  changeDirectory(directory) {
    this.setState({ directory: directory }); 
  }

  loadCoverageData () {
    fetch(this.state.url)
      .then(response => response.json())
      .then(data => { 
        data  = processData(data);
        this.setState({ data: data }); 
        this.setState({ directory: data[0].directory }); 

      })      
      .catch(err => console.error('Error:', err.toString() ))
  }

  render() {
    const { data, directory } = this.state

    return (
      <div className="App">
        <div className="leftPanel">
          {/* <DirectorySummary data={this.directories(this.state.data)} action={this.changeDirectory} /> */}
          <DirectoryListing data={directories(data)} action={this.changeDirectory} directory={directory}/>
        </div>

        <div className="rightPanel">      
          <div className="detail">
            <DirectoryDetail files={directoryFiles(data, directory)} directory={directory} />
          </div>        
        </div>      
      </div> 
    )
  }
}

export default App;