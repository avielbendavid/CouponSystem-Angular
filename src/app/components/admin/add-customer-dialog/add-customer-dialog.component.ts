import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../../DIALOGS/response-dialog/response-dialog.component';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css']
})
export class AddCustomerDialogComponent implements OnInit {

  addCustomerFormGroup: FormGroup;
  renewTable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddCustomerDialogComponent>
    ,private dialog:MatDialog,
    private errorService:ErrorService
    ) { }

  ngOnInit(): void {
    this.addCustomerFormGroup = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z]*)')]],
      lastName: ['', [Validators.required,Validators.pattern('^([A-Z][a-z]*)')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(8),]]
    });
  }

  addCustomer() {
    const fr = this.addCustomerFormGroup.value;
    const customer: Customer = {
      firstName: fr.firstName,
      lastName: fr.lastName,
      password: fr.password,
      email: fr.email
    }
    this.apiService.addCustomer(customer).subscribe(
      (response) => {
        this.renewTable = true;
        this.dialogRef.close(this.renewTable);
        this.dialog.open(ResponseDialogComponent,{width:'500px',data:{response:'success',message:response},backdropClass:'dark'})
      },
      (error) => {this.errorService.errorHandler(error);
      });
  }

}


