import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriasDoacoesComponent } from './proprias-doacoes.component';

describe('PropriasDoacoesComponent', () => {
  let component: PropriasDoacoesComponent;
  let fixture: ComponentFixture<PropriasDoacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropriasDoacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropriasDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
