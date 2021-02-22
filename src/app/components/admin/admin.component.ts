import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { ResponseDialogComponent } from '../DIALOGS/response-dialog/response-dialog.component';
import { AddCompanyDialogComponent } from './add-company-dialog/add-company-dialog.component';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  company: Company = new Company();
  loading: boolean = false;
  // companies table
  companiesTabelColumn: string[];
  companiesTableData: Company[] = [];
  // customers table
  customersTabelColumn: string[];
  customersTableData: Customer[] = [];

  constructor(
    private adminService: AdminService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getCompaniesTableData();
    this.getCustomersTableData();
    this.loading = false;
  }

  // **************** companies table **************************************************************************
  public getCompaniesTableData() {
    this.companiesTabelColumn = this.adminService.getcCompaniesTableColumn();
    this.apiService.getAllCompanies().subscribe(
      (companies) => { this.companiesTableData = companies; },
       (error) => {
       this.errorService.errorHandler(error);
      });
  }

  // **************** customers table **************************************************************************

  public getCustomersTableData() {
    this.customersTabelColumn = this.adminService.getCustomersTableColumn();
    this.apiService.getAllCustomers().subscribe(
      (customers) => {
        this.customersTableData = customers;
      },
      (error) => {
       this.errorService.errorHandler(error);
      }
    );
  }
  // ***********************************************************************************************************

  public refreshCompaniesTable() {
    this.getCompaniesTableData();
  }
  public refreshCustomersTable() {
    this.getCustomersTableData();
  }

  deleteCompany(companyId: number) {
    this.apiService.deleteCompany(companyId).subscribe(
      (response) => {
        this.dialog.open(ResponseDialogComponent, { width: '500px', data: { response: 'success', message: response }, backdropClass: 'dark' });
        this.refreshCompaniesTable();
      },
      (error) => { 
        this.errorService.errorHandler(error);
      });
  }
  deleteCustomer(customerId: number) {
    this.apiService.deleteCustomer(customerId).subscribe(
      (response) => { 
        this.dialog.open(ResponseDialogComponent, { width: '500px', data: { response: 'success', message: response }, backdropClass: 'dark' });
        this.refreshCustomersTable();
      },
      (error) => { 
        this.errorService.errorHandler(error);
      });
  }

  openAddCompanyDialog() {
    this.dialog.open(AddCompanyDialogComponent, { panelClass: 'ggg', backdropClass: 'dark' }).afterClosed().subscribe(
      (renewTable) => { if (renewTable) { this.refreshCompaniesTable(); } });
  }

  openAddCustomerDialog() {
    this.dialog.open(AddCustomerDialogComponent,{width:'480px',backdropClass:'dark', panelClass: 'ggg'}).afterClosed().subscribe(
      (renewTable) => {
        if (renewTable) { this.refreshCustomersTable(); }
      });
  }

}