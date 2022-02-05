import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
  // providedIn: 'root' - makes the service available to the entire application
})

export class GifsService {

  private apiKey         : string   = 'aYgJQrm8rMFhhnhPwywgEkDk2D7yxwwn';
  private servicioUrl    : string   = 'https://api.giphy.com/v1/gifs';
  private _historial     : string[] = [];

  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];
    // [...this._historial] - devuelve una copia del array _historial sin modificarlo.
    // El operador spread (...) es un operador que permite crear una copia del array.

  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // JSON.parse() - convierte un string en un objeto
    // localStorage.getItem() - obtiene un elemento del localStorage
    // !: Not Null Assertion Operator. Una forma de decirle a Angular que no es nulo, y nunca lo será

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // this.resultados es un array de objetos de tipo Gif (interfaz)

  }

  buscarGifs( query: string ) {
   
    query = query.trim().toLowerCase();
    // trim() - elimina los espacios en blanco de un string

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      // unshift() - agrega un elemento al inicio del array
    
      this._historial = this._historial.splice(0, 10);
      // splice() - elimina una cantidad de elementos del array
      // 0 - desde donde empieza a eliminar
      // 10 - cantidad de elementos a eliminar
      // devuelve un array con los elementos eliminados
    
      localStorage.setItem('historial', JSON.stringify(this._historial));
      // El localStorage es una API que permite almacenar datos en el navegador 
      // para que puedan ser accedidos por el usuario 
      // en cualquier momento.

      // setItem() - agrega un elemento al localStorage
      // JSON.stringify() - convierte un objeto en un string

    } 

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', "10")
          .set('q', query);
    console.log(params);

    // Con params podemos crear un objeto HttpParams que es un objeto que permite
    // crear una instancia de una clase HttpParams.

    // set() - agrega un parámetro al objeto HttpParams
      // api_key - es la clave de la API de Giphy que nos permite acceder a los datos de la API de Giphy
      // limit - es el parámetro que necesitamos para la API (10 gifs por búsqueda)
      // q - es el parámetro que necesitamos para la API (la búsqueda)
    
    // Con console.log(params) podemos comprobar que los parámetros se han creado correctamente.

    // De esta forma podemos crear un objeto HttpParams con los parámetros que necesitamos
    // para hacer la búsqueda de los gifs.


    this.http.get<SearchGifsResponse>( `${this.servicioUrl}/search`, { params } ) // Ponemos params para que de esta forma podamos pasarle los parámetros al servicio
    .subscribe(( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

    // Este método es para hacer una petición a la API de Giphy.
    // Para hacer una petición a la API de Giphy, se debe hacer una petición HTTP. (GET)
    // Para hacer una petición HTTP, se debe importar el módulo HttpClient.

    // get() - hace una petición HTTP GET    
    // SearchGifsResponse - es una interfaz que define el tipo de datos que devuelve la API de Giphy.

    // El .subscribe es para recibir la respuesta de la petición HTTP.
    // La respuesta de la petición HTTP es un objeto de tipo SearchGifsResponse.
    // Para recibir la respuesta de la petición HTTP, se debe subscribir al objeto de tipo SearchGifsResponse.

    // El .data es para obtener la propiedad data de la respuesta de la petición HTTP.
    // La propiedad data es un array de objetos.
    // Para obtener el array de objetos, se debe acceder a la propiedad data.
    // Para acceder a la propiedad data, se debe usar el punto.

    // localStorage - es una API que permite almacenar datos en el navegador
    // para que puedan ser accedidos por el usuario en cualquier momento.

    // setItem() - agrega un elemento al localStorage
    

  }



}
