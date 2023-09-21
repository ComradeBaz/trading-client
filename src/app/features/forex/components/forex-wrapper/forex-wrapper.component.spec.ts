import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexWrapperComponent } from './forex-wrapper.component';

describe('ForexWrapperComponent', () => {
  let component: ForexWrapperComponent;
  let fixture: ComponentFixture<ForexWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
