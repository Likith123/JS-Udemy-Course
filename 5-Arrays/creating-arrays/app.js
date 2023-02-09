const numbers = [1, 2, 3];
console.log(numbers);

// const moreNumbers = Array(5, 2);
// console.log(moreNumbers);

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers);

const listItems = document.querySelectorAll('li');
console.log(listItems);

const arrayListItems = Array.from(listItems);
console.log(arrayListItems);

const hobbies = ['Sports','Cooking'];
hobbies.push('Reading'); // Adds element at last of array
hobbies.unshift('Coding'); // Adds element at first of array
let poppedElement = hobbies.pop(); // Removes element at last and return that element, so we can store for any further purpose
hobbies.shift(); // Removes element at first of array
console.log(hobbies);

// splice method
// hobbies.splice(startingIndex, noOfElementsToDeleteFromStartingIndex,elementsToAdd(optional));
hobbies.splice(1,0,'Sleep','Play');
hobbies.splice(1, 2);

// slice method
//hobbles.slice(startingIndex, endingIndex(optional)); creates new array
hobbies.slice(1,4);

// indexOf will return index if element found else return -1,except for object, so .find() will be used here Ex: hobbies.indexOf()
/* .find() method will help to find an object in array Ex: hobbies.find((obj,index,objArray)=>{
    //logic
})*/
// we can also use .includes() only to find whether the searching item is present or not, so it returns true or false Ex: hobbies.includes('Sleep')

// forEach loop alternative of for of loop
// Ex: hobbies.forEach((hobby, index, hobbies) =>{});