import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesConfirmComponent } from './doacoes-confirm.component';

describe('DoacoesConfirmComponent', () => {
  let component: DoacoesConfirmComponent;
  let fixture: ComponentFixture<DoacoesConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacoesConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacoesConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
