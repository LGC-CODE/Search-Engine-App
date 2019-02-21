import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpDesktopComponent } from './hcp-desktop.component';

describe('HcpDesktopComponent', () => {
  let component: HcpDesktopComponent;
  let fixture: ComponentFixture<HcpDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcpDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
