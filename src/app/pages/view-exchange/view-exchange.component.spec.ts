import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExchangeComponent } from './view-exchange.component';

describe('ViewExchangeComponent', () => {
  let component: ViewExchangeComponent;
  let fixture: ComponentFixture<ViewExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
