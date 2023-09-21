import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexDetailComponent } from './forex-detail.component';

describe('ForexDetailComponent', () => {
  let component: ForexDetailComponent;
  let fixture: ComponentFixture<ForexDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
