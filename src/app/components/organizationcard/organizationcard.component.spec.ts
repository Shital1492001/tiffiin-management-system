import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationcardComponent } from './organizationcard.component';

describe('OrganizationcardComponent', () => {
  let component: OrganizationcardComponent;
  let fixture: ComponentFixture<OrganizationcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
