export { generateRandomArray, bubbleSort, selectionSort, insertionSort, binaryInsertionSort, quickSort, quickSort_v2, mergeSort, radixSort };

/*--------------------------------------------------------------*/
/*              Generate an array with random elements	        */
/*--------------------------------------------------------------*/
function generateRandomArray(length: number) {
  let array: number[] = new Array(length);

  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 1001); // Returns a random integer between 0 and 1000
  }

  return array;
}


/*--------------------------------------------------------------*/
/*                   Bubble sort   ->  O(n^2)                   */
/*--------------------------------------------------------------*/
function bubbleSort(array: number[]) {

  let length: number = array.length;

  for (let i = 0; i < length; i++) {
    for (let j = length - 1; j >= 0; j--) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }

  return array;
}


/*--------------------------------------------------------------*/
/*                   Selection Sort   ->   O(n^2)               */
/*--------------------------------------------------------------*/
function selectionSort(array: number[]) {

  let length: number = array.length;

  for (let i = 0; i < length - 1; i++) {
    let positionSelection = i;
    let valueSelection = array[i];

    for (let j = i + 1; j < length; j++) {
      if (array[j] < valueSelection) {
        positionSelection = j;
        valueSelection = array[j];
      }
    }
    array[positionSelection] = array[i];
    array[i] = valueSelection;
  }

  return array;
}


/*--------------------------------------------------------------*/
/*                   Insertion Sort   ->   O(n^2)               */
/*--------------------------------------------------------------*/
function insertionSort(array: number[]) {

  let length: number = array.length;

  for (let i = 1; i < length; i++) {
    let valueSelection = array[i];
    let j = i - 1;

    while ((j >= 0) && (array[j] > valueSelection)) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = valueSelection;
  }

  return array;
}


/*--------------------------------------------------------------*/
/*             Binary Insertion Sort   ->   O(n)                */
/*--------------------------------------------------------------*/
function binaryInsertionSort(array: number[]) {

  let length: number = array.length;

  for (let i = 1; i < length + 1; i++) {

    let toInsert = array[i];
    if (toInsert < array[i - 1]) {
      let base = 0;
      let top = i - 1;

      // Binary Search
      while (base <= top) {
        let m = Math.floor((base + top) / 2);
        if (toInsert <= array[m]) {
          top = m - 1;
        } else {
          base = m + 1;
        }
      }
      let j = i - 1;

      while (j >= base) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[base] = toInsert;
    }
  }

  return array;
}


/*--------------------------------------------------------------*/
/*                    Quick Sort   ->   O(n * log(n))           */
/*--------------------------------------------------------------*/
function quickSort(array: number[], base: number, top: number) {
  let iP;

  if (base < top) {
    iP = placePivot(array, base, top);
    quickSort(array, base, iP - 1);   // Tail-recursion
    quickSort(array, iP + 1, top);   // Tail-recursion
  }
}

function placePivot(array: number[], base: number, top: number) {
  let i: number;
  let iP: number = base;
  let pivot = array[base];

  for (i = base + 1; i <= top; i++) {
    if (array[i] < pivot) {
      iP = iP + 1;
      swap(array, iP, i);
    }
  }
  swap(array, base, iP);

  return iP;
}


/*--------------------------------------------------------------*/
/*                    Quick Sort V2  ->   O(n * log(n))         */
/*                    Deleting tail-recursion                   */
/*--------------------------------------------------------------*/
function quickSort_v2(array: number[], base: number, top: number) {
  let iP: number;

  while (base < top) {
    iP = placePivot(array, base, top);
    quickSort_v2(array, base, iP - 1);
    base = iP + 1;
  }
}


/*--------------------------------------------------------------*/
/*                    Merge Sort   ->  O(n * log(n))            */
/*--------------------------------------------------------------*/
function mergeSort(array: number[]): number[] {

  if (array.length <= 1) {                          // End of recursion
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const leftPart = array.slice(0, mid);             // Left half of the array
  const rightPart = array.slice(mid);               // Rigth half of the array

  const base = mergeSort(leftPart);
  const top = mergeSort(rightPart);
  return fusion(base, top);                         // Join both parts
}

/* Other Version - Not Working Well
function mergeSort (array: number[], base: number, top: number) {

  if(base < top){
    let middle = Math.floor((base + top) / 2);
    mergeSort(array, base,  middle);
    mergeSort(array, middle + 1, top);
    fusion(array, base, middle, top);
  }
}*/

function fusion(base: number[], top: number[]): number[] {
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
}

/* Other Version - Not Working Well
function fusion (v1: number[], baseA: number, mid: number, topB: number) {
    let indA: number = 0, indB:number = 0;
    let indT: number = baseA;
    let dimA: number = mid - baseA + 1;
    let dimB: number = topB - mid;

    let vA: number[] = new Array<'number'>();
    for(let i = baseA; i < dimA; i++){
      vA[i] = v1[i];
    }

    let vB: number[] = new Array<'number'>();
    let j:  number = 0;
    for(let i = mid; i <= dimB; i++){
      vB[j] = v1[i+1];
      j++;
    }

    while((indA < dimA) && (indB < dimB)){
      if(vA[indA] < vB[indB]){
        v1[indT] = vA[indA];
        indA += 1;
      }else {
        v1[indT] = vB[indB];
        indB += 1;
      }
      indT += 1;
    }

    if(indA >= dimA){
      for(let i = indB; i < dimB; i++){
        v1[indT] = vB[i];
        indT += 1;
      }
    }else{
      for(let i = indA; i < dimA; i++){
        v1[indT] = vA[i];
        indT += 1;
      }
    }
  }
  */

/*--------------------------------------------------------------*/
/*                    Radix Sort   ->  O(n + k)                 */
/*--------------------------------------------------------------*/
function radixSort(array: number[]) {

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
}

function getDigitByPosition(x: number, position: number) {
  return Math.floor(x / Math.pow(10, position)) % 10;   // getDigit(345, 2) --> 3 ; getDigit(345, 1) --> 4; getDigit(345, 0) --> 5
}

function digitsOfTheLargestNumber(array: number[]) {
  // Higher number in array
  let a: number = Math.max(...array);
  // Digits of the number
  return Math.floor(Math.log10(a)) + 1;
}

/*--------------------------------------------------------------*/
/*                  Swap 2 elements of an array                 */
/*--------------------------------------------------------------*/
function swap(array: number[], x: number, y: number) {
  let temp: number = array[x];
  array[x] = array[y];
  array[y] = temp;
}
