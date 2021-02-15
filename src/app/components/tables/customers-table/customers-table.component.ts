import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/enums/item.enum ';
import { Customer } from 'src/app/models/customer.model';
import { EditCustomerDialogComponent } from '../../admin/edit-customer-dialog/edit-customer-dialog.component';
import { ConfirmationDialogComponent } from '../../DIALOGS/confirmation-dialog/confirmation-dialog.component';
import { ItemDetailsDialogComponent } from '../../DIALOGS/item-details-dialog/item-details-dialog.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit {
  @Input() customersTableData: Customer[];
  @Input() customersTableColumn: string[];
  @Output() deleteCustomerById = new EventEmitter();
  @Output() refreshTable: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchValue: string;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDetailsDialog(customerId:number){
    this.dialog.open(ItemDetailsDialogComponent,{data:{id:customerId,item:Item.CUSTOMER},panelClass:'ggg',backdropClass:'dark'});
  }
  openDeleteDialog(customerId: number) {
    this.dialog.open(ConfirmationDialogComponent, { panelClass: 'ggg', backdropClass: 'dark', data: 'Are you sure you want to delete this customer?' }).afterClosed().subscribe(result => {
      if (result) { this.deleteCustomerById.emit(customerId); }
      else { }
    }
    );
  }
  openEditCustomerDialog(customerId: number) {
    this.dialog.open(EditCustomerDialogComponent, { data: customerId ,panelClass:'ggg',backdropClass:'dark'}).afterClosed()
      .subscribe((response) => { if (response) { this.refreshTable.emit(true); } });
  }

}
