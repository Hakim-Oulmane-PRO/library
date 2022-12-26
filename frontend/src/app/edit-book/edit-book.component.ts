import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookDTO} from "../models/BookDTO.model";
import {FamilyBook} from "../models/FamilyBook.model";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../services/book.service";
import {FamilyBookService} from "../services/family-book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";
import {Book} from "../models/Book.model";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  book!: BookDTO;

  selectedBook!: Book;
  bookSubscription!: Subscription;

  familyBooks!: FamilyBook[];
  familyBooksSubscription!: Subscription;

  bookForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private familyBookService: FamilyBookService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {

    this.bookForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}, [Validators.required]],
      author: [{value: null, disabled: true}, []],
      familyBook: [{value: null, disabled: true}, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.familyBooksSubscription = this.familyBookService.familyBookSubject.subscribe({
      next: value => {
        this.familyBooks = value;
      },
      error: (error: any) => {
        this.openSnackBar('Error occurred');
      }
    });

    this.bookSubscription = this.bookService.bookSubject.subscribe({
      next: (data: any) => {
        this.selectedBook = data;

        this.bookForm.get('id')?.setValue(data.id);

        this.bookForm.get('name')?.setValue(data.name);
        this.bookForm.get('name')?.enable();

        this.bookForm.get('author')?.setValue(data.author);
        this.bookForm.get('author')?.enable();

        this.bookForm.get('familyBook')?.setValue(data.familyBook?.id);
        this.bookForm.get('familyBook')?.enable();
      },
      error: (error: any) => {
        this.openSnackBar('Error occurred');
      },
      complete:() => {
      }
    });

    this.familyBookService.getAll();

    const id = this.route.snapshot.params['id'];
    this.bookService.getOne(id);
  }

  onSubmitForm() {
    if (this.bookForm.status === 'VALID') {
      this.book = new BookDTO(
        this.bookForm.value.name,
        this.bookForm.value.author,
        this.bookForm.value.familyBook);
      this.editBook();
    }
  }

  private editBook() {
    this.loading = true;
    return this.bookService.update(this.selectedBook.id, this.book).subscribe({
      next: response => {
        console.log("edit", response);
        this.openSnackBar('Book updated');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.openSnackBar('Operation failed');
        this.loading = false;
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
