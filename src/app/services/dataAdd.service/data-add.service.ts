import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class DataAddService {

  constructor(private http: HttpClient) { }

  public addSku(skuName: string, companyName: string) {
    return this.http.post(backendUrl+"/add_sku", {"ProductName": skuName, "CompanyName": companyName})
  }

  public addShop(shopName: string, phone: string, address: string, location: string) {
    return this.http.post(backendUrl+"/add_shop", {"ShopName": shopName, "Phone": phone, "Address": address, "Location": location})
  }

  public createOrder(shopId: number) {
    return this.http.post(backendUrl+"/create_order", {"ShopID": shopId})
  }

  public addItem(orderId: number, skuId: number, quantity: number) {
    return this.http.post(backendUrl+"/add_items", {"OrderID": orderId, "SKUID": skuId, "Quantity": quantity})
  }
}
