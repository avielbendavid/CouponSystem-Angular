import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../models/company.model';

@Pipe({
  name: 'adminCompaniesFilter'
})
export class AdminCompaniesFilterPipe implements PipeTransform {

  transform(companies: Company[], searchValue: string): Company[] {
    if (!searchValue) {
      return companies;
    }
    return companies.filter(company =>
      company.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      company.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
