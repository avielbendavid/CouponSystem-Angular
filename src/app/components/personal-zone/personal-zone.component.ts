import { Component, OnInit } from '@angular/core';
import { ClientType } from 'src/app/enums/clientType.enum';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-personal-zone',
  templateUrl: './personal-zone.component.html',
  styleUrls: ['./personal-zone.component.css']
})
export class PersonalZoneComponent implements OnInit {

  userType: ClientType;

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    let curr: ClientType = this.appService.getUserType();
    if (curr != null) {
      this.userType = curr;
    }
  }

}
