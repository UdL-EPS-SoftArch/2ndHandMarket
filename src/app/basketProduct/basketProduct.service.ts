import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {BasketProduct} from './basketProduct';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Injectable()
export class BasketProductService {

  products: BasketProduct[] = [];

  constructor (private http: Http,
               private authentication: AuthenticationBasicService) { }

  // GET /products
  getAllProducts(): Observable<BasketProduct[]>{
    return this.http.get(`${environment.API}/basketProducts`)
      .map((res: Response) => res.json()._embedded.basketProducts)
      .catch((error: any) => Observable.throw(error.json()));
  }
  addProduct(product: BasketProduct): Observable<BasketProduct> {
    let body = JSON.stringify({
      'product': product.product
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });
    this.products.push(product);
    console.log(this.products[0].product);
    return this.http.post(`${environment.API}/basketProducts`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
  getArrayProducts(): BasketProduct[]{
    return this.products;
  }
  // DELETE /product/:id
  deleteProductByUri(uri: string) {
    let headers = new Headers({ 'Authorization': this.authentication.getCurrentUser().authorization });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

}
