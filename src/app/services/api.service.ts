import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../enums/category.enum';
import { Company } from '../models/company.model';
import { Coupon } from '../models/coupon.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // ***************************************  ADMINISTRATOR API  ***************************************

  public addCompany(company: Company) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.post("http://localhost:8080/api/admin/add-company", company, { headers: httpHeaders, responseType: 'text' });
  }

  public updateCompany(company: Company) {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.put("http://localhost:8080/api/admin/update-company", company, { headers: httpHeaders, responseType: 'text' });
  }

  public getAllCompanies(): Observable<Company[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.get<Company[]>("http://localhost:8080/api/admin/get-all-companies", { headers: httpHeaders });
  }

  public getOneCompany(companyId: number): Observable<Company> {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.get<Company>("http://localhost:8080/api/admin/get-one-company/" + companyId, { headers: httpHeaders });
  }

  public deleteCompany(companyId: number) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.delete("http://localhost:8080/api/admin/delete-company/" + companyId, { headers: httpHeaders, responseType: 'text' });
  }

  public addCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.post("http://localhost:8080/api/admin/add-customer", customer, { headers: httpHeaders, responseType: 'text' });
  }

  public deleteCustomer(customerId: number) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.delete("http://localhost:8080/api/admin/delete-one-customer/" + customerId, { headers: httpHeaders, responseType: 'text' });
  }

  // public deleteCustomer(customerId:any) {
  //   let httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
  //   let queParam1 :HttpParams= new HttpParams({fromObject:{
  //     customerId:customerId
  //   }})
  //   return this.httpClient.delete("http://localhost:8080/api/admin/delete-one-customer", {params:queParam1, headers: httpHeaders, responseType: 'text' });
  // }

  public getAllCustomers(): Observable<Customer[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.get<Customer[]>("http://localhost:8080/api/admin/get-all-customers", { headers: httpHeaders });
  }

  public getOneCustomer(customerId: number): Observable<Customer> {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.get<Customer>("http://localhost:8080/api/admin/get-one-customer/" + customerId, { headers: httpHeaders });
  }

  public updateCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ token: localStorage.getItem('token') });
    return this.httpClient.put("http://localhost:8080/api/admin/update-customer", customer, { headers: httpHeaders, responseType: 'text' });
  }

  // ***************************************  COMPANY API  ***************************************

  public addCoupon(coupon: Coupon) {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.post("http://localhost:8080/api/company/add-coupon", coupon, { headers: httpHeaders, responseType: 'text' });
  }
  public deleteCoupon(couponId: number) {
    const httpHeaders = new HttpHeaders({ ['token']: localStorage.getItem('token') });
    return this.httpClient.delete('http://localhost:8080/api/company/delete-coupon/' + couponId, { headers: httpHeaders, responseType: 'text' });
  }
  public getCompanyCoupons(): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ ['token']: localStorage.getItem('token') });
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/get-company-coupons', { headers: httpHeaders });
  }

  public updateCoupon(coupon: Coupon) {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.put('http://localhost:8080/api/company/update-coupon', coupon, { headers: httpHeaders, responseType: 'text' });
  }

  public getCompanyCouponsByCategory(category: Category): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/get-company-coupons-by-category/' + category, { headers: httpHeaders });
  }
  public getCompanyCouponsByMaxPrice(maxPrice: number): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/company/get-company-coupons-by-max-price/' + maxPrice, { headers: httpHeaders });
  }

  // ***************************************  CUSTOMER API  ***************************************

  public purchaseCoupon(coupon: Coupon) {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.post("http://localhost:8080/api/customer/purchase-coupon", coupon, { headers: httpHeaders, responseType: 'text' });
  }
  public getCustomerCoupons(): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.get<Coupon[]>("http://localhost:8080/api/customer/get-customer-coupons", { headers: httpHeaders });
  }

  public getCustomerCouponsByCategory(category: Category): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/get-customer-coupons-by-category/' + category, { headers: httpHeaders });
  }
  public getCustomerCouponsByMaxPrice(maxPrice: number): Observable<Coupon[]> {
    const httpHeaders = new HttpHeaders({ token: localStorage.getItem("token") });
    return this.httpClient.get<Coupon[]>('http://localhost:8080/api/customer/get-customer-coupons-by-max-price/' + maxPrice, { headers: httpHeaders });
  }

  // ***************************************  HOME PAGE API  ***************************************
  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>("http://localhost:8080/home/get-all-coupons");
  }

  // *************************************** Log-out API  ***************************************
  logOut(token: string) {
    return this.httpClient.post("http://localhost:8080/login/log-out/" + token, null, { responseType: 'text' });
  }
  
}