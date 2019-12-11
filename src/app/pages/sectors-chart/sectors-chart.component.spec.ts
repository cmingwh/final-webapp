import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsChartComponent } from './sectors-chart.component';

describe('SectorsChartComponent', () => {
  let component: SectorsChartComponent;
  let fixture: ComponentFixture<SectorsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
