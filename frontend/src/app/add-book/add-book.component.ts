import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FamilyBook} from "../models/FamilyBook.model";
import {Subscription} from "rxjs";
import {FamilyBookService} from "../services/family-book.service";
import {BookDTO} from "../models/BookDTO.model";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  book!: BookDTO;
  familyBooks!: FamilyBook[];
  familyBooksSubscription!: Subscription;

  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private bookService: BookService,
              private familyBookService: FamilyBookService,
              private _snackBar: MatSnackBar) {

    this.bookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      author: [null, []],
      familyBook: [{value: null, disabled: true}, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.familyBooksSubscription = this.familyBookService.familyBookSubject.subscribe({
      next: value => {
        this.familyBooks = value;
        this.bookForm.get('familyBook')?.enable();
      }
    });
    this.familyBookService.getAll();
  }

  onSubmitForm() {
    console.log("add book submit event", this.bookForm);
    if (this.bookForm.status === 'VALID') {
      this.book = new BookDTO(
        this.bookForm.value.name,
        this.bookForm.value.author,
        this.bookForm.value.familyBook);
      this.addBook();
    }
  }

  private addBook() {
    this.loading = true;
    this.bookService.add(this.book).subscribe({
      next: response => {
        this.openSnackBar('Book added');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.openSnackBar('Operation failed');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }

  ngOnDestroy(): void {
    this.familyBooksSubscription.unsubscribe();
  }
}
