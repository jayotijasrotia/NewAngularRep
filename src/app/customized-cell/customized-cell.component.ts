import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.scss']
})
export class CustomizedCellComponent implements OnInit ,ICellRendererAngularComp{
cellvalue:any;
  constructor() { }
  agInit(params: ICellRendererParams<any, any>): void {
    this.cellvalue=params.value;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.cellvalue=params.value;
    return true;
  }

  ngOnInit(): void {
  }

}
