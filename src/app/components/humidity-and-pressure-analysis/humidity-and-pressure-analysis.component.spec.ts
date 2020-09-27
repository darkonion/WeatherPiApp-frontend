import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityAndPressureAnalysisComponent } from './humidity-and-pressure-analysis.component';

describe('HumidityAndPressureAnalysisComponent', () => {
  let component: HumidityAndPressureAnalysisComponent;
  let fixture: ComponentFixture<HumidityAndPressureAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityAndPressureAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityAndPressureAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
