import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/enums/clientType.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ApplicationService } from 'src/app/services/application.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-coupon-details-dialog',
  templateUrl: './coupon-details-dialog.component.html',
  styleUrls: ['./coupon-details-dialog.component.css']
})
export class CouponDetailsDialogComponent implements OnInit {

  coupon: Coupon = new Coupon();
  message: string = null;
  isActive: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { coupon: Coupon, message: string },
    private apiSevice: ApiService,
    private appService: ApplicationService,
    private route: Router,
    private errService: ErrorService
  ) {
    this.coupon = this.data.coupon;
    this.message = this.data.message;
  }

  ngOnInit(): void {
    this.appService.isActive.subscribe(
      (result) => {
        if (result) {
          this.isActive = result;
          return;
        }
        this.isActive = false;
      }
    );
  }

  buy(coupon: Coupon) {
    if (this.appService.getUserType() == ClientType.CUSTOMER) {
      if (this.isActive) {
        this.apiSevice.purchaseCoupon(coupon).subscribe(
          (success) => { alert(success) },
          (error) => { this.errService.errorHandler(error); });
      }
      else {
        this.route.navigate(['/login']);
      }
    }
    else {
      this.route.navigate(['/login']);
    }
  }

}
