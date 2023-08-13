import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsPageComponent } from './algorithms-page.component';

describe('AlgorithmsPageComponent', () => {
  let component: AlgorithmsPageComponent;
  let fixture: ComponentFixture<AlgorithmsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlgorithmsPageComponent]
    });
    fixture = TestBed.createComponent(AlgorithmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
