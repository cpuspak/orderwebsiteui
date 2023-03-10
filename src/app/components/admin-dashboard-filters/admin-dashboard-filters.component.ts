import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard-filters',
  templateUrl: './admin-dashboard-filters.component.html',
  styleUrls: ['./admin-dashboard-filters.component.css']
})
export class AdminDashboardFiltersComponent implements OnInit {
  @Input() shopListTotal!: any;
  @Input() locationList!: any;

  @Output() filterDataEvent = new EventEmitter<any>()
  @Output() downloadSummaryPDFEvent = new EventEmitter<any>()

  shopFormControl = new FormControl('')

  endDate!: any
  startDate!: any

  location!: any
  shops!: any

  shopIdList!: any

  shopList!: any
  
  selectedShops!: any
  selectedLocation!: any



  ngOnInit(): void {
    console.log(this.shopList, this.locationList)
    this.shopList = this.shopListTotal
    console.log(this.shopList, this.shopListTotal)
  }

  setLocation(location: any) {
    console.log(location)
    this.location = location.LocationName
    this.shopIdList = []

    this.filterShopListByLocation(location)
  }

  filterShopListByLocation(location: any) {
    this.shopList = this.shopListTotal.filter((shop: any) => {
      return shop.ShopLocation == location.LocationName
    })
    console.log(this.shopList)
  }

  setShop(shops: any) {
    console.log(shops)
    var shopNames = this.shopFormControl.value
    this.shopIdList = []
    console.log(this.shopList)
    if (shopNames != null){
      for(let i = 0; i < shopNames!.length ; i++) {
        let shopName = shopNames[i]
        
        this.shopIdList.push(this.shopList.filter((element: any) => {
          return element.ShopName == shopName
        })[0].ShopID)
      }
    }
    console.log(this.shopIdList)
    
  }

  filterData() {
    if (this.endDate) this.endDate.setHours(23,59,59)
    if (!this.endDate) this.endDate = null
    if (!this.startDate) this.startDate = null
    if (!this.location) this.location = null
    if (!this.shopIdList) this.shopIdList = null


    this.filterDataEvent.emit({
      "startDate": this.startDate,
      "endDate": this.endDate,
      "location": this.location,
      "shopIdList": this.shopIdList
    })
  }

  downloadSummaryPDF() {
    if (this.endDate) this.endDate.setHours(23,59,59)
    if (!this.endDate) this.endDate = null
    if (!this.startDate) this.startDate = null
    if (!this.location) this.location = null
    if (!this.shopIdList) this.shopIdList = null
    this.downloadSummaryPDFEvent.emit({
      "startDate": this.startDate,
      "endDate": this.endDate,
      "location": this.location,
      "shopIdList": this.shopIdList
    })
  }

  clearFilter() {
    this.endDate = undefined;
    this.startDate = undefined;
    this.selectedLocation = undefined;
    this.selectedShops = undefined;
    this.shopIdList = undefined;
    this.location = undefined
  }
}
