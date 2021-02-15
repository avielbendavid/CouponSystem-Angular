import { Pipe, PipeTransform } from '@angular/core';
import { Coupon } from '../models/coupon.model';

@Pipe({
  name: 'homeCouponsFilter'
})
export class HomeCouponsFilterPipe implements PipeTransform {

  constructor() { }

  transform(coupons: Coupon[], searchValue: string): Coupon[] {
    if (!searchValue) {
      return coupons;
    }

    return coupons.filter(coupon =>
      coupon.company.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      coupon.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      coupon.category.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
