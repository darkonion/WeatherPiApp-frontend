import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStationComponent } from './about-station.component';

describe('AboutStationComponent', () => {
  let component: AboutStationComponent;
  let fixture: ComponentFixture<AboutStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
