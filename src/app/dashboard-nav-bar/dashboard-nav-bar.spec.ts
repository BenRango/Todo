import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavBar } from './dashboard-nav-bar';

describe('DashboardNavBar', () => {
  let component: DashboardNavBar;
  let fixture: ComponentFixture<DashboardNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
