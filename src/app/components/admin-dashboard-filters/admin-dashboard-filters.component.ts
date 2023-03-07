import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-filters',
  templateUrl: './admin-dashboard-filters.component.html',
  styleUrls: ['./admin-dashboard-filters.component.css']
})
export class AdminDashboardFiltersComponent implements OnInit {
  @Input() shopList!: any;
  @Input() locationList!: any;

  ngOnInit(): void {
    console.log(this.shopList, this.locationList)
  }
}
