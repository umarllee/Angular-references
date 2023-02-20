import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperPopUpComponent } from './hyper-pop-up.component';

describe('HyperPopUpComponent', () => {
  let component: HyperPopUpComponent;
  let fixture: ComponentFixture<HyperPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyperPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
