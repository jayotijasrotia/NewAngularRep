import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFundDialogComponent } from './change-fund-dialog.component';

describe('ChangeFundDialogComponent', () => {
  let component: ChangeFundDialogComponent;
  let fixture: ComponentFixture<ChangeFundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFundDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
