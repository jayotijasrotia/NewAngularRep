import { Component, OnInit } from '@angular/core';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pin-column-with-list',
  templateUrl: './pin-column-with-list.component.html',
  styleUrls: ['./pin-column-with-list.component.scss']
})
export class PinColumnWithListComponent implements OnInit {
  public columns: any[] = [];
  public allcolumns: any[] = [];
  constructor(private columnService: ColumnServiceService, private Dialogref: MatDialogRef<PinColumnWithListComponent>) { }

  ngOnInit(): void {
    for (let column of this.columnService.getActiveInactiveColumns()) {
      if (column.Isactive == true) {
        this.columns.push(column);
      }
    }
    this.allcolumns = this.columnService.getActiveInactiveColumns();

  }
  onPinSet() {

    for (let col of this.allcolumns) {
      for (let tempcolumn of this.columns) {
        if (col.fieldName == tempcolumn.fieldName) {
          col.pinned = tempcolumn.pinned;
          break;
        }
      }
    }
    this.columnService.SetPinWithPinArry();
    this.Dialogref.close();
  }
}
