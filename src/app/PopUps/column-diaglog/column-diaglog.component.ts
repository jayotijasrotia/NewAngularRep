import { Component, OnInit } from '@angular/core';
import { SelectColumnsService } from '../../Services/select-columns.service';
import{Router} from '@angular/router'
import{MatDialogRef} from '@angular/material/dialog'
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
@Component({
  selector: 'app-column-diaglog',
  templateUrl: './column-diaglog.component.html',
  styleUrls: ['./column-diaglog.component.scss']
})
export class ColumnDiaglogComponent implements OnInit {
  
  constructor(private columnService :ColumnServiceService,private router :Router, private Dialogref:MatDialogRef<ColumnDiaglogComponent>) { }
  checking:any;
  allColumnsVisibleOnDiaglog:any[]=[];
  
  ngOnInit(){
    this.allColumnsVisibleOnDiaglog=this.columnService.getActiveInactiveColumns();
  }
  
  onSave2(){
    var localColumnString='';
    
    for(let column of this.columnService.allColumns)
    {
      if(column.fieldName=='Fund')
      {
        localColumnString= column.fieldName+'//'+column.Isactive+'//';
      }
      else
      {
        localColumnString=localColumnString+column.fieldName+'//'+column.Isactive+'//';
      }
    }
    localStorage.setItem('allColumns',localColumnString);
    this.columnService.doUpdate();
    this.Dialogref.close();
    }
  }


