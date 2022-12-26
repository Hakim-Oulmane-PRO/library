import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu'
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ListViewBookComponent} from './list-view-book/list-view-book.component';
import {BookService} from "./services/book.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FourOhFourComponent} from "./four-oh-four/four-oh-four.component";
import {SingleViewBookComponent} from './single-view-book/single-view-book.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MessageSnackbarComponent} from './message-snackbar/message-snackbar.component';
import {AddBookComponent} from './add-book/add-book.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FamilyBookService} from "./services/family-book.service";
import {ConfigService} from "./services/config.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditBookComponent} from './edit-book/edit-book.component';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DisconnetDialogComponent } from './disconnet-dialog/disconnet-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewBookComponent,
    FourOhFourComponent,
    SingleViewBookComponent,
    MessageSnackbarComponent,
    AddBookComponent,
    DeleteDialogComponent,
    EditBookComponent,
    AuthComponent,
    ToolbarComponent,
    DisconnetDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    DragDropModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    BookService,
    FamilyBookService,
    ConfigService,
    AuthService,
    AuthGuard,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
