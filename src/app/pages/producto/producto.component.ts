import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from "@angular/core";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoListComponent } from '../../components/producto/productos-list/productos-list.component';
import { ICategoria, IProducto } from '../../interfaces';
import { ProductosService } from '../../services/producto.service';
import { ProductoFormComponent } from '../../components/producto/productos-form/productos-form.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  standalone: true,
  imports: [
    ProductoListComponent,
    PaginationComponent,
    ModalComponent,
    ProductoFormComponent],
})
export class ProductosComponent {

    public pProductList: IProducto[] = []
    public pCategoryList: ICategoria[] = [];

    public productService: ProductosService = inject(ProductosService);
    public categoryService: CategoriaService = inject(CategoriaService);
    public fb: FormBuilder = inject(FormBuilder);
    
    public productForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoria: ['']
    });
    public modalService: ModalService = inject(ModalService);
    @ViewChild('editProductModal') public editProductModal: any;
  
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
      this.productService.getAll();
      this.categoryService.getAll();
    }

    saveProduct(item: IProducto) {
      this.productService.save(item);
    }

    updateProduct(item: IProducto) {
      this.productService.update(item);
      this.modalService.closeAll();
      this.productForm.reset();
    }
  

    deleteProduct(item: IProducto) {
      this.productService.delete(item);
    }
  
    openEditProductModal(product: IProducto) {
      this.productForm.patchValue({
        id: JSON.stringify(product.id),
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: JSON.stringify(product.precio),
        cantidad: JSON.stringify(product.cantidad),
      });
      this.modalService.displayModal('lg', this.editProductModal);
    }

}