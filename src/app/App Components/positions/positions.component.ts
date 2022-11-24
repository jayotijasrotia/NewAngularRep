import {Component,OnInit,ViewChild,Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Funds} from '../../Interface/all-funds.interface';
import {positions} from '../../Interface/positions.interface';
import {columns} from '../../Interface/columns.interface';
import {FundPerformance} from '../../Interface/fund-performance.inteface';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeFundDialogComponent } from '../../PopUps/change-fund-dialog/change-fund-dialog.component';
import { OrderComponent } from '../../PopUps/order/order.component';
import { SelectColumnsService } from '../../Services/select-columns.service';
import {interval} from 'rxjs'
import { GetDataService } from 'src/app/Services/webServices/get-data.service';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})

export class PositionsComponent implements OnInit  { 

  activeColumns!: string[] ;
  dataSource!: MatTableDataSource<any>;

  username!:string;
  token!:string;
  fundList!:Funds[]
  activeFundName!:string;
  activeFundId!:number;
  activeMode:string='None';
  positions!:positions[];
  columnListString!:string|null;
  tempColumn !:columns;
  fundPerformance!:FundPerformance;
  panelOpenState=false;
  apiInterval=interval(1000);
  
  // getMTDClass!:string;
  // getDailyClass!:string;
  // getYTDClass!:string;
  // getQTDClass!:string;
  
  // getMTDProfitPerClass!:string;
  // getDailyProfitPerClass!:string;
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service:GetDataService,private Dialog: MatDialog,private columnService :SelectColumnsService,
    ) { }

  ngOnInit() {
    this.username= window.atob(localStorage.getItem('token')||'').toString().split(':')[0];
    this.token= localStorage.getItem('token')||'';
    this.service.getAllFunds(this.username,this.token)
    .subscribe(
      {next:(res)=>{
        //console.log(res);
        this.activeFundId= res[0].FundGroupID;
        this.activeFundName=res[0].FundGroupName;
        this.fundList=res;
        if(localStorage.getItem('columnList')!=null && localStorage.getItem('columnList')!=undefined)
        {
          this.columnService.loadColumns();
          this.activeColumns= this.columnService.Activecolumns;
        }
        else
        {
          if(this.columnService.Activecolumns==undefined)
          {
            console.log(this.columnService.AllColumnsList);
            this.activeColumns= this.columnService.AllColumnsList;
            console.log(this.activeColumns);

            console.log('activecolumn empty');
          }
          else{
            this.activeColumns=this.columnService.Activecolumns;
            console.log(this.columnService.Activecolumns);
            console.log('activecolumn are there');
          }
         }
        
         this.apiInterval.subscribe(x=>
          {
            this.getPositions();
            
          })  
        
      }}
    );
     
  }
 
  getPositions()
  {
    this.service.getpositions(this.activeFundId,'None',this.token)
    .subscribe(
      {
        next:(res)=>{
          
          this.dataSource = new MatTableDataSource(res);
          this.positions=res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        }
      }
    );
    this.service.getFundperformance(this.activeFundId,'None',this.token)
    .subscribe(
      {
        next:(data)=>{
          //console.log(res);
          this.fundPerformance=data[0];
          if(Math.round(data[0].CurrentNAV) >= 0)
            this.fundPerformance.CurrentNAV=Math.round(data[0].CurrentNAV);
          else
            this.fundPerformance.CurrentNAV=Math.round(data[0].CurrentNAV) * -1


        }
      }
    )
  }
  
  openDialog(){
    this.Dialog.open(ChangeFundDialogComponent,{
      width:'40%',
      panelClass:'dialog-container-custom',
      data:{
        fundlist:this.fundList,
        activeMode:this.activeMode,
        activeFundId:this.activeFundId,
        activeFundname:this.activeFundName
      }
    }).afterClosed().subscribe(
      result=>{
        this.activeFundId=result.selectedFundId;
        this.activeMode=result.selectedMode;
        this.getPositions();
        if(this.columnService.Activecolumns==null)
        {
          this.activeColumns= this.columnService.AllColumnsList;
          console.log('activecolumn empty');
        }
        else{
          this.activeColumns=this.columnService.Activecolumns;
          console.log('activecolumn are there');
        }
        for(let fund of this.fundList)
        {
          if(this.activeFundId===fund.FundGroupID)
          {
            this.activeFundName=fund.FundGroupName;
            break;
          }
        }

      }
    )
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

