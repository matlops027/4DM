import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDoacaoComponent } from './cad-doacao.component';

describe('CadDoacaoComponent', () => {
  let component: CadDoacaoComponent;
  let fixture: ComponentFixture<CadDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadDoacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
