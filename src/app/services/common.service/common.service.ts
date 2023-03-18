import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // public refreshItemsForOrder = new Subject()
  public clearAdminFiltersSubject = new Subject()
  public clearSingleAdvancedSearchSubject = new Subject()
  constructor() { }

  formatForAdvancedSearch(list: any, idKey: any, nameKey: any): any[] {
    var formattedList: any[] = []

    if (idKey == null && nameKey == null) {
      list.forEach((element: any, index: any) => {
        formattedList.push({"ID": index+1, "Name": element})
      })
    }
    else if (idKey == null) {
      list.forEach((element: any, index: any) => {
        formattedList.push({"ID": index+1, "Name": element[nameKey]})
      })
    }
    else {
      list.forEach((element: any) => {
        formattedList.push({"ID": element[idKey], "Name": element[nameKey]})
      });
    }
    

    return formattedList
  }

  

  

}
