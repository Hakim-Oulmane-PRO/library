import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly LINK = 'http://localhost:8080';
  private myHeaders = new HttpHeaders();

  getLink() {
    return this.LINK;
  }

  getHeader() {
    if (localStorage.getItem('Authorization') != null) {
      if (!this.myHeaders.has('Authorization')) {
        this.myHeaders = this.myHeaders.set(
          'Authorization',
          localStorage.getItem('Authorization') ?? '');
      }

      console.warn(this.myHeaders);
      return this.myHeaders;
    }

    throw 'Header not configured';
  }

  setBasicAuthHeader(value: string) {
    localStorage.setItem('Authorization', value);
    this.myHeaders = this.myHeaders.set('Authorization', value);
  }

  clear() {
    this.myHeaders.delete('Authorization');
    localStorage.removeItem('Authorization');
  }

}
