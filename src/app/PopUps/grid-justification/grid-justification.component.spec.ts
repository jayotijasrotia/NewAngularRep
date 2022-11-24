import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridJustificationComponent } from './grid-justification.component';

describe('GridJustificationComponent', () => {
  let component: GridJustificationComponent;
  let fixture: ComponentFixture<GridJustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridJustificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
