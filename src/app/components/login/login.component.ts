import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/enums/clientType.enum';
import { ApplicationService } from 'src/app/services/application.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private errorService:ErrorService
  ) { }

  loading: boolean = false;
  clientType = ClientType;
  loginFormGroup: FormGroup;

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      clientType: ['', Validators.required],
    });
  }

  public login() {
    this.loading = true;
    const fr = this.loginFormGroup.value;

    const user = {
      email: fr.email,
      password: fr.password,
      clientType: fr.clientType
    }

    this.loginService.login(user.email, user.password, user.clientType).subscribe(
      (token) => {
        localStorage.setItem("userType", user.clientType);
        this.appService.userName.next(user.clientType);
        localStorage.setItem("userName", user.clientType);
        localStorage.setItem("token", token);
        this.appService.isActive.next(true);
        this.router.navigate(['personal-zone']);
        this.loading = false;
      },
      (error) => {this.loading = false;
        console.log(error);
        console.log(error.error);
        this.errorService.errorHandler(error);
      });
  }


}
