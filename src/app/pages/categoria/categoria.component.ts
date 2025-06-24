import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ICategoria } from '../../interfaces';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaListComponent } from '../../components/categoria/categorias-list/categorias-list.component';
import { CategoriaFormComponent } from '../../components/categoria/categorias-form/categorias-form.component';



@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PaginationComponent,
      ModalComponent,CategoriaListComponent,CategoriaFormComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {


   public pCategoryList: ICategoria[] = []
      public categoryService: CategoriaService = inject(CategoriaService);
      public fb: FormBuilder = inject(FormBuilder);
      public categoryForm = this.fb.group({
        id: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      });
      public modalService: ModalService = inject(ModalService);
      @ViewChild('editCategoryModal') public editCategoryModal: any;

      public authService: AuthService = inject(AuthService);
      public areActionsAvailable: boolean = false;
      public route: ActivatedRoute = inject(ActivatedRoute);
    
      ngOnInit(): void {
        this.authService.getUserAuthorities();
        this.route.data.subscribe( data => {
          this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
        });
      }
    
      constructor() {
        this.categoryService.getAll();
      }
  
      saveCategory(item: ICategoria) {
        this.categoryService.save(item);
      }
  
      updateCategory(item: ICategoria) {
        console.log("updateCategory Boton llega objeto", item);
        this.categoryService.update(item);
        this.modalService.closeAll();
        this.categoryForm.reset();
      }

      deleteCategory(item: ICategoria) {
        console.log("deleteCategory Boton llega objeto", item);
        this.categoryService.delete(item);
      }

      openEditCategoryModal(category: ICategoria) {
        console.log("openEditCategoryModal", category);
        this.categoryForm.patchValue({
          id: JSON.stringify(category.id),
          nombre: category.nombre,
          descripcion: category.descripcion,
        });
        this.modalService.displayModal('lg', this.editCategoryModal);
      }
  
}