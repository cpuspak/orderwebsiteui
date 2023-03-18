import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap, debounceTime } from 'rxjs';
import { CommonService } from 'src/app/services/common.service/common.service';
import { DataAddService } from 'src/app/services/dataAdd.service/data-add.service';
import { DataDeleteService } from 'src/app/services/dataDelete.service/data-delete.service';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  shopId!: number
  shopName!: string
  orderList!: any
  locations!: any
  selectedLocation: string = ""
  shopNames: Array<any> = []

  advancedSearchList: any = [

  ]

  loading: boolean = false

  shopNameSearchBoxData: string = ""
  // shopNameSearchFormGroup = new FormGroup({
  //   shopNameFormControl: new FormControl()
  // })

  orderSearchShopDisabledFlag: boolean = true
  
  

  filteredShopNames: Array<any> = []
  constructor(private dataFetch: DataFetchService,
              private dataAdd: DataAddService,
              private dataDelete: DataDeleteService,
              private formBuilder: FormBuilder,
              private commonService: CommonService) {}

  ngOnInit(): void {
      this.filterShopNames('')
      this.fetchList()
      this.fetchLocations("")
      // this.initForm()
      
  }
  private fetchList() {
    this.dataFetch.fetchOrders().subscribe((res: any) => {
      console.log("orderlist", res)
      if (res && res['Orders']) {
        this.orderList = res['Orders'];
        this.orderList.sort((element1: any, element2: any) => {
          return element2['OrderID'] - element1['OrderID']
        })
        this.loading = false
        this.clearFormFields()
      }
    })
  }

  addOrder(shopId: number) {
    this.loading = true
    this.dataAdd.createOrder(shopId).subscribe((res: any) => {
      console.log("order created", res)
      this.fetchList()
      
    })
  }

  public fetchLocations(location: string) {
    this.dataFetch.fetchLocations(location).subscribe((res: any) => {
      console.log(res)
      if (res && res["Locations"])
        this.locations = res["Locations"]
    })
  }

  // public locationDropdownSelected(event: any) {
  //   this.dataFetch.fetchShopsViaLocation(this.selectedLocation).subscribe((res: any) => {
  //     console.log(res)
  //   })
  // }

  // initForm() {
  //   this.shopNameSearchFormGroup = this.formBuilder.group({
  //     'shopNameFormControl': ['']
  //   })
  //   this.shopNameSearchFormGroup.get('shopNameFormControl')!.valueChanges
  //   .pipe(tap(res => {
  //     this.filteredShopNames = []
  //   }))
  //   .pipe(debounceTime(900))
  //   .subscribe((res: any) => {
  //     if(res && res.length > 0){
  //       console.log(res)
  //       this.filterShopNames(res);
  //       // this.participantEvent.emit(res)
  //     }
  //     else this.filteredShopNames = []
  //   })
  // }

  private filterShopNames(shopName: any) {
    console.log("filtered shop name")
    if (this.selectedLocation.length == 0){
      this.dataFetch.fetchShops(shopName).subscribe((res: any) => {
        if (res && res["Shops"]){
          this.filteredShopNames = res["Shops"]
          this.formatShopListForAdvancedSearch()
        }
          
      })
    } else {
      this.dataFetch.fetchShopsViaLocation(this.selectedLocation).subscribe((res: any) => {
        console.log(res, this.shopNameSearchBoxData)
        if (res && res["Shops"]){
          this.filteredShopNames = res["Shops"]
          this.formatShopListForAdvancedSearch()
        }
          
      })
    }
      
  }

  public resetShopName() {
    this.shopNameSearchBoxData = ""
    this.filterShopNames('')
    this.orderSearchShopDisabledFlag = true

  }

  public getShopId(event: any, ShopID: any) {
    // this.shopId = event.target.id
    // console.log(ShopID)
    if (ShopID) {
      this.shopId = ShopID
    }
  }

  public clearFormFields() {
    this.shopNameSearchBoxData = ""
    this.selectedLocation = ""
  }

  deleteOrder(orderID: any) {
    this.loading = true
    this.dataDelete.deleteOrderByOrderID(orderID).subscribe((res: any) => {
      if (res) {
        this.fetchList()
      } else {
        this.loading = false
      }
    }, error => {
      this.loading = false
    })
  }

  getOrderDisableEvent(event: any) {
    this.orderSearchShopDisabledFlag = event
  }

  // getSkuValue(event: any) {
  //   this.skuNameSearchBoxData = event
  //   this.SkuID = event.ID
  //   console.log(this.skuNameSearchBoxData, event)
  // }

  getShopValueAndId(event: any) {
    this.shopNameSearchBoxData = event.Name
    this.shopId = event.ID
    console.log(event)
  }

  formatShopListForAdvancedSearch() {
    this.filteredShopNames = this.commonService.formatForAdvancedSearch(this.filteredShopNames, "ShopID", "ShopName")
  }
  

}
