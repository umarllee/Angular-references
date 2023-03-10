import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExchangeTableComponent } from './data-exchange-table.component';

describe('DataExchangeTableComponent', () => {
  let component: DataExchangeTableComponent;
  let fixture: ComponentFixture<DataExchangeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExchangeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExchangeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
