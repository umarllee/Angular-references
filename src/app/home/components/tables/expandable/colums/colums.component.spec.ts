import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumsComponent } from './colums.component';

describe('ColumsComponent', () => {
  let component: ColumsComponent;
  let fixture: ComponentFixture<ColumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
