import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesChartComponent } from './companies-chart.component';

describe('CompaniesChartComponent', () => {
  let component: CompaniesChartComponent;
  let fixture: ComponentFixture<CompaniesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
