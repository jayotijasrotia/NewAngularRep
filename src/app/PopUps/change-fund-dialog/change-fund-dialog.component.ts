import { Component, forwardRef, Inject, Injectable, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { MatDialog } from '@angular/material/dialog';
import { LoderServiceService } from 'src/app/Services/Loader/loder-service.service';
import { AgGridAngular } from 'ag-grid-angular';
import { BehaviorSubject, interval, Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import 'ag-grid-enterprise'
import { QApositionComponent } from 'src/app/qaposition/qaposition.component';
import { ColumnApi } from 'ag-grid-community';
import { CellClickedEvent, ColDef,GridReadyEvent,RowStyle,RowClassParams,GridApi,ColGroupDef, GetRowIdFunc,GridOptions,
  GetRowIdParams, RowGroupingDisplayType,ColumnGroup,Column,SideBarDef,IAggFunc, RefreshCellsParams,RowNode,
  IAggFuncParams,IsRowFilterable,ICellRendererParams,ICellRenderer,
  ValueFormatterParams, ValueCache, Grid, AgGridEvent, ColumnState } from 'ag-grid-community';
import { timeout } from 'rxjs';
import { columns } from 'src/app/Interface/columns.interface';
import { Funds } from 'src/app/Interface/all-funds.interface';
import { FundPerformance } from 'src/app/Interface/fund-performance.inteface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetDataService } from 'src/app/Services/webServices/get-data.service';
declare var columnModel: any;
 
declare var localStorage:any;
declare var window: any;
@Component({
  selector: 'app-change-fund-dialog',
  templateUrl: './change-fund-dialog.component.html',
  styleUrls: ['./change-fund-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeFundDialogComponent implements OnInit {
  storeObj: any;
  fundListValue: any;
  FundGroupID:any;
  FundGroupName:any;
  myMode: any;
  rowData: any;
  public  gridColumnApi!: ColumnApi;
  getColumnState!: ColumnState[];
  params:any;
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
  apiInterval = interval(20000);
  //intervalID=setInterval
  //dataAdapter: any;
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
  private gridApi!: GridApi;

  private columnDefs = [
  
     { headerName:'Type',columnGroupShow: 'open',field:'ProductType',sortable: true, enableRowGroup:true,enableCellChangeFlash: true },
     { headerName:'Identifier',field:'ProductID',columnGroupShow: 'open', enableRowGroup:true,sortable: true,enableCellChangeFlash: true },
     { headerName:'Description',field:'ProductDescription',columnGroupShow: 'open',sortable: true,enableCellChangeFlash: true},
     { headerName:'L/S',field:'PositionClass',},
     { headerName:'Quantity', field: 'Quantity',aggFunc:'sum', type: 'number',columnGroupShow: 'open',sortable: true, enableCellChangeFlash: true},
     { headerName:'CCY', field: 'PricingCurrency'  },
     { headerName:'CCY (S)' ,field: 'SettleCurrency' },
     { headerName:'Cost Price',field: 'CostPrice',aggFunc: 'sum' },
     { field: 'CurrentPrice',aggFunc: 'sum',},
     { headerName:'Market Value (B)',field: 'BaseValue',aggFunc: 'sum',minWidth:160,maxWidth:200},
     { headerName:'Opening Cost (B)',field: 'OpeningCostBase',aggFunc: 'sum',minWidth:160,maxWidth:200,},
     { headerName:'Initial Cost (B)',field: 'InitialOpenCostBase',aggFunc: 'sum', minWidth:160,maxWidth:200,},
     { headerName:'Initial Cost (L)',field: 'InitialOpenCostLocal', aggFunc: 'sum', minWidth:160,maxWidth:200, },
     { headerName:'P&L (L)',field: 'ProfitLoss'},
     { headerName:'Market Value (L)',field: 'MarketValueLocal', aggFunc: 'sum',minWidth:160,maxWidth:200, },
     { headerName:'Dir',field: 'LastCloseDirection' ,},
     { field: 'FXRate', aggFunc: 'sum'  },
     { headerName:'Custodian', field: 'CustodianValue',aggFunc: 'sum' ,},
       { field: 'Exchange' },
       { field: 'ISIN' },
       { field: 'ISO' },
       { field: 'NetPrice',  aggFunc: 'sum'   },
       { headerName:'% Day',field: 'PercentageMovementFromLastClose',aggFunc: 'sum',},
       {headerName:'Market Exp (B)', field: 'MarketExposureBase' ,aggFunc: 'sum',minWidth:160,maxWidth:200, },
       { headerName:'% Exp of NAV', field: 'PercentExposureOfNAV' ,aggFunc:'avg'},
       {headerName:'Benchmark', field: 'BenchmarkPercentOfFundNAV'},
       { field: 'Lqdty' },
       { field: 'Lqdty_Pos_1d', },
       { headerName:'P&L Excl FX',field: 'ProfitLossExclFX',aggFunc: 'sum',},
       { headerName:'P&L FX only',field: 'ProfitLossFXOnly',aggFunc: 'sum', },
       { headerName:'Net P&L (B)',field: 'NetProfitLossBase',aggFunc: 'sum', minWidth:160,maxWidth:200 },
       { headerName:'Net P&L (L)',field: 'ProfitLossLocalNet',aggFunc: 'sum', minWidth:160,maxWidth:200, },
       { field: 'Book',  suppressMenu: true,enableRowGroup: true,}, 
       { field: 'Strategy'},
       { field: 'PricingFactor' },
       { field: 'Beta'},
       { field: 'Delta' },
       { field: 'EntryTimeStamp' },
       { field: 'LastChangeDirection' },
       { field: 'Message' },
       { field: 'PositionReference' },
       { field: 'SEDOL' },
       { field: 'SubPriceSource' },
       { headerName:'P&L (B)', field: 'ProfitLossBase'    },
    { headerName:'Daily P&L (L)', field: 'DailyProfitLossLocal'},
    { headerName:'Daily P&L (B)', field: 'DailyProfitLossBase'},
    { headerName:'MTD P&L (L)', field: 'MTDProfitLossLocal'},
    { headerName:'MTD P&L (B)', field: 'MTDProfitLossBase'},
    { headerName:'YTD P&L (B)', field: 'YTDProfitLossBase'},
    { headerName:'YTD P&L (L)', field: 'YTDProfitLossLocal'}
   ]
  
  @ViewChild('myGrid', { static: false, }) myGrid!:GridApi ;
  @ViewChild('agGrid',{static: true}) agGridd: ColumnApi | undefined;
  @ViewChild(AgGridAngular,{static:false}) agGrid!: AgGridAngular;
 
  constructor(@Inject(MAT_DIALOG_DATA) private dataForDialog: any,private Dialogref: MatDialogRef<ChangeFundDialogComponent>,private http: HttpClient, private service: GetDataService,private Dialog: MatDialog,private loaderService: LoderServiceService,private columnService: ColumnServiceService) {
   
   }
  modes:any = ['None', 'Daily', 'MTD', 'YTD'];
  FundGroups: any;
  selectedFundId: any;
  selectedMode = '';

  ngOnInit(): void {
   
     this.FundGroups = this.dataForDialog.fundlist;
   this.selectedFundId = this.dataForDialog.activeFundId;
     this.selectedMode = this.dataForDialog.activeMode;
   // this.columnService.allColumns;
    

  }
  //  this.columnDefs = this.columnDefs;
  // this.username = window.atob(localStorage.getItem('token') || '').toString().split(':')[0];
  // this.token = localStorage.getItem('token') || '';

  //    this.service.loadConfig()
  //    .subscribe({
  //      next: (res) => {
  //        this.service.baseUrl = res.baseUrl;
  //        var uniqueid = this.username + '_' + Math.random().toString(36).substring(2, 9);
  //        this.service.getAllFunds(this.username+'/'+uniqueid, this.token)
  //          .subscribe(
  //            {
  //              next: (res) => {
  //                if (this.activeFundId == -1)
  //                  this.activeFundId = Number(localStorage.getItem('fundId')) || -1;
  //                for (let fund of res) {
  //                  if (fund.FundGroupID == this.activeFundId) {
  //                    this.activeFundName = fund.FundGroupName;
  //                    this.activeFundId = fund.FundGroupID;
  //                    break;
  //                  }
  //                }
  //                if(this.activeFundId == -1) {
  //                  this.activeFundId = res[0].FundGroupID;
  //                  this.activeFundName = res[0].FundGroupName;
  //                }
  //                this.fundList = res; //data into fund list
  //                //this.myGrid.showloadelement();
  //             // this.interval=setInterval(()=>{
  //              this.getPositions();  //first call

              // this.restoreState();
                //  this.gridColumnApi.applyColumnState({
                //    //state: window.colState,
                //    state: JSON.parse(localStorage.getItem('colState')),
                //    applyOrder: true,
                //  });
                //  console.log('column state restored');
                //  this.apiInterval
                //  .subscribe(() => {
                // if (!this.apiRunning) {
                //     console.log("interval running")
                //     //this.getPositions();
                //    localStorage.getItem('gridColumn');
                //    }
                // }
                //  )
                //  //var dd = JSON.stringify(storeObj); var cc = JSON.parse(dd).FundGroupName; alert(cc);
                 //var dd = JSON.stringify(storeObj); var cc = JSON.parse(dd).FundGroupName; alert(cc);
  //              },
  //              error: (error) => {
  //                this.isloader = 'false';
  //                alert(error);
  //                console.log(error);
  //              }
  //            }
  //          );
  //      }
  //    })
  //  }

  

   
  
  // getPositions() {
  //   console.log("getpostions starts")
  //   //this.isloader='true';
 
  //   this.service.getpositions(this.activeFundId, this.activeMode, this.token)
  //     .subscribe(
  //       {
  //         next: (res) => {
  //           //delay(10000);
  //           //this.myGrid.hideloadelement();
  //           console.log("getposition success", res[0])
  //           this.positions = res;
  //           error: (error: any) => {
  //             this.isloader = 'false';
  //             alert(error);
  //             console.log(error);
  //           }
  //         }
  // });
  
  //       console.log("getperformance starts")
  //       this.service.getFundperformance(this.activeFundId, this.activeMode, this.token)
  //         .subscribe(
  //           {
  //             next: (data) => {
  //               console.log("getperformance success")
  //               this.fundPerformance = data[0];
  //               if (Math.round(data[0].CurrentNAV) >= 0)
  //                 this.fundPerformance.CurrentNAV = Math.round(data[0].CurrentNAV);
  //               else
  //                 this.fundPerformance.CurrentNAV = Math.round(data[0].CurrentNAV) * -1;
  //                 setTimeout(() => {
  //                   this.apiRunning = false;
  //                   if(!this.IsfundChanged)
  //                   {
  //                     this.isloader = 'false';
  //                     this.loaderService.isLoading.next('false')
  //                   }
  //                   else
  //                   {
  //                     this.IsfundChanged=false;
  //                   }
  //                 }, 500);
  //             },
  //             error: (error) => {
  //               this.isloader = 'false';
  //               alert(error);
  //               console.log(error);
  //             }
  //           }
  //         )
  //   }
  
  
   OnSetWithSave() {
  //  const colState=this.gridColumnApi.getColumnState();
   // this.columnService.applyColumnState({state:colState});
   // const colState=this.gridColumnApi.getColumnState();
   // localStorage.setItem('colState', JSON.stringify(colState));
   this.Dialogref.close({
  selectedFundId: this.selectedFundId,
  selectedMode: this.selectedMode,
 
});
   }


   OnSetWithoutSave() {
    this.Dialogref.close({
      selectedFundId: this.selectedFundId,
    selectedMode: this.selectedMode,
    });
   
  }
  






}











 
//this.rowData=this.positions;  //binding data from grid
//this.state = JSON.stringify(this.gridColumn.getColumnState());

// this.gridColumn=this.rowData;
    // this.state = JSON.stringify(this.gridColumn.getColumnState());
    // this.rowData=this.positions;  //binding data from grid
     
    
 // this.state=JSON.stringify(this.gridColumn.getAllDisplayedColumns())


//localStorage.setItem('gridColumn',JSON.stringify(this.state));
//localStorage.getItem('gridColumn');
  // this.gridState = this.state;
  // localStorage['LocalMessage'] =this.gridState;
  //localStorage['Mode'] = this.myMode.favorite;
    // this.fundListValue.positions = this.FundGroups[i].positions;  
    // this.gridState = this.dataForDialog.fundlist;
   // this.fundListValue.FundGroupID = this.FundGroups[i].FundGroupID; 
// localStorage.setItem('grid',JSON.stringify(this.gridState))
//   localStorage.getItem('gridState');
 

  // const allState = this.gridColumn.getColumnState();
  // const sortState = allState.map((state) => ({
  //   colId: state.colId,
  //   sort: state.sort,
  //   sortIndex: state.sortIndex,
  // }));
  // window.sortState = sortState;
  // console.log('sort state saved', sortState);
 //this.storeObj["FundGroupID"] = this.fundListValue.FundGroupID;
 //this.storeObj["FundGroupName"] = this.fundListValue.FundGroupName;
   //localStorage['Fund'].JSON.stringify(this.storeObj);
    // if (localStorage['LocalMessage'] != undefined) {
    //    this.gridColumn.applyColumnState( JSON.parse(localStorage['LocalMessage']));
    //     if (localStorage['Mode'] != undefined && localStorage['Mode'] != "") {
    //       this.myMode = { favorite: localStorage['Mode'] };
    //     }
    // // }
    // else {
    //     alert("There is not available any saved state for position !");
    // }
  

 





