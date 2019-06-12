import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {ManufacturadoService} from '../../services/manufacturado.service';
import {Manufacturado} from '../../interfaces/manufacturado.interface';
import {PedidoService} from '../../services/pedido.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  appName: string = 'Sistema de Pedidos';

  manufacturados: Manufacturado[] = [];


  constructor(
    private _orderService: OrdersService,
    private _manufacturadoService: ManufacturadoService,
    private _pedidoService: PedidoService,
    private router: Router) {  }

  totalPedido = 0;
  pedidoTemp = [];

  ngOnInit() {
    this._manufacturadoService
      .listarManufacturados()
      .subscribe(data => {
        this.manufacturados = data;
      });
    console.log(this.manufacturados);
  }

  onAddProduct(manufacturados){
    console.log(manufacturados);
    this.totalPedido = (this.totalPedido + manufacturados.precio);
    this.pedidoTemp.push(manufacturados.nombre_articuloM);
  }

  onSubmit(){
    this._pedidoService.myForm.value.order = this.pedidoTemp;
    let data = this._pedidoService.myForm.value;
    data.totalOrder = this.totalPedido;
    //call service
    this._pedidoService.crearPedido(data);
    this.pedidoTemp = [];
    this.totalPedido = 0;
    this._pedidoService.myForm.reset();
    console.log(data);
  }
  removeItemTempOrder = (pedido) =>{
    let index = this.pedidoTemp.indexOf(pedido);
    if(index >-1) this.pedidoTemp.splice(index, 1);
  }



  /*  products = [
      {
        name: "Pollo",
        price: 4
      },
      {
        name: "Papas",
        price: 3
      },
      {
        name: "Pescado",
        price: 4
      }
    ]
    totalOrder = 0;
    tempOrder = [];

    ngOnInit() {
    }

    onAddProduct(product){
      console.log(product);
      this.totalOrder = (this.totalOrder + product.price);
      this.tempOrder.push(product.name);
    }

    removeItemTempOrder = (order) =>{
      let index = this.tempOrder.indexOf(order);
      if(index >-1) this.tempOrder.splice(index, 1);
    }

    onSubmit(){
      this.orderService.myForm.value.order = this.tempOrder;
      let data = this.orderService.myForm.value;
      data.totalOrder = this.totalOrder;
      //call service
      this.orderService.createOrder(data);
      this.tempOrder = [];
      this.totalOrder = 0;
      this.orderService.myForm.reset();
      console.log(data);
    }
    */

}
