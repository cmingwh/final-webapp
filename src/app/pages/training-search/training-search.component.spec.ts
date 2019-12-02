import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSearchComponent } from './training-search.component';

describe('TrainingSearchComponent', () => {
  let component: TrainingSearchComponent;
  let fixture: ComponentFixture<TrainingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
