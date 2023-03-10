import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sku-table',
  templateUrl: './sku-table.component.html',
  styleUrls: ['./sku-table.component.css']
})
export class SkuTableComponent {
  @Input() data!: any;
  displayedColumns: Array<string> = ['no', 'name', 'company', 'price']

}
