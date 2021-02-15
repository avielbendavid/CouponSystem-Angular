import { Injectable } from '@angular/core';
import { Category } from 'src/app/enums/category.enum';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public couponsTableColumn: string[]=["ID","CATEGORY","TITLE","DESCRIPTION","START-DATE","END-DATE","AMOUNT","PRICE","COMPANY" ];
  // categories=Category;
  constructor() { }
}