import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QApositionComponent } from './qaposition.component';

describe('QApositionComponent', () => {
  let component: QApositionComponent;
  let fixture: ComponentFixture<QApositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QApositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QApositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
