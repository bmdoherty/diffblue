import {compare, processData, filesInfo, directories, directoryFiles} from '../src/utils'

const a = {
  "/c/c.java": [1,2],
  "/b/b.java": [3,4],
  "/a/ajava": [5,6]
}

const b = processData(a)

test('already sorted', () => {
    let result = compare(b[0], b[1])
    expect( result ).toBe(-1);
})

test('passing to directories with same name', () => {
    let result = compare(b[0], b[0])
    expect( result ).toBe(0);
})

test('unsorted', () => {
    let result = compare(b[1], b[0])
    expect( result ).toBe(1);
})

test('empty array to not error', () => {
    processData( [] )
})

test('data is alphabetically sorted on directory', () => {
    let result = processData(a)
    expect( result[0]['directory'] ).toBe('/a/');
})

test('files should total correctly', () => {
    let result = filesInfo(b)
    expect( result.files ).toBe(3);
})

test('lines covered for directory should total correctly', () => {
    let result = filesInfo(b)
    expect( result.linesCovered ).toBe(9);
})

test('total lines for directory should total correctly', () => {
    let result = filesInfo(b)
    expect( result.linesTotal ).toBe(12);
})

test('directories returns array of correct length', () => {
    let result = directories(b)
    expect( result.length ).toBe(3);
})
    
test('coverage percent is calculated correctly', () => {
    let result = directories(b)
    expect( result[0]['percent'] ).toBe(83);
})

test('Returns the corect files for the directory', () => {
    let result = directoryFiles(b,'/c/')
    expect( result[0].fileName ).toBe('c.java');
})
