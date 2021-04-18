import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningStrikesMonitoringComponent } from './lightning-strikes-monitoring.component';

describe('LightningStrikesMonitoringComponent', () => {
  let component: LightningStrikesMonitoringComponent;
  let fixture: ComponentFixture<LightningStrikesMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightningStrikesMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightningStrikesMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
