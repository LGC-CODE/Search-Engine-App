import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewHcpComponent } from './popup-new-hcp.component';

describe('PopupNewHcpComponent', () => {
  let component: PopupNewHcpComponent;
  let fixture: ComponentFixture<PopupNewHcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNewHcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
