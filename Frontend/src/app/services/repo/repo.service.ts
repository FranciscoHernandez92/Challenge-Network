import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserLogin } from '../../models/model';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/users';

  login(_data: UserLogin) {
    const data = {
      name: _data.username,
      password: _data.password,
    };
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getById(id: string) {
    return this.httpClient.get(this.url + '/' + id);
  }
}
