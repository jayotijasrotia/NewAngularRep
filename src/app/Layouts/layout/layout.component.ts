import { Component,OnInit,ViewChild} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from '../../PopUps/order/order.component';
import { ColumnDiaglogComponent } from 'src/app/PopUps/column-diaglog/column-diaglog.component';
import { PincolumnComponent } from 'src/app/PopUps/pincolumn/pincolumn.component';
import { DecimalvalueComponent } from 'src/app/PopUps/decimalvalue/decimalvalue.component';
import { ColumnServiceService } from 'src/app/Services/Columns-Selection-Services/column-service.service';
import { PinColumnWithListComponent } from 'src/app/PopUps/pin-column-with-list/pin-column-with-list.component';
import { GridJustificationComponent } from 'src/app/PopUps/grid-justification/grid-justification.component';
import { LoderServiceService } from 'src/app/Services/Loader/loder-service.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ColumnApi } from 'ag-grid-community';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit  {

  //@ViewChild('userName') inputname;
  //gridColumn!: ColumnApi;
  gridState:any;
  // userName: '';
  // password: '';

  constructor(private authService: AuthenticationService,private router :Router, private loaderService:LoderServiceService,private dialog: MatDialog,private columnService:ColumnServiceService) { }
  isChecked: boolean = true;
  isLogin: boolean= false;
  isLoading:string='false'
  mode: string = 'nightlight_round';

  changed(event: MatSlideToggleChange): void {
    this.mode = event.checked ? 'nightlight_round' : 'light_mode';
    document.body.classList.toggle('darkMode');
    document.body.classList.toggle("[theme]="+"'dark'");
    if(this.isChecked)
    {
      localStorage.setItem('DarkMode','true');
      this.columnService.setTheme('dark');
    }
    else
    {
      localStorage.setItem('DarkMode','false');
     this.columnService.setTheme('light');
    }
  }
  ngOnInit(): void {
    this.loaderService.getLoader().subscribe(
      message=>{
        this.isLoading= message;
      }
    );
    if(localStorage.getItem('DarkMode')!=''&&localStorage.getItem('DarkMode')!=null&&localStorage.getItem('DarkMode')!=undefined)
    {
      if(localStorage.getItem('DarkMode')!='true')
      {
        this.isChecked=false;
        document.body.classList.toggle('darkMode');
        //localStorage.setItem('DarkMode','false');
        this.columnService.setTheme('light');
      }
      else
      {
        this.columnService.setTheme('dark');
      }
      
    }
    else
    {
      this.columnService.setTheme('dark');
    }
    if(sessionStorage.getItem('isLogin')!=undefined && sessionStorage.getItem('isLogin')==='true')
    {
      this.isLogin=true;
      // this.router.navigate(['/position'])
    }
    else
    {
      this.isLogin=false;
      this.router.navigate(['/login'])
    }
  }
  OnLogin(eventData:{})
  {
    this.isLogin=true;
  }
  OnLogout(){
    this.isLogin=false;
   sessionStorage.setItem('isLogin','false');
 
     if(localStorage.getItem('isRemember') == 'false')
     {
      // this.userName = '';
      // this.password = '';
     // localStorage.setItem('grid',JSON.stringify(this.gridState));
     // localStorage.getItem('grid');
     // alert('data saved');

    }
   
    this.router.navigate([''])
    
  }
  onOrder()
  {
    this.dialog.open(ColumnDiaglogComponent,{
      height:'60%'
    })
  }
  onPin()
  {
    this.dialog.open(PinColumnWithListComponent,{
      height:'60%'
    })
  }
  onDecimalChange()
  {
    this.dialog.open(DecimalvalueComponent,{
       height:'60%'
    })
  }
  onJustify()
  {
    this.dialog.open(GridJustificationComponent,{
      //height:'60%'
   }) 
  }
  CSVGenrate(){
    this.columnService.CsvGen();
  }
  PDFGenerate(){
    
  }
}
