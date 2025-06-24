import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IResponse, ISearch, IProducto } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService<IProducto> {

  protected override source: string = 'productos';
    private productsListSignal = signal<IProducto[]>([]);
    get productos$() {
      return this.productsListSignal;
    }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
  
    public totalItems: any = [];
    private alertService: AlertService = inject(AlertService);
  
    getAll () {
      this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
        next: (response: IResponse<IProducto[]>) => {
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
          this.productsListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }
  
    save(item: IProducto) {
      this.add(item).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred adding the product', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    update(item: IProducto) {
      this.edit(item.id, item).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred updating the product', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    delete(item: IProducto) {
      console.log("Servicio Producto", item);
      this.del(item.id).subscribe({
        next: (response: IResponse<IProducto>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred deleting the product', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
    
}