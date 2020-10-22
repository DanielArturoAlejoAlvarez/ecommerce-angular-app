import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  formRole: FormGroup

  roles = []

  edit: boolean = false

  btnAction: string = 'CREATE'

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _rs: RoleService, private _router: Router) { 
    this.formRole = this._fb.group({
      name: ['', Validators.required],
      status: [true]
    })
  }

  ngOnInit(): void {
    this.roleList()
  }

  roleList() {
    this._rs.getRoles()
      .subscribe(data=>{
        console.log(data)
        this.roles = data.roles
      },err=>{
        console.log(err)
      })
  }

  addRole() {
    this._rs.saveRole(this.formRole.value)
      .subscribe(data=>{
        this.roleList()
        this.formRole.reset({
          status: true
        })
        this._toastr.success('Role saved successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
  }

  editRole(id: number) {
    this._rs.getRole(id)
      .subscribe(data=>{
        console.log(data)
        this.edit = true 
        this.btnAction = 'UPDATE'
        this.formRole.patchValue(data.role)
      })
  }

  updateRole() {
    this._rs.updateRole(this.formRole.value)
      .subscribe(data=>{
        this.formRole.patchValue(data)
        this.roleList()
        this.formRole.reset({
          status: true
        })
        this._toastr.success('Role updated successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
  }

  deleteRole(role: Role) {
    if (confirm('Are you sure?')) {
      this._rs.deleteRole(role)
      .subscribe(data=>{
        this.roleList()
        this._toastr.success('Role deleted successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
    }
  }

}
