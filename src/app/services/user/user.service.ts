import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/AuthResponse';
import { SingUpUserRequest } from 'src/app/models/interfaces/user/SignUpUserRequest';
import { SingUpUserResponse } from 'src/app/models/interfaces/user/SingUpUserResponse';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //Metodo que irá verificar se o usuário pode se logar na aplicação
  singUpUser(requestDatas: SingUpUserRequest): Observable<SingUpUserResponse> {
    return this.http.post<SingUpUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )
  }

  //Metodo que irá fazer a autenticação do usuário na aplicação
  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestDatas
    )
  }

  //Metodo que irá verificar se o usuário possui cookie ou token
  IsLoggedIn(): boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
