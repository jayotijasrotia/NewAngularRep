import { Component, OnInit,ViewChild,ViewEncapsulation,ElementRef, Input } from '@angular/core';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LoderServiceService } from 'src/app/Services/Loader/loder-service.service';
import { ChangeFundDialogComponent } from '../PopUps/change-fund-dialog/change-fund-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BehaviorSubject, interval, Observable, take } from 'rxjs';

import { CellClickedEvent, ColDef, GridReadyEvent,RowStyle,RowClassParams,GridApi,ColGroupDef, GetRowIdFunc, RefreshCellsParams,
  GetRowIdParams,RowHeightParams,
  RowGroupingDisplayType,ColumnGroup,ColumnApi,Column,SideBarDef,IAggFunc,IAggFuncParams,IsRowFilterable,ICellRendererParams,ICellRenderer,ValueFormatterParams, ValueCache, Grid, AgGridEvent, ColumnState, GridOptions } from 'ag-grid-community';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetDataService } from 'src/app/Services/webServices/get-data.service';
import 'ag-grid-enterprise'
import{RowDataTransaction} from 'ag-grid-community/dist/lib/interfaces/rowDataTransaction'
import { CustompinnedrowrendererComponent } from '../custompinnedrowrenderer/custompinnedrowrenderer.component';
import { positions } from '../Interface/positions.interface';
import { Funds } from '../Interface/all-funds.interface';
import { FundPerformance } from '../Interface/fund-performance.inteface';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { columns } from '../Interface/columns.interface';
import { Subscription } from 'rxjs';
import{DecimalvalueComponent} from '../PopUps/decimalvalue/decimalvalue.component';
import { CellRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { state } from '@angular/animations';
import { NavigationStart } from '@angular/router';
import {LicenseManager} from 'ag-grid-enterprise';

LicenseManager.setLicenseKey('For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-14_January_2023_[v2]_MTY3MzY1NDQwMDAwMA==908f41c5add31c9c0ea87d7f54a17956');

declare var window: any;
declare var localStorage: any;


class simComp{
  eGui: HTMLDivElement | undefined;
  init(_params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">▼</div>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class simCom1{
  eGui: HTMLDivElement | undefined;
  init(_params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">▲</div>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class simelse{
  eGui: HTMLDivElement | undefined;
  init(_params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:white;">--</div>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}

class navValue{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">${Math.round(params.value*1000)/1000}</div>
    <span>${params.value}</span>
     
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class navValue2{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">${params.value}</div>
    <span>${params.value}</span>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class navElse{
  eGui: HTMLDivElement | undefined;
  init(_params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:white;"></div>
    
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}

class losspro1{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">${params.value}</div>
    <span>${params.value}</span>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class losspro2{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">${params.value}</div>
    <span>${params.value}</span>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}

class decimalValuelse{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    if(params.value<0){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div >${'('+formatNumber(params.value * -1)+  ')'} </div>
    `
  }
}
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}

class decimalValue{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">${'('+formatNumber(params.value * -1)+  ')'} </div>
    <span>${params.value}</span>`
   // item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
   // return '(' + params.value + ')';
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class percentageNAV{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">${'('+formatNumber(params.value * -1)+ ')'} </div>
    <span>${params.value}</span>
    `
}
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class percentagenav{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">${+formatNumber(params.value==0? "N/A" :params.value)} </div>
    `
}
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class decimalValue1{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div>
    ${formatNumber(params.value==0? "NaN": params.value)} </div>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class decimalValue2{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">
    ${formatNumber(params.value==0? "NaN": params.value)} </div>
    `
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class quantity1{
  eGui: HTMLDivElement | undefined;
  QuantitydecimalPlaces: 15 | undefined;
  init(params:any){
  this.eGui=document.createElement('div');
  this.eGui.innerHTML=`
<div>
  ${ formatNumber(params.value==0? "NaN": params.value)}
  </div>
 `
 //value = p.value.toFixed(this.QuantitydecimalPlaces);
 // item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
 // return '(' + params.value + ')';
//result =  '<div class="jqx-grid-cell-right-align" style="color:red;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
class quantityelse{
  eGui: HTMLDivElement | undefined;
  QuantitydecimalPlaces: number | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div>${'('+ formatNumber(params.value* -1)+')' } </div>
    `
    // item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
    // item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
     // return '(' + params.value + ')';
  }
  getGui(){
    return this.eGui;
  }
  refresh(){
    return false;
  }
  destroy(){
  }
}
// const _randNum = (size: number) => Math.random() * size;
// const _generateNum = () => parseFloat((_randNum(89) + 10).toFixed(2));
// const _generateCurrency = () => parseFloat((_randNum(89999) + 1000).toFixed(4));
// const _generateString = () => {
//   var choices = [''];
//   return choices[Math.round(_randNum(4))];
// };
//function formatNumber(number:any) {
  //var parts = number.toString().split(".");
  //parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 // return parts.join(".");
//}
// function formatNumber(number: any) {
//   return Math.floor(number)
//     .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function bracketsFormatter(params: ValueFormatterParams) {
  if(!params.value) return 'ERROR';
  return '(' + formatNumber(params.value) + ')';
}

function formatNumber(currency: number) {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return  `${formatted}`;
}

@Component({
  selector: 'app-qaposition',
  templateUrl: './qaposition.component.html',
  styleUrls: ['./qaposition.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class QApositionComponent implements OnInit {
//private gridColumnAPi!:ColumnApi;
  private gridApi!: GridApi;
  private subscriptionName!: Subscription;
  private frameworkComponents:any;
 // private gridApi!: GridApi<positions>;
  checking: string = 'default';
  groupState:any;
  activeColumns!: string[];
  resolution:any='ok';
  fundList!: Funds[]
  activeFundName: string = 'empty';
  activeFundId: number = -1;
  activeMode: string = 'None';
  positions: any[] = [];
  columnListString!: string | null;
  tempColumn !: columns;
  fundPerformance!: FundPerformance;
  panelOpenState = false;
  apiInterval = interval(5000);
  //intervalID=setInterval
  //dataAdapter: any;
  immutableStore:any[]=[];
  data!: any[][];
  columns!: any[];
  username!: string;
  token!: string;
  decimalPlaces: any = 2;
  QuantitydecimalPlaces: any = 1;
  CostPricedecimalPlaces: any = 3;
  CurrentPricedecimalPlaces: any = 3;
  MarketValueBasedecimalPlaces: any = 3;
  OpeningCostBasedecimalPlaces: any = 3;
  MarketValueLocaldecimalPlaces: any = 3;
  FXRatedecimalPlaces: any = 3;
  NetPricedecimalPlaces: any = 3;
  PandLLocaldecimalPlaces: any = 3;
  PercentDaydecimalPlaces: any = 3;
  MarketExposurBdecimalPlaces: any = 3;
  percentExpOfNavdecimalPlaces: any = 3;
  PandLExclFxdecimalPlaces: any = 3;
  PandLExclFxOnlydecimalPlaces: any = 3
  InitialCostLocaldecimalPlaces: any = 3
  InitialCostbasedecimalPlaces: any = 3
  NetPandLbasedecimalPlaces: any = 3
  PandlbasedecimalPlaces: any = 3
  LqdtydecimalPlaces: any = 3
  Lqdty1ddecimalPlaces: any = 3
  source: any;
  gridTheme: string = "";
  isloader: string = 'true';
  apiRunning: boolean = false;
  IsfundChanged:boolean=false;
  isLoaingviaservice = new BehaviorSubject<any>("false");
  interval: any;
  //gridColumn!:ColumnApi;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild('myGrid', { static: false, }) myGrid!:GridApi ;
  @ViewChild('HorizontalDiv', { static: false }) HorizontalDiv!: ElementRef;
  @ViewChild('groupNum', { static: false }) groupNum!: ElementRef;
  @ViewChild('expandedGroup', { static: false }) expandedGroup!: ElementRef;
  @ViewChild('collapsedGroup', { static: false }) collapsedGroup!: ElementRef;

  public columnDefs: (ColDef|ColGroupDef)[] = [
   
    // {headerName:'Fund',field:'FundName'},
     {headerName:'Type',columnGroupShow: 'open',field:'ProductType',sortable: true,enableRowGroup:true,minWidth:100,maxWidth:200,},
     {headerName:'Identifier',field:'ProductID',columnGroupShow: 'open', enableRowGroup:true,sortable: true, minWidth:110,maxWidth:200,},
     {headerName:'Description',field:'ProductDescription',columnGroupShow: 'open',sortable: true,minWidth:125,maxWidth:200,},
     {headerName:'L/S',field:'PositionClass', minWidth:75,maxWidth:200,
     cellRendererSelector:p=>{
       if(p.value=='L')
       {
         return {component:losspro1}
       }
       else{
         return 
       }
      }
   },
     {headerName:'Quantity', field: 'Quantity',aggFunc:'sum', type: 'number',columnGroupShow: 'open',sortable: true, minWidth:110,maxWidth:200,
   
    //
   // params => (params.value<=0? '(' +(params.data.Quantity)+ ')': params.data.Quantity)
  // valueFormatter:params => (params.value<=0? '(' +formatNumber(params.data.Quantity)+ ')': params.data.Quantity),
    //  cellRendererSelector:p=>{
    //    if(p.value>0)
    //    {
    //     return {component:quantity1}
    //   }
    //   else if (p.value<0){
    //     return {component:decimalValue}
    //   }
    //   else{
    //     return
    //   }
    //  }
 },
     { headerName:'CCY', field: 'PricingCurrency', minWidth:90,maxWidth:200, },
     { headerName:'CCY (S)' ,field: 'SettleCurrency',minWidth:100,maxWidth:200, },
     { headerName:'Cost Price',field: 'CostPrice',aggFunc: 'sum',minWidth:115,maxWidth:200,
    // valueFormatter:bracketsFormatter,
    //  cellRenderer:(params: { value: number; })=>{ 
    //    if (params.value > 0)
    //   {
    //   eGui: HTMLDivElement;
    //   this.eGui=document.createElement('div');
    //  return this.eGui.innerHTML=`
    //   <div style="color:green;">
    //     ${formatNumber(params.value)} </div>
    //  `
    //   }
    //   else{
    //     return
    //   }
    // }
    cellRendererSelector:p=>{
      if(p.value>0)
      {
       return {component:quantity1}
      }
      else if (p.value<0){
        return {component:quantityelse}
      }
      else{
        return
      }
    }
   },
     { field: 'CurrentPrice',aggFunc: 'sum',minWidth:135,maxWidth:200,
   // cellStyle:params=>{
   //   return {color:'red',background:'olive'}
   // }
  // return null;
   },
     { headerName:'Market Value (B)',field: 'BaseValue',aggFunc: 'sum',minWidth:155,maxWidth:200,
    //  cellRendererSelector:p=>{
    //   if(p.value>0)
    //   {
    //    return {component:decimalValue1}
    //   }
    //   else{
    //     return {component:decimalValuelse}
    //   }
    // }
   },
     { headerName:'Opening Cost (B)',field: 'OpeningCostBase',aggFunc: 'sum',minWidth:160,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value>0)
    //    {
    //     return {component:decimalValue1}
    //    }
    //    else{
    //      return {component:decimalValuelse}
    //    }
    //  }
    },
     { headerName:'Initial Cost (B)',field: 'InitialOpenCostBase',aggFunc: 'sum', minWidth:160,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value>0)
    //    {
    //     return {component:decimalValue1}
    //    }
    //    else{
    //      return {component:decimalValuelse}
    //    }
    //  }
     },
     { headerName:'Initial Cost Price',field: 'InitialCostPrice',aggFunc: 'sum', minWidth:160,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value>0)
    //    {
    //     return {component:decimalValue1}
    //    }
    //    else{
    //      return {component:decimalValuelse}
    //    }
    //  }
     },
     { headerName:'Initial Cost (L)',field: 'InitialOpenCostLocal', aggFunc: 'sum', minWidth:160,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value>0)
    //    {
    //     return {component:decimalValue1}
    //    }
    //    else{
    //      return {component:decimalValuelse}
    //    }
    //  }
      },
     { headerName:'P&L (L)',field: 'ProfitLoss',minWidth:100,maxWidth:200,
    //  cellRendererSelector:p=>{
    //   if(p.value>0)
    //   {
    //    return {component:quantity1}
    //   }
    //   else if (p.value<0){
    //     return {component:quantityelse}
    //   }
    //   else{
    //     return
    //   }
    // }
    },
     { headerName:'Market Value (L)',field: 'MarketValueLocal', aggFunc: 'sum',minWidth:160,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value<0)
    //    {
    //     return {component:quantityelse}
    //    }
    //    else{
    //      return {component:quantity1}
    //    }
    //  }
    },
     { headerName:'Dir',field: 'LastCloseDirection' ,minWidth:80,maxWidth:200,
    // cellRendererSelector:p=>{
    //  if(p.value==='UP')
    //  {
    //    return {component:simComp}
    //  }
    //  if(p.value==='DOWN'){
    //    return {component:simCom1}
    //  }
    //  else {
    //   return{component:simelse}
    //  }
    // }
   },
     { field: 'FXRate', aggFunc: 'sum',minWidth:100,maxWidth:200,
    //  cellRendererSelector:p=>{
    //    if(p.value<0)
    //    {
    //     return {component:decimalValuelse}
    //    }
    //    else{
    //      return {component:decimalValue1}
    //    }
    //   }
   },
     { headerName:'Custodian', field: 'CustodianValue',aggFunc: 'sum' ,minWidth:120,maxWidth:200,},
       { field: 'Exchange',minWidth:120,maxWidth:200,},
       { field: 'ISIN',minWidth:100,maxWidth:200, },
       { field: 'ISO',minWidth:80,maxWidth:200, },
       { field: 'NetPrice',minWidth:110,maxWidth:200, aggFunc: 'sum',
      
      },
       { headerName:'% Day',field: 'PercentageMovementFromLastClose',aggFunc: 'sum',minWidth:100,maxWidth:200,
      //  cellRendererSelector:p=>{
      //    if(p.value<0)
      //    {
      //      return {component:percentageNAV}
      //    }
      //   else{
      //      return {component:percentagenav}
      //    }
      
      //   }
     },
       {headerName:'Market Exp (B)', field: 'MarketExposureBase' ,aggFunc: 'sum',minWidth:160,maxWidth:200,
      //  cellRendererSelector:p=>{
      //    if(p.value>0)
      //    {
      //     return {component:quantity1}
      //    }
      //    else{
      //      return {component:quantityelse}
      //    }
      //  }
   },
       { headerName:'% Exp of NAV', field:'PercentExposureOfNAV' ,aggFunc:'avg',minWidth:150,maxWidth:200,
      //  cellRendererSelector:p=>{
      //    if(p.value<0)
      //    {
      //     return {component:percentageNAV}
      //    }
      //   else{
      //      return {component:percentagenav}
      //    }
         
      //   }
     },
       {headerName:'Benchmark', field:'BenchmarkPercentOfFundNAV',minWidth:130,maxWidth:200,
      //  cellRendererSelector:p=>{
      //   if(p.value<0)
      //   {
      //     return {component:quantityelse}
      
      //   // return p.value = p.value.toFixed(this.QuantitydecimalPlaces);
      //   }
      //   else {
      //     return {component:quantity1}
      //   }
         
      //   }
      
      },
       { field: 'Lqdty',minWidth:130,maxWidth:200,
      //  cellRendererSelector:p=>{
      //   if(p.value<0)
      //   {
      //     return {component:quantityelse}
      
      //   // return p.value = p.value.toFixed(this.QuantitydecimalPlaces);
      //   }
      //   else {
      //     return {component:quantity1}
      //   }
         
      //   }
      
     },
       { field: 'Lqdty_Pos_1d', minWidth:150,maxWidth:200,
      //  cellRendererSelector:p=>{
     
      //  if (p.value<0){
      //     return {component:quantityelse}
      //   }
      //   else
      //   {
      //    return {component:quantity1}
      //   // return p.value = p.value.toFixed(this.QuantitydecimalPlaces);
      //   }
        
   
      // } 
        },
       { headerName:'P&L Excl FX',field:'ProfitLossExclFX',aggFunc: 'sum',minWidth:160,maxWidth:200,
      //  cellRendererSelector:p=>{
      //    if(p.value<0)
      //    {
      //     return {component:decimalValuelse}
      //    }
      //    else{
      //      return {component:decimalValue1}
      //    }}
     },
       { headerName:'P&L FX only',field:'ProfitLossFXOnly',aggFunc: 'sum',minWidth:160,maxWidth:200,
      //  cellRendererSelector:p=>{
      //   if(p.value<0)
      //   {
      //    return {component:decimalValue}
      //   }
      //   else
      //   {
      //     return {component:decimalValue2}
      //   }
      //  }
      
     },
       { headerName:'Net P&L (B)',field:'NetProfitLossBase',aggFunc: 'sum', minWidth:150,maxWidth:200,
      //  cellRendererSelector:p=>{
      //   if(p.value<0)
      //   {
      //    return {component:decimalValue}
      //   }
      //  else
      //   {
      //     return {component:decimalValue2}
      //   }
       
      // } 
    },
      { headerName:'Net P&L (L)',field:'ProfitLossLocalNet',aggFunc: 'sum', minWidth:150,maxWidth:200,
    //   cellRendererSelector:p=>{
    //    if(p.value<0)
    //    {
    //     return {component:decimalValue}
    //    }
    //    if(p.value>0)
    //    {
    //      return {component:decimalValue2}
    //    }
    //   else{
    //    return 
    //   }
    //  }
   },
       { field: 'Book',  suppressMenu: true,enableRowGroup: true,minWidth:120,maxWidth:200, }, 
       { field: 'Strategy',minWidth:120,maxWidth:200,},
       { field: 'PricingFactor',minWidth:150,maxWidth:200, },
       { field: 'Beta',minWidth:120,maxWidth:200,
      
      },
       { field: 'Delta',minWidth:120,maxWidth:200,},
       { field: 'EntryTimeStamp',minWidth:180,maxWidth:200,},
       { field: 'LastChangeDirection',minWidth:190,maxWidth:200,},
       { field: 'Message',minWidth:150,maxWidth:200, },
       { field: 'PositionReference',minWidth:190,maxWidth:200, },
       { field: 'SEDOL',minWidth:130,maxWidth:200,},
       { field: 'SubPriceSource',minWidth:160,maxWidth:200, },
       { headerName:'P&L (B)', field: 'ProfitLossBase',aggFunc: 'sum',minWidth:140,maxWidth:200,
      // cellRendererSelector:p=>{
      //   if(p.value<0)
      //   {
      //    return {component:decimalValue}
      //   }
      //  else
      //   {
      //     return {component:decimalValue2}
      //   }
       
      // }
    },
    { headerName:'Daily P&L (L)', field:'DailyProfitLossLocal',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    //   if(p.value>0)
    //   {
    //     return {component:decimalValue2}
    //   }
    //  else{
    //   return 
    //  }
    // }
  },
    { headerName:'Daily P&L (B)', field:'DailyProfitLossBase',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    //   if(p.value>0)
    //   {
    //     return {component:decimalValue2}
    //   }
    //  else{
    //   return 
    //  }
    // }
  },
    { headerName:'MTD P&L (L)', field: 'MTDProfitLossLocal',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    //   if(p.value>0)
    //   {
    //     return {component:decimalValue2}
    //   }
    //  else{
    //   return 
    //  }
    // }
  },
    { headerName:'MTD P&L (B)', field: 'MTDProfitLossBase',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    //   if(p.value>0)
    //   {
    //     return {component:decimalValue2}
    //   }
    //  else{
    //   return 
    //  }
    // }
  },
    { headerName:'YTD P&L (B)', field:'NetProfitLossBase',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    //   else
    //   {
    //     return {component:decimalValue2}
    //   }
   
    // }
  },
    { headerName:'YTD P&L (L)', field:'ProfitLossLocalNet',aggFunc: 'sum',minWidth:140,maxWidth:200,
    // cellRendererSelector:p=>{
    //   if(p.value<0)
    //   {
    //    return {component:decimalValue}
    //   }
    // else
    //   {
    //     return {component:decimalValue2}
    //   }
    
    // }
  }

   ]
   //DefaultColDef sets props common to all Columns
   public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 140,
    enableRowGroup: true,
    autoHeight:false,
    
   
   }
  gridColumnApi: any;

 formatNumber(number:any) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
// public  gridColumnApi!: ColumnApi;
  

    isForceRefreshSelected() {
    return (document.querySelector('#forceRefresh') as HTMLInputElement).checked;
  }
   isSuppressFlashSelected() {
    return (document.querySelector('#suppressFlash') as HTMLInputElement).checked;
  }
   public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
   public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';

   public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.fundList;
  };

   public autoGroupColumnDef: ColDef = {
     field:'Quantity',
    
    // item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
   
    //  aggFunc:params=>{
    //   let total=0;
    //   params.values.forEach(value=> total+=value);
    //   return total;
    //  }
   //  sideBar: 'columns'
  
   };
   public aggFuncs: {
     [key: string]: IAggFunc;
   } = {
     mySum: (params: IAggFuncParams) => {
       let sum = 0;
       params.values.forEach((value: number) => (sum += value));
       return sum;
     },
   };
 public avgAggFunction: {
   [key: string]: IAggFunc;
 } = {
 myavg:(params: IAggFuncParams)=>{
   // the average will be the sum / count
   let sum = 0;
   let count = 0;
   params.values.forEach((value) => {
     const groupNode =
       value !== null && value !== undefined && typeof value === 'object';
     if (groupNode) {
       sum += value.avg * value.count;
       count += value.count;
     } else {
       if (typeof value === 'number') {
         sum += value;
         count++;
       }
     }
   });
   let avg = null;
   if (count !== 0) {
     avg = sum / count;
   }
   const result = {
     count: count,
     avg: avg,
     toString: function () {
       return `${this.avg}`;
     },
   };
   return result;
 }}
   public groupAggFiltering: boolean | IsRowFilterable = (params) =>
     !!params.node.group;
  
     public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
   //public groupDisplayType: RowGroupingDisplayType = 'singleColumn';
  // getColumnGroup=' BenchmarkPercentOfFundNAV';
  
   // Data that gets displayed in the grid
  public rowData: any;

   apiresponse: any;

  constructor(private http: HttpClient, private service: GetDataService,private Dialog: MatDialog,private loaderService: LoderServiceService,private columnService: ColumnServiceService) { }
  ngOnInit(): void {
   
  

      this.columnService.getDecimals().subscribe
      ({
        next: (message) => {
          this.decimalPlaces = message;
         
          if (localStorage.getItem("Quantity") != null && localStorage.getItem("Quantity") != undefined && localStorage.getItem("Quantity") != " ") {
            this.QuantitydecimalPlaces = Number(localStorage.getItem('Quantity'));
          }
          if (localStorage.getItem("Cost Price") != null && localStorage.getItem("Cost Price") != undefined && localStorage.getItem("Cost Price") != " ") {
            this.CostPricedecimalPlaces = Number(localStorage.getItem('Cost Price'));
          }
          if (localStorage.getItem("Current Price") != null && localStorage.getItem("Current Price") != undefined && localStorage.getItem("Current Price") != " ") {
            this.CurrentPricedecimalPlaces = Number(localStorage.getItem('Current Price'));
          }
          if (localStorage.getItem("Market Value (B)") != null && localStorage.getItem("Market Value (B)") != undefined && localStorage.getItem("Market Value (B)") != " ") {
            this.MarketValueBasedecimalPlaces = Number(localStorage.getItem('MarketValue(B)'));
          }
          if (localStorage.getItem("Opening Cost (B)") != null && localStorage.getItem("Opening Cost (B)") != undefined && localStorage.getItem("Opening Cost (B)") != " ") {
            this.OpeningCostBasedecimalPlaces = Number(localStorage.getItem('Opening Cost (B)'));
          }
          if (localStorage.getItem("Market Value (L)") != null && localStorage.getItem("Market Value (L)") != undefined && localStorage.getItem("Market Value (L)") != " ") {
            this.MarketValueLocaldecimalPlaces = Number(localStorage.getItem('Market Value (L)'));
          }
          if (localStorage.getItem("FX Rate") != null && localStorage.getItem("FX Rate") != undefined && localStorage.getItem("FX Rate") != " ") {
            this.FXRatedecimalPlaces = Number(localStorage.getItem('FX Rate'));
          }
          if (localStorage.getItem("Net Price") != null && localStorage.getItem("Net Price") != undefined && localStorage.getItem("Net Price") != " ") {
            this.NetPricedecimalPlaces = Number(localStorage.getItem('Net Price'));
          }
          if (localStorage.getItem("P&L (L)") != null && localStorage.getItem("P&L (L)") != undefined && localStorage.getItem("P&L (L)") != " ") {
            this.PandLLocaldecimalPlaces = Number(localStorage.getItem('P&L (L)'));
          }
          if (localStorage.getItem("% Day") != null && localStorage.getItem("% Day") != undefined && localStorage.getItem("% Day") != " ") {
            this.PercentDaydecimalPlaces = Number(localStorage.getItem('% Day'));
          }
          if (localStorage.getItem("Market Exp (B)") != null && localStorage.getItem("Market Exp (B)") != undefined && localStorage.getItem("Market Exp (B)") != " ") {
            this.MarketExposurBdecimalPlaces = Number(localStorage.getItem('Market Exp (B)'));
          }
          if (localStorage.getItem("% Exp of NAV") != null && localStorage.getItem("% Exp of NAV") != undefined && localStorage.getItem("% Exp of NAV") != " ") {
            this.percentExpOfNavdecimalPlaces = Number(localStorage.getItem('% Exp of NAV'));
          }
          if (localStorage.getItem("P&L Excl FX") != null && localStorage.getItem("P&L Excl FX") != undefined && localStorage.getItem("P&L Excl FX") != " ") {
            this.PandLExclFxdecimalPlaces = Number(localStorage.getItem('P&L Excl FX'));
          }
          if (localStorage.getItem("Initial Cost (B)") != null && localStorage.getItem("Initial Cost (B)") != undefined && localStorage.getItem("Initial Cost (B)") != " ") {
            this.InitialCostbasedecimalPlaces = Number(localStorage.getItem('Initial Cost (B)'));
          }
          if (localStorage.getItem("Initial Cost (L)") != null && localStorage.getItem("Initial Cost (L)") != undefined && localStorage.getItem("Initial Cost (L)") != " ") {
            this.InitialCostLocaldecimalPlaces = Number(localStorage.getItem('Initial Cost (L)'));
          }
          if (localStorage.getItem("P&L (B)") != null && localStorage.getItem("P&L (B)") != undefined && localStorage.getItem("P&L (B)") != " ") {
            this.PandlbasedecimalPlaces = Number(localStorage.getItem('P&L (B)'));
          }
          if (localStorage.getItem("Net P&L (B)") != null && localStorage.getItem("Net P&L (B)") != undefined && localStorage.getItem("Net P&L (B)") != " ") {
            this.NetPandLbasedecimalPlaces = Number(localStorage.getItem('Net P&L (B)'));
          }
          if (localStorage.getItem("Lqdty") != null && localStorage.getItem("Lqdty") != undefined && localStorage.getItem("Lqdty") != " ") {
            this.LqdtydecimalPlaces = Number(localStorage.getItem('Lqdty'));
          }
          if (localStorage.getItem("Lqdty 1d") != null && localStorage.getItem("Lqdty 1d") != undefined && localStorage.getItem("Lqdty 1d") != " ") {
            this.Lqdty1ddecimalPlaces = Number(localStorage.getItem('Lqdty 1d'));
          }
          if (localStorage.getItem("P&L FX only") != null && localStorage.getItem("P&L FX only") != undefined && localStorage.getItem("P&L FX only") != " ") {
            this.PandLExclFxOnlydecimalPlaces = Number(localStorage.getItem('P&L FX only'));
          }
         
          }
      })
      this.username = window.atob(localStorage.getItem('token') || '').toString().split(':')[0];
         this.token = localStorage.getItem('token') || '';

            setTimeout(() => {
              this.service.loadConfig()
            .subscribe({
              next: (res) => {
                this.service.baseUrl = res.baseUrl;
                var uniqueid = this.username + '_' + Math.random().toString(36).substring(2, 9);
                this.service.getAllFunds(this.username+'/'+uniqueid, this.token)
                  .subscribe(
                    {
                      next: (res) => {
                        if (this.activeFundId == -1)
                          this.activeFundId = Number(localStorage.getItem('fundId')) || -1;
                        for (let fund of res) {
                          if (fund.FundGroupID == this.activeFundId) {
                            this.activeFundName = fund.FundGroupName;
                            this.activeFundId = fund.FundGroupID;
                            break;
                          }
                        }
                        if(this.activeFundId == -1) {
                          this.activeFundId = res[0].FundGroupID;
                          this.activeFundName = res[0].FundGroupName;
                        }
                        this.fundList = res; //data into fund list
                        //this.myGrid.showloadelement();
                     // this.interval=setInterval(()=>{
                      this.getPositions();  //first call

                     // this.restoreState();
                        // this.gridColumnApi.applyColumnState({
                        //   //state: window.colState,
                        //   state: JSON.parse(localStorage.getItem('colState')),
                        //   applyOrder: true,
                        // });
                      
                    //  this.saveState();
                     // console.log(localStorage.getItem('rowData'));
                     //localStorage.setItem('grid',JSON.stringify(this.gridColumn));
                        //  localStorage.getItem('gridColumn')
                      //localStorage.getItem('colState');
                    // window.localStorage.getItem('colState');
                    //  const savedState=this.gridColumn.getColumnState();
                     // this.gridColumn.applyColumnState({state:savedState});
                    
                      //},1000)

                     // clearInterval(this.interval);
                        //api.applyTransaction({ update: this.getPositions()});
                         //this.getPositions();
                       this.apiInterval
                     .subscribe(() => {
                        if (!this.apiRunning) {
                         console.log("interval running")
                         this.getPositions();
                           var params = {
            force: this.isForceRefreshSelected(),
          suppressFlash: this.isSuppressFlashSelected(),
          };
          this.gridApi.refreshCells(params);
                      //     // const savedState=this.gridColumnApi.getColumnState();
                      //    // this.gridColumnApi.applyColumnState({state:savedState});
                      //    // localStorage.getItem('gridColumn');
                         }
                        }
                      )
                        //var dd = JSON.stringify(storeObj); var cc = JSON.parse(dd).FundGroupName; alert(cc);
                        //var dd = JSON.stringify(storeObj); var cc = JSON.parse(dd).FundGroupName; alert(cc);
                      },
                      error: (error) => {
                        this.isloader = 'false';
                        alert(error);
                        console.log(error);
                      }
                    }
                  );
              }
            })
            }, 0);
  }
  getPositions() {
    console.log("getpostions starts")
    //this.isloader='true';
 
    this.service.getpositions(this.activeFundId, this.activeMode, this.token)
      .subscribe(
        {
          next: (res) => {
            //delay(10000);
            //this.myGrid.hideloadelement();
            console.log("getposition success", res[0])
            this.positions = res;

  
            
            for (let item of this.positions) {
              if (item.PositionClass == 'S') {
                item.PositionClass = "S";
              }
              
              // eGui: HTMLDivElement | undefined;
              // init(params:any){
              //   this.eGui=document.createElement('div');
              //   this.eGui.innerHTML=`
              //   <div style="color:red;">${'('+formatNumber(params.value * -1)+  ')'} </div>
              //   <span>${params.value}</span>`
              //  // item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
              //  // return '(' + params.value + ')';
              // }
              // getGui(){
              //   return this.eGui;
              // }
              // refresh(){
              //   return false;
              // }
              // destroy(){
              // }              
             
              //  else {
              // item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
              //  }
              //item.Quantity= formatNumber(item.Quantity);
             
           // item.Quantity=item.Quantity;
            // function sumFunction(params: IAggFuncParams) {
            //   let result = 0;
            //   params.values.forEach((value) => {
            //     if (item.Quantity === 'number') {
            //       result += value;
            //     }
            //   });
            //   return result;
            // }
            // const gridOptions={
          
            //     {
            //     field:'Quantity',
            //   this.aggFuncs:params=>{
            //     let total=0;
            //     params.values.forEach(value=>total+=value);
            //     return total
            //   }
               

            //     }
            //   ]
            // } 
           
       
            // if (item.Quantity < 0) {
             
              //item.Quantity='('+ (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces).toString().split(".") + ')';

              //item.Quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
             // item.Quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // function formatNumber(number:any) {
                //   var parts = number.toString().split(".");
                //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //   return parts.join(".");
                // }
             // item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
              
                
              
              //item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
            // }
            // else {
            //   //item.Quantity = formatNumber(item.Quantity.toFixed(this.QuantitydecimalPlaces));
              
            // }
            //item.Quantity = item.Quantity;
        //  formatNumber(number:any,parts:any) {
        //       item.Quantity =  (item.Quantity * -1).toString().split(".") ;
        //       // var parts = number.toString().split(".");
        //         item.Quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //         return parts.join(".");
        //     }
            // item.Quantity=(item.Quantity*-1);
            // if (item.Quantity >= 0) {
             
            //  // result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  item.Quantity.toString()+'</div>';
               
            //  }
          //  else {
               
          //      result =  '<div class="" style="margin-top: 9.5px;">'+'('+(item.Quantity * (-1)).toString()+')'+'</div>' ;
          //    }
         
              // var  sum=0;
              // sum +=parseFloat(item.Quantity);
              //   sum.toFixed(this.QuantitydecimalPlaces)
              // var sum=0;
             
              //    if(item.Quantity<0)
              //     {
              //      sum +=parseFloat(item.Quantity);
              //      item.Quantity= '('+(item.Quantity * -1).
              //          toFixed(this.QuantitydecimalPlaces )
              //          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ ')';
              //          }
                  //  item.Quantity= sum.toFixed(this.QuantitydecimalPlaces ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                 // above lines do not return total

             
                 // sum+=parseFloat(item.Quantity);
              
                 //item.Quantity.tofixed(this.QuantitydecimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
             // item.Quantity= sum.toFixed(this.QuantitydecimalPlaces )
             //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                 // }
                 
                        // else{
                        //   sum+=parseFloat(item.Quantity);
                        //   item.Quantity= sum.toFixed(this.QuantitydecimalPlaces );
                        //   item.Quantity=  item.Quantity.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          ///sum+=parseFloat(item.Quantity);
                          //item.Quantity=  item.Quantity.tofixed(this.QuantitydecimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                       // }
        // '<div>'  +'('+(item.Quantity * -1).toFixed(this.QuantitydecimalPlaces)+')'+'</div>'




              if (item.CostPrice < 0) {
                //item.CostPrice = "(" + (item.CostPrice * -1).toFixed(this.CostPricedecimalPlaces) + ")";
                //item.CostPrice = item.CostPrice.toFixed(this.CostPricedecimalPlaces);
              }
              else {
               //item.CostPrice = item.CostPrice.toFixed(this.CostPricedecimalPlaces);
              }

              if (item.BaseValue < 0) {
               // item.BaseValue = "(" + (item.BaseValue * -1).toFixed(this.MarketValueBasedecimalPlaces) + ")";
              //  item.BaseValue = item.BaseValue.toFixed(this.MarketValueBasedecimalPlaces);
              }
              else {
               // item.BaseValue = item.BaseValue.toFixed(this.MarketValueBasedecimalPlaces);
              }

              if (item.OpeningCostBase < 0) {
                //item.OpeningCostBase = "(" + (item.OpeningCostBase * -1).toFixed(this.OpeningCostBasedecimalPlaces) + ")";
               // item.OpeningCostBase = item.OpeningCostBase.toFixed(this.OpeningCostBasedecimalPlaces);
              }
              else {
               // item.OpeningCostBase = item.OpeningCostBase.toFixed(this.OpeningCostBasedecimalPlaces);
              }
              if (item.MarketExposureBase < 0) {
                //item.MarketExposureBase = "(" + (item.MarketExposureBase * -1).toFixed(this.MarketExposurBdecimalPlaces) + ")";
               // item.MarketExposureBase = item.MarketExposureBase.toFixed(this.MarketExposurBdecimalPlaces);
              }
              else {
              //  item.MarketExposureBase = item.MarketExposureBase.toFixed(this.MarketExposurBdecimalPlaces);
              }
              if (item.InitialOpenCostLocal < 0) {
               // item.InitialOpenCostLocal = "(" + (item.InitialOpenCostLocal * -1).toFixed(this.InitialCostLocaldecimalPlaces) + ")";
               // item.InitialOpenCostLocal = item.InitialOpenCostLocal.toFixed(this.InitialCostLocaldecimalPlaces);
              }
              else {
              //  item.InitialOpenCostLocal = item.InitialOpenCostLocal.toFixed(this.InitialCostLocaldecimalPlaces);
              }

              if (item.InitialOpenCostBase < 0) {
               // item.InitialOpenCostBase = "(" + (item.InitialOpenCostBase * -1).toFixed(this.InitialCostbasedecimalPlaces) + ")";
               // item.InitialOpenCostBase = item.InitialOpenCostBase.toFixed(this.InitialCostbasedecimalPlaces);
              }
              else {
               // item.InitialOpenCostBase = item.InitialOpenCostBase.toFixed(this.InitialCostbasedecimalPlaces);
              }

              if (item.ProfitLossBase < 0) {
                //item.ProfitLossBase = "(" + (item.ProfitLossBase * -1).toFixed(this.PandlbasedecimalPlaces) + ")";
               // item.ProfitLossBase = (item.ProfitLossBase).toFixed(this.PandlbasedecimalPlaces);
              }
              else {
               // item.ProfitLossBase = (item.ProfitLossBase).toFixed(this.PandlbasedecimalPlaces);
              }

              if (item.MarketValueLocal < 0) {
               // item.MarketValueLocal = "(" + (item.MarketValueLocal * -1).toFixed(this.MarketValueLocaldecimalPlaces) + ")";
              //  item.MarketValueLocal = (item.MarketValueLocal).toFixed(this.MarketValueLocaldecimalPlaces);
              }
              else {
               // item.MarketValueLocal = (item.MarketValueLocal).toFixed(this.MarketValueLocaldecimalPlaces);
              }

            //   if (item.LastCloseDirection == 'UP') {
            //  item.LastCloseDirection = '▲' 
            //   }
            //   else {
            //     if (item.LastCloseDirection == 'DOWN') {
            //       item.LastCloseDirection = '▼'
            //     }
            //     else {
            //       item.LastCloseDirection = '--'
            //     }
            //   }

              if (item.FXRate < 0) {
                //item.FXRate = "(" + (item.FXRate * -1).toFixed(this.FXRatedecimalPlaces) + ")";
              //  item.FXRate = item.FXRate.toFixed(this.FXRatedecimalPlaces);
              }
              else {
               // item.FXRate = item.FXRate.toFixed(this.FXRatedecimalPlaces);
              }
              if (item.ProfitLoss < 0) {
                //item.ProfitLoss = "(" + (item.ProfitLoss * -1).toFixed(this.PandLLocaldecimalPlaces) + ")";
              // item.ProfitLoss = item.ProfitLoss.toFixed(this.PandLLocaldecimalPlaces)
              }
              else {
               // item.ProfitLoss = item.ProfitLoss.toFixed(this.PandLLocaldecimalPlaces)
              }
              if (item.PercentageMovementFromLastClose < 0) {
                //item.PercentageMovementFromLastClose = "(" + (item.PercentageMovementFromLastClose * -1).toFixed(this.PercentDaydecimalPlaces) + ")";
               // item.PercentageMovementFromLastClose = item.PercentageMovementFromLastClose.toFixed(this.PercentDaydecimalPlaces);
              }
              else {
              //  item.PercentageMovementFromLastClose = item.PercentageMovementFromLastClose.toFixed(this.PercentDaydecimalPlaces);
              }
              if (item.PercentExposureOfNAV < 0) {
                //item.PercentExposureOfNAV = "(" + (item.PercentExposureOfNAV * -1).toFixed(this.percentExpOfNavdecimalPlaces) + ")";
               // item.PercentExposureOfNAV = item.PercentExposureOfNAV.toFixed(this.percentExpOfNavdecimalPlaces);
              }
              else {
               // item.PercentExposureOfNAV = item.PercentExposureOfNAV.toFixed(this.percentExpOfNavdecimalPlaces);
              }
             // item.CurrentPrice = item.CurrentPrice.toFixed(this.CurrentPricedecimalPlaces);
             // item.Lqdty = item.Lqdty.toFixed(this.LqdtydecimalPlaces);
             // item.Lqdty_Pos_1d = item.Lqdty_Pos_1d.toFixed(this.Lqdty1ddecimalPlaces);
              if (item.NetProfitLossBase < 0) {
                //item.NetProfitLossBase = "(" + (item.NetProfitLossBase * -1).toFixed(this.NetPandLbasedecimalPlaces) + ")";
             //   item.NetProfitLossBase = item.NetProfitLossBase.toFixed(this.PandlbasedecimalPlaces);
              }
              else {
              //  item.NetProfitLossBase = item.NetProfitLossBase.toFixed(this.PandlbasedecimalPlaces);
              }
              if (item.ProfitLossFXOnly < 0) {
                //item.ProfitLossFXOnly = "(" + (item.ProfitLossFXOnly * -1).toFixed(this.PandLExclFxOnlydecimalPlaces) + ")";
              //  item.ProfitLossFXOnly = (item.ProfitLossFXOnly * 1).toFixed(this.PandLExclFxOnlydecimalPlaces);
              }
              else {
             //   item.ProfitLossFXOnly = (item.ProfitLossFXOnly * 1).toFixed(this.PandLExclFxOnlydecimalPlaces);
              }
              if (item.ProfitLossExclFX < 0) {
                //item.ProfitLossExclFX = "(" + (item.ProfitLossExclFX * -1).toFixed(this.PandLExclFxdecimalPlaces) + ")";
               // item.ProfitLossExclFX = item.ProfitLossExclFX.toFixed(this.PandLExclFxdecimalPlaces);
              }
              else {
              //  item.ProfitLossExclFX = item.ProfitLossExclFX.toFixed(this.PandLExclFxdecimalPlaces);
              }
            }
          this.rowData=this.positions;  //binding data with grid
          // this.gridColumn=this.rowData;
          setTimeout(() => {
            this.apiRunning = false;

            if(!this.IsfundChanged)
            {
              this.isloader = 'false';
              this.loaderService.isLoading.next('false')
            }
            else
            {
              this.IsfundChanged=false;
            }
          }, 500); 
              
          // localStorage.setItem('grid',JSON.stringify(this.gridColumn));
          // localStorage.getItem('gridColumn');
          //const savedState=this.gridOptions.columnApi.getColumnState();
       
         // window.colState=this.gridColumnAPi.getColumnGroupState();
         // console.log("group state saved",window.groupState);
        
        // this.rowData=this.gridColumn.getColumnGroupState(); 
      // this.gridColumn.setColumnGroupState(window.groupState);
          // var params = {
          //   force: this.isForceRefreshSelected(),
          //  // suppressFlash: this.isSuppressFlashSelected(),
          // };
          // this.gridApi.refreshCells(params);
        //this.gridApi=res;
        //  this.rowData=this.gridApi.getColumnDefs();
          //       console.log("Update cell should starts")
         //this.rowData=this.gridApi.setColumnDefs(this.positions);
          //       console.log("Update cell should complete")
            console.log("Position of the fund load sucessfully")
           // this.getPositions();
        //     this.apiInterval.subscribe(x => {
        //       this.getPositions();
        //       //localStorage.setItem('grid',JSON.stringify(this.gridColumn));

        //   //  const savedState=this.gridColumnApi.getColumnState();
        //  // this.gridColumnApi.applyColumnState({state:savedState});
        //       }
            
        //      )
        //     // localStorage.setItem(this.rowData,'columnDefs')
             //this.myitem=localStorage.getItem(this.rowData);

            // this.isloader.next("false");
            //this.myGrid.autoresizecolumns('Fund');
            //this.myGrid.exportdata('pdf', 'jqxGrid');
            //this.myGrid.showloadelement();
          },
          error: (error) => {
            this.isloader = 'false';
            alert(error);
            console.log(error);
          }
        }
      );
      console.log("getperformance starts")
      this.service.getFundperformance(this.activeFundId, this.activeMode, this.token)
        .subscribe(
          {
            next: (data) => {
              console.log("getperformance success")
              this.fundPerformance = data[0];
              if (Math.round(data[0].CurrentNAV) >= 0)
                this.fundPerformance.CurrentNAV = Math.round(data[0].CurrentNAV);
              else
                this.fundPerformance.CurrentNAV = Math.round(data[0].CurrentNAV) * -1;
                setTimeout(() => {
                  this.apiRunning = false;

                  if(!this.IsfundChanged)
                  {
                    this.isloader = 'false';
                    this.loaderService.isLoading.next('false')
                  }
                  else
                  {
                    this.IsfundChanged=false;
                  }
                }, 500);
            },
            error: (error) => {
              this.isloader = 'false';
              alert(error);
              console.log(error);
            }
          }
        )
  }


  openDialog() {
    this.Dialog.open(ChangeFundDialogComponent, {
      width: '300px',
      panelClass: 'dialog-container-custom',
      data: {
        fundlist: this.fundList,
        activeMode: this.activeMode,
        activeFundId: this.activeFundId,
        activeFundname: this.activeFundName,
      }
    }).afterClosed().subscribe(
      (     
         result: { selectedFundId: any; selectedMode: any; }) => {
        this.panelOpenState=false;
        this.activeFundId = result.selectedFundId;
        this.activeMode = result.selectedMode;
        this.loaderService.isLoading.next('true')
        this.loaderService.getLoader().subscribe(
          (          message: any) => {
            this.isloader = message;
          }
        );
        //this.IsfundChanged=true;
        this.getPositions(); //
        for (let fund of this.fundList) {
          if (this.activeFundId === fund.FundGroupID) {
            this.activeFundName = fund.FundGroupName;
            break;
          }
        }
      }
    )
  }
//   onNormalUpdate(){
//     var startMillis = new Date().getTime();
//    console.log('Running Transaction');
//    var api = this.gridApi!;
//    for (var i = 0; i < UPDATE_COUNT; i++) {
//     setTimeout(function () {
//       // pick one index at random
//       var index = Math.floor(Math.random() * this.getpositions.length);
//       var itemToUpdate = this.getpositions[index];
//       var newItem = copyObject(itemToUpdate);
//       // copy previous to current value
//       newItem.previous = newItem.current;
//       // then create new current value
//       newItem.current = Math.floor(Math.random() * 100000) + 100;
//       // do normal update. update is done before method returns
//       api.applyTransaction({ update: [newItem] });
//     }, 0);
  
//    }
//   onAsyncUpdate() {
//     var startMillis = new Date().getTime();
//     console.log('Running Async');
//     var updatedCount = 0;
//     var UPDATE_COUNT=200;
//     var api = this.gridApi!;
//     for (var i = 0; i < UPDATE_COUNT; i++) {
//       setTimeout(function () {
//         // pick one index at random
//         var index = Math.floor(Math.random() );
//         var itemToUpdate = [index];
//         var newItem = copyObject(itemToUpdate);
//         // copy previous to current value
//         newItem.previous = newItem.current;
//         // then create new current value
//         newItem.current = Math.floor(Math.random() * 100000) + 100;
//         // update using async method. passing the callback is
//         // optional, we are doing it here so we know when the update
//         // was processed by the grid.
//         api.applyTransactionAsync({ update: [newItem] }, resultCallback);
//       }, 0);
//     }
//     function resultCallback() {
//       updatedCount++;
//       if (updatedCount === UPDATE_COUNT) {
//         // print message in next VM turn to allow browser to refresh
//         setTimeout(function () {
//           var endMillis = new Date().getTime();
//           var duration = endMillis - startMillis;
//           console.log('Async took ' + duration.toLocaleString() + 'ms');
//         }, 0);
//       }

//   }
// }
// }

// getGridColApi()
// {
//   return this.gridColumnApi;
// }


  onGridReady(params: GridReadyEvent) {

 // this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  //this.gridApi.setDomLayout("autoHeight");

  // this.gridApi.flashCells({columns:[]});
   //this.immutableStore = this.rowData;
   //this.immutableStore=this.getPositions();
   //immutableStore = getInitialData();
   //params.api.setRowData(this.immutableStore);
//this.gridApi.applyTransactionAsync(this.rowData);
   //this.gridApi.setRowData(this.rowData);
  
  }
 
  saveState() {
   // window.colState = this.gridColumnApi.getColumnState();
const colState=this.gridColumnApi.getColumnState();
// this.gridColumnApi.applyColumnState({state:colState});
localStorage.setItem('colState', JSON.stringify(colState));
 console.log('column state saved');
  }

   restoreState() {
    this.gridColumnApi.applyColumnState({
      //state: window.colState,
      state: JSON.parse(localStorage.getItem('colState')),
      applyOrder: true,
    });
    console.log('column state restored');
}


    //localStorage.setItem('grid',JSON.stringify(colState))
//     // const colState=this.gridColumn.getColumnState();
//     // this.gridColumn.applyColumnState({state:colState});
//     // localStorage.getItem('gridColumn')
//    // window.colState = this.gridColumn.getColumnGroupState();
//     //console.log('group state saved', window.colState);
//    // console.log('column state saved');
// this.rowData=this.positions;  //binding data from grid
// this.gridColumn=this.rowData;
  
// this.state = JSON.stringify(this.gridColumn.getColumnState());

// localStorage.setItem('grid',JSON.stringify(this.gridColumn));
// localStorage.getItem('gridColumn');
//   this.gridState = this.state;
//   localStorage.getItem(this.gridState);
//  // localStorage['Mode'] = this.myMode.favorite;

//   for (var i = 0; i < this.FundGroups.length; i++) {
//       if (this.FundGroups[i].FundGroupID === this.fundListValue.FundGroupID)
//           this.fundListValue.FundGroupName = this.FundGroups[i].FundGroupName;
//       else
//           continue;
//   this.storeObj["FundGroupID"] = this.fundListValue.FundGroupID;
//   this.storeObj["FundGroupName"] = this.fundListValue.FundGroupName;
//     localStorage['Fund'].JSON.stringify(this.storeObj);
//   }

resetState() {
  this.gridColumnApi.resetColumnState();

  console.log('column state reset');
}



// additems(append:boolean)
// {
// const newStore=this.immutableStore.slice();
// for(let i=0;i<500;i++)
// {
 
//  if(append)
//  {
//   newStore.push(this.newItem);
//  }
//  else{
//   newStore.splice(0,0,this.newItem);
//  }
// }
// this.immutableStore=newStore;
// this.gridOptions.api.setRowData(this.immutableStore);
// }

  //  restoreState() {
  //   const colState=this.gridColumn.getColumnState();
   

  // //   const colState=this.gridColumn.getColumnState();
  // if (!colState) {
  //      console.log('no columns state to restore by, you must save state first');
  //     return;
  //    }
  //   this.gridColumn.applyColumnState({
  //    state: colState,
  //   applyOrder: true,
  //   });
  // console.log('column state restored');
  // // }
  // // resetState() {
  // //   this.gridColumn.resetColumnState();
  // //   console.log('column state reset');
  // }
//  copyObject(object: any) {
//     // start with new object
//     newObject: any = {};
//     // copy in the old values
//     Object.keys(object).forEach(function (key) {
//       newObject[key] = object[key];
//     });
//     return newObject;
//   }


  // clearSelection(): void {
  //   this.agGrid.api.deselectAll();
  // }
  // onBtExport() {
  //   this.gridApi.exportDataAsExcel();
  // }

  // onCellClicked( e: CellClickedEvent): void {
  //   console.log('cellClicked', e);
  // }
//   getWidthforPandL(): any {
//     if (document.body.offsetWidth < 1366) {
//       this.resolution='low';
//       return 'low';
//     }
//     this.resolution='ok';
//     return 'ok';
//   }
//   valueChanged(event: any): void {
//     this.HorizontalDiv.nativeElement.innerText = 'Horizontal (' + parseInt(event.currentValue) + ')';
// };

  }
