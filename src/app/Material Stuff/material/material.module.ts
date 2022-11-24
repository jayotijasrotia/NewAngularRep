import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const MaterialComponents=[
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatInputModule,
  MatIconModule,
  FormsModule,
  MatToolbarModule,
  MatMenuModule,
  MatTableModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule
]



@NgModule({
  
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
