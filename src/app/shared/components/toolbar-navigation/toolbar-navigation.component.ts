import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent {

  constructor(private cookie: CookieService, private router: Router) {}

  //Metodo que irá excluir o cookie do login atual e redirecionar para tela home
  handleLougout() : void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home'])
  }

}
