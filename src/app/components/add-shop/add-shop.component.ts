import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { CommonService } from 'src/app/services/common.service/common.service';
import { DataAddService } from 'src/app/services/dataAdd.service/data-add.service';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent {
  shopList!: any
  // displayedColumns: Array<string> = ['no', 'name', 'address', 'location','phone']
  loading: boolean = false
  addShopName: string = ""
  addPhone: string = ""
  addAddress: string = ""
  addLocation: string = ""
  beatSearchShopDisabledFlag: boolean = true

  advanceSearchArray: any = [
    {
      "ID":1,
      "Name": "Name1"
    },
    {
      "ID":2,
      "Name": "Name2"
    },
    {
      "ID":3,
      "Name": "Name3"
    }
  ]

  locationSearchBoxData: string = ""
  filteredLocations: Array<any> = []
  locationSearchFormGroup = new FormGroup({
    // locationFormControl: new FormControl(''),
    addressFormControl: new FormControl(''),
    shopNameFormControl: new FormControl(''),
    phoneFormControl: new FormControl('')
  });
  constructor(private dataFetch: DataFetchService,
              private dataAdd: DataAddService,
              private formBuilder: FormBuilder,
              private commonService: CommonService){}
  ngOnInit(): void {
      this.filterLocationName('')
      this.fetchShopList('')
      this.initForm()
      
  }

  private fetchShopList(shopName: string) {
    this.dataFetch.fetchShops(shopName).subscribe((res: any) => {
      if (res && res['Shops']) {
        this.shopList = res['Shops'];
        console.log(res)
        this.loading = false
        this.clearFormFields()
      }
    })
  }

  addShop(shopName: string, phone: string, address: string, location: string) {
    this.loading = true
    this.dataAdd.addShop(shopName, phone, address, location).subscribe((res: any) => {
      this.fetchShopList('')
    })
  }

  initForm() {
    this.locationSearchFormGroup = this.formBuilder.group({
      // 'locationFormControl': [''],
      'addressFormControl': [''],
      'shopNameFormControl': [''],
      'phoneFormControl': ['']
    })
  }

  filterLocationName(location: string) {
    console.log(location)
    this.filteredLocations = []
    this.dataFetch.fetchLocations(location).subscribe((res: any) => {
      console.log(res)
      if (res && res["Locations"]) {
        this.filteredLocations = res["Locations"]
        this.formatLocationNameListForAdvancedSearch()
      }
        
    })

  }

  clearFormFields() {
    this.addAddress = ""
    this.addShopName = ""
    this.locationSearchBoxData = ""
    this.addPhone = ""
    this.commonService.clearSingleAdvancedSearchSubject.next("")
    this.filterLocationName('')
  }

  getAdvanceDisableEvent(event: any) {
    console.log("event ",event)
  }
  getMultiSelectedItems(event: any) {
    console.log("multi select event", event)
  }

  getShopDisableEvent(event: any) {
    this.beatSearchShopDisabledFlag = event
  }

  getBeatValue(event: any) {
    this.locationSearchBoxData = event
    console.log(this.locationSearchBoxData, event)
  }

  formatLocationNameListForAdvancedSearch() {
    this.filteredLocations = this.commonService.formatForAdvancedSearch(this.filteredLocations, null, "LocationName")
  }

}
