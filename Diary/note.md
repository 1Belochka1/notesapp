```scss
@media (width < 1024px) {
}

@media (width < 768px) {
}

@media (width< 425px) {
}

@media (width < 320px) {
}
```

напиши сервис авторизации для angular на rxjs с хранением данных пользователя в cookie. в сервисе есть методы для входа и выхода, а еще boolean поле хранящее значение авторизован ли пользователь и поле пользователя

avatar
Вот пример кода для сервиса авторизации в Angular с использованием RxJS и хранением данных пользователя в cookie:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private loggedIn = new BehaviorSubject<boolean>(false);
private user = new BehaviorSubject<any>(null);

constructor(private http: HttpClient) {
// Проверяем, сохранены ли данные пользователя в cookie
const userData = this.getCookie('userData');
if (userData) {
this.user.next(JSON.parse(userData));
this.loggedIn.next(true);
}
}

login(username: string, password: string): Observable<any> {
return this.http.post<any>('api/login', { username, password }).pipe(
tap(user => {
// Сохраняем данные пользователя в cookie
this.setCookie('userData', JSON.stringify(user), 7);
this.user.next(user);
this.loggedIn.next(true);
})
);
}

logout(): void {
// Удаляем данные пользователя из cookie
this.deleteCookie('userData');
this.user.next(null);
this.loggedIn.next(false);
}

isLoggedIn(): Observable<boolean> {
return this.loggedIn.asObservable();
}

getUser(): Observable<any> {
return this.user.asObservable();
}

private setCookie(name: string, value: string, days: number): void {
const date = new Date();
date.setTime(date.getTime() + (days _ 24 _ 60 _ 60 _ 1000));
const expires = `expires=${date.toUTCString()}`;
document.cookie = `${name}=${value};${expires};path=/`;
}

private getCookie(name: string): string {
const cookieName = `${name}=`;
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
let cookie = cookies[i];
while (cookie.charAt(0) === ' ') {
cookie = cookie.substring(1);
}
if (cookie.indexOf(cookieName) === 0) {
return cookie.substring(cookieName.length, cookie.length);
}
}
return '';
}

private deleteCookie(name: string): void {
document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
}

В этом примере используется HttpClient для выполнения запросов к API для входа пользователя. Метод login отправляет POST-запрос на api/login с переданными данными пользователя (имя пользователя и пароль). После успешного входа, данные пользователя сохраняются в cookie с помощью метода setCookie, и значения полей user и loggedIn обновляются с помощью next. Метод logout удаляет данные пользователя из cookie и сбрасывает значения полей user и loggedIn. Методы isLoggedIn и getUser возвращают Observable, чтобы компоненты могли подписаться на изменения состояния авторизации и данных пользователя.

Обратите внимание, что в этом примере используется фиктивный API-эндпоинт api/login. Вам нужно заменить его на реальный эндпоинт для входа пользователя.

создай отдельный сервис cookie

avatar
Конечно! Вот пример кода для отдельного сервиса CookieService, который позволяет управлять cookie в Angular:

import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class CookieService {
constructor() {}

setCookie(name: string, value: string, days: number): void {
const date = new Date();
date.setTime(date.getTime() + (days _ 24 _ 60 _ 60 _ 1000));
const expires = `expires=${date.toUTCString()}`;
document.cookie = `${name}=${value};${expires};path=/`;
}

getCookie(name: string): string {
const cookieName = `${name}=`;
const cookies = document.cookie.split(';');
for (let i = 0; i < cookies.length; i++) {
let cookie = cookies[i];
while (cookie.charAt(0) === ' ') {
cookie = cookie.substring(1);
}
if (cookie.indexOf(cookieName) === 0) {
return cookie.substring(cookieName.length, cookie.length);
}
}
return '';
}

deleteCookie(name: string): void {
document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
}

В этом примере сервис CookieService содержит три метода: setCookie, getCookie и deleteCookie. Метод setCookie устанавливает cookie с указанным именем, значением и сроком действия в днях. Метод getCookie возвращает значение cookie по указанному имени. Метод deleteCookie удаляет cookie с указанным именем.

Вы можете использовать этот сервис вместе с сервисом авторизации, чтобы сохранять и получать данные пользователя в cookie.

type CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree; запомни тип

avatar
Тип CanActivateFn представляет функцию, которая может быть использована в качестве canActivate в Angular для проверки доступа к маршруту. Вот определение типа CanActivateFn:

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

type CanActivateFn = (
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

Этот тип принимает два параметра: route типа ActivatedRouteSnapshot, который представляет текущий маршрут, и state типа RouterStateSnapshot, который представляет состояние маршрутизатора. Функция может возвращать Observable<boolean | UrlTree>, Promise<boolean | UrlTree>, boolean или UrlTree. Возвращаемое значение указывает, разрешен ли доступ к маршруту или должна быть выполнена навигация к другому маршруту (UrlTree).

Вы можете использовать этот тип для определения функций canActivate в Angular маршрутизации, чтобы проверить доступ пользователя к определенным маршрутам.

напиши authGuard и создай функцию с типом CanActivateFn используй AuthService

avatar
Вот пример кода для создания AuthGuard с использованием AuthService и функции с типом CanActivateFn:

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.authService.isLoggedIn().pipe(
map(loggedIn => {
if (loggedIn) {
return true;
} else {
// Если пользователь не авторизован, перенаправляем на страницу входа
return this.router.createUrlTree(['/login']);
}
})
);
}
}

В этом примере AuthGuard реализует интерфейс CanActivate и определяет метод canActivate. В методе canActivate мы используем AuthService для проверки, авторизован ли пользователь. Если пользователь авторизован, возвращается true, что позволяет доступ к маршруту. Если пользователь не авторизован, мы используем router.createUrlTree для создания UrlTree, который перенаправляет пользователя на страницу входа (/login).

Обратите внимание, что в этом примере используется метод isLoggedIn из сервиса AuthService, который возвращает Observable<boolean>. Вы можете изменить этот метод в соответствии с вашими потребностями.

Чтобы использовать AuthGuard, вы должны добавить его в конфигурацию маршрутов в вашем приложении. Например:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
// другие маршруты
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

В этом примере AuthGuard применяется к маршруту /dashboard, что означает, что пользователь должен быть авторизован, чтобы получить доступ к этому маршруту.

как сделать чтобы авторизованный пользователь не смог зайти на страницу авторизации

avatar
Чтобы авторизованный пользователь не мог зайти на страницу авторизации, вы можете добавить дополнительную проверку в AuthGuard. Вот обновленный пример кода:

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.authService.isLoggedIn().pipe(
map(loggedIn => {
if (loggedIn) {
// Если пользователь авторизован, перенаправляем на другую страницу (например, домашнюю страницу)
return this.router.createUrlTree(['/home']);
} else {
// Если пользователь не авторизован, разрешаем доступ к маршруту
return true;
}
})
);
}
}

В этом обновленном примере, если пользователь уже авторизован, мы используем router.createUrlTree для создания UrlTree, который перенаправляет пользователя на другую страницу (например, домашнюю страницу). Таким образом, авторизованный пользователь не сможет зайти на страницу авторизации.

Вы должны также обновить конфигурацию маршрутов, чтобы применить эту проверку. Например:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
// другие маршруты
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

В этом примере AuthGuard применяется к маршруту /login, что означает, что если пользователь уже авторизован, он будет перенаправлен на другую страницу (например, домашнюю страницу).

и еще чтобы он не смог без авторизации заходить на другие страницы

avatar
Чтобы авторизованный пользователь не мог без авторизации заходить на другие страницы, вы можете добавить дополнительную проверку в AuthGuard. Вот обновленный пример кода:

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.authService.isLoggedIn().pipe(
map(loggedIn => {
if (loggedIn) {
// Если пользователь авторизован, разрешаем доступ к маршруту
return true;
} else {
// Если пользователь не авторизован, перенаправляем на страницу входа
return this.router.createUrlTree(['/login']);
}
})
);
}
}

В этом обновленном примере, если пользователь не авторизован, мы используем router.createUrlTree для создания UrlTree, который перенаправляет пользователя на страницу входа (/login). Таким образом, пользователь без авторизации не сможет заходить на другие страницы.

Вы должны также обновить конфигурацию маршрутов, чтобы применить эту проверку. Например:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
// другие маршруты
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

В этом примере AuthGuard применяется ко всем маршрутам, которые требуют авторизации. Если пользователь не авторизован, он будет перенаправлен на страницу входа (/login).

можно ли получить текущий маршрут в authguard

avatar
Да, вы можете получить текущий маршрут в AuthGuard с помощью ActivatedRouteSnapshot. Вот обновленный пример кода:

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
const currentRoute = route.routeConfig?.path; // Получаем текущий маршрут

    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          // Если пользователь авторизован, разрешаем доступ к маршруту
          return true;
        } else {
          // Если пользователь не авторизован, перенаправляем на страницу входа
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: currentRoute } });
        }
      })
    );

}
}

В этом обновленном примере мы используем route.routeConfig?.path для получения текущего маршрута. Затем мы передаем этот маршрут в returnUrl в параметрах запроса при перенаправлении на страницу входа. Это позволяет сохранить информацию о текущем маршруте, чтобы после успешной авторизации перенаправить пользователя обратно на этот маршрут.

Обратите внимание, что route.routeConfig?.path может быть undefined, если маршрут не имеет конфигурации. В этом случае, вы можете использовать другие свойства ActivatedRouteSnapshot, такие как route.url или route.url.join('/'), чтобы получить текущий маршрут.

При использовании returnUrl на странице входа, вы можете извлечь его из параметров запроса и перенаправить пользователя на этот маршрут после успешной авторизации.
