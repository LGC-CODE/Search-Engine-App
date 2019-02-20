import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpConfirmationComponent } from './hcp-confirmation.component';

describe('HcpConfirmationComponent', () => {
  let component: HcpConfirmationComponent;
  let fixture: ComponentFixture<HcpConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcpConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
