import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustompinnedrowrendererComponent } from './custompinnedrowrenderer.component';

describe('CustompinnedrowrendererComponent', () => {
  let component: CustompinnedrowrendererComponent;
  let fixture: ComponentFixture<CustompinnedrowrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustompinnedrowrendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustompinnedrowrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
