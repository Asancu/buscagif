import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService:GifsService) {  }
  // Inyectamos el constructor de la clase GifsService para poder usar sus métodos y propiedades 
  // en el componente SidebarComponent 

  // De esta forma, podemos usar el método buscarGifs() y la propiedad historial

  get historial() {
    return this.gifsService.historial;
  }
  // Este método devuelve el historial de búsquedas del usuario.

  buscar( termino: string ) {
    console.log(termino);
    this.gifsService.buscarGifs(termino);
  }
  // Este método es para buscar los gifs en la API de Giphy.
  

}

