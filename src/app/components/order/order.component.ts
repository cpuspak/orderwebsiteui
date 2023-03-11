import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() orderId!: number
  @Input() shopId!: number
  @Input() createTime!: string

  shopName!: string
  items!: any
  loading: boolean = false

  panelOpenState: boolean = false

  constructor(private dataFetch: DataFetchService,
              private dialog: MatDialog){}
  ngOnInit(): void {
    this.fetchShopNameFromId()
    this.refreshItemsList(this.orderId)
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        orderId: this.orderId
      },
      // height: '40vh',
      // width: '40vw'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isCreated)
        this.refreshItemsList(this.orderId)
      
    });
  }

  fetchShopNameFromId() {
    this.dataFetch.fetchShopViaId(this.shopId).subscribe((res: any) => {
      console.log(res)
      if (res && res["Shop"] && res["Shop"]["ShopName"])
        this.shopName = res["Shop"]["ShopName"]
    })
  }

  fetchItemFromOrderId() {
    this.dataFetch.fetchItemss(this.orderId).subscribe((res: any) => {
      console.log("fetchshopname from orderid", res)
      if (res && res["Items"]){
        this.items = res["Items"]
        this.loading = false
      }
    })
  }

  refreshItemsList(orderId: number) {
    this.loading = true
    this.fetchItemFromOrderId()
  }

}
