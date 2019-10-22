import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebrideurComponent } from './debrideur.component';

describe('DebrideurComponent', () => {
  let component: DebrideurComponent;
  let fixture: ComponentFixture<DebrideurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebrideurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebrideurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
