import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseDialogComponent } from '../components/DIALOGS/response-dialog/response-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router, private dialog: MatDialog) { }

  errorHandler(error: HttpErrorResponse) {
    if (error.status == 401) {
      console.log(error);
      if (error.error.message == undefined) {
        const err = JSON.parse(error.error);
        this.dialog.open(ResponseDialogComponent, { width: '550px', data: { response: 'fail', message: err.message }, panelClass: 'err_dialog', backdropClass: 'dark' });
      }
      else {
        this.dialog.open(ResponseDialogComponent, { width: '550px', data: { response: 'fail', message: error.error.message }, panelClass: 'err_dialog', backdropClass: 'dark' });
      }
      this.router.navigate(['/response/'+error.status]);
      return;
    }
    if (error.status == 0) {
      this.dialog.open(ResponseDialogComponent, { width: '550px', data: { response: 'fail', message: 'Sorry, Connection was Refused.Please try again later...' }, panelClass: 'err_dialog', backdropClass: 'dark' });
      this.router.navigate(['/response/'+error.status]);
      return;
    }
    console.log(error);
    this.dialog.open(ResponseDialogComponent, { width: '550px', data: { response: 'fail', message: error.error }, panelClass: 'err_dialog', backdropClass: 'dark' });
  }
}
