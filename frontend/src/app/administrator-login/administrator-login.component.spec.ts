import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorLoginComponent } from './administrator-login.component';

describe('AdministratorLoginComponent', () => {
  let component: AdministratorLoginComponent;
  let fixture: ComponentFixture<AdministratorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorLoginComponent]
    });
    fixture = TestBed.createComponent(AdministratorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
