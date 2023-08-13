import { Component } from '@angular/core';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems = [
    { name: 'Home', icon: 'home', url:'./home' },
    { name: 'Sorting', icon: 'sort', url:'./sorting' },
    { name: 'Algorithms code', icon: 'search', url:'./algorithms' }
  ]
}
