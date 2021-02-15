import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Local } from 'protractor/built/driverProviders';
import { Category } from 'src/app/enums/category.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-add-coupon-dialog',
  templateUrl: './add-coupon-dialog.component.html',
  styleUrls: ['./add-coupon-dialog.component.css']
})
export class AddCouponDialogComponent implements OnInit {

  categories = Category;
  addcouponFormGroup: FormGroup;
  coupon: Coupon = new Coupon();

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<AddCouponDialogComponent>, private errService: ErrorService) { }

  ngOnInit(): void {
    this.addcouponFormGroup = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required,Validators.min(0)]],
      price: ['', [Validators.required,Validators.min(0.1)]],
    });
  }

  addCoupon(formGroup: FormGroup) {
    console.log(this.addcouponFormGroup);
    this.coupon.category = formGroup.controls.category.value;
    this.coupon.title = formGroup.controls.title.value;
    this.coupon.description = formGroup.controls.description.value;
    this.coupon.price = formGroup.controls.price.value;
    this.coupon.amount = formGroup.controls.amount.value;
    this.coupon.startDate = formGroup.controls.startDate.value;
    this.coupon.endDate = formGroup.controls.endDate.value;
    this.coupon.startDate.setDate(this.coupon.startDate.getDate() + 1);
    this.coupon.endDate.setDate(this.coupon.endDate.getDate() + 1);
    console.log(this.coupon);
    console.log(this.coupon.startDate);


    this.apiService.addCoupon(this.coupon).subscribe(
      (response) => {
        console.log(response); alert(response);
        this.dialogRef.close(true);
      },
      (error) => { this.errService.errorHandler(error) });
  }

}
