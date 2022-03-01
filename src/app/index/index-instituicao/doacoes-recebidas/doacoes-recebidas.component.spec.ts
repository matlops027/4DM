import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesRecebidasComponent } from './doacoes-recebidas.component';

describe('DoacoesRecebidasComponent', () => {
  let component: DoacoesRecebidasComponent;
  let fixture: ComponentFixture<DoacoesRecebidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacoesRecebidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacoesRecebidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
