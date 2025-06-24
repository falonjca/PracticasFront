import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IProducto } from "../../../interfaces";

@Component({
  selector: 'app-productos-form',
    templateUrl: './productos-form.component.html',
    styleUrls: ['./productos-form.component.scss'],
    standalone: true,
    imports: [ 
    ReactiveFormsModule,
    CommonModule]
})
export class ProductoFormComponent {

  public fb: FormBuilder = inject(FormBuilder);
    @Input() form!: FormGroup;
    @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
    @Output() callUpdateMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  
    callSave() {
      let item: IProducto = {
        nombre: this.form.controls["nombre"].value,
        descripcion: this.form.controls["descripcion"].value,
        precio: this.form.controls["precio"].value,
        cantidad: this.form.controls["cantidad"].value,
      }
     

      if(this.form.controls['id'].value) {
        item.id = this.form.controls['id'].value;
      } 
      if(item.id) {
        this.callUpdateMethod.emit(item);
      } else {
        this.callSaveMethod.emit(item);
      }
    }

}