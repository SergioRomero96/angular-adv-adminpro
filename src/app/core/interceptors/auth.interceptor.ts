import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private usuarioService: UsuarioService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("interceptor");
        const token = this.usuarioService.token;
        if (token) {
            req = req.clone({
                setHeaders: { 'x-token': token }
            });
        }

        return next.handle(req);
    }

}