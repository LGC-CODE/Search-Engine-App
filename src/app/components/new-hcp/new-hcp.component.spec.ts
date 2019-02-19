import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHcpComponent } from './new-hcp.component';

describe('NewHcpComponent', () => {
  let component: NewHcpComponent;
  let fixture: ComponentFixture<NewHcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
