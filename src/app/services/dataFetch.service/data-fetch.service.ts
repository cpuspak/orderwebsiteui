import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  constructor(private http: HttpClient) { }

  public fetchSkus(skuName: string) {
    if (skuName.length == 0)
      return this.http.get(backendUrl+"/fetch_skus")
    else return this.http.get(backendUrl+"/fetch_skus/"+skuName)
  }

  public fetchShops(shopName: string) {
    if (shopName.length == 0)
      return this.http.get(backendUrl+"/fetch_shops")
    else return this.http.get(backendUrl+"/fetch_shops/"+shopName)
  }

  public fetchOrders() {
    return this.http.get(backendUrl+"/fetch_orders")
  }

  public fetchShopViaId(shopId: number) {
    return this.http.get(backendUrl+"/fetch_shops_via_id/"+shopId)
  }

  public fetchItemss(orderId: number) {
    return this.http.get(backendUrl+"fetch_items/"+orderId)
  }

  public fetchCompanies(companyName: string) {
    return this.http.get(backendUrl+"fetch_sku_companies/"+companyName)
  }

  public fetchLocations(location: string) {
    if (location.length > 0)
      return this.http.get(backendUrl+"fetch_shop_locations/"+location)
    else return this.http.get(backendUrl+"fetch_shop_locations")
  }

  public fetchShopsViaLocation(shopName: string,location: string) {
    return this.http.get(backendUrl+"fetch_shops_via_location/"+location+"/"+shopName)
    
  }


}
