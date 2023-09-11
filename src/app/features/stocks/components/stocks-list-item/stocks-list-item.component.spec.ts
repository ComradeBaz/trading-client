import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksListItemComponent } from './stocks-list-item.component';

describe('StocksListItemComponent', () => {
  let component: StocksListItemComponent;
  let fixture: ComponentFixture<StocksListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
