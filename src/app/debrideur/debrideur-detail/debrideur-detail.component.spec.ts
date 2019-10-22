import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebrideurDetailComponent } from './debrideur-detail.component';

describe('DebrideurDetailComponent', () => {
  let component: DebrideurDetailComponent;
  let fixture: ComponentFixture<DebrideurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebrideurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebrideurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
