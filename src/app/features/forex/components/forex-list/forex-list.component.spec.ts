import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexListComponent } from './forex-list.component';

describe('ForexListComponent', () => {
  let component: ForexListComponent;
  let fixture: ComponentFixture<ForexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
