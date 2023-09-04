import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ALGORITHMS } from 'src/app/shared/constants';
import { Algorithm } from '../../interfaces/algorithm.interface';

@Component({
  selector: 'app-sort-chart-dialog',
  templateUrl: './sort-chart-dialog.component.html',
  styleUrls: ['./sort-chart-dialog.component.css']
})
export class SortChartDialogComponent implements OnInit {

  public array: number[] = [] as number[];
  public arrayTemp: number[] = [] as number[];
  //public colours: string[] = [];
  public algorithm: Algorithm;
  public isDataLoad: boolean = false;

  public chartOptions: any;
  public chartData: any;
  public chartType: string = 'bar';

  constructor(
    public dialogRef: MatDialogRef<SortChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.chartOptions = {
      animation: {
        duration: 0
      }
    };

    this.array = Object.assign([], data.array);
    this.chartData = this.loadChartData(this.array);

    /*
    Colours
    this.array.forEach(() => {
      this.colours.push('#42A5F5');
    });
    */

    this.algorithm = ALGORITHMS.find(algorithm => algorithm.name === data.algorithm)!;
    this.isDataLoad = true;
  }

  async ngOnInit() {
    // Different methods
    switch (this.algorithm.name) {
      case 'Bubble sort': {
        this.bubble();
        break;
      }
      case 'Selection sort': {
        this.selection();
        break;
      }
      case 'Insertion sort': {
        this.insertion();
        break;
      }
      case 'Binary insertion sort': {
        this.binary();
        break;
      }
      case 'Quick sort': {
        this.quickSort(this.array, 0, this.array.length);
        break;
      }
      case 'Merge sort': {
        this.arrayTemp = Object.assign([], this.array);
        this.array = await this.mergeSort(this.arrayTemp);
        break;
      }
      case 'Radix sort': {
        this.arrayTemp = Object.assign([], this.array);
        this.array = await this.radixSort(this.arrayTemp);
        break;
      }
      default: {
        break;
      }
    }
  }

  close(){
    this.dialogRef.close(this.array);
  }

  private loadChartData(updatedArray: number[]) {
    return {
      labels: this.array,
      datasets: [
        {
          label: 'Elements', //- O(n^2)
          backgroundColor: '#42A5F5', // this.colours,
          data: updatedArray,
        }
      ]
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*--------------------------------------------------------------*/
  /*                        Algorithms                            */
  /*--------------------------------------------------------------*/

  private async bubble() {
    let length: number = this.array.length;

    for (let i = 0; i < length; i++) {
      for (let j = length - 1; j >= 0; j--) {

        if (this.array[j] > this.array[j + 1]) {
          this.swap(this.array, j, j + 1);

          await this.sleep(0);
          this.chartData = this.loadChartData(this.array);
        }
      }
    }
  }

  private async selection() {
    let length: number = this.array.length;

    for (let i = 0; i < length - 1; i++) {
      let positionSelection = i;
      let valueSelection = this.array[i];

      for (let j = i + 1; j < length; j++) {
        if (this.array[j] < valueSelection) {
          positionSelection = j;
          valueSelection = this.array[j];
        }

        await this.sleep(0);
        this.chartData = this.loadChartData(this.array);
      }
      this.array[positionSelection] = this.array[i];
      this.array[i] = valueSelection;
    }
  }

  private async insertion() {
    let length: number = this.array.length;

    for (let i = 1; i < length; i++) {
      let valueSelection = this.array[i];
      let j = i - 1;

      while ((j >= 0) && (this.array[j] > valueSelection)) {
        this.array[j + 1] = this.array[j];
        j = j - 1;

        await this.sleep(0);
        this.chartData = this.loadChartData(this.array);
      }
      this.array[j + 1] = valueSelection;
    }
  }

  private async binary() {
    let length: number = this.array.length;

    for (let i = 1; i < length + 1; i++) {

      let toInsert = this.array[i];
      if (toInsert < this.array[i - 1]) {
        let base = 0;
        let top = i - 1;

        // Binary Search
        while (base <= top) {
          let m = Math.floor((base + top) / 2);
          if (toInsert <= this.array[m]) {
            top = m - 1;
          } else {
            base = m + 1;
          }
        }
        let j = i - 1;

        while (j >= base) {
          this.array[j + 1] = this.array[j];
          j = j - 1;
        }
        this.array[base] = toInsert;

        await this.sleep(0);
        this.chartData = this.loadChartData(this.array);
      }
    }
  }

  private async quickSort(array: number[], base: number, top: number) {
    let iP: number;

    while (base < top) {
      iP = await this.placePivot(array, base, top);
      this.quickSort(array, base, iP - 1);
      base = iP + 1;
    }
  }

  private async placePivot(array: number[], base: number, top: number): Promise<number> {
    let i: number;
    let iP: number = base;
    let pivot = array[base];

    for (i = base + 1; i <= top; i++) {
      if (array[i] < pivot) {
        iP = iP + 1;
        this.swap(array, iP, i);
      }
    }
    this.swap(array, base, iP);

    await this.sleep(0);
    this.chartData = this.loadChartData(this.array);

    return iP;
  }

  private async mergeSort(array: number[]): Promise<number[]> {
    if (array.length <= 1) {                          // End of recursion
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const leftPart = array.slice(0, mid);             // Left half of the array
    const rightPart = array.slice(mid);               // Rigth half of the array

    const base = this.mergeSort(leftPart);
    const top = this.mergeSort(rightPart);

    await this.sleep(0);
    this.chartData = this.loadChartData(this.arrayTemp);

    return this.fusion(await base, await top);
  }


  private fusion(base: number[], top: number[]): number[] {
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

  private async radixSort(array: number[]) {
    let maxDigits: number = this.digitsOfTheLargestNumber(array);

    for (let i = 0; i < maxDigits; i++) {
      let buckets = Array.from({ length: 10 }, () => <any>[]) // 10 buckets, one for each digit from 0 to 9

      for (let j = 0; j < array.length; j++) {
        let digit = this.getDigitByPosition(array[j], i);
        buckets[digit].push(array[j]);
      }

      // New order after each loop
      array = [].concat(...buckets)

      await this.sleep(0);
      this.chartData = this.loadChartData(this.arrayTemp);
    }

    return array;
  }

  private getDigitByPosition(x: number, position: number) {
    return Math.floor(x / Math.pow(10, position)) % 10;   // getDigit(345, 2) --> 3 ; getDigit(345, 1) --> 4; getDigit(345, 0) --> 5
  }

  private digitsOfTheLargestNumber(array: number[]) {
    // Higher number in array
    let a: number = Math.max(...array);
    // Digits of the number
    return Math.floor(Math.log10(a)) + 1;
  }

  private swap(array: number[], x: number, y: number) {
    let temp: number = array[x];
    array[x] = array[y];
    array[y] = temp;
  }
}

// Color version
/*

  async ngOnInit() {
    let length: number = this.array.length;

    for (let i = 0; i < length; i++) {
      for (let j = length - 1; j >= 0; j--) {
        console.log(i, j);

        this.colours[j] = '#9ccc65';
        this.colours[j + 1] = '#e91e63';

        if (j != length - 1)
          this.colours[j + 2] = '#42A5F5';

        if (this.array[j] > this.array[j + 1]) {
          this.swap(this.array, j, j + 1);
          await this.sleep(1000); // Sleep for 1 seconds
          this.chartData = this.loadChartData(this.array);
        }
      }

      this.colours[0] = '#42A5F5';
      this.colours[1] = '#42A5F5';
    }

    this.isShorted = true;
    this.emitSortedArray.emit(this.array);
  }
*/
