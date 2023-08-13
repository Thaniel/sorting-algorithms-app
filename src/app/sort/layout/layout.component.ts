import { Component } from '@angular/core';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public sidebarItems = [
    { name: 'Home', icon: 'home', url:'./home' },
    { name: 'Sorting', icon: 'sort', url:'./sorting' },
    { name: 'Algorithms code', icon: 'code', url:'./algorithms' }
  ]
}
