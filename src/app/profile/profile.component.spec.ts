import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthServiceStub } from '../mocks/AuthService.mock';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfileApi() of AuthService on component Init', () => {
    const spy = spyOn(service, 'getProfileApi').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should have profile data on getProfileApi() called in component Init', async () => {
    const spy = spyOn(service, 'getProfileApi').and.callThrough();
    component.ngOnInit();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toEqual('Profile');
    expect(component.profile.name).toEqual('King Julien');
    expect(compiled.querySelector('.user-name')?.textContent).toEqual('King Julien');
    expect(component.profile.email).toEqual('kingj@email.com');
    expect(compiled.querySelector('.user-email')?.textContent).toEqual('kingj@email.com');
    expect(component.profile.bio).toEqual('Hi my name is King Julien and I like to move it move it.');
    expect(compiled.querySelector('.user-bio')?.textContent).toEqual('Hi my name is King Julien and I like to move it move it.');
    expect(component.profile.img).toEqual('https://tinyurl.com/2p9953zy');
  });

});
