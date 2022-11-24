import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinColumnWithListComponent } from './pin-column-with-list.component';

describe('PinColumnWithListComponent', () => {
  let component: PinColumnWithListComponent;
  let fixture: ComponentFixture<PinColumnWithListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinColumnWithListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinColumnWithListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
