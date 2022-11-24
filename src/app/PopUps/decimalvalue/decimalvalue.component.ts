import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { Position2Component } from 'src/app/App Components/position2/position2.component';
import { DialogRef } from '@angular/cdk/dialog';
import { GetDataService } from 'src/app/Services/webServices/get-data.service';
import { SelectColumnsService } from 'src/app/Services/select-columns.service';
@Component({
  selector: 'app-decimalvalue',
  templateUrl: './decimalvalue.component.html',
  styleUrls: ['./decimalvalue.component.scss']
})
export class DecimalvalueComponent implements OnInit {

  constructor(private columnService: ColumnServiceService, private getdataService: GetDataService, private Dialog: MatDialog, public dialogRef: MatDialogRef<DecimalvalueComponent>, private comp: ColumnServiceService) { }
  NoofdecimalPlaces: any = 3;
  allActiveCol: any[] = [];
  decimalArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  decimalSettings: any[] = [
    { ColName: "Quantity",  decimalPlaces: 3 },
    { ColName: "Cost Price",  decimalPlaces: 3 },
    { ColName: "Current Price",  decimalPlaces: 3 },
    { ColName: "Market Value (B)",  decimalPlaces: 3 },
    { ColName: "Opening Cost (B)", decimalPlaces: 3 },
    { ColName: "Initial Cost (L)",  decimalPlaces: 3 },
    { ColName: "Initial Cost (B)",  decimalPlaces: 3 },
    { ColName: "P&L (B)",  decimalPlaces: 3 },
    { ColName: "Market Value (L)",  decimalPlaces: 3 },
    { ColName: "FX Rate",  decimalPlaces: 3 },
    { ColName: "Net Price",  decimalPlaces: 3 },
    { ColName: "P&L (L)",  decimalPlaces: 3 },
    { ColName: "% Day",  decimalPlaces: 3 },
    { ColName: "Market Exp (B)",  decimalPlaces: 3 },
    { ColName: "% Exp of NAV",  decimalPlaces: 3 },
    { ColName: "P&L Excl FX",  decimalPlaces: 3 },
    { ColName: "Lqdty",  decimalPlaces: 3 },
    { ColName: "Lqdty 1d",  decimalPlaces: 3 },
    { ColName: "Net P&L (B)",  decimalPlaces: 3 },
    { ColName: "P&L FX only",  decimalPlaces: 3 },
  ];
  //let component =new Position2Component(columnService,getdataService,Dialog);
  ngOnInit(): void {
    this.allActiveCol = [];
    if (localStorage.getItem("decimalPlaces") != null && localStorage.getItem("decimalPlaces") != '' && localStorage.getItem("decimalPlaces") != undefined)
      this.NoofdecimalPlaces = Number(localStorage.getItem("decimalPlaces"));
      for(let item of this.decimalSettings)
      {
        if(localStorage.getItem(item.ColName) != null && localStorage.getItem(item.ColName) != '' && localStorage.getItem(item.ColName) != undefined)
        item.decimalPlaces= Number(localStorage.getItem(item.ColName));
      }
    for (let column56 of this.columnService.getActiveInactiveColumns()) {
      if (column56.Isactive == true) {
        for (let NumCol of this.decimalSettings) {
          if (column56.fieldName == NumCol.ColName) {
            this.allActiveCol.push(NumCol);
            break;
          }
        }
      }
    }
  }
  setDecimals() {
    this.columnService.setDecimals(this.NoofdecimalPlaces,this.decimalSettings);
    this.dialogRef.close();
  }
}
