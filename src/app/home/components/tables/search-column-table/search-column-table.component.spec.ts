import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColumnTableComponent } from './search-column-table.component';

describe('SearchColumnTableComponent', () => {
  let component: SearchColumnTableComponent;
  let fixture: ComponentFixture<SearchColumnTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchColumnTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchColumnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
