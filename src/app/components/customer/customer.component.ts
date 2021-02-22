import { Component, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Category } from 'src/app/enums/category.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  couponsTableColumn: string[];
  couponsTableData: Coupon[];
  categories = Category;
  constructor(
    private customerService: CustomerService,
    private apiService: ApiService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.couponsTableColumn = this.customerService.couponsTableColumn;
    this.apiService.getCustomerCoupons().subscribe(
      (coupons) => { this.couponsTableData = coupons; },
      (error) => { this.errorService.errorHandler(error); });
  }

  searchByCategory(element: MatSelect) {
    this.couponsTableData = null;
    const category: Category = element.value;
    setTimeout(() => {
      this.apiService.getCustomerCouponsByCategory(category).subscribe(
        (coupons) => { this.couponsTableData = coupons },
        (error) => { this.errorService.errorHandler(error); }
      );
    }, 3000);
  }
  searchByMaxPrice(element: HTMLInputElement) {
    this.couponsTableData = null;
    const maxPrice: number = Number(element.value);
    setTimeout(() => {
      this.apiService.getCustomerCouponsByMaxPrice(maxPrice).subscribe(
        (coupons) => { this.couponsTableData = coupons },
        (error) => {
          console.log(error);
          console.dir(error);
          this.errorService.errorHandler(error);}
      );
    }, 3000);
  }

}
