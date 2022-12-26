import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewBookComponent } from './list-view-book.component';

describe('ListViewBookComponent', () => {
  let component: ListViewBookComponent;
  let fixture: ComponentFixture<ListViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
