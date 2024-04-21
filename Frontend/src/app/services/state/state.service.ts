import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginState, Payload, State } from '../../models/model';
import { RepoService } from '../repo/repo.service';
import { jwtDecode } from 'jwt-decode';

const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private repoUsers = inject(RepoService);
  private displayForm = new BehaviorSubject<boolean>(false);
  public displayForm$ = this.displayForm.asObservable();

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getToken = (): string | null => this.state$.value.token;

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currenPayload = jwtDecode(token) as Payload;
    localStorage.setItem('week7.ng', JSON.stringify({ token }));
    this.repoUsers.getById(currenPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('week7.ng');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
  }

  showForm(show: boolean) {
    this.displayForm.next(show);
  }
}
