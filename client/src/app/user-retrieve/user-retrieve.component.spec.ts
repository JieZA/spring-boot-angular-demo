import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRetrieveComponent } from './user-retrieve.component';

describe('UserRetrieveComponent', () => {
  let component: UserRetrieveComponent;
  let fixture: ComponentFixture<UserRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRetrieveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
