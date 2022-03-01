import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadProdComponent } from './cad-prod.component';

describe('CadProdComponent', () => {
  let component: CadProdComponent;
  let fixture: ComponentFixture<CadProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
