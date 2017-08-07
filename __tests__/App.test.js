import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';
import FileDetail from '../src/components/fileDetail';
import DirectoryListing from '../src/components/directoryListing';
import DirectoryDetail from '../src/components/directoryDetail';
import {processData, filesInfo, directories, directoryFiles} from '../src/utils'

const a = {
  "/c/c.java": [1,2],
  "/b/b.java": [3,4],
  "/a/ajava": [5,6]
}

const b = processData(a)


it('App renders without crashing', () => {
  shallow(<App />);
});

it('FileDetail renders without crashing', () => {
  shallow(<FileDetail key={1} percent={50} name={'filename'} linesCovered={50} linesTotal={100} />);
});

it('DirectoryListing renders without crashing', () => {
  shallow(<DirectoryListing data={directories(b)} action={ () => {}} directory={'/a/'}/> );
});

it('DirectoryListing renders without crashing', () => {
  shallow(<DirectoryListing data={directories(b)} action={ () => {}} directory={'/a/'}/> );
});

it('DirectoryDetail renders without crashing', () => {
  shallow(<DirectoryDetail files={directoryFiles(b, 'a')} directory={'a'} /> );
});

