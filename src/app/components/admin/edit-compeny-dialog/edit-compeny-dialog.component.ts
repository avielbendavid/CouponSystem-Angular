import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../../DIALOGS/response-dialog/response-dialog.component';

@Component({
  selector: 'app-edit-compeny-dialog',
  templateUrl: './edit-compeny-dialog.component.html',
  styleUrls: ['./edit-compeny-dialog.component.css']
})
export class EditCompenyDialogComponent implements OnInit {

  company: Company = new Company();
  editCompanyFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private companyId: number,
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCompenyDialogComponent>,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.editCompanyFormGroup = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.apiService.getOneCompany(this.companyId).subscribe(
      (company) => {
        this.company = company;
        this.editCompanyFormGroup.controls.password.setValue(this.company.password);
        this.editCompanyFormGroup.controls.email.setValue(this.company.email);
      },
      (error) => { alert("ERROR"); });
  }

  editCompany(password: HTMLInputElement, email: HTMLInputElement) {
    this.company.password = password.value;
    this.company.email = email.value;
    this.apiService.updateCompany(this.company).subscribe(
      (response) => {
        this.dialogRef.close(true);
        this.dialog.open(ResponseDialogComponent, { data: { response: 'success', message: response }, width: '500px', backdropClass: 'dark' });
      },
      (error) => {
        this.errorService.errorHandler(error);
        this.dialogRef.close(false);
      });
  }

}
