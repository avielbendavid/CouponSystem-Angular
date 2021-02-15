import { Component, Input, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input() coupon:Coupon;

  constructor() { }

  ngOnInit(): void {    
  }

}
