import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-tables',
  templateUrl: './admin-dashboard-tables.component.html',
  styleUrls: ['./admin-dashboard-tables.component.css']
})
export class AdminDashboardTablesComponent implements OnInit {
  columnHeader: Array<string> = ["ItemID", "ProductName", "MRP", "Quantity"]
  @Input() items!: any
  @Input() tableHeaders!: any

  ngOnInit(): void {
    
  }
}