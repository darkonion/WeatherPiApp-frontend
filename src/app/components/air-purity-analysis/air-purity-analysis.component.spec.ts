import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPurityAnalysisComponent } from './air-purity-analysis.component';

describe('AirPurityAnalysisComponent', () => {
  let component: AirPurityAnalysisComponent;
  let fixture: ComponentFixture<AirPurityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirPurityAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirPurityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
