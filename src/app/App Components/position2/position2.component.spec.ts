import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Position2Component } from './position2.component';

describe('Position2Component', () => {
  let component: Position2Component;
  let fixture: ComponentFixture<Position2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Position2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Position2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
