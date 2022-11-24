import { Injectable,OnInit } from '@angular/core';
import {columns} from '../Interface/columns.interface';



@Injectable({
  providedIn: 'root'
})
export class SelectColumnsService {

  constructor() { }
  AllColumnsList: string[] = [ 'FundName','ProductType', 'Quantity','ProductID', 'ProductDescription',
  'PositionClass','PricingCurrency','SettleCurrency','CostPrice','CurrentPrice',
  'InitialOpenCostLocal','InitialOpenCostBase','ProfitLossBase','MarketValueLocal',
  'LastCloseDirection','FXRate','CustodianValue','Exchange','ISIN','ISO','NetPrice',
  'ProfitLoss','PercentageMovementFromLastClose' ];
  
  Activecolumns!: string[] ;
  column!:columns;
  iscolumnActive!:boolean[];
  columnListString!:string;
  localColumnList!:string[];
  columnList:columns[]=[
    {ColumnName: 'FundName',ColDisplayname:'FundName',IsActive:true},
    {ColumnName: 'ProductType',ColDisplayname:'ProductType',IsActive:true},
    {ColumnName: 'Quantity',ColDisplayname:'Quantity',IsActive:true},
    {ColumnName: 'ProductID',ColDisplayname:'ProductID',IsActive:true},
    {ColumnName: 'ProductDescription',ColDisplayname:'ProductDescription',IsActive:true},
    {ColumnName: 'PositionClass',ColDisplayname:'PositionClass',IsActive:true},
    {ColumnName: 'PricingCurrency',ColDisplayname:'PricingCurrency',IsActive:true},
    {ColumnName: 'SettleCurrency',ColDisplayname:'SettleCurrency',IsActive:true},
    {ColumnName: 'CostPrice',ColDisplayname:'CostPrice',IsActive:true},
    {ColumnName: 'CurrentPrice',ColDisplayname:'CurrentPrice',IsActive:true},
    {ColumnName: 'InitialOpenCostLocal',ColDisplayname:'InitialOpenCostLocal',IsActive:true},
    {ColumnName: 'InitialOpenCostBase',ColDisplayname:'InitialOpenCostBase',IsActive:true},
    {ColumnName: 'MarketValueLocal',ColDisplayname:'MarketValueLocal',IsActive:true},
    {ColumnName: 'LastCloseDirection',ColDisplayname:'LastCloseDirection',IsActive:true},
    {ColumnName: 'FXRate',ColDisplayname:'FXRate',IsActive:true},
    {ColumnName: 'CustodianValue',ColDisplayname:'CustodianValue',IsActive:true},
    {ColumnName: 'Exchange',ColDisplayname:'Exchange',IsActive:true},
    {ColumnName: 'ISIN',ColDisplayname:'ISIN',IsActive:true},
    {ColumnName: 'ISO',ColDisplayname:'ISO',IsActive:true},
    {ColumnName: 'NetPrice',ColDisplayname:'NetPrice',IsActive:true},
    {ColumnName: 'ProfitLoss',ColDisplayname:'ProfitLoss',IsActive:true},
    {ColumnName: 'PercentageMovementFromLastClose',ColDisplayname:'PercentageMovementFromLastClose',IsActive:true},
  ];

  NewColumn!:columns;
  
  loadColumns()
  {
      this.Activecolumns=[];
      this.columnListString = localStorage.getItem('columnList')||'';
      this.localColumnList= this.columnListString.split('/');
      // console.log(this.localColumnList); 
      // console.log(this.Activecolumns);
      for(let i=0;i<this.localColumnList.length-1;i=i+2) 
      {
        if( (this.localColumnList[i+1]==='true'))
        {
          this.Activecolumns.push(this.localColumnList[i]);
          this.columnList[i/2].IsActive=true;
        }
        else
        {
          this.columnList[i/2].IsActive=false;
        }

      }
      // console.log(this.Activecolumns); 
      // console.log(this.columnList);
  }
  

}
