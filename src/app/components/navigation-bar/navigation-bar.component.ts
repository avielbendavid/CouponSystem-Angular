import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApplicationService } from 'src/app/services/application.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { ConfirmationDialogComponent } from '../DIALOGS/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isActive: boolean;
  userName: string;

  constructor(
    private appService: ApplicationService,
    private dialog: MatDialog,
    private apiService: ApiService,
    private loginService: LoginService,
    private router: Router,
    private errService:ErrorService
  ) {
  }

  ngOnInit(): void {
    this.appService.userName.subscribe((data) => {
      this.userName = data;
    });
    this.appService.isActive.subscribe(
      (data) => {
        this.isActive = data;
      }
    );
  }

  logOut() {
    this.dialog.open(
      ConfirmationDialogComponent,
      { data: 'Are you sure you want to log out?', panelClass: 'ggg', backdropClass: 'dark' }).afterClosed().subscribe
      (result => {
        if (result) {
          this.loginService.logOut(localStorage.getItem("token")).subscribe(
            (success) => {
              this.appService.refresh();
              this.router.navigate(['/home']);},
            (error) => {this.errService.errorHandler(error);});
        }
      });
  }

}



