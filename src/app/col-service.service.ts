import { Injectable } from '@angular/core';
import 'ag-grid-enterprise'
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent,RowStyle,RowClassParams,GridApi,ColGroupDef, GetRowIdFunc,
  GetRowIdParams,
  RowGroupingDisplayType,ColumnGroup,ColumnApi,Column,SideBarDef,IAggFunc,IAggFuncParams,IsRowFilterable,ICellRendererParams,ICellRenderer,ValueFormatterParams, ValueCache, Grid } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ColServiceService {

  constructor() { }
  private StaticAllColumns:any[]=[
    { text: 'Fund', datafield: 'FundName', width: 80,pinned:false,Isactive:false ,align:'center',cellsalign: 'left'},
    { text: 'Type', datafield: 'ProductType', width: 80 ,pinned:false,Isactive:true,align:'Center',cellsalign: 'left'},
    { text: 'Identifier', datafield: 'ProductID', width: 150 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left'},
    { text: 'Description', datafield: 'ProductDescription', width: 170 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left'},
    { text: 'L/S', datafield: 'PositionClass', width: 50,pinned:false,Isactive:true,align:'center',cellsalign: 'left',
    // cellsrenderer: function (row: any, columnfield: any, value: any, defaulthtml: any, columnproperties: any, rowdata: any) {
    //  let result = rowdata.PositionClass;
    //  if (rowdata.PositionClass === "S") {
    //    result = "(S)";
    //  }
    //  return result;
    // },
    cellclassname: function (row: any, column: any, value: any, data: any) { if (value === "L") { return 'greenColor'; } else { return 'redColor'; } },
    },
    {
      text: 'Quantity', datafield: 'Quantity', width: 140,
      pinned: false, Isactive: true, align: 'center', cellsalign: 'right',
       
       cellrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      let result;
        if (value >= 0) {
         result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
        }
      else {
          
         result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
        }
      //   return result;
      // },
      //aggregates:['sum'],
    
      // aggregates: [{
      //   'Total':function (aggregatedValue: number, column: any, record: any) {
      //     //alert(column);
      //     //console.log(column);
      //     //var total = (aggregatedValue + column).tofixed(0);
      //    console.log('sum is' + (aggregatedValue + column));
      //    return (aggregatedValue + column);
      //    // return '<div class="' +('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + '<span class="' + ('jqx-grid-groups-row-details') + '">' + "Total" + ' (' + this.Total + ')' + '</span></div>';
      //   }}],
      //  aggregatesrenderer: function (aggregates: any, column: any,element:any) {
      //           //return '<div class="' +('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + '<span class="' + ('jqx-grid-groups-row-details') + '">' + "Total" + ' (' + this.Total + ')' + '</span></div>';

      //   return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;"> ' + Math.round(aggregates.Total*1000)/1000  +'</div>'; //alignment
      // },
      // groupsrenderer:function(text:any,group:any,expanded:any,data:any){
      //   //return '<div class="' + ('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + ', </span>' + '<span class="' + ('jqx-grid-groups-row-details') + '">' + "Total price" + ' (' + aggregates.sum + ')' + '</span></div>';
      // },
    }
  },
    { text: 'CCY', datafield: 'PricingCurrency', width: 70 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left',
    
 
    // aggregates: [{
    //   'Total':function (aggregatedValue: number, column: any, record: any) {
    //     //alert(column);
    //    // console.log(column);
    //     //var total = (aggregatedValue + column).tofixed(0);
    //    console.log('sum is' + (aggregatedValue + column));
    //     return (aggregatedValue + column);
    //   }}],
    //  aggregatesrenderer: function (aggregates: any, column: any,element:any) {
    //   //return  '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;"><span>' + ""+ ', </span>' + '<span class="' + ('jqx-grid-groups-row-details') + '">' +"Total" + ' (' + aggregates.sum + ')' + '</span></div>';
    //  // aggregates = this.getcolumnaggregateddata(groupcolumn.datafield, ['sum'], true, row);
    //   return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    // }
  },
    { text: 'CCY (S)', datafield: 'SettleCurrency', width: 70 ,pinned:false,Isactive:false,align:'center',cellsalign: 'left'},
    { text: 'Cost Price', datafield: 'CostPrice', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'Current Price', datafield: 'CurrentPrice', width: 110 ,pinned:false,Isactive:true,align:'center',cellsalign: 'right'},
    { text: 'Market Value (B)', datafield: 'BaseValue', width: 170 ,pinned:false,Isactive:true,align:'center',cellsalign: 'right',
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
        
    //   }
    //   else {
        
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
        return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
     return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    { text: 'Opening Cost (B)', datafield: 'OpeningCostBase', width: 170,pinned:false,Isactive:true,align:'center',cellsalign: 'right',
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
        
    //   }
    //   else {
        
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
        return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
     return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    { text: 'Initial Cost (L)', datafield: 'InitialOpenCostLocal', width: 140,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
        
    //   }
    //   else {
        
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
        return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
      return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    { text: 'Initial Cost (B)', datafield: 'InitialOpenCostBase', width: 140,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
        
    //   }
    //   else {
        
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
        return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
      return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    {
      text: 'P&L (B)', datafield: 'ProfitLossBase', width: 140, pinned:false,Isactive:true,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else {if(value!=0) { return 'redColor'; }else{return 'alignCenter'} } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
      //   }
      //   else {
          
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          var total = column;
          return aggregatedValue + total;
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000 +'</div>';
      }
    },
  { text: 'Market Value (L)', datafield: 'MarketValueLocal', width: 150,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
  // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
  //   let result;
  //   if (value >= 0) {
  //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
      
  //   }
  //   else {
      
  //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
  //   }
  //   return result;
  // },
  aggregates: [{
    'Total':function (aggregatedValue: number, column: any, record: any) {
      //alert(column);
      //console.log(column);
      //var total = (aggregatedValue + column).tofixed(0);
      //console.log(aggregatedValue + column);
      return (aggregatedValue + column);
    }}],
   aggregatesrenderer: function (aggregates: any, column: any,element:any) {
    return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
  }
  },
  {
    text: 'Dir', datafield: 'LastCloseDirection', width: 50,pinned:false,Isactive:true,align:'center',cellsalign: 'left',
    cellclassname: function (row: any, column: any, value: any, data: any) { if (value == "▲") { return 'greenColor'; } else if (value == "▼") { return 'redColor'; } else { return 'alignCenter'; } },
    
  },
  { text: 'FX Rate', datafield: 'FXRate', width: 70,pinned:false,Isactive:false,align:'center',cellsalign: 'right' },
  { text: 'Custodian', datafield: 'CustodianValue', width: 80 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left'},
  { text: 'Exchange', datafield: 'Exchange', width: 80 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
  //{ text: 'MarketValue', datafield: 'MarketValue', width: 100 },
  { text: 'ISIN', datafield: 'ISIN', width: 50 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
  { text: 'ISO', datafield: 'ISO', width: 50 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
  { text: 'Net Price', datafield: 'NetPrice', width: 80 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
  {
    text: 'P&L (L)', datafield: 'ProfitLoss', width: 120,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
    cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value != 0) { return 'redColor'; } else { return 'alignCenter'; } },
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
        
    //   }
    //   else {
        
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
        return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
      return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    {
      text: '% Day', datafield: 'PercentageMovementFromLastClose', width: 90,pinned:false,Isactive:true,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value !=0) { return 'redColor'; } else { return 'alignCenter'; } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
      //   }
      //   else {
          
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          //alert(column);
          //console.log(column);
          //var total = (aggregatedValue + column).tofixed(0);
          //console.log(aggregatedValue + column);
          return (aggregatedValue + column);
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
      }
    },
    { text: 'Market Exp (B)', datafield: 'MarketExposureBase', width: 170 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
    // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
    //   let result;
    //   if (value >= 0) {
    //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
    //   }
    //   else {
    //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
    //   }
    //   return result;
    // },
    aggregates: [{
      'Total':function (aggregatedValue: number, column: any, record: any) {
        //alert(column);
        //console.log(column);
        //var total = (aggregatedValue + column).tofixed(0);
        //console.log(aggregatedValue + column);
       return (aggregatedValue + column);
      }}],
     aggregatesrenderer: function (aggregates: any, column: any,element:any) {
      return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
    }
    },
    {
      text: '% Exp of NAV', datafield: 'PercentExposureOfNAV', width: 150,pinned:false,Isactive:true,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value != 0) { return 'redColor'; } else { return 'alignCenter'; } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
      //   }
      //   else {
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          //alert(column);
          //console.log(column);
          //var total = (aggregatedValue + column).tofixed(0);
          //console.log(aggregatedValue + column);
          return (aggregatedValue + column);
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
      }
    },
    { text: 'Benchmark', datafield: 'BenchmarkPercentOfFundNAV', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'Lqdty', datafield: 'Lqdty', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'Lqdty 1d', datafield: 'Lqdty_Pos_1d', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    {
      text: 'Net P&L (B)', datafield: 'NetProfitLossBase', width: 120,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value != 0) { return 'redColor'; } else { return 'alignCenter'; } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
      //   }
      //   else {
          
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          //alert(column);
          //console.log(column);
          //var total = (aggregatedValue + column).tofixed(0);
          //console.log(aggregatedValue + column);
          return (aggregatedValue + column);
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
      }
    },
    {
      text: 'P&L Excl FX', datafield: 'ProfitLossExclFX', width: 120,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value != 0) { return 'redColor'; } else { return 'alignCenter'; } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
      //   }
      //   else {
          
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          //alert(column);
          //console.log(column);
          //var total = (aggregatedValue + column).tofixed(0);
          //console.log(aggregatedValue + column);
          return (aggregatedValue + column);
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
      }
    },
    {
      text: 'P&L FX only', datafield: 'ProfitLossFXOnly', width: 120,pinned:false,Isactive:false,align:'center',cellsalign: 'right',
      cellclassname: function (row: any, column: any, value: any, data: any) { if (value > 0) { return 'greenColor'; } else if (value != 0) { return 'redColor'; } else { return 'alignCenter'; } },
      // cellsrenderer: function (row: any, columnfield: number, value: number, defaulthtml: any, columnproperties: any, rowdata: any) {
      //   let result;
      //   if (value >= 0) {
      //     result ='<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">' +  value.toString()+'</div>';
          
      //   }
      //   else {
          
      //     result =  '<div class="jqx-grid-cell-right-align" style="margin-top: 9.5px;">'+'('+(value * (-1)).toString()+')'+'</div>' ;
      //   }
      //   return result;
      // },
      aggregates: [{
        'Total':function (aggregatedValue: number, column: any, record: any) {
          //alert(column);
          //console.log(column);
          //var total = (aggregatedValue + column).tofixed(0);
          //console.log(aggregatedValue + column);
          return (aggregatedValue + column);
        }}],
       aggregatesrenderer: function (aggregates: any, column: any,element:any) {
        return '<div style="position: relative; margin-top: 4px; margin-right:5px; text-align: right; overflow: hidden;">Total : ' + Math.round(aggregates.Total*1000)/1000  +'</div>';
      }
    },
    { text: 'Book', datafield: 'Book', width: 100 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left'},
    { text: 'Strategy', datafield: 'Strategy', width: 100 ,pinned:false,Isactive:true,align:'center',cellsalign: 'left'},
    { text: 'Price Factor', datafield: 'PricingFactor', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'Beta', datafield: 'Beta', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'Delta', datafield: 'Delta', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'right'},
    { text: 'EntryTimeStamp', datafield: 'EntryTimeStamp', width: 100,pinned:false ,Isactive:false,align:'center',cellsalign: 'left'},
    { text: 'LastChangeDirection', datafield: 'LastChangeDirection', width: 100,pinned:false,Isactive:false,align:'center',cellsalign: 'left'},
    { text: 'Message', datafield: 'Message', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'left'},
    { text: 'PositionReference', datafield: 'PositionReference', width: 100,pinned:false,Isactive:false,align:'center',cellsalign: 'right' },
    { text: 'SEDOL', datafield: 'SEDOL', width: 100 ,pinned:false,Isactive:false,align:'center',cellsalign: 'left'},
    { text: 'SubPriceSource', datafield: 'SubPriceSource', width: 100,pinned:false,Isactive:false,align:'center',cellsalign: 'left' },
  ];
  public columns= new BehaviorSubject<any[]>([]);
  tempColumn:any[]=[];
  allColumns:any[]=[];
  pinnedArray:any[]=[];
  pinnedArray2:any[]=[];
  tempallcolumn:any[]=[];
  ColumnsArray:any[]=[];
  gridTheme= new BehaviorSubject<string>('');
  csvFile= new BehaviorSubject<string>('');
  public noOfDecimalPlaces=new BehaviorSubject<any>(localStorage.getItem('decimalPlaces')||3);
  justification=new BehaviorSubject<any>(true);
  NumericColumns: any[] = [
  "Quantity", 
  "Cost Price",
  "Current Price",
  "Market Value (B)",
  "Opening Cost (B)",
  "Initial Cost (L)",
  "Initial Cost (B)",
  "P&L (B)",
  "Market Value (L)",
  "FX Rate",
  "Net Price",
  "P&L (L)",
  "% Day",
  "Market Exp (B)",
  "% Exp of NAV",
  "P&L Excl FX",
  "Lqdty",
  "Lqdty 1d",
  "Net P&L (B)",
  "P&L FX only",
  ]
 
  doUpdate():Observable<any>
  {
    for(let item of this.StaticAllColumns)
    {
      for(let numCol of this.NumericColumns)
      {
        if(item.text== numCol)
        {
          item.cellsalign= localStorage.getItem("NumericJustification")||'right';
          item.align=localStorage.getItem("HeaderJustification")||'center';
          break;
        }
        else
        {
          item.cellsalign=localStorage.getItem("textJustification")||'left';
          item.align=localStorage.getItem("HeaderJustification")||'center';
        }
      }
    }

    var stringarray;
    if(localStorage.getItem('allColumns')!=null && localStorage.getItem('allColumns')!=undefined && localStorage.getItem('allColumns')!='')
    {
      if(localStorage.getItem('pinnedArray2')!=null && localStorage.getItem('pinnedArray2')!=undefined && localStorage.getItem('pinnedArray2')!='')
      {
        this.pinnedArray2=JSON.parse(localStorage.getItem("pinnedArray2")||'');
      }
      this.tempColumn=[]
      var localColumnString= localStorage.getItem('allColumns')?.split('//')||'';
      for(let i=0;i<localColumnString.length-2;i=i+2) 
      {
        for(let column of this.StaticAllColumns)
        {
          for(let pin2 of this.pinnedArray2)
          {
            if(column.text == pin2)
            {
              column.pinned=true;
              break;
            }
          }
          
          if(localColumnString[i]==column.text)
          {
            if(localColumnString[i+1]=='true')
            {
              
              this.tempColumn.push(column);
              break;
            }
          }
        }
      }
      this.columns.next(this.tempColumn);
      
    }
    else
    {
      
      this.tempColumn=[];

      if(localStorage.getItem('pinnedArray2')!=null && localStorage.getItem('pinnedArray2')!=undefined && localStorage.getItem('pinnedArray2')!='')
      {
        this.pinnedArray2=JSON.parse(localStorage.getItem("pinnedArray2")||'');
      }
      for (let column of this.StaticAllColumns) {
        if(column.Isactive==true)
        {
          for (let pin of this.pinnedArray2) {
            if (column.text == pin) {
              column.pinned = true;
              break;
            }
            
          }
          this.tempColumn.push(column);
        }
      }
      this.columns.next(this.tempColumn);
    }
    return this.columns.asObservable();
  }

  
  getActiveInactiveColumns()
  {
    if(localStorage.getItem('allColumns')!=null && localStorage.getItem('allColumns')!=undefined && localStorage.getItem('allColumns')!='')
    {
      this.allColumns=[];
      var localColumnString= localStorage.getItem('allColumns')?.split('//')||'';
      for(let i=0;i<localColumnString.length-2;i=i+2) 
      {
        var column23={fieldName:" ",Isactive:true,pinned:false};
        column23.fieldName= localColumnString[i];
        column23.Isactive=localColumnString[i+1]=='true'? true:false;
        if(localStorage.getItem('pinnedArray2')!=null && localStorage.getItem('pinnedArray2')!=undefined && localStorage.getItem('pinnedArray2')!='')
        {
        this.pinnedArray2=JSON.parse(localStorage.getItem("pinnedArray2")||'');
        }
        for(let pin of this.pinnedArray2)
        {
          if(column23.fieldName==pin)
          {
            column23.pinned=true;
            break;
          }
        }
        this.allColumns.push(column23); 
      }
    }
    else {
      this.tempColumn = [];
      this.allColumns = [
        { fieldName: "Fund", Isactive: false, pinned: false },
        { fieldName: "Type", Isactive: true, pinned: false },
        { fieldName: "Identifier", Isactive: true, pinned: false },
        { fieldName: "Description", Isactive: true, pinned: false },
        { fieldName: "L/S", Isactive: true, pinned: false },
        { fieldName: "Quantity", Isactive: true, pinned: false },
        { fieldName: "CCY", Isactive: true, pinned: false },
        { fieldName: "CCY (S)", Isactive: false, pinned: false },
        { fieldName: "Cost Price", Isactive: false, pinned: false },
        { fieldName: "Current Price", Isactive: true, pinned: false },
        { fieldName: "Market Value (B)", Isactive: true, pinned: false },
        { fieldName: "Opening Cost (B)", Isactive: true, pinned: false },
        { fieldName: "Initial Cost (L)", Isactive: false, pinned: false },
        { fieldName: "Initial Cost (B)", Isactive: false },
        { fieldName: "P&L (B)", Isactive: true, pinned: false },
        { fieldName: "Market Value (L)", Isactive: false, pinned: false },
        { fieldName: "Dir", Isactive: true, pinned: true },
        { fieldName: "FX Rate", Isactive: false, pinned: false },
        { fieldName: "Custodian", Isactive: true, pinned: false },
        { fieldName: "Exchange", Isactive: false, pinned: false },
        { fieldName: "ISIN", Isactive: false, pinned: false },
        { fieldName: "ISO", Isactive: false, pinned: false },
        { fieldName: "Net Price", Isactive: false, pinned: false },
        { fieldName: "P&L (L)", Isactive: false, pinned: false },
        { fieldName: "% Day", Isactive: true, pinned: false },
        { fieldName: "Market Exp (B)", Isactive: false, pinned: false },
        { fieldName: "% Exp of NAV", Isactive: true, pinned: false },
        { fieldName: "Benchmark", Isactive: false, pinned: false },
        { fieldName: "Lqdty", Isactive: false, pinned: false },
        { fieldName: "Lqdty 1d", Isactive: false, pinned: false },
        { fieldName: "Net P&L (B)", Isactive: false, pinned: false },
        { fieldName: "P&L Excl FX", Isactive: false, pinned: false },
        { fieldName: "P&L FX only", Isactive: false, pinned: false },
        { fieldName: "Book", Isactive: true, pinned: false },
        { fieldName: "Strategy", Isactive: true, pinned: false },
        { fieldName: "Price Factor", Isactive: false, pinned: false },
        { fieldName: "Beta", Isactive: false, pinned: false },
        { fieldName: "Delta", Isactive: false, pinned: false },
        { fieldName: "EntryTimeStamp", Isactive: false, pinned: false },
        { fieldName: "LastChangeDirection", Isactive: false, pinned: false },
        { fieldName: "Message", Isactive: false, pinned: false },
        { fieldName: "PositionReference", Isactive: false, pinned: false },
        { fieldName: "SEDOL", Isactive: false, pinned: false },
        { fieldName: "SubPriceSource", Isactive: false, pinned: false },
      ];
      for (let col of this.allColumns) {
        for (let pin of this.pinnedArray2) {
          if (pin == col.fieldName) {
            col.pinned = true;
            break;
          }
        }
        this.tempallcolumn.push(col);

      }
      //this.allColumns = this.tempColumn;
    }

    return this.allColumns;
  }
  setJustify(){

    for(let item of this.StaticAllColumns)
    {
      for(let numCol of this.NumericColumns)
      {
        if(item.text== numCol)
        {
          item.cellsalign= localStorage.getItem("NumericJustification")||'right';
          item.align=localStorage.getItem("HeaderJustification")||'center';
          break;
        }
        else
        {
          item.cellsalign=localStorage.getItem("textJustification")||'right';
          item.align=localStorage.getItem("HeaderJustification")||'center';
        }
      }
    }
    this.doUpdate();
  }
  
  getDecimals():Observable<any>
  {
    // if(localStorage.getItem('decimalPlaces')!=null && localStorage.getItem('decimalPlaces')!='' && localStorage.getItem('decimalPlaces')!=undefined)
    // {
    //   this.noOfDecimalPlaces.next(localStorage.getItem('decimalPlaces'));
    // }
    return this.noOfDecimalPlaces.asObservable();
  }
  setDecimals(data:string, DecimalSettings:any)
  {
    localStorage.setItem("decimalPlaces",data);
    for(let item of DecimalSettings)
    {
      localStorage.setItem(item.ColName,item.decimalPlaces);
    }
    this.noOfDecimalPlaces.next(data);
  }
  setPin(columnName:string, pinMode:string)
  {
    if(localStorage.getItem('allColumns')!=null && localStorage.getItem('allColumns')!=undefined && localStorage.getItem('allColumns')!='')
    {
      this.tempColumn=[]
      var localColumnString= localStorage.getItem('allColumns')?.split('//')||'';
      
      for(let i=0;i<localColumnString.length-2;i=i+2) 
      {
        for(let column of this.StaticAllColumns)
        {
          if(localColumnString[i]==column.text)
          {
            if(localColumnString[i+1]=='true')
            {
              if(columnName==column.text)
              {
                if(pinMode=='Pin')
                {
                  if(column.pinned!=true)
                  {
                    column.pinned=true;
                    var count=0;
                    for(let pin of this.pinnedArray)
                    {
                      if(columnName== pin)
                      {
                       count=count+1;
                       break;
                     }
                    }
                    if(count==0)
                    {
                      this.pinnedArray.push(columnName);
                      localStorage.setItem('pinnedArray',JSON.stringify(this.pinnedArray));
                    }  
                  }
                }
                else{
                  if(pinMode=='Unpin')
                  {
                    if(column.pinned!=false)
                    {
                      column.pinned=false;
                      var tempPinnedArray=[];
                      for(let pin of this.pinnedArray)
                      {
                        if(columnName!=pin)
                        {
                          tempPinnedArray.push(pin);
                        }
                      }
                      this.pinnedArray=tempPinnedArray;
                      localStorage.setItem('pinnedArray',JSON.stringify(this.pinnedArray));
                    }
                  }
                }
              }
              this.tempColumn.push(column);
              break;
            } 
          }
        }
      }
      //console.log('hi ')
      this.columns.next(this.tempColumn);
    }
    else
    {
      this.tempColumn=[];
      for(let column of this.StaticAllColumns)
      {
        if (column.text == columnName) {
          if (pinMode == 'Pin') {
            if (column.pinned != true) {
              column.pinned = true;
              var count = 0;
              for (let pin of this.pinnedArray) {
                if (columnName == pin) {
                  count = count + 1;
                  break;
                }
              }
              if (count == 0) {
                this.pinnedArray.push(columnName);
                localStorage.setItem('pinnedArray', JSON.stringify(this.pinnedArray));
              }
            }
          }
          else {
            if (pinMode == 'Unpin') {
              if (column.pinned != false) {
                column.pinned = false;
                var tempPinnedArray = [];
                for (let pin of this.pinnedArray) {
                  if (columnName != pin) {
                    tempPinnedArray.push(pin);
                  }
                }
                this.pinnedArray = tempPinnedArray;
                localStorage.setItem('pinnedArray', JSON.stringify(this.pinnedArray));
              }
            }
          }
        }
        this.tempColumn.push(column);
      }
      this.columns.next(this.tempColumn);
    }
  }
  SetPinWithPinArry() {
    this.pinnedArray2 = [];
    this.tempColumn=[];
    var localColumnString= localStorage.getItem('allColumns')?.split('//')||'';
    
    for (let column of this.allColumns) {
      if (column.Isactive == true && column.pinned == true) {
        this.pinnedArray2.push(column.fieldName);
      }
      localStorage.setItem('pinnedArray2', JSON.stringify(this.pinnedArray2));
    }
    if(this.pinnedArray2.length==0)
    {
      for (let column42 of this.StaticAllColumns)
      {
        for(let xyz of this.allColumns)
      {
        if(xyz.fieldName==column42.text )
        {
          if(xyz.Isactive==true)
          {
            column42.pinned=false;
            this.tempColumn.push(column42);
          }
          break;
        }
      }
      }
    }
    else
    {
      for (let column42 of this.StaticAllColumns) 
    {
      for(let pinnedColumn of this.pinnedArray2)
      {
        if(column42.text==pinnedColumn)
        {
          column42.pinned=true;
          break;
        }
        else
        {
          column42.pinned=false;
        }
      }
      for(let xyz of this.allColumns)
      {
        if(xyz.fieldName==column42.text )
        {
          if(xyz.Isactive==true)
          {
            this.tempColumn.push(column42);
          }
        }
      }
    }
    }
    
    this.columns.next(this.tempColumn);
  }
  setTheme(theme:string)
  {
    this.gridTheme.next(theme);
  }
  getTheme():Observable<string>
  {
    return this.gridTheme.asObservable();
  }
  CsvGen():Observable<string>{
    this.csvFile.next("o");
    return this.csvFile.asObservable();
  }
}


