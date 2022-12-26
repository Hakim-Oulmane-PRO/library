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
  bookSubscription!: Subscription;

  constructor(private bookService: BookService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }


  ngOnInit(): void {
    this.bookSubscription = this.bookService.bookSubject.subscribe({
      next: (data: any) => {
        this.book = data;
      },
      error: (error: any) => {
        this.openSnackBar('Error occurred');
      },
      complete: () => {
      }
    });

    const id = this.route.snapshot.params['id'];
    this.bookService.getOne(id);
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
