import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Category } from 'src/app/enums/category.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { AddCouponDialogComponent } from './add-coupon-dialog/add-coupon-dialog.component';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  couponsTabelColumn: string[];
  couponsTableData: Coupon[];
  categories = Category;
  constructor(private apiService: ApiService, private companyService: CompanyService, private dialog: MatDialog, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.refresh();
  }
  // showFiller = false;

  openAddCouponDialog() {
    this.dialog.open(AddCouponDialogComponent, { backdropClass: 'dark' }).beforeClosed().subscribe(
      (response) => { if (response) { this.refresh(); } });
  }
  refresh() {
    this.couponsTabelColumn = this.companyService.couponsTableColumn;
    this.couponsTableData = null;
    this.apiService.getCompanyCoupons().subscribe(
      (coupons) => { this.couponsTableData = coupons; },
      (error) => { this.errorService.errorHandler(error); });
  }

  deleteCoupon(couponId: number) {
    this.apiService.deleteCoupon(couponId).subscribe(
      (success) => { this.refresh(); },
      (error) => { this.errorService.errorHandler(error); });
  }

  searchByMaxPrice(element: HTMLInputElement) {
    this.couponsTableData = null;
    const maxPrice: number = Number(element.value);
    setTimeout(() => {
      this.apiService.getCompanyCouponsByMaxPrice(maxPrice).subscribe(
        (coupons) => { this.couponsTableData = coupons },
        (error) => { this.errorService.errorHandler(error); });
    }, 3000);
  }
  searchByCategory(element: MatSelect) {
    this.couponsTableData = null;
    const category: Category = element.value;
    setTimeout(() => {
      this.apiService.getCompanyCouponsByCategory(category).subscribe(
        (coupons) => { this.couponsTableData = coupons },
        (error) => { this.errorService.errorHandler(error); });
    }, 3000);
  }
}
