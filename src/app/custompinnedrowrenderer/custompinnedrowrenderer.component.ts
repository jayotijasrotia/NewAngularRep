import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-custompinnedrowrenderer',
  templateUrl: './custompinnedrowrenderer.component.html',
  
  styleUrls: ['./custompinnedrowrenderer.component.scss']
})
export class CustompinnedrowrendererComponent implements OnInit {
 params:any;
 style!:string;
  constructor() { }

  agInit(params:any):void{
    this.params = params;
    this.style = this.params.style;
  }
  refresh(): boolean {
    return false;
  }
  ngOnInit(): void {
  }

}
