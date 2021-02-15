import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../../DIALOGS/response-dialog/response-dialog.component';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialogComponent implements OnInit {

  addCompanyFormGroup: FormGroup;
  renewTable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private dialog:MatDialog,
    private dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.addCompanyFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^([A-Z][a-z]*)')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  addCompany() {
    const fr = this.addCompanyFormGroup.value;
    const company: Company = {
      name: fr.name,
      email: fr.email,
      password: fr.password
    }
    this.apiService.addCompany(company).subscribe(
      (response) => {
        this.renewTable = true;
        this.dialogRef.close(this.renewTable);
        this.dialog.open(ResponseDialogComponent,{width:'500px',data:{response:'success',message:response}})
      },
      (err) => { 
        this.errorService.errorHandler(err);
       });
  }
}
