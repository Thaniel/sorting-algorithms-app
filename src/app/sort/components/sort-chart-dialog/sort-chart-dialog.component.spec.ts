import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortChartDialogComponent } from './sort-chart-dialog.component';

describe('SortChartDialogComponent', () => {
  let component: SortChartDialogComponent;
  let fixture: ComponentFixture<SortChartDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortChartDialogComponent]
    });
    fixture = TestBed.createComponent(SortChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
