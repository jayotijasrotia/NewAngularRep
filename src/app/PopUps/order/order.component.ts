import { Component, OnInit } from '@angular/core';
import { SelectColumnsService } from '../../Services/select-columns.service';
import{Router} from '@angular/router'
import{MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  activeColumns: string[]=this.columnService.Activecolumns;
  columnList2 :any;
  columnlistString:string='';
  activecolumnsString!:string;
  constructor(private columnService :SelectColumnsService,private router :Router, private Dialogref:MatDialogRef<OrderComponent>) { }
  
  ngOnInit(){
    this.columnList2=this.columnService.columnList;
    console.log(this.columnService.columnList);
  }

  onSave2(){
    this.columnService.columnList=this.columnList2;
    this.activeColumns=[];
    for(let column of this.columnService.columnList)
    {
      if(column.IsActive)
      {
        this.activeColumns.push(column.ColumnName);
      }
      if(column.ColumnName=='Fundname')
      {
        this.columnlistString= column.ColumnName+'/'+column.IsActive+'/';
      }
      else
      {
        this.columnlistString= this.columnlistString+column.ColumnName+'/'+column.IsActive+'/';
      }
      
    }
    //console.log(this.columnlistString);
    localStorage.setItem('columnList',this.columnlistString);
    this.columnService.Activecolumns=this.activeColumns;
    this.activecolumnsString=this.activeColumns.join('/');
    localStorage.setItem('activeColumns',this.activecolumnsString)
    this.Dialogref.close();
    this.router.navigate(['/positions']);
    
  }

}
