import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexListItemComponent } from './forex-list-item.component';

describe('ForexListItemComponent', () => {
  let component: ForexListItemComponent;
  let fixture: ComponentFixture<ForexListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
