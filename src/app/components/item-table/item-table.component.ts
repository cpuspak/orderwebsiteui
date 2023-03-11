import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent {
  @Input() items!: any;
  displayedColumns = ["itemNo", "productName", "Quantity"]
  
}
