import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css']
})
export class GraphPageComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['1000', '5000', '10000', '50000', '100000'],
          datasets: [
              {
                  label: 'Bubble Sort', //- O(n^2)
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--red-500'),
                  tension: 0.4,
                  data: [6, 102, 372, 11453, 55548]
              },
              {
                  label: 'Selection Sort', //- O(n^2)
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--orange-500'),
                  tension: 0.4,
                  data: [1, 21, 70, 1741, 9207]
              },
              {
                  label: 'Insertion Sort', //- O(n^2)
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--yellow-500'),
                  tension: 0.4,
                  data: [3, 12, 39, 1035, 6295]
              },
              {
                  label: 'Binary Insertion Sort', //- O(n)
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--green-500'),
                  tension: 0.4,
                  data: [3, 14, 40, 932, 4263]
              },
              {
                  label: 'Quick Sort', //- O(n * log(n))
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--bluegray-500'),
                  tension: 0.4,
                  data: [6, 5, 11, 16, 30]
              },
              {
                  label: 'Merge Sort', //- O(n * log(n))
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  tension: 0.4,
                  data: [1, 6, 5, 8, 23, 45]
              },
              {
                  label: 'Radix Sort', //- O(n + k)
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--purple-500'),
                  tension: 0.4,
                  data: [1, 2, 5, 20, 24]
              }
          ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }
}
