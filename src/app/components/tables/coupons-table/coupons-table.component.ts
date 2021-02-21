import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from 'src/app/enums/clientType.enum';
import { Item } from 'src/app/enums/item.enum ';
import { Coupon } from 'src/app/models/coupon.model';
import { ApplicationService } from 'src/app/services/application.service';
import { EditCouponDialogComponent } from '../../company/edit-coupon-dialog/edit-coupon-dialog.component';
import { ConfirmationDialogComponent } from '../../DIALOGS/confirmation-dialog/confirmation-dialog.component';
import { ItemDetailsDialogComponent } from '../../DIALOGS/item-details-dialog/item-details-dialog.component';

@Component({
  selector: 'app-coupons-table',
  templateUrl: './coupons-table.component.html',
  styleUrls: ['./coupons-table.component.css']
})
export class CouponsTableComponent implements OnInit {
  @Input() couponsTableColumn: string[];
  @Input() couponsTableData: Coupon[];
  @Output() deleteCouponById: EventEmitter<number> = new EventEmitter<number>();
  @Output() refreshTable:EventEmitter<boolean> = new EventEmitter<boolean>();
  isCompany:boolean=false;
  searchValue: string;


  constructor(
    private dialog: MatDialog,
    private appService:ApplicationService
  ) { }

  ngOnInit(): void {
    if(this.appService.getUserType()==ClientType.COMPANY){
      this.isCompany=true;
    }
  }

  openDeleteDialog(couponId: number) {
    this.dialog.open(ConfirmationDialogComponent,{data:'Are you sure you wnat to delete this coupon?',backdropClass:'dark'}).afterClosed().subscribe(
      (result) => {if (result) {this.deleteCouponById.emit(couponId);}});
  }

  openItemDialog(coupon:Coupon){this.dialog.open(ItemDetailsDialogComponent,{data:{item:Item.COUPON,coupon:coupon},panelClass:'ggg',backdropClass:'dark'});}

  openEditDialog(coupon:Coupon){
    this.dialog.open(EditCouponDialogComponent,{data:coupon,backdropClass:'dark'}).afterClosed().subscribe(
      (response)=>{
        if(response){
          this.refreshTable.emit(true);
        }});
  }
}
