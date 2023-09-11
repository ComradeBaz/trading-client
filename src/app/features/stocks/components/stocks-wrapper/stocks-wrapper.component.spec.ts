import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksWrapperComponent } from './stocks-wrapper.component';

describe('StocksWrapperComponent', () => {
  let component: StocksWrapperComponent;
  let fixture: ComponentFixture<StocksWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
