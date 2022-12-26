import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../models/Book.model";
import {Subscription} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";

@Component({
  selector: 'app-single-view-book',
  templateUrl: './single-view-book.component.html',
  styleUrls: ['./single-view-book.component.css']
})
export class SingleViewBookComponent implements OnInit, OnDestroy {

  book!: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.bookService.getOne(id).subscribe({
      next: response => {
        console.log("getOne", response)
        this.book = (<Book>response.data);
      },
      error: (error) => {
        console.log(error);
        this.openSnackBar('Error occurred');
      },
      complete: () => {
      }
    });
  }

  ngOnDestroy(): void {
    this._snackBar.ngOnDestroy();
  }
}
