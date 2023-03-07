import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
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
  displayedColumns: Array<string> = ['name','location']
  addShopName: string = ""
  addPhone: string = ""
  addAddress: string = ""
  addLocation: string = ""

  locationSearchBoxData: string = ""
  filteredLocations: Array<any> = []
  locationSearchFormGroup = new FormGroup({
    locationFormControl: new FormControl(''),
    addressFormControl: new FormControl(''),
    shopNameFormControl: new FormControl(''),
    phoneFormControl: new FormControl('')
  });
  constructor(private dataFetch: DataFetchService,
              private dataAdd: DataAddService,
              private formBuilder: FormBuilder){}
  ngOnInit(): void {
      this.fetchShopList('')
      this.initForm()
  }

  private fetchShopList(shopName: string) {
    this.dataFetch.fetchShops(shopName).subscribe((res: any) => {
      if (res && res['Shops']) {
        this.shopList = res['Shops'];
        console.log(res)
      }
    })
  }

  addShop(shopName: string, phone: string, address: string, location: string) {
    this.dataAdd.addShop(shopName, phone, address, location).subscribe((res: any) => {
      this.fetchShopList('')
    })
  }

  initForm() {
    this.locationSearchFormGroup = this.formBuilder.group({
      'locationFormControl': [''],
      'addressFormControl': [''],
      'shopNameFormControl': [''],
      'phoneFormControl': ['']
    })
    this.locationSearchFormGroup.get('locationFormControl')!.valueChanges
    .pipe(tap(res => {
      this.filteredLocations = []
    }))
    .pipe(debounceTime(900))
    .subscribe((res: any) => {
      if(res && res.length > 0){
        console.log(res)
        this.filterLocationName(res);
        // this.participantEvent.emit(res)
      }
      else this.filteredLocations = []
    })
  }

  filterLocationName(location: string) {
    console.log(location)
    this.filteredLocations = []
    this.dataFetch.fetchLocations(location).subscribe((res: any) => {
      console.log(res)
      if (res && res["Locations"])
        this.filteredLocations = res["Locations"]
    })

  }
}
