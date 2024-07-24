import { GetAllProductsResponse } from './../../models/interfaces/products/response/GetAllProductsResponse';
import { HttpClient, HttpHeaders, HttpSentEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(private http: HttpClient,private cookie: CookieService) { }


  //Metodo que irá retornar todos os produtos cadastrados
  getAllProducts(): Observable<Array<GetAllProductsResponse>>{
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.httpOptions
    )
    .pipe(map((product) => product.filter((data) => data?.amount > 0)))
  }
}
