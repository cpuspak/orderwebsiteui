import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'src/app/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class DataDeleteService {

  constructor(private http: HttpClient) { }

  public deleteOrderByOrderID(orderID: any) {
    // return this.http.delete(backendUrl+"/deleteOrder", {
    //   "OrderID": orderID
    // })
    return this.http.request('delete', backendUrl+"/delete_order", { body: {
      "OrderID": orderID
    } })
  }
}
