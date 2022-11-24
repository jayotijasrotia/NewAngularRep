import { Component, OnInit } from '@angular/core';
import { Funds } from '../../Interface/all-funds.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  fundlist :any;
  constructor() { }
  Receivedata(fundslist:Funds[])
  {
    //this.fundlist=fundslist;
   // console.log(fundslist);
  }
  ngOnInit(): void {
  }

}
