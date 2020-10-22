import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  formUser: FormGroup;
  edit: boolean = false;
  btnAction: string = 'CREATE';

  users = [];

  constructor(
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _us: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.formUser = this._fb.group({
      _id: [1],
      displayName: [''],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      password: [''],
      avatar: ['', Validators.maxLength(512)],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.listUser();

    //let params = this._activatedRoute.snapshot.params
  }

  listUser() {
    this._us.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data.users;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addUser() {
    this._us.saveUser(this.formUser.value).subscribe(
      (data) => {
        this.listUser();
        this.formUser.reset({
          status: true
        })
        this._toastr.success('User saved successfully!', 'SUCCESS');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editUser(id: number) {
    this._us.getUser(id).subscribe(
      (data) => {
        console.log(data);
        this.edit = true;
        this.btnAction = 'UPDATE';
        this.formUser.patchValue(data.user);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateUser() {
    console.log(this.formUser.value);
    this._us.updateUser(this.formUser.value).subscribe((data) => {
      this.formUser.patchValue(data.user);
      this.listUser();
      this.formUser.reset({
        status: true
      })
      this._toastr.success('User updated successfully!', 'SUCCESS');
    });
  }

  deleteUser(user: User) {
    if (confirm('Are you sure?')) {
      this._us.deleteUser(user).subscribe((data) => {
        this.listUser();
        this._toastr.success('User deleted successfully!', 'SUCCESS');
      });
    }
  }
}
