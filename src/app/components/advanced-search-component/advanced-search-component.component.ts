import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap, debounceTime } from 'rxjs';
import { CommonService } from 'src/app/services/common.service/common.service';

@Component({
  selector: 'app-advanced-search-component',
  templateUrl: './advanced-search-component.component.html',
  styleUrls: ['./advanced-search-component.component.css']
})
export class AdvancedSearchComponentComponent implements OnInit, OnDestroy {
  @Input() searchableList: any = [];
  @Input() label: any;
  @Input() multiple: any;

  @Output() disabledEventEmitter = new EventEmitter()
  @Output() advancedSearchValueEmitter = new EventEmitter()
  @Output() advancedSearchValueAndIdEmitter = new EventEmitter()
  
  
  advancedSearchBoxData: any = ""
  advancedSearchFormGroup = new FormGroup({
    advancedSearchFormControl: new FormControl('')
  })

  clearValueSubscription: any;

  filteredSearchItems: any = []
  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService,
              private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.filteredSearchItems = this.searchableList
    console.log(this.searchableList)
    this.initForm()

    this.clearValueSubscription = this.commonService.clearSingleAdvancedSearchSubject.subscribe((res: any) => {
      this.advancedSearchBoxData = ""
      this.cdRef.detectChanges()
    })
  }

  ngOnChanges() {
    this.filteredSearchItems = this.searchableList
    console.log(this.searchableList)
    this.initForm()
    if (this.clearValueSubscription)
      this.clearValueSubscription.unsubscribe()
      
    this.clearValueSubscription = this.commonService.clearSingleAdvancedSearchSubject.subscribe((res: any) => {
      this.advancedSearchBoxData = ""
      this.cdRef.detectChanges()
    })
  }

  ngOnDestroy(): void{
    if (!this.clearValueSubscription)
      this.clearValueSubscription.unsubscribe()
  }
  


  initForm() {
    this.advancedSearchFormGroup = this.formBuilder.group({
      'advancedSearchFormControl': ['']
    })
    this.advancedSearchFormGroup.get('advancedSearchFormControl')!.valueChanges
    .subscribe((res: any) => {
      this.filteredSearchItems = this.getFilteredSearchItems(res.toLowerCase())
      this.triggerDisabled(res.toLowerCase(), this.filteredSearchItems)
      this.emitSearchedData(res)
      this.emitSearchDataAndId(res)
    })
  }

  clickAction(item: any) {
    console.log("sample click action")
  }

  getFilteredSearchItems(res: any): any {
    if (res == "") return this.searchableList
    return this.searchableList.filter((element: any) => {
      return element.Name.toLowerCase().includes(res)
    })
  }

  triggerDisabled(searchValue: any, filteredSearchItems: any) {
    console.log("entered")
    let returnFlag = 0
    filteredSearchItems.map((element: any) => {
      if (element.Name.toLowerCase() == searchValue) {
        this.disabledEventEmitter.emit(false)
        returnFlag = 1
      }
    })
    if (returnFlag == 0)
      this.disabledEventEmitter.emit(true)
  }

  emitSearchedData(data: any) {
    this.advancedSearchValueEmitter.emit(data)
  }

  emitSearchDataAndId(data: any) {
    let returnFlag = 0
    this.filteredSearchItems.forEach((element: any) => {
      if (element.Name == data) {
        this.advancedSearchValueAndIdEmitter.emit({
          "ID": element.ID,
          "Name": element.Name
        })
        returnFlag = 1
        return
      }
    })
    if (returnFlag == 0)
      this.advancedSearchValueAndIdEmitter.emit({
        "ID": null,
        "Name": data
      })
  }
}
