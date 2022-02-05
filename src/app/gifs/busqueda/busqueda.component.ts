import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Con el decorador @ViewChild se obtiene una referencia a un elemento del DOM
  // que se encuentra en el template de la vista.
  
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; 
  // !: Not Null Assertion Operator. Una forma de decirle a Angular que no es nulo, y nunca lo será

  constructor( private gifsService:GifsService ) {
  }
  
  buscar() {
    
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0 ) {
      return;
    }
    // Este condicional es para evitar que se ejecute la búsqueda vacía.

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = "";
  }

}
