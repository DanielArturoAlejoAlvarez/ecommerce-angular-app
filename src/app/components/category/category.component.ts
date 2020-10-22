import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  formCategory: FormGroup;

  categories = [];

  edit: boolean = false;

  btnAction: string = 'CREATE';

  constructor(
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _cs: CategoryService,
    private _router: Router
  ) {
    this.formCategory = this._fb.group({
      _id: [1],
      name: ['', Validators.required],
      description: [''],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.categoryList();
  }

  categoryList() {
    this._cs.getCategories().subscribe(
      (data) => {
        console.log(data);
        this.categories = data.categories;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addCategory() {
    this._cs.saveCategory(this.formCategory.value).subscribe(
      (data) => {
        this.categoryList();
        this.formCategory.reset({
          status: true,
        });
        this._toastr.success('Category saved successfully!', 'SUCCESS');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editCategory(id: number) {
    this._cs.getCategory(id).subscribe(
      (data) => {
        this.btnAction = 'UPDATE';
        this.edit = true;
        this.formCategory.patchValue(data.category);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCategory() {
    this._cs.updateCategory(this.formCategory.value).subscribe(
      (data) => {
        this.formCategory.patchValue(data.category);
        this.categoryList();
        this.formCategory.reset({
          status: true,
        });
        this._toastr.success('Category updated successfully!', 'SUCCESS');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCategory(category: Category) {
    if (confirm('Are you sure?')) {
      this._cs.deleteCategory(category).subscribe(
        (data) => {
          this.categoryList();
          this._toastr.success('Category deleted successfully!', 'SUCCESS');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
