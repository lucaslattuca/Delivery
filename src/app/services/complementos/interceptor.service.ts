import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let autReq = req;
    const token = this._tokenService.getToken();
    if (token != null) {
      autReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      //console.log("el token es: "+token);
    }
    return next.handle(autReq);
  }

  constructor(private _tokenService: TokenService) { }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
