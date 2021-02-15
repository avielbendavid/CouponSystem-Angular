import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public couponsTableColumn: string[]=["ID","CATEGORY","TITLE","DESCRIPTION","START-DATE","END-DATE","AMOUNT","PRICE","COMPANY" ];
  constructor() { }
}
