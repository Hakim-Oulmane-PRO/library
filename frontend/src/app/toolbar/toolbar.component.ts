import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";
import {DisconnetDialogComponent} from "../disconnet-dialog/disconnet-dialog.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input() title!: string;
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {

    this.authSubscription = this.authService.authSubject.subscribe({
      next: (response) => {
        this.isAuth = this.authService.getAuth();
      }
    })
  }

  ngOnInit() {
    this.isAuth = this.authService.getAuth();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisconnetDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.disconnect();
      }
    });
  }

  private disconnect() {
    this.authService.signOut().then(
      (resolve) => {
        this.openSnackBar(resolve);
        this.router.navigate(["/auth"]);
      },
      (reason) => {
        this.openSnackBar(reason);
      });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.dialog.ngOnDestroy();
  }
}
