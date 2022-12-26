import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Subject} from "rxjs";
import {JsonResponse} from "../models/JsonResponse.model";

@Injectable({
  providedIn: 'root'
})
export class FamilyBookService {

  familyBookSubject = new Subject<any>();

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getAll() {
    let URL = `${this.configService.getLink()}/family_book/getAll`;

    let requestOptions = {
      headers: this.configService.getHeader()
    };

    this.http.get<JsonResponse>(URL, requestOptions).subscribe({
      next: response => {
        console.log(URL, response)
        this.familyBookSubject.next(response.data);
      },
      error: (error) => {
        console.log(error);
        this.familyBookSubject.error(error);
      },
      complete: () => {
      }
    });
  }

}
