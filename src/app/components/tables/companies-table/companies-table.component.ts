import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/enums/item.enum ';
import { Company } from 'src/app/models/company.model';
import { EditCompenyDialogComponent } from '../../admin/edit-compeny-dialog/edit-compeny-dialog.component';
import { EditCustomerDialogComponent } from '../../admin/edit-customer-dialog/edit-customer-dialog.component';
import { ConfirmationDialogComponent } from '../../DIALOGS/confirmation-dialog/confirmation-dialog.component';
import { ItemDetailsDialogComponent } from '../../DIALOGS/item-details-dialog/item-details-dialog.component';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit {
  @Input() companiesTableData: Company[];
  @Input() companiesTableColumn: string[];
  @Output() deleteCompanyById = new EventEmitter();
  @Output() refreshTable: EventEmitter<boolean> = new EventEmitter<boolean>();


  searchValue: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteDialog(companyId: number) {
    this.dialog.open(ConfirmationDialogComponent, { panelClass: 'ggg', backdropClass: 'dark', data: 'Are you sure you want to delete this company?' }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteCompanyById.emit(companyId);
      }
    });
  }


  openItemDetailsDialog(companyId: number) {
    this.dialog.open(ItemDetailsDialogComponent, { data: { id: companyId, item: Item.COMPANY }, panelClass: 'ggg', backdropClass: 'dark' });
  }
  openEditCompoanyDialog(companyId: number) {
    this.dialog.open(EditCompenyDialogComponent, { data: companyId, panelClass: 'ggg', backdropClass: 'dark' }).afterClosed().subscribe(
      (result) => {
        if (result) {
          this.refreshTable.emit(true);
        }
      }
    );
  }

}
