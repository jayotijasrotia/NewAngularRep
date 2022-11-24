import { Component, OnInit, OnChanges, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { jqxCheckBoxComponent } from 'jqwidgets-ng/jqxcheckbox';
import { jqxLoaderComponent } from 'jqwidgets-ng/jqxloader';
import { Funds } from '../../Interface/all-funds.interface';
import { positions } from '../../Interface/positions.interface';
import { columns } from '../../Interface/columns.interface';
import { FundPerformance } from '../../Interface/fund-performance.inteface';
import { GetDataService } from 'src/app/Services/webServices/get-data.service';
import { SelectColumnsService } from '../../Services/select-columns.service';
import { ChangeFundDialogComponent } from '../../PopUps/change-fund-dialog/change-fund-dialog.component';
import { BehaviorSubject, delay, endWith, interval } from 'rxjs'
import { Subscription } from 'rxjs';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { formatNumber } from '@angular/common';
import { LoderServiceService } from 'src/app/Services/Loader/loder-service.service';
@Component({
  selector: 'app-position2',
  templateUrl: './position2.component.html',
  styleUrls: ['./position2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Position2Component implements OnInit {
  showImage:boolean;
  private subscriptionName!: Subscription;
  private subscriptionName2!: Subscription;
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
  apiInterval = interval(1000);
  dataAdapter: any;
  data!: any[][];
  columns!: any[];
  username!: string;
  token!: string;
  decimalPlaces: any = 3;
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
  @ViewChild('HorizontalDiv', { static: false }) HorizontalDiv!: ElementRef;
  @ViewChild('myGrid', { static: false, }) myGrid!: jqxGridComponent;
  @ViewChild('jqxLoader', { static: false }) jqxLoader!: jqxLoaderComponent;
  @ViewChild('groupNum', { static: false }) groupNum!: ElementRef;
  @ViewChild('expandedGroup', { static: false }) expandedGroup!: ElementRef;
  @ViewChild('collapsedGroup', { static: false }) collapsedGroup!: ElementRef;
  @ViewChild('myPanel', { static: false }) myPanel!: jqxPanelComponent;
  @ViewChild('columnLines', { static: false }) columnLines!: jqxCheckBoxComponent;
  @ViewChild('columnHeaderLines', { static: false }) columnHeaderLines!: jqxCheckBoxComponent;



  
  constructor(private columnService: ColumnServiceService, private loaderService: LoderServiceService, private service: GetDataService, private Dialog: MatDialog) {
this.showImage=false;
  }
  ngOnInit(): void {
    console.log("Oninitialize starts")
    //this.jqxLoader.open();
    //this.openLoaderClick();
    this.columnService.getTheme().subscribe(
      message => {
        this.gridTheme = message
      },error=>{
     //   this.errBlock=true;
      //  this.errortext=error.message;
      }
    );


    this.source =
    {
      localdata: this.positions,
      datatype: 'array',
      datafields: [
        { name: 'BaseValue', type: 'string' },
        { name: 'BenchmarkPercentOfFundNAV', type: 'string' },
        { name: 'Beta', type: 'string' },
        { name: 'Book', type: 'string' },
        { name: 'CostPrice', type: 'number' },
        { name: 'CurrentPrice', type: 'number' },
        { name: 'CustodianValue', type: 'string' },
        { name: 'Delta', type: 'string' },
        { name: 'EntryTimeStamp', type: 'string' },
        { name: 'Exchange', type: 'string' },
        { name: 'FXRate', type: 'number' },
        { name: 'FundName', type: 'string' },
        { name: 'ISIN', type: 'string' },
        { name: 'ISO', type: 'string' },
        { name: 'InitialOpenCostBase', type: 'number' },
        { name: 'InitialOpenCostLocal', type: 'number' },
        { name: 'LastChangeDirection', type: 'string' },
        { name: 'LastCloseDirection', type: 'string' },
        { name: 'Lqdty', type: 'number' },
        { name: 'Lqdty_Pos_1d', type: 'number' },
        { name: 'MarketExposureBase', type: 'number' },
        { name: 'MarketValue', type: 'number' },
        { name: 'MarketValueLocal', type: 'number' },
        { name: 'Message', type: 'string' },
        { name: 'NetPrice', type: 'string' },
        { name: 'NetProfitLossBase', type: 'number' },
        { name: 'OpeningCostBase', type: 'number' },
        { name: 'PercentExposureOfNAV', type: 'number' },
        { name: 'PercentageMovementFromLastClose', type: 'string' },
        { name: 'PositionClass', type: 'string' },
        { name: 'PositionReference', type: 'string' },
        { name: 'PricingCurrency', type: 'string' },
        { name: 'ProductDescription', type: 'string' },
        { name: 'ProductID', type: 'string' },
        { name: 'ProductType', type: 'string' },
        { name: 'ProfitLoss', type: 'number' },
        { name: 'ProfitLossBase', type: 'number' },
        { name: 'ProfitLossExclFX', type: 'number' },
        { name: 'ProfitLossFXOnly', type: 'number' },
        { name: 'Quantity', type: 'number' },
        { name: 'SEDOL', type: 'string' },
        { name: 'SettleCurrency', type: 'string' },
        { name: 'Strategy', type: 'string' },
        { name: 'SubPriceSource', type: 'string' },
        { name: 'PricingFactor', type: 'string' }
      ]
    };
    //this.jqxLoader.open();
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.subscriptionName = this.columnService.doUpdate().subscribe
      (message => { //message contains the data sent from service
        this.columns = message;
      });


    
    //this.myGrid.updatebounddata('cells');
   
    
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
          this.source.localdata = this.positions;
          if(this.myGrid)
          {
            this.myGrid.updatebounddata('cells');
          }
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
                        if (this.activeFundId == -1) {
                          this.activeFundId = res[0].FundGroupID;
                          this.activeFundName = res[0].FundGroupName;
                        }
                        this.fundList = res;
                        //this.myGrid.showloadelement();
                         //this.getPositions();
                        this.apiInterval
                        .subscribe(x => {
                          if (!this.apiRunning) {
                            console.log("interval running")
                            this.getPositions();
                          }
                        }
                        )
                      }
                    }
                  );
              }
            })
        },
      });
    this.myGrid.theme("dark");
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
            for (let item of this.positions) {
              if (item.PositionClass == 'S') {
                item.PositionClass = "S";
              }

              if (item.Quantity < 0) {
                item.Quantity = "(" + (item.Quantity * -1).toFixed(this.QuantitydecimalPlaces) + ")";
                //item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
              }
              else {
                item.Quantity = item.Quantity.toFixed(this.QuantitydecimalPlaces);
              }

              if (item.CostPrice < 0) {
                //item.CostPrice = "(" + (item.CostPrice * -1).toFixed(this.CostPricedecimalPlaces) + ")";
                item.CostPrice = item.CostPrice.toFixed(this.CostPricedecimalPlaces);
              }
              else {
                item.CostPrice = item.CostPrice.toFixed(this.CostPricedecimalPlaces);
              }

              if (item.BaseValue < 0) {
                //item.BaseValue = "(" + (item.BaseValue * -1).toFixed(this.MarketValueBasedecimalPlaces) + ")";
                item.BaseValue = item.BaseValue.toFixed(this.MarketValueBasedecimalPlaces);
              }
              else {
                item.BaseValue = item.BaseValue.toFixed(this.MarketValueBasedecimalPlaces);
              }

              if (item.OpeningCostBase < 0) {
                //item.OpeningCostBase = "(" + (item.OpeningCostBase * -1).toFixed(this.OpeningCostBasedecimalPlaces) + ")";
                item.OpeningCostBase = item.OpeningCostBase.toFixed(this.OpeningCostBasedecimalPlaces);
              }
              else {
                item.OpeningCostBase = item.OpeningCostBase.toFixed(this.OpeningCostBasedecimalPlaces);
              }
              if (item.MarketExposureBase < 0) {
                //item.MarketExposureBase = "(" + (item.MarketExposureBase * -1).toFixed(this.MarketExposurBdecimalPlaces) + ")";
                item.MarketExposureBase = item.MarketExposureBase.toFixed(this.MarketExposurBdecimalPlaces);
              }
              else {
                item.MarketExposureBase = item.MarketExposureBase.toFixed(this.MarketExposurBdecimalPlaces);
              }
              if (item.InitialOpenCostLocal < 0) {
                //item.InitialOpenCostLocal = "(" + (item.InitialOpenCostLocal * -1).toFixed(this.InitialCostLocaldecimalPlaces) + ")";
                item.InitialOpenCostLocal = item.InitialOpenCostLocal.toFixed(this.InitialCostLocaldecimalPlaces);
              }
              else {
                item.InitialOpenCostLocal = item.InitialOpenCostLocal.toFixed(this.InitialCostLocaldecimalPlaces);
              }

              if (item.InitialOpenCostBase < 0) {
                //item.InitialOpenCostBase = "(" + (item.InitialOpenCostBase * -1).toFixed(this.InitialCostbasedecimalPlaces) + ")";
                item.InitialOpenCostBase = item.InitialOpenCostBase.toFixed(this.InitialCostbasedecimalPlaces);
              }
              else {
                item.InitialOpenCostBase = item.InitialOpenCostBase.toFixed(this.InitialCostbasedecimalPlaces);
              }

              if (item.ProfitLossBase < 0) {
                //item.ProfitLossBase = "(" + (item.ProfitLossBase * -1).toFixed(this.PandlbasedecimalPlaces) + ")";
                item.ProfitLossBase = (item.ProfitLossBase).toFixed(this.PandlbasedecimalPlaces);
              }
              else {
                item.ProfitLossBase = (item.ProfitLossBase).toFixed(this.PandlbasedecimalPlaces);
              }

              if (item.MarketValueLocal < 0) {
                //item.MarketValueLocal = "(" + (item.MarketValueLocal * -1).toFixed(this.MarketValueLocaldecimalPlaces) + ")";
                item.MarketValueLocal = (item.MarketValueLocal).toFixed(this.MarketValueLocaldecimalPlaces);
              }
              else {
                item.MarketValueLocal = (item.MarketValueLocal).toFixed(this.MarketValueLocaldecimalPlaces);
              }

              if (item.LastCloseDirection == 'UP') {
                item.LastCloseDirection = '▲'
              }
              else {
                if (item.LastCloseDirection == 'DOWN') {
                  item.LastCloseDirection = '▼'
                }
                else {
                  item.LastCloseDirection = '--'
                }
              }

              if (item.FXRate < 0) {
                //item.FXRate = "(" + (item.FXRate * -1).toFixed(this.FXRatedecimalPlaces) + ")";
                item.FXRate = item.FXRate.toFixed(this.FXRatedecimalPlaces);
              }
              else {
                item.FXRate = item.FXRate.toFixed(this.FXRatedecimalPlaces);
              }

              if (item.ProfitLoss < 0) {
                //item.ProfitLoss = "(" + (item.ProfitLoss * -1).toFixed(this.PandLLocaldecimalPlaces) + ")";
                item.ProfitLoss = item.ProfitLoss.toFixed(this.PandLLocaldecimalPlaces)
              }
              else {
                item.ProfitLoss = item.ProfitLoss.toFixed(this.PandLLocaldecimalPlaces)
              }
              if (item.PercentageMovementFromLastClose < 0) {
                //item.PercentageMovementFromLastClose = "(" + (item.PercentageMovementFromLastClose * -1).toFixed(this.PercentDaydecimalPlaces) + ")";
                item.PercentageMovementFromLastClose = item.PercentageMovementFromLastClose.toFixed(this.PercentDaydecimalPlaces);
              }
              else {
                item.PercentageMovementFromLastClose = item.PercentageMovementFromLastClose.toFixed(this.PercentDaydecimalPlaces);
              }
              if (item.PercentExposureOfNAV < 0) {
                //item.PercentExposureOfNAV = "(" + (item.PercentExposureOfNAV * -1).toFixed(this.percentExpOfNavdecimalPlaces) + ")";
                item.PercentExposureOfNAV = item.PercentExposureOfNAV.toFixed(this.percentExpOfNavdecimalPlaces);
              }
              else {
                item.PercentExposureOfNAV = item.PercentExposureOfNAV.toFixed(this.percentExpOfNavdecimalPlaces);

              }

              item.CurrentPrice = item.CurrentPrice.toFixed(this.CurrentPricedecimalPlaces);
              item.Lqdty = item.Lqdty.toFixed(this.LqdtydecimalPlaces);
              item.Lqdty_Pos_1d = item.Lqdty_Pos_1d.toFixed(this.Lqdty1ddecimalPlaces);
              if (item.NetProfitLossBase < 0) {
                //item.NetProfitLossBase = "(" + (item.NetProfitLossBase * -1).toFixed(this.NetPandLbasedecimalPlaces) + ")";
                item.NetProfitLossBase = item.NetProfitLossBase.toFixed(this.PandlbasedecimalPlaces);
              }
              else {
               item.NetProfitLossBase = item.NetProfitLossBase.toFixed(this.PandlbasedecimalPlaces);
              }
              if (item.ProfitLossFXOnly < 0) {
                //item.ProfitLossFXOnly = "(" + (item.ProfitLossFXOnly * -1).toFixed(this.PandLExclFxOnlydecimalPlaces) + ")";
                item.ProfitLossFXOnly = (item.ProfitLossFXOnly * 1).toFixed(this.PandLExclFxOnlydecimalPlaces);
              }
              else {
                item.ProfitLossFXOnly = (item.ProfitLossFXOnly * 1).toFixed(this.PandLExclFxOnlydecimalPlaces);
              }
              if (item.ProfitLossExclFX < 0) {
                //item.ProfitLossExclFX = "(" + (item.ProfitLossExclFX * -1).toFixed(this.PandLExclFxdecimalPlaces) + ")";
                item.ProfitLossExclFX = item.ProfitLossExclFX.toFixed(this.PandLExclFxdecimalPlaces);
              }
              else {
                item.ProfitLossExclFX = item.ProfitLossExclFX.toFixed(this.PandLExclFxdecimalPlaces);
              }

            }
            this.source.localdata = this.positions;
                //console.log("Update cell should starts")
                //this.myGrid.updatebounddata('cells');
               // console.log("Update cell should complete")
          //  console.log("Position of the fund load sucessfully")
            //this.getPositions();
            // this.apiInterval.subscribe(x => {
            //   this.getPositions();
            // }
            // )
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
  ApiInterval(){
    this.apiInterval
    .subscribe(x => {
      if (!this.apiRunning) {
        console.log("interval running")
        this.getPositions();
      }
    }
    )
  }
  // ngAfterViewInit() {
  //   console.log("after view init")
  //   this.myGrid.updatebounddata("cells")
  // }
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
        this.IsfundChanged=true;
        //this.getPositions();
        for (let fund of this.fundList) {
          if (this.activeFundId === fund.FundGroupID) {
            this.activeFundName = fund.FundGroupName;
            break;
          }
        }
      }
    )
  }
  ngOnDestroy() {}
  getWidth(): any {
    if (document.body.offsetWidth < 1000) {
      return '100%';
    }
    return '100%';
  }
  getWidthforPandL(): any {
    if (document.body.offsetWidth < 1366) {
      this.resolution='low';
      return 'low';
    }
    this.resolution='ok';
    return 'ok';
  }
  getHeight(): any {
    const height = document.getElementById("grid")?.offsetHeight;
    return height;
  }
  myGridOnSort(event: any): void {
    this.myPanel.clearcontent();
    let sortinformation = event.args.sortinformation;
    let sortdirection = sortinformation.sortdirection.ascending ? 'ascending' : 'descending';
    if (!sortinformation.sortdirection.ascending && !sortinformation.sortdirection.descending) {
      sortdirection = 'null';
    }
    let eventData = 'Triggered "sort" event <div>Column:' + sortinformation.sortcolumn + ', Direction: ' + sortdirection + '</div>';
    this.myPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
  };
  onGroupExpand(event: any): void {
    let args = event.args;
    this.expandedGroup.nativeElement.innerHTML = 'Group: ' + args.group + ', Level: ' + args.level;
  }
 
  OnDownloadCSV() {
    this.columnService.CsvGen().subscribe(message => {
      //this.gridTheme=message;
      //this.DownloadCSV();
      this.myGrid.updatebounddata('cells');
      this.myGrid.exportdata('csv', 'MyPositions');
    });
  }
  
  openLoaderClick(): void {
    this.jqxLoader.open();
  };
  closeLoaderClick(): void {
    this.jqxLoader.close();
  };
  valueChanged(event: any): void {
      this.HorizontalDiv.nativeElement.innerText = 'Horizontal (' + parseInt(event.currentValue) + ')';
  };
  
}
