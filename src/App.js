import React, { Component } from 'react';
import processData from './processData';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  loadCoverageData () {
    fetch('https://gist.githubusercontent.com/royletron/f535f03830c92cf840665831e8d3d528/raw/fa5a266b9039843a92a13161bb92a7affb1f3dfc/java.json')
      .then(response => response.json())
      .then(data => { 
        data  = processData(data);
        this.setState({ data: data }); 
      })      
      .catch(err => console.error(this.props.url, err.toString()))
  }

  componentDidMount() {
    this.loadCoverageData();
  }

  render() {
    return (
    <FilterableCoverageTable coverage={this.state.data} />
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}




class CoverageCategoryRow extends Component {
  render() {
    return <tr><th colSpan="2" style={{textAlign:"left"}}>{this.props.directory} {this.props.directorylLinesCovered} / {this.props.directorylLinesTotal} {(this.props.directorylLinesCovered / this.props.directorylLinesTotal) * 100}%</th></tr> ;
  }
}

class CoverageRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.file}</td>
        <td>{(this.props.linesCovered / this.props.linesTotal) * 100}%</td>
      </tr>
    );
  }
}

class CoverageTable extends Component {
  render() {
    var rows = [];
    var lastDirectory = null;    
    var data = this.props.coverage;

    data.forEach(function(item, index) {
      var file = data[index]

      if (file.directory !== lastDirectory) {
        let directoryFiles = data.filter(function (f) {
          if (f.directory === file.directory ) return file;
        });

        console.log(`${file.directory} ${directoryFiles.length}`)
        console.log(directoryFiles);

        var directorylLinesCovered = directoryFiles
            .map(function(f) { return f.linesCovered; })
            .reduce(function(p, c) { return p + c; });

        var directorylLinesTotal = directoryFiles
            .map(function(f) { return f.linesTotal; })
            .reduce(function(p, c) { return p + c; });            
          
        rows.push(<CoverageCategoryRow directory={file.directory} key={file.key + 'header'} directorylLinesCovered={directorylLinesCovered} directorylLinesTotal={directorylLinesTotal} />);
      }

      rows.push(<CoverageRow key={file.key} file={file.fileName} linesCovered={file.linesCovered} linesTotal={file.linesTotal} />);
      lastDirectory = file.directory;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class FilterableCoverageTable extends Component {
  render() {
    return (
      <div>
        <CoverageTable coverage={this.props.coverage} />
      </div>
    );
  }
}


 
export default App;