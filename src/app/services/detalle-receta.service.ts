import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DetalleReceta } from "../interfaces/detalle-receta.interface";

@Injectable({
  providedIn: "root"
})
export class DetalleRecetaService {
  constructor(private http: HttpClient) {}

  Url = "http://localhost:8080/api/v1/recetas/";

  listarDetalleRecetas() {
    return this.http.get<DetalleReceta[]>(this.Url+"lista");
  }

  listarRecetasXIdPlato(id: number){
    return this.http.get<DetalleReceta[]>(this.Url+"porManufacturado/"+ id, {responseType: 'json'});
  }

  crearDetalleReceta(item: DetalleReceta) {
    return this.http.post<DetalleReceta>(this.Url+"nuevo", item);
  }

  buscarXIdDetalleReceta(id: number) {
    return this.http.get<DetalleReceta[]>(this.Url+'detalle/' + id);
  }

  modificarDetalleReceta(item: DetalleReceta, id: number) {
    return this.http.put<DetalleReceta>(this.Url +"actualizar/"+ id, item);
  }
}
