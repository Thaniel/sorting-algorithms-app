import { Algorithm } from "../sort/interfaces/algorithm.interface";

const bubble_sort_code = `
function bubbleSort (array: number[]){
  let length: number = array.length;

  for (let i = 0; i < length; i++){
    for(let j = length-1; j >= 0; j--){
      if(array[j] > array[j + 1]){
        swap(array, j, j + 1);
      }
    }
  }

  return array;
}`;

const selection_sort_code = `
function selectionSort (array: number[]) {

  let length: number = array.length;

  for(let i = 0; i < length - 1; i++){
    let positionSelection = i;
    let valueSelection = array[i];

    for(let j = i + 1; j < length; j++){
      if(array[j] < valueSelection){
        positionSelection = j;
        valueSelection = array[j];
      }
    }
    array[positionSelection] = array[i];
    array[i] = valueSelection;
  }

  return array;
}`;

const insertion_sort_code = `
function insertionSort (array: number[]) {

  let length: number = array.length;

  for(let i = 1; i< length; i++){
    let valueSelection = array[i];
    let j = i - 1;

    while( (j >= 0) && (array[j] > valueSelection) ){
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = valueSelection;
  }

  return array ;
}`;

const binary_insertion_sort_code = `
function binaryInsertionSort (array: number[]) {

  let length: number = array.length;

  for(let i = 1; i < length + 1; i++){

    let toInsert = array[i];
    if( toInsert < array[i - 1]){
      let base = 0;
      let top = i - 1;

      // Binary Search
      while ( base <= top){
        let m = Math.floor((base + top) / 2);
        if( toInsert <= array[m]){
          top = m - 1;
        }else{
          base = m + 1;
        }
      }
      let j = i - 1;

      while( j >= base ){
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[base] = toInsert;
    }
  }

  return array;
}`;

const quick_sort_code = `
function quickSort (array: number[], base: number, top: number) {
  let iP;

  if(base < top){
    iP = placePivot(array, base, top);
    quickSort(array, base, iP - 1);   // Tail-recursion
    quickSort(array, iP + 1, top);   // Tail-recursion
  }
}`;

const place_pivot_code = `
function placePivot (array: number[], base: number, top: number) {
  let i: number;
  let iP: number = base;
  let pivot = array[base];

  for(i = base + 1; i <= top; i++){
    if(array[i] < pivot){
      iP = iP + 1;
      swap(array, iP, i);
    }
  }
  swap(array, base, iP);

  return iP;
}`;

const merge_sort_code = `
function mergeSort (array: number[]) : number[] {

  if (array.length <= 1) {                          // End of recursio
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const leftPart = array.slice(0, mid);             // Left half of the array
  const rightPart = array.slice(mid);               // Rigth half of the array

  const base = mergeSort(leftPart);
  const top = mergeSort(rightPart);
  return fusion(base, top);                         // Join both parts
} `;

const fusion_code = `
function fusion (base: number[], top: number[]) : number []{
  let basePos = 0;
  let topPos = 0;
  let fusionArray: number[] = [];

  // Check if the position exists in the array
  while (basePos < base.length && topPos < top.length) {
    // Add the smaller element to the fusion array form the base array and top array
    if (base[basePos] <= top[topPos]) {
      fusionArray.push(base[basePos]);
      basePos++;
    } else {
      fusionArray.push(top[topPos]);
      topPos++;
    }
  }

  // Add the remaining elements from the base array
  while (basePos < base.length) {
    fusionArray.push(base[basePos]);
    basePos++;
  }

  // Add the remaining elements from the top array
  while (topPos < top.length) {
    fusionArray.push(top[topPos]);
    topPos++;
  }

  return fusionArray;
}`;

const radix_sort_code = `
function radixSort (array: number[]) {

  let maxDigits: number = digitsOfTheLargestNumber(array);

  for (let i = 0; i < maxDigits; i++) {
    let buckets = Array.from({ length: 10 }, () => <any>[]) // 10 buckets, one for each digit from 0 to 9

    for (let j = 0; j < array.length; j++) {
      let digit = getDigitByPosition(array[j], i);
      buckets[digit].push(array[j]);
    }

    // New order after each loop
    array = [].concat(...buckets)
  }

  return array;
}`;

const get_digit_by_position = `
function getDigitByPosition(x: number, position: number) {
  return Math.floor(x / Math.pow(10, position)) % 10;   // getDigit(345, 2) --> 3 ; getDigit(345, 1) --> 4; getDigit(345, 0) --> 5
}`;

const digits_of_the_largest_number = `
function digitsOfTheLargestNumber(array: number []) {
  // Higher number in array
  let a : number = Math.max(...array);
  // Digits of the number
  return Math.floor(Math.log10(a)) + 1;
}`;

export const ALGORITHMS: Algorithm[] = [
  {  name: 'Bubble sort',            complexity: 'O(n^2)',         code: [bubble_sort_code]},
  {  name: 'Selection sort',         complexity: 'O(n^2)',         code: [selection_sort_code]},
  {  name: 'Insertion sort',         complexity: 'O(n^2)',         code: [insertion_sort_code]},
  {  name: 'Binary insertion sort',  complexity: 'O(n)',           code: [binary_insertion_sort_code]},
  {  name: 'Quick sort',             complexity: 'O(n * log(n))',  code: [quick_sort_code, place_pivot_code]},
  {  name: 'Merge sort',             complexity: 'O(n * log(n))',  code: [merge_sort_code, fusion_code]},
  {  name: 'Radix sort',             complexity: 'O(n + k)',       code: [radix_sort_code, get_digit_by_position, digits_of_the_largest_number]},
];
