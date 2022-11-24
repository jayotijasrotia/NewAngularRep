import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { MaterialModule } from './Material Stuff/material/material.module';
import { PositionsComponent } from './App Components/positions/positions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeFundDialogComponent } from './PopUps/change-fund-dialog/change-fund-dialog.component';
import { LogInComponent } from './App Components/log-in/log-in.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { OrderComponent } from './PopUps/order/order.component';
import { PostiveNumPipe } from './Custom Pipes/postive-num.pipe';
import { Position2Component } from './App Components/position2/position2.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxLoaderModule } from 'jqwidgets-ng/jqxloader';
import { ColumnDiaglogComponent } from './PopUps/column-diaglog/column-diaglog.component';
import { PincolumnComponent } from './PopUps/pincolumn/pincolumn.component';
import { DecimalvalueComponent } from './PopUps/decimalvalue/decimalvalue.component';
import { PinColumnWithListComponent } from './PopUps/pin-column-with-list/pin-column-with-list.component';
import { GridJustificationComponent } from './PopUps/grid-justification/grid-justification.component';
import { jqxScrollBarModule } from 'jqwidgets-ng/jqxscrollbar';
import { positionDemoComponent } from './position-demo/position-demo.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustompinnedrowrendererComponent } from './custompinnedrowrenderer/custompinnedrowrenderer.component';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';
import { ModuleRegistry } from 'ag-grid-community/';
import { QApositionComponent } from './qaposition/qaposition.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



//LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-14_January_2023_[v2]_MTY3MzY1NDQwMDAwMA==908f41c5add31c9c0ea87d7f54a17956");

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PositionsComponent,
    ChangeFundDialogComponent,
    LogInComponent,
    LayoutComponent,
    OrderComponent,
    PostiveNumPipe,
    Position2Component,
    ColumnDiaglogComponent,
    PincolumnComponent,
    DecimalvalueComponent,
    PinColumnWithListComponent,
    GridJustificationComponent,
    positionDemoComponent,
    CustompinnedrowrendererComponent,
    CustomizedCellComponent,
    QApositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgGridModule,
    jqxGridModule,
    jqxLoaderModule,
    jqxButtonModule,
    jqxScrollBarModule,
  
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}}, 
    {provide: MatDialogRef, useValue: {}},
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
