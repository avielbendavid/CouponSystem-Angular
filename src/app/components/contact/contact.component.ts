import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { observable, Observable, Subscriber } from 'rxjs';
import { ResponseDialogComponent } from '../DIALOGS/response-dialog/response-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,OnDestroy {

  constructor(private dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy...");
    
  }
  ngOnInit(): void {
    console.log("ngOnInit...");
    
    // this.myFirst();
    // // setTimeout(()=>{
    // //   this.mySecond();
    // // },3000);
    // setTimeout(this.mySecond, 3000);
  }

  public myDisplayer() {
    document.getElementById("demo").innerHTML = "5";
    console.log("55555");
    
  }

  public myFirst() {
    // this.myDisplayer("Hello");
    console.log("aaa");
    
  }

  public mySecond() {    
    this.myDisplayer();
    
    // this.myDisplayer("Goodbye");
  }



}
