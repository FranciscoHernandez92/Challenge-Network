import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state/state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  template: `<header>
    <h1>Network</h1>
    @if ( (stateService.getState() | async)!.loginState === 'logged') {
    <button (click)="onClickLogout()">Logout'</button>

    } @else {
    <button (click)="onClickLogin()">Login</button>
    }
  </header> `,
  styles: `
  `,
})
export class HeaderComponent {
  stateService = inject(StateService);

  onClickLogin() {
    this.stateService.setLoginState('logging');
  }

  onClickLogout() {
    this.stateService.setLogout();
  }
}
