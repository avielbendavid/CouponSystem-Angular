import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalZoneComponent } from './components/personal-zone/personal-zone.component';
import { ResponseComponent } from './components/response/response.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, data: { animation: 'HomePage' } },
  { path: "contact", component: ContactComponent, data: { animation: 'ContactPage' } },
  { path: "login", component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: "personal-zone", component: PersonalZoneComponent, data: { animation: 'PersonalPage' } },
  { path: "admin", component: AdminComponent },
  { path: "company", component: CompanyComponent },
  { path: "customer", component: AdminComponent },
  {path:"response/:response",component:ResponseComponent},
  { path: "", redirectTo: "home", pathMatch: "full" },
  // { path: "**", component: ResponseHttp404Component }
  { path: "**", redirectTo:"response/404" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
