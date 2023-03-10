import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTableComponent } from './drag-table.component';

describe('DragTableComponent', () => {
  let component: DragTableComponent;
  let fixture: ComponentFixture<DragTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
