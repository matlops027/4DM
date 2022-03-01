import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstComponent } from './listar-inst.component';

describe('ListarInstComponent', () => {
  let component: ListarInstComponent;
  let fixture: ComponentFixture<ListarInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
