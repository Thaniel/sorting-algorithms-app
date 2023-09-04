import { Component } from '@angular/core';
import { Algorithm } from '../../interfaces/algorithm.interface';
import { ALGORITHMS } from 'src/app/shared/constants';


@Component({
  selector: 'app-algorithms-page',
  templateUrl: './algorithms-page.component.html',
  styleUrls: ['./algorithms-page.component.css']
})
export class AlgorithmsPageComponent {

  public algorithms: Algorithm[];

  constructor() {
    this.algorithms = ALGORITHMS;
  }
}
