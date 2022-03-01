import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefiniPrioridadeComponent } from './defini-prioridade.component';

describe('DefiniPrioridadeComponent', () => {
  let component: DefiniPrioridadeComponent;
  let fixture: ComponentFixture<DefiniPrioridadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefiniPrioridadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefiniPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
