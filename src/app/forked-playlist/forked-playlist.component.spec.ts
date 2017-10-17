import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkedPlaylistComponent } from './forked-playlist.component';

describe('ForkedPlaylistComponent', () => {
  let component: ForkedPlaylistComponent;
  let fixture: ComponentFixture<ForkedPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkedPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
