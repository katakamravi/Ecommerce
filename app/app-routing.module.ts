import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
// import { AppComponent } from './app.component';

const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch: 'full'},
 // {path: 'app', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'myOrders', component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
