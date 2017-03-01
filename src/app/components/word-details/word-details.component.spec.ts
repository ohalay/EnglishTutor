import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetainlsComponent } from './word-details.component';

describe('WordDetailsComponent', () => {
  let component: WordDetainlsComponent;
  let fixture: ComponentFixture<WordDetainlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordDetainlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetainlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
