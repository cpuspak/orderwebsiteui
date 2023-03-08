import { Component, OnInit } from '@angular/core';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  skuList!: any;

  shopList!: any;

  locationList!: any;

  adminDashboardData!: any;
  constructor(private dataFetch: DataFetchService){}
  ngOnInit(): void {
    this.fetchSkuList('')
    this.fetchShopList('')
    this.fetchLocations('')
  }

  private fetchSkuList(skuName: string) {
    this.dataFetch.fetchSkus(skuName).subscribe((res: any) => {
      if (res && res['Skus']) {
        this.skuList = res['Skus'];
        console.log(res)
      }
    })
  }

  private fetchShopList(shopName: string) {
    this.dataFetch.fetchShops(shopName).subscribe((res: any) => {
      if (res && res['Shops']) {
        this.shopList = res['Shops'];
        console.log(res)
      }
    })
  }

  private fetchLocations(locationName: string) {
    this.dataFetch.fetchLocations(locationName).subscribe((res: any) => {
      if (res && res["Locations"]) {
        this.locationList = res["Locations"]
      }
    })
  }

  public filterData(event: any) {
    console.log(event)
    
    this.dataFetch.fetchAdminDashboardData(event.shopIdList, event.startDate, event.endDate).subscribe((res: any) => {
      console.log(res)
      if (res && res["Result"]) {
        this.adminDashboardData = res["Result"]
        this.adminDashboardData = this.adminDashboardData.filter((element: any) => {
          if (element.items.length) return element
        })
      }
    })
  }

  public downloadSummaryPDF(event: any) {


    this.dataFetch.fetchAdminDashboardPdfData().then(res => res.blob())
    .then((pdfBlob: any) => {
      var downloadLink = document.createElement('a')
      downloadLink.target = '_blank'
      downloadLink.download = 'summary.pdf'
      var URL = window.URL || window.webkitURL
      var downloadUrl = URL.createObjectURL(pdfBlob)
      downloadLink.href = downloadUrl
      document.body.append(downloadLink) // THIS LINE ISN'T NECESSARY
      downloadLink.click()
      document.body.removeChild(downloadLink);  // THIS LINE ISN'T NECESSARY
      URL.revokeObjectURL(downloadUrl)
    })

  }
}
