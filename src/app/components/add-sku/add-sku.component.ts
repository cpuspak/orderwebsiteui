import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { DataAddService } from 'src/app/services/dataAdd.service/data-add.service';
import { DataFetchService } from 'src/app/services/dataFetch.service/data-fetch.service';


@Component({
  selector: 'app-add-sku',
  templateUrl: './add-sku.component.html',
  styleUrls: ['./add-sku.component.css']
})
export class AddSkuComponent implements OnInit {
  skuList!: any
  
  addSkuName: string = ""
  addCompanyName: string = ""
  companySearchBoxData: string = ""
  filteredCompanies: Array<any> = []
  // companySearchFormGroup!: FormGroup
  companySearchFormGroup = new FormGroup({
    companyNameFormControl: new FormControl(''),
    skuNameFormControl: new FormControl('')
  });

  constructor(private dataFetch: DataFetchService,
              private dataAdd: DataAddService,
              private formBuilder: FormBuilder){}
  ngOnInit(): void {
      this.fetchSkuList('')
      this.initForm()
  }

  private fetchSkuList(skuName: string) {
    this.dataFetch.fetchSkus(skuName).subscribe((res: any) => {
      if (res && res['Skus']) {
        this.skuList = res['Skus'];
        console.log(res)
      }
    })
  }

  addSku(skuName: string, companyName: string) {
    this.dataAdd.addSku(skuName, companyName).subscribe((res: any) => {
      this.fetchSkuList('')
    })
  }

  initForm() {
    this.companySearchFormGroup = this.formBuilder.group({
      'companyNameFormControl': [''],
      'skuNameFormControl': ['']
    })
    this.companySearchFormGroup.get('companyNameFormControl')!.valueChanges
    .pipe(tap(res => {
      this.filteredCompanies = []
    }))
    .pipe(debounceTime(900))
    .subscribe((res: any) => {
      if(res && res.length > 0){
        console.log(res)
        this.filterCompanyName(res);
        // this.participantEvent.emit(res)
      }
      else this.filteredCompanies = []
    })
  }

  filterCompanyName(companyName: string) {
    console.log(companyName)
    this.filteredCompanies = []
    this.dataFetch.fetchCompanies(companyName).subscribe((res: any) => {
      console.log(res)
      if (res && res["Companies"])
        this.filteredCompanies = res["Companies"]
    })

  }


}
