import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientType } from '../enums/clientType.enum';
import { ApiService } from './api.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  userName = new BehaviorSubject<any>(null);
  userType: ClientType;
  isActive = new BehaviorSubject<any>(false);
  constructor(private apiService: ApiService,private loginService:LoginService ) {
    this.refresh();
    this.getUserType();
  }

  refresh() {
    this.loginService.isActive(localStorage.getItem("token")).subscribe(
      (success) => {
        this.userName.next(localStorage.getItem("userName"));
        this.isActive.next(true);
      },
      (error) => {
        this.userName.next("Guest");
        this.isActive.next(false);
      });
  }

  getUserType(): ClientType {
    this.userType = <ClientType>localStorage.getItem("userType");
    return this.userType;
  }

}




