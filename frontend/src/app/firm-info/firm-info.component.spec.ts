import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmInfoComponent } from './firm-info.component';

describe('FirmInfoComponent', () => {
  let component: FirmInfoComponent;
  let fixture: ComponentFixture<FirmInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmInfoComponent]
    });
    fixture = TestBed.createComponent(FirmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
