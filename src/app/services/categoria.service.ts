import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IResponse, ISearch, ICategoria } from '../interfaces';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {

   protected override source: string = 'categorias';
    private categoriesListSignal = signal<ICategoria[]>([]);
    get categories$() {
      return this.categoriesListSignal;
    }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
  
    public totalItems: any = [];
    private alertService: AlertService = inject(AlertService);
  
    getAll () {
      this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
        next: (response: IResponse<ICategoria[]>) => {
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
          this.categoriesListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }
  
    save(item: ICategoria) {
      this.add(item).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred adding the category', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    update(item: ICategoria) {
      this.edit(item.id, item).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred updating the category', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
  
    delete(item: ICategoria) {

      this.del(item.id).subscribe({
        next: (response: IResponse<ICategoria>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred deleting the category', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
}