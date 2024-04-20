import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../../services/state/state.service';
import { State } from '../../models/model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-header />
    @switch (state.loginState) { @case ('idle') {
    <p>Esperando al usuario</p>
    } @case ('logging') {
    <app-login />
    } @case ('logged') {
    <p>Welcome</p>
    <pre>{{ state.currenUser | json }}</pre>
    } @case ('error') {
    <p>Error de acceso</p>
    } }
    <app-footer />
  `,
  styles: ``,
  imports: [HeaderComponent, FooterComponent, LoginComponent, JsonPipe],
})
export default class HomeComponent implements OnInit {
  stateService = inject(StateService);
  state!: State;

  ngOnInit() {
    this.stateService.getState().subscribe((state) => {
      this.state = state;
    });
  }
}
