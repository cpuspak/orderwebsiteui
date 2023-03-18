import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from 'src/app/services/common.service/common.service';


@Component({
  selector: 'app-advanced-multi-search-component',
  templateUrl: './advanced-multi-search-component.component.html',
  styleUrls: ['./advanced-multi-search-component.component.css']
})
export class AdvancedMultiSearchComponentComponent implements OnInit, AfterViewInit, OnDestroy {
  dropdownSettings!: IDropdownSettings;
  @Input() dropdownList!: any
  @Output() selectedItemsEvent = new EventEmitter()
  @Input() label!: any
  selectedItems: any;

  clearFilterSubscription: any
  constructor(private commonService: CommonService){}
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngAfterViewInit(): void {
    this.clearFilterSubscription = this.commonService.clearAdminFiltersSubject.subscribe((res: any) => {
      this.selectedItems = []
    })
  }

  ngOnDestroy(): void {
    if (this.clearFilterSubscription)
      this.clearFilterSubscription.unsubscribe()
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems)
    this.selectedItemsEvent.emit(this.selectedItems)
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItemsEvent.emit(this.selectedItems)
  }
  onItemDeselectt(item: any) {
    this.selectedItemsEvent.emit(this.selectedItems)
  }
  onDeselectAll(itemss: any) {
    this.selectedItemsEvent.emit(this.selectedItems)
  }
}
