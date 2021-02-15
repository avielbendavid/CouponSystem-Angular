import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/enums/category.enum';
import { Coupon } from 'src/app/models/coupon.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../../DIALOGS/response-dialog/response-dialog.component';

@Component({
  selector: 'app-edit-coupon-dialog',
  templateUrl: './edit-coupon-dialog.component.html',
  styleUrls: ['./edit-coupon-dialog.component.css']
})
export class EditCouponDialogComponent implements OnInit {

  currCoupon: Coupon = new Coupon();
  categories = Category;
  editCouponFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private coupon: Coupon,
    private apiService: ApiService,
    private errService: ErrorService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCouponDialogComponent>
  ) { }

  ngOnInit(): void {
    this.currCoupon.id = this.coupon.id;
    this.currCoupon.category = this.coupon.category;
    this.currCoupon.title = this.coupon.title;
    this.currCoupon.description = this.coupon.description;
    this.currCoupon.startDate = this.coupon.startDate;
    this.currCoupon.endDate = this.coupon.endDate;
    this.currCoupon.amount = this.coupon.amount;
    this.currCoupon.price = this.coupon.price;
    this.initEditCouponFormGroup();
  }

  initEditCouponFormGroup() {
    this.editCouponFormGroup = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required,Validators.min(0)]],
      price: ['', [Validators.required,Validators.min(0.1)]],
    });
    this.editCouponFormGroup.controls.category.setValue(this.currCoupon.category);
    this.editCouponFormGroup.controls.title.setValue(this.currCoupon.title);
    this.editCouponFormGroup.controls.description.setValue(this.currCoupon.description);
    this.editCouponFormGroup.controls.startDate.setValue(this.currCoupon.startDate);
    this.editCouponFormGroup.controls.endDate.setValue(this.currCoupon.endDate);
    this.editCouponFormGroup.controls.amount.setValue(this.currCoupon.amount);
    this.editCouponFormGroup.controls.price.setValue(this.currCoupon.price);
  }

  updateCoupon() {
    this.currCoupon.category = this.editCouponFormGroup.controls.category.value;
    this.currCoupon.title = this.editCouponFormGroup.controls.title.value;
    this.currCoupon.description = this.editCouponFormGroup.controls.description.value;
    this.currCoupon.startDate = this.editCouponFormGroup.controls.startDate.value;
    this.currCoupon.endDate = this.editCouponFormGroup.controls.endDate.value;
    this.currCoupon.amount = this.editCouponFormGroup.controls.amount.value;
    this.currCoupon.price = this.editCouponFormGroup.controls.price.value;
    this.apiService.updateCoupon(this.currCoupon).subscribe(
      (response) => {
        this.dialog.open(ResponseDialogComponent, { data: { response: 'success', message: response }, width: '500px', panelClass: 'ggg', backdropClass: 'dark' });
        this.dialogRef.close(true);
      },
      (error) => { this.errService.errorHandler(error); });
  }

}
