import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './services/authInterceptor.service/auth-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { AddSkuComponent } from './components/add-sku/add-sku.component';
import { AddShopComponent } from './components/add-shop/add-shop.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { MatTableModule } from '@angular/material/table';
import { OrderComponent } from './components/order/order.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ItemComponent } from './components/item/item.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ShopTableComponent } from './components/shop-table/shop-table.component';
import { SkuTableComponent } from './components/sku-table/sku-table.component';
import { AdminDashboardFiltersComponent } from './components/admin-dashboard-filters/admin-dashboard-filters.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminDashboardTablesComponent } from './components/admin-dashboard-tables/admin-dashboard-tables.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { AdvancedSearchComponentComponent } from './components/advanced-search-component/advanced-search-component.component';
import { AdvancedMultiSearchComponentComponent } from './components/advanced-multi-search-component/advanced-multi-search-component.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LoginAndRegisterComponent,
    NavbarComponent,
    AddSkuComponent,
    AddShopComponent,
    AddOrderComponent,
    OrderComponent,
    ItemComponent,
    AddItemComponent,
    AdminDashboardComponent,
    ShopTableComponent,
    SkuTableComponent,
    AdminDashboardFiltersComponent,
    AdminDashboardTablesComponent,
    LoadingComponent,
    ItemTableComponent,
    AdvancedSearchComponentComponent,
    AdvancedMultiSearchComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
