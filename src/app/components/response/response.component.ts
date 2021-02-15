import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
response:number;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  this.response=this.activatedRoute.snapshot.params.response;
  }

  public goBack(){
    window.history.back();
  }
}
