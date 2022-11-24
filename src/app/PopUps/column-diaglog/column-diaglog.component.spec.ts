import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDiaglogComponent } from './column-diaglog.component';

describe('ColumnDiaglogComponent', () => {
  let component: ColumnDiaglogComponent;
  let fixture: ComponentFixture<ColumnDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
