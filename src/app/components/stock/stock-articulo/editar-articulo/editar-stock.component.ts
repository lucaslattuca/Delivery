import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { UnidadMedida } from 'src/app/interfaces/unidad.medida.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/interfaces/articulo.interface';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent implements OnInit {

  public categorias : Categoria[] = [];
  public medidas : UnidadMedida[] = [];
  public art : Articulo;

  constructor(
      private _categoriaService : CategoriaService,
      private _medidaService : UnidadMedidaService,
      private _articuloService : ArticuloService,
      private router: Router
  ) {
    // //@ts-ignore
    // this.categorias={};
    // //@ts-ignore
    // this.medidas={};
    // //@ts-ignore
    // this.art={};
   }

  ngOnInit() {    
    this.completarArt();
    this.llenarCombos();
  }

  llenarCombos(){
    this._categoriaService.listarCategorias().subscribe(data =>{
      for(let item of data){
        if(!item.esPlato){
          this.categorias.push(item);
        }
      }
    });

    this._medidaService.listarUnidadesMedida().subscribe(data =>{
      this.medidas = data;
    });    
  }

  completarArt(){
    let id=localStorage.getItem("id_articulo");
    this._articuloService.buscarXIdArticulo(+id)
    .subscribe(data=>{this.art=data});    
  }

  actualizarArticulo(art:Articulo){
    this._articuloService.modificarArticulo(art)
    .subscribe(data=>{art = data;
      alert("Se actualizó exitosamente");
      this.router.navigate(["stock"])
    });
  }

  Volver(){
    this.router.navigate(["stock"]);
  }
}
