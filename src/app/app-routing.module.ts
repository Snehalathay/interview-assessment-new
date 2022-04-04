import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  { path: 'register', pathMatch: 'full', component: RegistrationFormComponent },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: '404', pathMatch: 'full', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
