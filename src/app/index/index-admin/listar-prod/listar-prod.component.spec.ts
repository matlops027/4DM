import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdComponent } from './listar-prod.component';

describe('ListarProdComponent', () => {
  let component: ListarProdComponent;
  let fixture: ComponentFixture<ListarProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
