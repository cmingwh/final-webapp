import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechFeeComponent } from './admin-tech-fee.component';

describe('AdminTechFeeComponent', () => {
  let component: AdminTechFeeComponent;
  let fixture: ComponentFixture<AdminTechFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTechFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
