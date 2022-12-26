import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BookService} from "../services/book.service";
import {FamilyBookService} from "../services/family-book.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";
import {BookDTO} from "../models/BookDTO.model";
import {Auth} from "../models/Auth.model";
import {MessageSnackbarComponent} from "../message-snackbar/message-snackbar.component";
import {config} from "rxjs";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loading: boolean;
  authForm!: FormGroup;
  hide: boolean = true;
  auth!: Auth;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private configService: ConfigService,
              private _snackBar: MatSnackBar) {

    this.loading = false;
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.authService.getAuth()) {
      this.router.navigate(["/"]);
    }
  }


  onSubmitForm() {
    console.log("login submit event", this.authForm);
    if (this.authForm.status === 'VALID') {
      this.auth = new Auth(
        this.authForm.value.username,
        this.authForm.value.password);
      this.signIn();
    }
  }

  private signIn() {
    this.loading = true;
    this.authService.signIn(this.auth).then(
      (resolve) => {
        this.openSnackBar(resolve);
        this.router.navigate(['/']);
      },
      (reason: string) => {
        this.openSnackBar(reason);
      })
      .finally(() => {
        this.loading = false;
      });
    /*
    next: response => {
      this.openSnackBar('You are connected');
      this.configService.setHeader("Authorization", response.data);
      // this.router.navigate(['/']);
    },
      error
  :
    (error) => {
      console.log(error);
      this.openSnackBar(error.error.errorMsg);
      this.loading = false;
    },
      complete
  :
    () => {
      this.loading = false;
    }
  }

);
*/
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(MessageSnackbarComponent, {
      data: message
    });
  }
}
