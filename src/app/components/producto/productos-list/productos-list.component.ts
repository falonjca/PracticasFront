import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IProducto,ICategoria } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [],
  templateUrl: './productos-list.component.html',
   styleUrls: ['./productos-list.component.scss']
})
export class ProductoListComponent {
  @Input() pProductList: IProducto[] = [];
  @Input() pCategoryList: ICategoria[] = [];
  @Output() callUpdateModalMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
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