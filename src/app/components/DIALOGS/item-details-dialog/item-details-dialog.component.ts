import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/enums/item.enum ';
import { Company } from 'src/app/models/company.model';
import { Coupon } from 'src/app/models/coupon.model';
import { Customer } from 'src/app/models/customer.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-item-details-dialog',
  templateUrl: './item-details-dialog.component.html',
  styleUrls: ['./item-details-dialog.component.css']
})
export class ItemDetailsDialogComponent implements OnInit {
  company: Company;
  customer: Customer;
  coupon: Coupon;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number, item: Item, coupon: Coupon , descData: {label: string,value:any}[]},
    private apiService: ApiService,
    private errService: ErrorService,
    private dialogRef: MatDialogRef<ItemDetailsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  // switch case *********************************

  fetchData() {
    if (this.data.item == Item.COUPON) {
      this.coupon = this.data.coupon;
      return;
    }
    else if (this.data.item == Item.CUSTOMER) {
      this.apiService.getOneCustomer(this.data.id).subscribe(
        (customer) => { this.customer = customer; }, (error) => { this.dialogRef.close(), this.errService.errorHandler(error) });
      return;
    }
    else if (this.data.item == Item.COMPANY) {
      this.apiService.getOneCompany(this.data.id).subscribe((company) => { this.company = company; }, (error) => { this.dialogRef.close(), this.errService.errorHandler(error) });
    }
  }
}
