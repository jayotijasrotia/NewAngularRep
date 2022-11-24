import { ComponentFixture, TestBed } from '@angular/core/testing';

import { positionDemoComponent } from './position-demo.component';

describe('PositionDemoComponent', () => {
  let component: positionDemoComponent;
  let fixture: ComponentFixture<positionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ positionDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(positionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
