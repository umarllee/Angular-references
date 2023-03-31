import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFilesComponent } from './export-files.component';

describe('ExportFilesComponent', () => {
  let component: ExportFilesComponent;
  let fixture: ComponentFixture<ExportFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
