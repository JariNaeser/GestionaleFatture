import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './components/logout/logout.component';
import { HasTokenGuard } from './guards/hasTokenGuard';
import { AuthService } from './services/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/tokenInterceptor';
import { environment } from 'src/environments/environment.prod';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: InvoicesComponent, canActivate: [HasTokenGuard] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [HasTokenGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [HasTokenGuard] },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'invoices', component: InvoicesComponent, canActivate: [HasTokenGuard] },
  { path: '**', component: InvoicesComponent, canActivate: [HasTokenGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    NavbarComponent,
    InvoicesComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem(environment.tokenName);
        }
      }
    }),
    FontAwesomeModule,
  ],
  providers: [
    //JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HasTokenGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
