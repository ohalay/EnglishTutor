import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabilaryComponent } from './vocabilary.component';

describe('VocabilaryComponent', () => {
  let component: VocabilaryComponent;
  let fixture: ComponentFixture<VocabilaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabilaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabilaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
