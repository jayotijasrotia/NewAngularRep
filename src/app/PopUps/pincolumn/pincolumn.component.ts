import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';

@Component({
  selector: 'app-pincolumn',
  templateUrl: './pincolumn.component.html',
  styleUrls: ['./pincolumn.component.scss']
})
export class PincolumnComponent implements OnInit {

  public columns:any[]=[];
  selectedColumn:any;
  pinModes=['Pin','Unpin'];
  selectedPin:any;
  selectedPins:any;
  constructor(private columnService:ColumnServiceService,private Dialogref:MatDialogRef<PincolumnComponent>) { }

  ngOnInit(): void {
    for(let column of this.columnService.getActiveInactiveColumns() )
    {
      if (column.Isactive==true)
      {
        this.columns.push(column.fieldName);
      }
    }
    
     
  }
  onPinSet()
  {
   
     this.columnService.setPin(this.selectedColumn,this.selectedPin);
      this.Dialogref.close();
  }

}
