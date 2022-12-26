import {Injectable} from '@angular/core';
import {Book} from "../models/Book.model";
import {FamilyBook} from "../models/FamilyBook.model";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {JsonResponse} from "../models/JsonResponse.model";
import {ConfigService} from "./config.service";
import {BookDTO} from "../models/BookDTO.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookSubject = new Subject<any>();

  constructor(private http: HttpClient, private configService: ConfigService) {
  }


  getAll(page: number = 0, size: number = 8) {
    let URL = `${this.configService.getLink()}/book/getAll`;

    let params = new HttpParams();
    params = params.appendAll({
      "page": page,
      "size": size,
      "sort": "id,desc"
    })

    let requestOptions = {
      headers: this.configService.getHeader(),
      params: params
    };
    this.http.get<JsonResponse>(URL, requestOptions).subscribe({
      next: response => {
        console.log(URL, response)
        this.bookSubject.next(response.data);
      },
      error: (error) => {
        console.log(error);
        this.bookSubject.error(error);
      },
      complete: () => {
      }
    });
  }

  getOne(id: number) {
    let URL = `${this.configService.getLink()}/book/get/${id}`;
    let requestOptions = {
      headers: this.configService.getHeader()
    };

    this.http.get<JsonResponse>(URL, requestOptions).subscribe({
      next: response => {
        console.log(URL, response)
        this.bookSubject.next(response.data);
      },
      error: (error) => {
        console.log(error);
        this.bookSubject.error(error);
      },
      complete: () => {
      }
    });
  }

  add(book: BookDTO) {
    let URL = `${this.configService.getLink()}/book/add`;

    let header = this.configService.getHeader();
    header = header.append('Content-Type', 'application/json')

    let requestOptions = {
      headers: header,
    };

    return this.http.post<JsonResponse>(URL, JSON.stringify(book), requestOptions);
  }

  delete(id: number) {
    let URL = `${this.configService.getLink()}/book/delete/${id}`;

    let requestOptions = {
      headers: this.configService.getHeader(),
    };

    return this.http.delete<JsonResponse>(URL, requestOptions);
  }

  update(id : number, book: BookDTO) {
    let URL = `${this.configService.getLink()}/book/update/${id}`;

    let header = this.configService.getHeader();
    header = header.append('Content-Type', 'application/json')

    let requestOptions = {
      headers: header,
    };

    return this.http.put<JsonResponse>(URL, JSON.stringify(book), requestOptions);
  }

  export(): Observable<HttpResponse<Blob>> {
    let URL = `${this.configService.getLink()}/book/exportAll`;
    let header = this.configService.getHeader();

    let requestOptions = {
      headers: header,
    };
    return this.http.get<Blob>(URL, { ...requestOptions, observe: 'response', responseType: 'blob' as 'json'});
  }
}
