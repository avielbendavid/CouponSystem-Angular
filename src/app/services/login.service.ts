import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientType } from '../enums/clientType.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  // *************************************** LOGIN API  ***************************************
  login(userEmail: string, userPassword: string, clientType: ClientType) {
    return this.httpClient.post("http://localhost:8080/login/login/" + userEmail + "/" + userPassword + "/" + clientType, null, { responseType: 'text' });
  }
  // *************************************** IS LOGIN ? API  ***************************************
  public isActive(token: string) {
    return this.httpClient.get("http://localhost:8080/login/is-active/" + token, { responseType: 'text' });
  }
  // *************************************** Log-out API  ***************************************
  logOut(token: string) {
    return this.httpClient.post("http://localhost:8080/login/log-out/" + token, null, { responseType: 'text' });
  }

}











// administratorLogin(administratorEmail: string, companyPassword: string) {
//   return this.httpClient.post("http://localhost:8080/login/administrator-login/" + administratorEmail + "/" + companyPassword, null, { responseType: 'text' });
// }
// companyLogin(companyEmail: string, companyPassword: string) {
//   return this.httpClient.post("http://localhost:8080/login/company-login/" + companyEmail + "/" + companyPassword, null, { responseType: 'text' });
// }
// customerLogin(customerEmail: string, customerPassword: string) {
//   return this.httpClient.post("http://localhost:8080/login/customer-login/" + customerEmail + "/" + customerPassword, null, { responseType: 'text' });
// }