import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent implements OnInit {
  response: string;
  message:string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { response:string,message:string},) { }

  ngOnInit(): void {
    this.message=this.data.message;
    this.response=this.data.response;
  }

}
