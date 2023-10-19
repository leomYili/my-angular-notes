import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'div[app-ng-for]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss']
})
export class NgForComponent {
  items:any[] = [{
    id:1,
    title:'item 1'
  },{
    id:2,
    title:'item 2'
  },{
    id:3,
    title:'item 3'
  },{
    id:4,
    title:'item 4'
  },{
    id:5,
    title:'item 5'
  }];
}
