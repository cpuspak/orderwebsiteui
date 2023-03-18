import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/backendUrl';
import { LoginAuthService } from '../loginAuth.service/login-auth.service';
import { LoginService } from '../login.service/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  constructor(private http: HttpClient,
              private loginService: LoginService) { }

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
    if (companyName.length > 0)
      return this.http.get(backendUrl+"fetch_sku_companies/"+companyName)
    return this.http.get(backendUrl+"fetch_sku_companies")
  }

  public fetchLocations(location: string) {
    if (location.length > 0)
      return this.http.get(backendUrl+"fetch_shop_locations/"+location)
    else return this.http.get(backendUrl+"fetch_shop_locations")
  }

  public fetchShopsViaLocation(location: string) {
    return this.http.get(backendUrl+"fetch_shops_via_location/"+location)
    
  }

  public fetchAdminDashboardData(shopIdList: any, startDate: Date, endDate: Date) {
    console.log(shopIdList)
    return this.http.post(backendUrl+"/admin_dashboard",{
      "shops": shopIdList,
      "start": startDate,
      "end": endDate
    })
  }

  public fetchAdminDashboardPdfData(shopIdList: any, startDate: Date, endDate: Date) {
    const apiToken = this.loginService.getToken()+""
    var payload = {
      "shops": shopIdList,
      "start": startDate,
      "end": endDate
    }
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    return fetch(backendUrl+"/pdf",{
      method: 'POST',
      headers: {
        'x-access-token': apiToken
      },
      body: data
    })
    
  }

  // public fetch 

  

}
