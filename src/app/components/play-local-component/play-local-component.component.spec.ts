import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLocalComponent } from './play-local-component.component';

describe('PlayLocalComponent', () => {
  let component: PlayLocalComponent;
  let fixture: ComponentFixture<PlayLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
