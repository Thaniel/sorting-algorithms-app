import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SortChartDialogComponent } from '../../components/sort-chart-dialog/sort-chart-dialog.component';

import * as sortingAlgorithms from '../../../shared/sortingAlgorithms';
import { ALGORITHMS } from 'src/app/shared/constants';

@Component({
  selector: 'app-sorting-page',
  templateUrl: './sorting-page.component.html',
  styleUrls: ['./sorting-page.component.css']
})
export class SortingPageComponent {

  public myForm: FormGroup = this.fb.group({
    length: [1, [Validators.required, Validators.min(1), Validators.max(100000)]],
    algorithm: ['', [Validators.required]],
  });

  public time: number = 0.0;
  // public isCalculating: boolean = true;
  public randomArray: number[] = new Array<number>();
  public sortedArray: number[] = new Array<number>();

  public selectedAlgorithm = '';
  public algorithms: Algorithm[] = ALGORITHMS;

  public showList1: boolean = false;
  public showList2: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.selectedAlgorithm = this.myForm.controls['algorithm'].value;
    this.generateAndSortArray();
    this.myForm.reset();
  }

  private generateAndSortArray() {
    const arrayLength = this.myForm.controls['length'].value;
    const algorithm = this.myForm.controls['algorithm'].value;

    // this.isCalculating = true;
    this.time = 0;

    // Generate random array
    this.randomArray = sortingAlgorithms.generateRandomArray(arrayLength);

    // Clone array to not modify the randomly generated one
    if (algorithm !== '')
      this.sortedArray = Object.assign([], this.randomArray);

    let t1 = new Date().getTime();

    // Different methods
    switch (algorithm) {
      case 'Bubble sort': {
        this.openDialog();
        //this.sortedArray = sortingAlgorithms.bubbleSort(this.sortedArray);
        break;
      }
      case 'Selection sort': {
        this.openDialog();
        //this.sortedArray = sortingAlgorithms.selectionSort(this.sortedArray);
        break;
      }
      case 'Insertion sort': {
        this.openDialog();
        //this.sortedArray = sortingAlgorithms.insertionSort(this.sortedArray);
        break;
      }
      case 'Binary insertion sort': {
        this.openDialog();
        //this.sortedArray = sortingAlgorithms.binaryInsertionSort(this.sortedArray);
        break;
      }
      case 'Quick sort': {
        this.openDialog();
        //sortingAlgorithms.quickSort_v2(this.sortedArray, 0, this.sortedArray.length);
        break;
      }
      case 'Merge sort': {
        this.showList1 = true;
        this.showList2 = true;
        this.sortedArray = sortingAlgorithms.mergeSort(this.randomArray);
        break;
      }
      case 'Radix sort': {
        this.showList1 = true;
        this.showList2 = true;
        this.sortedArray = sortingAlgorithms.radixSort(this.randomArray);
        break;
      }
      default: {
        break;
      }
    }

    let t2 = new Date().getTime();
    this.time = (t2 - t1);
    // this.isCalculating = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SortChartDialogComponent, {
      width: '1000px',
      data: {
        'array': this.sortedArray,
        'algorithm': this.selectedAlgorithm },
    });


    dialogRef.afterClosed().subscribe(result => {
      this.sortedArray = result;
      this.showList1 = true;
      this.showList2 = true;
    });
  }

}

