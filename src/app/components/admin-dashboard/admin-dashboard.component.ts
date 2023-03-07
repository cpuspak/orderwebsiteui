import { Component, OnInit } from '@angular/core';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  skuList!: any;

  shopList!: any;

  locationList!: any;
  constructor(private dataFetch: DataFetchService){}
  ngOnInit(): void {
    this.fetchSkuList('')
    this.fetchShopList('')
    this.fetchLocations('')
  }

  private fetchSkuList(skuName: string) {
    this.dataFetch.fetchSkus(skuName).subscribe((res: any) => {
      if (res && res['Skus']) {
        this.skuList = res['Skus'];
        console.log(res)
      }
    })
  }

  private fetchShopList(shopName: string) {
    this.dataFetch.fetchShops(shopName).subscribe((res: any) => {
      if (res && res['Shops']) {
        this.shopList = res['Shops'];
        console.log(res)
      }
    })
  }

  private fetchLocations(locationName: string) {
    this.dataFetch.fetchLocations(locationName).subscribe((res: any) => {
      if (res && res["Locations"]) {
        this.locationList = res["Locations"]
      }
    })
  }
}
