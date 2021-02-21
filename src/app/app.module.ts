import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CompaniesTableComponent } from './components/tables/companies-table/companies-table.component';
import { CustomersTableComponent } from './components/tables/customers-table/customers-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCompanyDialogComponent } from './components/admin/add-company-dialog/add-company-dialog.component';
import { MaterialModule } from './material/material.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { EditCompenyDialogComponent } from './components/admin/edit-compeny-dialog/edit-compeny-dialog.component';
import { AddCustomerDialogComponent } from './components/admin/add-customer-dialog/add-customer-dialog.component';
import { CouponsTableComponent } from './components/tables/coupons-table/coupons-table.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { HomeCouponsFilterPipe } from './pipes/home-coupons-filter.pipe';
import { AdminCompaniesFilterPipe } from './pipes/admin-companies-filter.pipe';
import { AdminCustomersFilterPipe } from './pipes/admin-customers-filter.pipe';
import { PersonalZoneComponent } from './components/personal-zone/personal-zone.component';
import { ConfirmationDialogComponent } from './components/DIALOGS/confirmation-dialog/confirmation-dialog.component';
import { CouponDetailsDialogComponent } from './components/DIALOGS/coupon-details-dialog/coupon-details-dialog.component';
import { EditCustomerDialogComponent } from './components/admin/edit-customer-dialog/edit-customer-dialog.component';
import { AddCouponDialogComponent } from './components/company/add-coupon-dialog/add-coupon-dialog.component';
import { ItemDetailsDialogComponent } from './components/DIALOGS/item-details-dialog/item-details-dialog.component';
import { EditCouponDialogComponent } from './components/company/edit-coupon-dialog/edit-coupon-dialog.component';
import { ResponseDialogComponent } from './components/DIALOGS/response-dialog/response-dialog.component';
import { ResponseComponent } from './components/response/response.component';
import { CouponsFilterPipe } from './pipes/coupons-filter.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationBarComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    AdminComponent,
    CompaniesTableComponent,
    CustomersTableComponent,
    CompanyComponent,
    CustomerComponent,
    AddCompanyDialogComponent,
    AddCustomerDialogComponent,
    EditCompenyDialogComponent,
    CouponsTableComponent,
    ThumbnailComponent,
    HomeCouponsFilterPipe,
    CouponsFilterPipe,
    AdminCompaniesFilterPipe,
    AdminCustomersFilterPipe,
    CouponDetailsDialogComponent,
    PersonalZoneComponent,
    ConfirmationDialogComponent,
    EditCustomerDialogComponent,
    AddCouponDialogComponent,
    ItemDetailsDialogComponent,
    EditCouponDialogComponent,
    ResponseDialogComponent,
    ResponseComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
