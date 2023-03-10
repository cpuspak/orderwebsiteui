import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardFiltersComponent } from './admin-dashboard-filters.component';

describe('AdminDashboardFiltersComponent', () => {
  let component: AdminDashboardFiltersComponent;
  let fixture: ComponentFixture<AdminDashboardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
