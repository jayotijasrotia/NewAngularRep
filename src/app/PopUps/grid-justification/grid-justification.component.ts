import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';

@Component({
  selector: 'app-grid-justification',
  templateUrl: './grid-justification.component.html',
  styleUrls: ['./grid-justification.component.scss']
})
export class GridJustificationComponent implements OnInit {

  constructor(private columnService: ColumnServiceService,  private Dialog: MatDialog, public dialogRef: MatDialogRef<GridJustificationComponent>, private comp: ColumnServiceService) { }
  JustifyArray:any[]=["center","left","right"];
   headerJustify:any="center";
   textJustify:any='left';
  numericJustify:any='right';
  ngOnInit(): void {
   this.headerJustify=localStorage.getItem("HeaderJustification")||"center";
  this.textJustify=localStorage.getItem("textJustification")||'left';
  this.numericJustify=localStorage.getItem("NumericJustification")||'right';
  }
  setJustify(){
    localStorage.setItem("NumericJustification",this.numericJustify);
    localStorage.setItem("HeaderJustification",this.headerJustify);
    localStorage.setItem("textJustification",this.textJustify);
    this.columnService.setJustify();
    this.dialogRef.close();
  }
}
