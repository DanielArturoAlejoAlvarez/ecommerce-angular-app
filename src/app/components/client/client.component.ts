import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

  formClient: FormGroup

  clients = []

  edit: boolean = false 

  btnAction: string = 'CREATE'

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _cs: ClientService,
    private _router: Router
  ) {
    this.formClient = this._fb.group({
      _id: [1],
      displayName: [''],
      address: [''],
      phone: [''],
      email: [''],
      status: [true]
    })
  }

  ngOnInit(): void {
    this.clientList()
  }

  clientList() {
    this._cs.getClients()
      .subscribe(data=>{
        this.clients = data.clients
      },err=>{
        console.log(err)
      })
  }

  addClient() {
    this._cs.saveClient(this.formClient.value)
      .subscribe(data=>{
        console.log(data) 
        this.clientList() 
        this.formClient.reset({
          status: true
        })      
        this._toastr.success('Client saved successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
  }

  editClient(id: number) {
    this._cs.getClient(id)
      .subscribe(data=>{
        console.log(data)
        this.edit = true 
        this.btnAction = 'UPDATE'
        this.formClient.patchValue(data.client)
      },err=>{
        console.log(err)
      })
  }

  updateClient() {
    this._cs.updateClient(this.formClient.value)
      .subscribe(data=>{
        this.formClient.patchValue(data)
        this.clientList()
        this.formClient.reset({
          status: true
        })
        this._toastr.success('Client updated successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
  }

  deleteClient(client: Client) {
    if (confirm('Are you sure?')) {
      this._cs.deleteClient(client)
        .subscribe(data=>{
          this.clientList()
          this._toastr.success('Client deleted successfully!', 'SUCCESS')
        },err=>{
          console.log(err)
        })
    }
  }
}
