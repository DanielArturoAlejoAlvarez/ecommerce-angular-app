import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ClientComponent } from './components/client/client.component';
import { OrderComponent } from './components/order/order.component';
import { RoleComponent } from './components/role/role.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: 'role', component: RoleComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'category', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: '**', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
