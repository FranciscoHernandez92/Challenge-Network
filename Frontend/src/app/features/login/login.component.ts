import { Component, inject } from '@angular/core';
import { RepoService } from '../../services/repo/repo.service';
import { StateService } from '../../services/state/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../../models/model';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CreateUserComponent],
  template: ` <form [formGroup]="formLogin" (ngSubmit)="submit()">
      <label for="username">Username</label>
      <input id="username" type="text" formControlName="username" />
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" />
      <button type="submit" [disabled]="formLogin.invalid">Submit</button>
    </form>
    <div>
      <button type="button">Create User</button>
    </div>`,
  styles: ``,
})
export class LoginComponent {
  private repo = inject(RepoService);
  private state = inject(StateService);
  private fb = inject(FormBuilder);
  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  submit() {
    this.repo.login(this.formLogin.value as UserLogin).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
        console.log('Logged in', token);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });
  }
}
