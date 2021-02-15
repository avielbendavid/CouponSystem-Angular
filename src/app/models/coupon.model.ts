import { Company } from "./company.model";

export class Coupon {
    constructor(
        public id?:number,
        public title?: string,
        public category?: string,
        public description?: string,
        public startDate?: Date,
        public endDate?: Date,
        public amount?: number,
        public price?: number,
        public image?:string,
        public company?:Company
    ) { }
}
