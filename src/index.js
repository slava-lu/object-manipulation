const _ = require('lodash');

const simpleArray = [1, 2, 3, 4, 5]
const simpleObject = {key1: 'value1', key2: 'value2'}

// empty array or object results to true
const emptyArray = []
console.log('Empty array is', !!emptyArray)

// checking for empty array
const isArrayNotEmpty = !!(simpleArray && simpleArray.length)

// checking for empty object
const isObjectNotEmpty = !!(simpleObject && Object.entries(simpleObject).length)

// checking for Empty array or object with Lodash
const isSomethingNotEmpty = !_.isEmpty(simpleObject)


// READ
const nestedObject = {
  key1:
    {
      key2:
        {
          key3: 'value3',
          key4: 'value4'
        }
    }
}

// getting nested value from object
// straightforward old school way
let value3 = nestedObject && nestedObject.key1 && nestedObject.key1.key2 && nestedObject.key1.key2.key3

// optional Chaining (babel or node 13+ with flag)
value3 = nestedObject?.key1?.key2?.key3

// using lodash
value3 = _.get(nestedObject, 'key1.key2.key3')

// getting nested value from object or default value
// straightforward old school way
let defaultValue = nestedObject && nestedObject.key1 && nestedObject.key1.key2 && nestedObject.key1.key2.key5 || 'default value'

// Optional Chaining (babel or node 13+ with --harmony flag)
defaultValue = nestedObject?.key1?.key2?.key5 ?? 'default value'

// using Lodash
defaultValue = _.get(nestedObject, 'key1.key2.key5', 'default value')


// CREATE
const myArray = ['a', 'b', 'c', 'd']
const myObject = {key1: 'value1', key2: 'value2'}

const newArray = [...myArray]
const newObject = {...myObject}


// UPDATE
// update newArray with a new value of 'd'
const updatedArray = [...newArray, 'd']

// add new key
let updatedObject = {...newObject, newKey: 'newValue'}

// change the value of existing key
updatedObject = {...newObject, key2: 'newValue'}

// updating nested objects
updatedObject = {
  ...nestedObject,
  key1: {
    ...nestedObject.key1,
    key2: {
      ...nestedObject.key1.key2,
      key3: 'newValue'
    }
  }
}
console.log('Updated nested object =', updatedObject)

const clonedObject = _.cloneDeep(nestedObject)
clonedObject.key1.key2.key4 = 'newValue'
console.log('Updated nested object with Lodash =', clonedObject)


// DELETE
// remove value 'a' and the third element form the newArray
let modifiedArray = newArray.filter( (element, index) => element !== 'a' && index !== 2 )
console.log('Array with deleted elements =', modifiedArray)

// same with Lodash
modifiedArray = _.filter(newArray, (element, index) => element !== 'a' && index !== 2)
console.log('Array with deleted elements by Lodash =', modifiedArray)

// remove key1 from the newObject
let {key1, ...modifiedObject} = newObject
console.log('Object with deleted key =', modifiedObject)

// similar with Lodash
modifiedObject = _.omit(newObject, 'key2')
console.log('Object with deleted key by Lodash =', modifiedObject)


// Complex transformations
// transferring object to array
const objectToTransfer = {
  a: {name: 'Mary', surname: 'Poppins', age: 40},
  b: {name: 'John', surname: 'Smith', age: 35},
}
let sortedArray = Object.entries(objectToTransfer)
  .map(([ key, value ]) => ({key, ...value}))
  .sort((a,b) => a.age - b.age)
console.log('Transferred and sorted array', sortedArray)

let sortedArraySimple = Object.values(objectToTransfer).sort((a,b) => a.age - b.age)
console.log('Transferred and sorted array without keys', sortedArraySimple)

// same with Lodash
const TransferredArray = _.values(objectToTransfer)
sortedArray = _.sortBy(TransferredArray, 'age')
console.log('Transferred and sorted array without keys (Lodash version)', sortedArray)


// transferring array to object
const arrayToTransfer = [
  {id: 'a', name: 'Mary', surname: 'Poppins', age: 40},
  {id: 'b', name: 'John', surname: 'Smith', age: 35}
]

let transferredObject = arrayToTransfer.reduce((result, {id, ...rest}) => ({...result, [id]: rest}), {} )
console.log('Transferred object', transferredObject)

// similar with Lodash
transferredObject = _.keyBy(arrayToTransfer, 'id')
console.log('Transferred object with Lodash', transferredObject)

// find something in array of object without transferring
let objectByID = arrayToTransfer.find(obj => obj.id === 'a')
console.log('object with ID = a', objectByID)

// same with lodash
objectByID = _.find(arrayToTransfer, {id: 'b'})
console.log('object with ID = b (Lodash)', objectByID)
