import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { EditorModule } from '@tinymce/tinymce-angular'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { ClientComponent } from './components/client/client.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { RoleComponent } from './components/role/role.component';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';
import { ClientService } from './services/client.service';
import { RoleService } from './services/role.service';

import { CompareWithDirective } from './directives/compare-with.directive';
import { AuthGuard } from './shared/guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthComponent,
    ProductComponent,
    CategoryComponent,
    OrderComponent,
    ClientComponent,
    RoleComponent,
    CompareWithDirective,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    EditorModule
  ],
  providers: [AuthGuard,AuthService,ClientService,UserService,CategoryService,ProductService,OrderService,RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
