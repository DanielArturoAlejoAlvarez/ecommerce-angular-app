import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formAuth: FormGroup;

  constructor(
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.formAuth = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this._auth.login(this.formAuth.value).subscribe((data) => {
      if (data.ok) {
        localStorage.setItem('token', data.token);
        this._toastr.success('You are now logged in!', 'SUCCESS')
        this._router.navigate(['user']);
      }else {
        //alert(data.msg)
        this._toastr.error(data.msg, 'ERROR')
      }
    },err=>{
      //alert(err.error.msg)
      this._toastr.error(err.error.msg, 'ERROR')
    });
  }
}
