import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  formOrder: FormGroup;

  orders = [];
  products = []
  
  clients = []

  edit: boolean = false;

  btnAction: string = 'CREATE';

  

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _cs: ClientService,
    private _ps: ProductService,
    private _os: OrderService,
    private _router: Router
  ) {
    this.formOrder = this._fb.group({
      _id: [1],
      client: [{}],
      product: [{}],
      price: [0],
      qty: [1],
      total: [0],
      orderItems: [[]],
      serial: ['']
    });
  }

  ngOnInit(): void {
    
    this.orderList();
    this.clientList()
    this.productList()
    
  }

  putPrice() {
    let data = this.formOrder.value.product.split('-');    
    //this.formOrder.value.price = data[1]; 
    this.formOrder.patchValue({
      price: data[1]
    })   
  }

  putSerialNumber() {
    const pos = this.clients.indexOf(this.formOrder.value.client)
    let serialNum= this.generateSerialNumber(pos)
    this.formOrder.value.serial = 
    this.formOrder.patchValue({
      serial: serialNum
    })  
  }

  deleteItem(item: number) {
    const items = this.formOrder.value.orderItems
    let obj = items.splice(items.indexOf(item), 1);
    this.formOrder.value.total -=  obj[0].subtotal    
  }


  addCart() {
    let data = this.formOrder.value.product.split('-');

    let exist = this.formOrder.value.orderItems.findIndex(e=>e.product_id == data[0])
    console.log(exist)

    if (exist != -1) {
      this.formOrder.value.orderItems[exist] = {
        product_id: data[0],
        product_name: data[2],
        qty: Number(this.formOrder.value.orderItems[exist].qty) + Number(this.formOrder.value.qty),
        price: this.formOrder.value.price,
        subtotal: this.formOrder.value.price * (Number(this.formOrder.value.orderItems[exist].qty) + Number(this.formOrder.value.qty))
      }
    } else {
      this.formOrder.value.orderItems.push({
        product_id: data[0],
        product_name: data[2],
        qty: this.formOrder.value.qty,
        price: this.formOrder.value.price,
        subtotal: this.formOrder.value.qty * this.formOrder.value.price
      });
    }

    //this.formOrder.value.total += Number(this.formOrder.value.qty) * this.formOrder.value.price
      this.formOrder.patchValue({
        total: this.formOrder.value.total + (this.formOrder.value.qty * this.formOrder.value.price)
      })  
  }

  orderList() {
    this._os.getOrders().subscribe(
      (data) => {
        console.log(data);
        this.orders = data.orders;
      },
      (err) => {
        console.log(err);
      }
    );
  }   

  addOrder() {
    this._os.saveOrder(this.formOrder.value)
      .subscribe(data=>{
        this.orderList()
        this.formOrder.reset({
          price: 0,
          qty: 1,
          total: 0
        })
        this._toastr.success('Order saved successfully!', 'SUCCESS')
      },err=>{
        console.log(err)
      })
  }

  clientList() {
    this._cs.getClients().subscribe(
      (data) => {
        console.log(data);
        this.clients = data.clients;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  productList() {
    this._ps.getProducts().subscribe(
      (data) => {
        console.log(data);
        this.products = data.products;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  generateSerialNumber(num: number) {
    if (num<=9) {
      return '000000000'+num
    }
    if (num<=99 && num >9) {
      return '00000000'+num
    }
    if (num<=999 && num >99) {
      return '0000000'+num
    }
    if (num<=9999 && num >999) {
      return '000000'+num
    }
    if (num<=99999 && num >9999) {
      return '00000'+num
    }
    if (num<=999999 && num >99999) {
      return '0000'+num
    }
    if (num<=9999999 && num >999999) {
      return '000'+num
    }
    if (num<=99999999 && num >999999) {
      return '00'+num
    }
    if (num<=999999999 && num >9999999) {
      return '0'+num
    }
  }
  
}
