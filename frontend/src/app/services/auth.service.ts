import {Auth} from "../models/Auth.model";
import {Observable, Subject, Subscription} from "rxjs";
import {ConfigService} from "./config.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {JsonResponse} from "../models/JsonResponse.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false;
  authSubject = new Subject<any>();

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  signIn(auth: Auth): Promise<string> {
    let URL = `${this.configService.getLink()}/login`;

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", auth.username);
    urlencoded.append("password", auth.password);

    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    return new Promise(
      (resolve, reason) => {
        this.http.post<JsonResponse>(URL, urlencoded, {headers: myHeaders}).subscribe({
          next: (response) => {
            console.log(URL, response);
            this.configService.setBasicAuthHeader(response.data.toString());
            this.setAuth(true);
            resolve("You are connected");
          },
          error: (error) => {
            this.setAuth(false);
            console.log(URL, error);
            reason(error?.error?.errorMsg ?? 'Operation failed');
          }
        });
      });
  }

  signOut(): Promise<string> {
    let URL = `${this.configService.getLink()}/logout`;

    return new Promise(
      (resolve, reason) => {
        this.http.post<any>(URL, null).subscribe({
          next: (response) => {
            console.log(URL, response);
            if (response?.status === "SUCCESS") {
              this.setAuth(false);
              resolve("You are disconnected");
              this.clearAuth();
            } else {
              reason('Operation failed');
            }
          },
          error: (error) => {
            console.log(URL, error);
            reason(error?.error?.errorMsg ?? 'Operation failed');
          }
        });
      });
  }

  private clearAuth() {
    localStorage.removeItem('auth');
    this.configService.clear();
  }

  getAuth(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  setAuth(auth: boolean): void {
    this.isAuth = auth;
    localStorage.setItem('auth', String(auth).toString());
    this.authSubject.next(auth);
  }
}
