import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ICategoria} from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule],
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.scss']
})
export class CategoriaFormComponent {

  
    public fb: FormBuilder = inject(FormBuilder);
      @Input() form!: FormGroup;
      @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
      @Output() callUpdateMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

      callSave() {
        let item: ICategoria = {
          nombre: this.form.controls["nombre"].value,
          descripcion: this.form.controls["descripcion"].value,
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