import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientType } from 'src/app/enums/clientType.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ApplicationService } from 'src/app/services/application.service';
import { ErrorService } from 'src/app/services/error.service';
import { CouponDetailsDialogComponent } from '../DIALOGS/coupon-details-dialog/coupon-details-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  coupons: Coupon[] = [];
  searchValue: string;
  isActive: boolean;
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private appService: ApplicationService,
    private errService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getCoupons();
    this.appService.isActive.subscribe((result) => {
      if (result) {
        this.isActive = result;
        return;
      }
      this.isActive = false;
    });
  }
  getCoupons() {
    this.apiService.getAllCoupons().subscribe(
      (coupons) => { this.coupons = coupons; },
      (error) => { this.errService.errorHandler(error) });
  }
  openCouponDetailsDialog(coupon: Coupon) {
    this.appService.refresh();
    if (this.appService.getUserType() == ClientType.CUSTOMER && this.isActive) {
      this.dialog.open(CouponDetailsDialogComponent, { data: { coupon: coupon, message: 'BUY NOW' }, panelClass: 'ppp', backdropClass: 'dark' });
    }
    else {
      this.dialog.open(CouponDetailsDialogComponent, { data: { coupon: coupon, message: 'Please login as CUSTOMER to purchase this coupon' }, panelClass: 'ppp', backdropClass: 'dark' });
    }
  }

  moveToCoupons(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
