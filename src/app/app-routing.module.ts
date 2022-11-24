import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { PositionsComponent } from './App Components/positions/positions.component';
import { LogInComponent } from './App Components/log-in/log-in.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { Position2Component } from './App Components/position2/position2.component';
import { positionDemoComponent } from './position-demo/position-demo.component';
import { QApositionComponent } from './qaposition/qaposition.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'login',
        component: LogInComponent
      },
      {
        path: 'position',
        component: Position2Component
      },
      {
        path: 'positionDemo',
        component:positionDemoComponent
      },
      
      {
        path: 'positions',
        component: PositionsComponent
      },
   
      {
        path:'QAposition',
        component:QApositionComponent
      }
    ]
    
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
