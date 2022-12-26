import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnetDialogComponent } from './disconnet-dialog.component';

describe('DisconnetDialogComponent', () => {
  let component: DisconnetDialogComponent;
  let fixture: ComponentFixture<DisconnetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
