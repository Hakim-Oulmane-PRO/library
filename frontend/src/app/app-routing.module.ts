import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListViewBookComponent} from "./list-view-book/list-view-book.component";
import {SingleViewBookComponent} from "./single-view-book/single-view-book.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {FourOhFourComponent} from "./four-oh-four/four-oh-four.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: ListViewBookComponent},
  {path: 'detail/:id', canActivate: [AuthGuard], component: SingleViewBookComponent},
  {path: 'update/:id', canActivate: [AuthGuard], component: EditBookComponent},
  {path: 'add', canActivate: [AuthGuard], component: AddBookComponent},
  {path: 'login', component: AuthComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
