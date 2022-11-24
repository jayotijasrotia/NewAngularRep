import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincolumnComponent } from './pincolumn.component';

describe('PincolumnComponent', () => {
  let component: PincolumnComponent;
  let fixture: ComponentFixture<PincolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PincolumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PincolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
