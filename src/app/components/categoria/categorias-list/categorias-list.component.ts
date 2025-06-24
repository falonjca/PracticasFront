import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { GamesFormComponent } from '../../game/games-form/games-form.component';
import { ModalComponent } from '../../modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [
      CommonModule,
      ModalComponent,
      GamesFormComponent,
      PickerComponent

  ],
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.scss']
})
export class CategoriaListComponent {

  @Input() pCategoryList: ICategoria[] = [];
  @Output() callUpdateModalMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

}