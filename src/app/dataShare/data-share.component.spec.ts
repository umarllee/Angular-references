import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShareComponent } from './data-share.component';

describe('DataShareComponent', () => {
  let component: DataShareComponent;
  let fixture: ComponentFixture<DataShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
