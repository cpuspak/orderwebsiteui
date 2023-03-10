import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.css']
})
export class ShopTableComponent {

  @Input() data!: any
  displayedColumns: Array<string> = ['name','location']

}
