import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  formProduct: FormGroup

  products = []

  product: Product = new Product()

  categories = []

  selectedCategory = ''

  edit: boolean = false

  btnAction: string = 'CREATE'

  constructor(private _activatedRoute: ActivatedRoute, private _cs: CategoryService, private _toastr: ToastrService, private _fb: FormBuilder, private _ps: ProductService, private _router: Router) {
    this.formProduct = this._fb.group({
      _id: [1],
      code: ['', Validators.required],
      name: [''],
      excerpt: [''],
      description: [''],
      price: [0],
      stock: [1],
      image: [''],
      category: [{}],
      status: [true]
    })
  }

  ngOnInit(): void {
    this.productList()
    this.categoryList()

    this.formProduct.get('category').valueChanges
      .subscribe(data => {
        console.log(data.name)
        this.selectedCategory = data.name
      })
  }


  productList() {
    this._ps.getProducts()
      .subscribe(data => {
        console.log(data)
        this.products = data.products
      }, err => {
        console.log(err)
      })
  }

  addProduct() {
    this._ps.saveProduct(this.formProduct.value)
      .subscribe(data => {
        console.log(data)
        this.productList()
        this.formProduct.reset({
          status: true,
          price: 0,
          stock: 1
        })
        this._toastr.success('Product saved successfully!', 'SUCCESS')
      }, err => {
        console.log(err)
      })
  }

  editProduct(id: number) {
    this._ps.getProduct(id)
      .subscribe(data => {
        console.log(data)
        this.edit = true
        this.btnAction = 'UPDATE'
        this.formProduct.patchValue(data.product)
      }, err => {
        console.log(err)
      })
  }

  updateProduct() {
    this._ps.updateProduct(this.formProduct.value)
      .subscribe(data => {
        this.formProduct.patchValue(data)
        this.productList()
        this.formProduct.reset({
          status: true,
          price: 0,
          stock: 1
        })
        this._toastr.success('Product updated successfully!', 'SUCCESS')
      })
  }

  deleteProduct(product: Product) {
    if (confirm('Are you sure?')) {
      this._ps.deleteProduct(product)
        .subscribe(data => {
          this.productList()
          this._toastr.success('Product deleted successfully!', 'SUCCESS')
        }, err => {
          console.log(err)
        })
    }
  }

  categoryList() {
    this._cs.getCategories()
      .subscribe(data => {
        this.categories = data.categories
      }, err => {
        console.log(err)
      })
  }

}
