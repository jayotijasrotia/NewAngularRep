import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  template: `

  <div style="color:green;">{{value}}</div>
  
  `,
  styles: [
   
  ]
})
export class MyCellComponent implements OnInit,ICellRendererAngularComp {

  constructor() { }
  cellvalue:any;
  value:any;
  agInit(params: ICellRendererParams<any, any>): void {
   this.value=params.value
   this.cellvalue=params.value
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false; //default option
  }

  ngOnInit(): void {
  }

}
