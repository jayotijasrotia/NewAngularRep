import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalvalueComponent } from './decimalvalue.component';

describe('DecimalvalueComponent', () => {
  let component: DecimalvalueComponent;
  let fixture: ComponentFixture<DecimalvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecimalvalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecimalvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
