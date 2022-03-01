import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPrioridadeComponent } from './mostrar-prioridade.component';

describe('MostrarPrioridadeComponent', () => {
  let component: MostrarPrioridadeComponent;
  let fixture: ComponentFixture<MostrarPrioridadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPrioridadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
