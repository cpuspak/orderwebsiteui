import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service/common.service';
import { DataAddService } from 'src/app/services/dataAdd.service/data-add.service';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  SkuName: string = ""
  SkuID!: number;
  Quantity!: number;
  skuNameSearchBoxData: string = ""
  orderId!: number;

  itemSearchShopDisabledFlag: boolean = true

  filteredSkuNames: Array<any> = []

  skuNameSearchFormGroup = new FormGroup({
    // skuNameFormControl: new FormControl(''),
    quantityFormControl: new FormControl('')
  })


  // @Output() newItemAddedEvent = new EventEmitter<number>();

  constructor(private dataAdd: DataAddService,
              private common: CommonService,
              public dialogRef: MatDialogRef<AddItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private dataFetch: DataFetchService,
              private commonService: CommonService){}

  // public createItem(orderId: number, SkuID: number, Quantity: number) {
  //   this.dataAdd.addItem(orderId, SkuID, Quantity).subscribe((res: any) => {
  //     if (res) {
  //       this.newItemAddedEvent.emit(orderId)
  //     }
  //   })
  // }

  ngOnInit(): void {
    this.filterSkuNames('')
    this.initForm()
    this.orderId = this.data.orderId
    
  }

  public createItem(orderId: number, SkuID: number, Quantity: number): void {
    this.dataAdd.addItem(orderId, SkuID, Quantity).subscribe((res: any) => {
      if (res) {
        this.data.orderId = orderId
        this.dialogRef.close({isCreated: true})
      }
    })
  }

  closeDialog() {
    this.data.isCreated = false
    this.dialogRef.close({isCreated: false})
  }

  getSkuId(event: any, skuId: number) {
    // this.SkuID = event.target.id
    // console.log(this.SkuID, event)
    if (skuId){
      this.SkuID = skuId
    }
  }

  initForm() {
    this.skuNameSearchFormGroup = this.formBuilder.group({
      // 'skuNameFormControl': [''],
      'quantityFormControl': ['']
    })
    // this.skuNameSearchFormGroup.get('skuNameFormControl')!.valueChanges
    // .pipe(tap(res => {
    //   this.filteredSkuNames = []
    // }))
    // .pipe(debounceTime(900))
    // .subscribe((res: any) => {
    //   if(res && res.length > 0){
    //     this.filterSkuNames(res);
    //     // this.participantEvent.emit(res)
    //   }
    //   else this.filteredSkuNames = []
    // })
  }

  filterSkuNames(skuName: any) {
    this.dataFetch.fetchSkus(skuName).subscribe((res: any) => {
      console.log(res)
      if (res && res["Skus"]){
        this.filteredSkuNames = res["Skus"]
        this.formatSkuListForAdvancedSearch()
      }
    })
  }

  getItemDisableEvent(event: any) {
    this.itemSearchShopDisabledFlag = event
  }

  // getSkuValue(event: any) {
  //   this.skuNameSearchBoxData = event
  //   this.SkuID = event.ID
  //   console.log(this.skuNameSearchBoxData, event)
  // }

  getSkuValueAndId(event: any) {
    this.skuNameSearchBoxData = event.Name
    this.SkuID = event.ID
    console.log(event)
  }

  formatSkuListForAdvancedSearch() {
    this.filteredSkuNames = this.commonService.formatForAdvancedSearch(this.filteredSkuNames, "SKUID", "SKUName")
  }
}
