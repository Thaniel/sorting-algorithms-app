import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartModule } from 'primeng/chart';

import { AlgorithmsPageComponent } from './pages/algorithms-page/algorithms-page.component';
import { GraphPageComponent } from './pages/graph-page/graph-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutComponent } from './layout/layout.component';
import { MapsRoutingModule } from './sort-routing.module';
import { MaterialModule } from '../material/material.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SortingPageComponent } from './pages/sorting-page/sorting-page.component';
import { SortChartDialogComponent } from './components/sort-chart-dialog/sort-chart-dialog.component';


@NgModule({
  declarations: [
    AlgorithmsPageComponent,
    GraphPageComponent,
    HomePageComponent,
    LayoutComponent,
    SideMenuComponent,
    SortingPageComponent,
    SortChartDialogComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MaterialModule,

    ReactiveFormsModule,
    ChartModule,
  ],
})
export class SortModule { }
