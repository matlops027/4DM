import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexInstituicaoComponent } from './index-instituicao.component';

describe('IndexInstituicaoComponent', () => {
  let component: IndexInstituicaoComponent;
  let fixture: ComponentFixture<IndexInstituicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexInstituicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
