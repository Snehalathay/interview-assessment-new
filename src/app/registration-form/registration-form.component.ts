import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  form: any; 
  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }

  register(): void {
    this.authService.registerApi()
      .subscribe((data:any) => {
        this.authService.setIsAuthenticated(data.success);
        if (data.success) {
          this.router.navigateByUrl('/profile');
        }
      });
  }
}
