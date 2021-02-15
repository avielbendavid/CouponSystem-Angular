import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../../DIALOGS/response-dialog/response-dialog.component';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent implements OnInit {

  customer: Customer = new Customer();
  editCustomerFormGroup: FormGroup;
  @ViewChild('customerFirstName', { static: true }) customerFirstName: ElementRef;
  @ViewChild('customerLastName', { static: true }) customerLastName: ElementRef;
  @ViewChild('customerEmailAddress', { static: true }) customerEmailAddress: ElementRef;
  @ViewChild('customerPassword', { static: true }) customerPassword: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private customerId: number,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.editCustomerFormGroup = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z]*)')]],
      lastName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z]*)')]],
      emailAddress: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(8)]]
    });
    this.apiService.getOneCustomer(this.customerId).subscribe(
      (customer) => {
        this.customer = customer;
        this.editCustomerFormGroup.controls.firstName.setValue(this.customer.firstName);
        this.editCustomerFormGroup.controls.lastName.setValue(this.customer.lastName);
        this.editCustomerFormGroup.controls.emailAddress.setValue(this.customer.email);
        this.editCustomerFormGroup.controls.password.setValue(this.customer.password);
      },
      (error) => { this.errorService.errorHandler(error)});
  }

  editCustomer() {
    this.customer.firstName = this.customerFirstName.nativeElement.value;
    this.customer.lastName = this.customerLastName.nativeElement.value;
    this.customer.email = this.customerEmailAddress.nativeElement.value;
    this.customer.password = this.customerPassword.nativeElement.value;

    this.apiService.updateCustomer(this.customer).subscribe(
      (response) => {
        this.dialogRef.close(true);
        this.dialog.open(ResponseDialogComponent, { width: '500px', data: { response: 'success', message: response }, backdropClass: "dark" });
      },
      (error) => { 
        this.errorService.errorHandler(error);
        this.dialogRef.close(false); });
  }

  // editCustomer(formGroup: FormGroup) {
  //   this.customer.firstName = formGroup.controls.firstName.value;
  //   this.customer.lastName = formGroup.controls.lastName.value;
  //   this.customer.email = formGroup.controls.emailAddress.value;
  //   this.customer.password = formGroup.controls.password.value;
  //   this.apiService.updateCustomer(this.customer).subscribe(
  //     (response) => {
  //       this.dialogRef.close(true);
  //       this.dialog.open(ResponseDialogComponent, { width: '500px', data: { response: 'success', message: response }, backdropClass: "dark" });
  //     },
  //     (error) => { alert(error);this.dialogRef.close(false); });
  // }

}
