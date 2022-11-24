import { Component, OnInit, ViewChild,ViewEncapsulation,ElementRef} from '@angular/core';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LoderServiceService } from 'src/app/Services/Loader/loder-service.service';
import { ChangeFundDialogComponent } from '../PopUps/change-fund-dialog/change-fund-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridReadyEvent,RowStyle,RowClassParams,GridApi,ColGroupDef,
  RowGroupingDisplayType,ColumnGroup,ColumnApi,Column,SideBarDef,IAggFunc,IAggFuncParams,IsRowFilterable,ICellRendererParams,ICellRenderer,ValueFormatterParams, ValueCache } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from 'src/app/Services/webServices/get-data.service';
import 'ag-grid-enterprise'
import{RowDataTransaction} from 'ag-grid-community/dist/lib/interfaces/rowDataTransaction'
import { CustompinnedrowrendererComponent } from '../custompinnedrowrenderer/custompinnedrowrenderer.component';
import { positions } from '../Interface/positions.interface';
import { Funds } from '../Interface/all-funds.interface';
import { FundPerformance } from '../Interface/fund-performance.inteface';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { columns } from '../Interface/columns.interface';
import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-14_January_2023_[v2]_MTY3MzY1NDQwMDAwMA==908f41c5add31c9c0ea87d7f54a17956');

declare var window: any;
declare var localStorage: any;
const simplecomp=(params: { value: any; })=>params.value;

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
class decimalValue1{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:green;">
    ${formatNumber(params.value)} </div>
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
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
     <div>${'('+formatNumber(params.value * -1)+ ')'} </div>
    
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
class quantityelse{
  eGui: HTMLDivElement | undefined;
  init(params:any){
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
     <div>${formatNumber(params.value * 1)} </div>
    
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
class percentageNAV{
  eGui: HTMLDivElement | undefined;
  init(params:any){
   
    this.eGui=document.createElement('div');
    this.eGui.innerHTML=`
    <div style="color:red;">${'('+formatNumber(params.value * -1)+  ')'} </div>
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
    <div style="color:green;">${+formatNumber(params.value)} </div>
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


const _randNum = (size: number) => Math.random() * size;
const _generateNum = () => parseFloat((_randNum(89) + 10).toFixed(2));
const _generateCurrency = () => parseFloat((_randNum(89999) + 1000).toFixed(4));
const _generateString = () => {
  var choices = [''];
  return choices[Math.round(_randNum(4))];
};

function bracketsFormatter(params: ValueFormatterParams) {
  return '(' + params.value + ')';
}
function currencyFormatter(params: ValueFormatterParams) {
  return  formatNumber(params.value) ;
}

// function formatNumber(number: any) {
//   return Math.floor(number)
//     .toString()
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,');
// }
function formatNumber(number:any) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function createRowData(maxRows: number) {
  let rowData = [];
  for (var i = 0; i < maxRows; i++) {
    var row = {
     // Quantity: _generateNum(),
      string: _generateString(),
      QuantitydecimalPlaces: _generateCurrency()
      
    };
    rowData.push(row);
  }
  return rowData;
}
@Component({
  selector: 'app-demo-component',
  templateUrl: './position-demo.component.html',
  styleUrls: ['./position-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class positionDemoComponent implements OnInit {
  //showImage:boolean;
  private frameworkComponents:any;
  private gridApi!: GridApi<positions>;
  checking: string = 'default';
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
 // apiInterval = interval(1000);
  intervalID=setInterval
  //dataAdapter: any;
  data!: any[][];
  columns!: any[];
  username!: string;
  token!: string;
  decimalPlaces: any = 2;
  QuantitydecimalPlaces: any = 3;
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

  @ViewChild('myGrid', { static: false, }) myGrid!:GridApi ;
  @ViewChild('HorizontalDiv', { static: false }) HorizontalDiv!: ElementRef;
  @ViewChild('groupNum', { static: false }) groupNum!: ElementRef;
  @ViewChild('expandedGroup', { static: false }) expandedGroup!: ElementRef;
  @ViewChild('collapsedGroup', { static: false }) collapsedGroup!: ElementRef;
  
  
  public columnDefs: (ColDef|ColGroupDef)[] = [
   
   // {headerName:'Fund',field:'FundName'},
    {headerName:'Type',field:'ProductType'},
    {headerName:'Identifier',field:'ProductID'},
    {headerName:'Description',field:'ProductDescription'},
    {headerName:'L/S',field:'PositionClass',
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
    {headerName:'Quantity', field: 'Quantity',
  aggFunc: 'sum',
  cellRendererSelector:p=>{
    if(p.value<0)
    {
     return {component:quantity1}
    }
    else{
      return {component:quantityelse}
    }
  }
},
    { headerName:'CCY',field: 'PricingCurrency'  },
    {headerName:'CCY (S)', field: 'SettleCurrency' },
    { field: 'CostPrice',
    aggFunc: 'sum',
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
   
  },
    { field: 'CurrentPrice',aggFunc: 'sum',
  // cellStyle:params=>{
  //   return {color:'red',background:'olive'}
  // }
 // return null;

 
  },
    { headerName:'Market Value (B)',field: 'BaseValue',
    aggFunc: 'sum',
    minWidth:160,maxWidth:200,
    valueFormatter:currencyFormatter,
    // cellStyle:params=>{
    //   return {color:'red'}
    // },
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
  },
    { headerName:'Opening Cost (B)',field: 'OpeningCostBase',
    aggFunc: 'sum', 
    valueFormatter:currencyFormatter,
    minWidth:160,maxWidth:200,
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
   },
    { headerName:'Initial Cost (B)',field: 'InitialOpenCostBase',
    aggFunc: 'sum',
    valueFormatter:currencyFormatter,   
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
    },
    { headerName:'Initial Cost (L)',field: 'InitialOpenCostLocal',
     aggFunc: 'sum',
     valueFormatter:currencyFormatter, 
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
     },
    { headerName:'Market Value (L)', field: 'MarketValueLocal', 
    aggFunc: 'sum',
    valueFormatter:currencyFormatter,
    minWidth:160,maxWidth:200,
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:quantity1}
      }
      else{
        return {component:quantityelse}
      }
    }
   },
    { headerName:'Dir',field: 'LastCloseDirection' ,
   cellRendererSelector:p=>{
    if(p.value==='UP')
    {
      return {component:simComp}
    }
    if(p.value==='DOWN'){
      return {component:simCom1}
    }
    else {
     return{component:simelse}
    }
   }
  },
    { field: 'FXRate', aggFunc: 'sum',
    cellRendererSelector:p=>{
      if(p.value<0)
      {
       return {component:decimalValue}
      }
      else{
        return {component:decimalValue1}
      }
     }
  },
    { headerName:'Custodian',field: 'CustodianValue',
    aggFunc: 'sum',
      },
      { field: 'Exchange' },
      { field: 'ISIN' },
      { field: 'ISO' },
      { field: 'NetPrice',
      aggFunc: 'sum'   },
      {headerName:'P&L (L)',field:'ProfitLoss'},
      { headerName:'% Day',field: 'PercentageMovementFromLastClose',
      aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value>0)
        {
          return {component:percentagenav}
        }
        else if (p.value<0){
          return {component:percentageNAV}
        }
        else  {

         return
        }
       }
    },
      { headerName:'Market Exp (B)',field: 'MarketExposureBase',
      aggFunc: 'sum',
      minWidth:160,maxWidth:200,
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:quantity1}
        }
        else{
          return {component:quantityelse}
        }
      }
  },
      { headerName:'% Exp of NAV', field: 'PercentExposureOfNAV' ,
      aggFunc:'avg',
      cellRendererSelector:p=>{
        if(p.value>0)
        {
         return {component:percentagenav}
        }
        if(p.value<0){
          return {component:percentageNAV}
        }
        else{
          return 
        }
       }
    },
      { headerName:'Benchmark', field: 'BenchmarkPercentOfFundNAV', 
      aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:decimalValue}
        }
        else{
          return {component:decimalValue1}
        }}
    },
      { field: 'Lqdty',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:quantity1}
        }
        else{
          return {component:quantityelse}
        }}
    
    },
      { field: 'Lqdty_Pos_1d',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:quantity1}
        }
        else{
          return {component:quantityelse}
        }}
    },
      { headerName:'P&L Excl FX',field: 'ProfitLossExclFX',
      aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:decimalValue}
        }
       if(p.value>0){
          return {component:decimalValue1}
        }
        else {
          return
        }
      }
    },
      { headerName:'P&L FX only',field: 'ProfitLossFXOnly',
      aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:decimalValue}
        }
        if(p.value>0){
          return {component:decimalValue1}
        }
      else{
        return
      }
      }
    },
      { headerName:'Net P&L (B)',field: 'NetProfitLossBase',
      aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:decimalValue}
        }
        if(p.value>0){
          return {component:decimalValue1}
        }
        else{
          return 
        }
      } },

      { field: 'Book', suppressMenu: true,
      }, 
      { field: 'Strategy'},
      { field: 'PricingFactor' },
      { field: 'Beta'},
      { field: 'Delta' },
      { field: 'PositionReference' },
      { field: 'SEDOL' },
      { field: 'SubPriceSource' },
      { headerName:'P&L (B)', field: 'ProfitLossBase',
       aggFunc: 'sum',
      cellRendererSelector:p=>{
        if(p.value<0)
        {
         return {component:decimalValue}
        }
        if(p.value>0)
        {
          return {component:decimalValue1}
        }
       else{
        return
       }
      }
    },
  ]
  //DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 140,
    enableRowGroup: true,
   
  };
  gridColumn!: ColumnApi;
  public autoGroupColumnDef: ColDef = {
    field:'Quantity',
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
  getColumnGroup=' BenchmarkPercentOfFundNAV';
  public rowGroupPanelShow = 'always';
  // Data that gets displayed in the grid
 public rowData: any;
  apiresponse: any;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient, private service: GetDataService,private Dialog: MatDialog,private loaderService: LoderServiceService,private columnService: ColumnServiceService) { 
  }
  ngOnInit(): void {
   //this.source.localdata = this.positions;
    this.username = window.atob(localStorage.getItem('token') || '').toString().split(':')[0];
    this.token = localStorage.getItem('token') || '';
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
                            this.activeFundId = fund.FundGroupID
                            break;
                          }
                        }
                        if(this.activeFundId == -1) {
                          this.activeFundId = res[0].FundGroupID;
                          this.activeFundName = res[0].FundGroupName;
                        }
                        this.fundList = res;
                        //this.myGrid.showloadelement();
                         this.getPositions();
                        //  this.gridColumn.applyColumnState({
                        //   //state: window.colState,
                        //   state: JSON.parse(localStorage.getItem('colState')),
                        //   applyOrder: true,
                        // });
                        // console.log('column state restored');

                      //   this.apiInterval
                      //   .subscribe(x => {
                      //  if (!this.apiRunning) {
                      //      console.log("interval running")
                      //      this.getPositions();
                      //     }
                      //  }
                      //   )
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
  }
  getPositions() {
    console.log("getpostions starts")
    //this.isloader='true';
    this.apiRunning = true;
    this.service.getpositions(this.activeFundId, this.activeMode, this.token)
      .subscribe(
        {
          next: (res) => {
            //delay(10000);
            //this.myGrid.hideloadelement();
            console.log("getposition success", res[0])
            this.positions = res;
          this.rowData=this.positions;
        this.gridApi=res;
        //  this.rowData=this.gridApi.getColumnDefs();
          //       console.log("Update cell should starts")
         //this.rowData=this.gridApi.setColumnDefs(this.positions);
          //       console.log("Update cell should complete")
            console.log("Position of the fund load sucessfully")
           // this.getPositions();
            // this.apiInterval.subscribe(x => {
            //   this.getPositions();
            // }
            //  )
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
  // getPositions() {
  //   console.log("getpostions starts")
  //   //this.isloader='true';
  //   this.apiRunning = true;
  //   this.service.getpositions(this.activeFundId, this.activeMode, this.token)
  //     .subscribe(
  //        {
  //         next: (res) => {
  //           //delay(10000);
  //           //this.myGrid.hideloadelement();
  //           this.rowData = res;
  //           console.log("getposition success", res[0])}
  //           ,error: (error) => {
  //             this.isloader = 'false';
  //             alert(error);
  //             console.log(error);
  //           }
  //           })
  //       };
  openDialog() {
    this.Dialog.open(ChangeFundDialogComponent, {
      width: '300px',
      panelClass: 'dialog-container-custom',
      data: {
        fundlist: this.fundList,
        activeMode: this.activeMode,
        activeFundId: this.activeFundId,
        activeFundname: this.activeFundName
      }
    }).afterClosed().subscribe(
      result => {
        this.panelOpenState=false;
        this.activeFundId = result.selectedFundId;
        this.activeMode = result.selectedMode;
        this.loaderService.isLoading.next('true')
        this.loaderService.getLoader().subscribe(
          message => {
            this.isloader = message;
          }
        );
        //this.IsfundChanged=true;
        this.getPositions();
        for (let fund of this.fundList) {
          if (this.activeFundId === fund.FundGroupID) {
            this.activeFundName = fund.FundGroupName;
            break;
          }
        }
      }
    )
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumn = params.columnApi;
  
  }

  saveState() {
    window.colState = this.gridColumn.getColumnState();
 //const colState=this.gridColumnApi.getColumnState();
 // this.gridColumnApi.applyColumnState({state:colState});
 //localStorage.setItem('colState', JSON.stringify(colState));
  console.log('column state saved');
   }
 
    restoreState() {
      if (!window.colState) {
        console.log('no columns state to restore by, you must save state first');
        return;
      }
     this.gridColumn.applyColumnState({
       state: window.colState,
       
     //  state: JSON.parse(localStorage.getItem('colState')),
       applyOrder: true,
     });
     console.log('column state restored');
 }
 resetState() {
  this.gridColumn.resetColumnState();

  console.log('column state reset');
}
 
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
  getWidthforPandL(): any {
    if (document.body.offsetWidth < 1366) {
      this.resolution='low';
      return 'low';
    }
    this.resolution='ok';
    return 'ok';
  }
  valueChanged(event: any): void {
    this.HorizontalDiv.nativeElement.innerText = 'Horizontal (' + parseInt(event.currentValue) + ')';
};
  // onBtExport() {
  //   this.gridApi.exportDataAsExcel();
  // }
}


