import { MessageService } from 'primeng/api';
import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { SingUpUserRequest } from 'src/app/models/interfaces/user/SignUpUserRequest';
import { SingUpUserResponse } from 'src/app/models/interfaces/user/SingUpUserResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]

  })

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private MessageService: MessageService,
    private router: Router
  ) { }

  //Metodo que irá fazer a validação do login e senha do cliente
  OnSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              //Após o usuário se autenticar, será redirecionado para pg dashboard
              this.router.navigate(['/dashboard'])

              this.MessageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response?.name}!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.MessageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login!`,
              life: 2000,
            })
          }
        })
    }
  }

  //Metodo que irá criar o novo usuário
  OnSubmitSignUpForm(): void {
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService.singUpUser(this.signUpForm.value as SingUpUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signUpForm.reset();
              this.loginCard = true;

              this.MessageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário criado com sucesso!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.MessageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer login!`,
            life: 2000}),
            console.log(err) },
        })
      }
    }
}
