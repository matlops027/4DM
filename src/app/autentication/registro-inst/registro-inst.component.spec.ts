import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInstComponent } from './registro-inst.component';

describe('RegistroInstComponent', () => {
  let component: RegistroInstComponent;
  let fixture: ComponentFixture<RegistroInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
