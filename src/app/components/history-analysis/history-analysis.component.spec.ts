import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAnalysisComponent } from './history-analysis.component';

describe('HistoryAnalysisComponent', () => {
  let component: HistoryAnalysisComponent;
  let fixture: ComponentFixture<HistoryAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
