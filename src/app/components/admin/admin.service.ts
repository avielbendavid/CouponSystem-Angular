import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService:ApiService) { }
  public companiesTableColumn: string[]=["ID","NAME","EMAIL-ADDRESS","PASSWORD","DELETE / EDIT"];
  public customersTableColumn: string[]=["ID","FIRST_NAME","LAST_NAME","EMAIL-ADDRESS","PASSWORD","OPTIONS"];


  public getcCompaniesTableColumn(): string[] {
    return this.companiesTableColumn;
  }

  public getCustomersTableColumn(): string[] {
    return this.customersTableColumn;
  }
}
