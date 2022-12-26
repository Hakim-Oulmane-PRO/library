import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {Subscription, take} from 'rxjs';
import {Book} from "../models/Book.model";
import {BookService} from "../services/book.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";
import {HttpResponse} from "@angular/common/http";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-list-view-book',
  templateUrl: './list-view-book.component.html',
  styleUrls: ['./list-view-book.component.css']
})
export class ListViewBookComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading = false;
  totalRows = 0;
  pageSize = 8;
  currentPage = 0;
  pageSizeOptions: number[] = [8, 20, 50, 100];
  books = new MatTableDataSource<Book>([]);
  bookSubscription!: Subscription;
  displayedColumns = ['no', 'name', 'author', 'family', 'added', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe({
      next: (data: any) => {
        this.books = new MatTableDataSource<Book>(data.content);
        this.paginator.pageIndex = data.number;
        this.paginator.length = data.totalElements;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
      },
      complete: () => {
      }
    });

    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.bookService.getAll(this.currentPage, this.pageSize);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  ngAfterViewInit() {
    this.books.paginator = this.paginator;
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.delete) {
        this.deleteBook(result.id);
      }
    });
  }

  private deleteBook(id: number) {
    this.bookService.delete(id).subscribe({
      next: (data: any) => {
        console.log("delete", data);
        if (data.status === "SUCCESS") {
          this.openSnackBar("Book deleted");
          this.loadData();
        } else {
          this.openSnackBar(data.errorMsg);
        }
      },
      error: (error: any) => {
        this.openSnackBar("Operation failed");
      }
    });
  }

  export() {
    this.bookService
      .export()
      .subscribe((response: HttpResponse<Blob>) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([response?.body ?? ''], {type: response?.body?.type}));

        console.log(response);
        downloadLink.download = `Books_${formatDate(new Date(), 'dd_MM_yyyy', 'en')}.xlsx`;
        downloadLink.click();
      });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
    this._snackBar.ngOnDestroy();
  }
}
