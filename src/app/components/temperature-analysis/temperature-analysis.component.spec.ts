import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureAnalysisComponent } from './temperature-analysis.component';

describe('TemperatureAnalysisComponent', () => {
  let component: TemperatureAnalysisComponent;
  let fixture: ComponentFixture<TemperatureAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
