import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMeasurementsComponent } from './current-measurements.component';

describe('CurrentMeasurementsComponent', () => {
  let component: CurrentMeasurementsComponent;
  let fixture: ComponentFixture<CurrentMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
