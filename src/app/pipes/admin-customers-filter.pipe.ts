import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({
  name: 'adminCustomersFilter'
})
export class AdminCustomersFilterPipe implements PipeTransform {

  transform(customers: Customer[], searchValue: string): Customer[] {

    if (!searchValue) {
      return customers;
    }
    return customers.filter(customer =>
      customer.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      customer.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      customer.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );

  }
}