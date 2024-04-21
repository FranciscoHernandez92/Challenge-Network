import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../../services/state/state.service';
import { State } from '../../models/model';
import { JsonPipe } from '@angular/common';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header />
    @switch (state.loginState) { @case ('idle') { } @case ('logging') {
    <app-login />
    <app-create-user /> } @case ('logged') {
    <p>Welcome</p>
    <pre>{{ state.currenUser | json }}</pre>
    } @case ('error') {
    <p>Error de acceso</p>
    <app-create-user />
    } }
    <app-footer />
  `,
  styles: ``,
  imports: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    JsonPipe,
    CreateUserComponent,
  ],
})
export default class HomeComponent {
  stateService = inject(StateService);
  state!: State;
  constructor() {
    this.formLogin();
  }

  formLogin() {
    this.stateService.getState().subscribe((state) => {
      this.state = state;
    });
  }
  formCreate() {
    this.stateService.showForm(true);
  }
}
