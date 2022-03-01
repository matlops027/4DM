import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesNaoConfComponent } from './doacoes-nao-conf.component';

describe('DoacoesNaoConfComponent', () => {
  let component: DoacoesNaoConfComponent;
  let fixture: ComponentFixture<DoacoesNaoConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacoesNaoConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacoesNaoConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
