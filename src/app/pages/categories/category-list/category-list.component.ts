import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  
  categories: Category[] = [];
  category: Category;
  bodyDeletarCategoria = '';
  
  constructor(private categoryService: CategoryService,
              private toastr: ToastrService) { }
  
  ngOnInit() 
  {
    this.categoryService.getAll().subscribe(
      (_categories: Category[]) => {
         this.categories = _categories;
      },     
      error => {
        this.toastr.error(`Erro ao carregar a lista de categorias: ${error}`);
      }
    );
  }
    
  deleteCategory(category: Category, template: any) 
  {    
    this.bodyDeletarCategoria = `Tem certeza que deseja excluir a Categoria: ${category.name} ?`;
    this.category = category;
    template.show();    
  }
    
  confirmeDelete(template: any) 
  {
    this.categoryService.delete(this.category.id).subscribe(
      () => {
        template.hide();
        this.categories = this.categories.filter(element => element != this.category);
        this.toastr.success('Categoria excluída com sucesso!');
      }, 
      error => {
        this.toastr.error(`Erro ao excluir a categoria: ${error}`);
      } 
    );
  }
      
}
      