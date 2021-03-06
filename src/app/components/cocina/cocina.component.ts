import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Pedido} from '../../interfaces/pedido.interface';
import {DetalleVenta} from '../../interfaces/detalle-venta.interface';
import {PedidoService} from '../../services/pedido.service';
import {DetalleVentaService} from '../../services/detalle-venta.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  @Input() comandas: Pedido[] = [];
  detComanda: DetalleVenta[] = [];
  DetVta: DetalleVenta;

  isDisabled = false;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private pedidoSer: PedidoService,
    private detSer: DetalleVentaService,
    private router: Router,
    private wsService: WebsocketService) { }

    ngOnInit() {
     this.pedidoSer.listarPedidos().subscribe(data => {
       this.comandas = data;
     });
/*
      this.wsService._connect();

      this.wsService.disconnect();*/

     this.detSer.listarDetalleVentas().subscribe( data => {
       this.detComanda = data;
     });
    }

  triggerSomeEvent() {
    return this.isDisabled = !this.isDisabled;
  }

  open(content) {
    if (this.isDisabled === true) {
      this.isDisabled = false;
    }
    // tslint:disable-next-line:max-line-length
    /* Buscar una mejor solucion para esto (Coloca de vuelta el valor original si el select de comandas del alert esta desactivado cuando se abre el modal)*/
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  Estimado(id): number {
    let max = 0;
    for (const i of this.detComanda) {
      if (i.pedido.numPedido === id && i.manufacturado.minutosPrep > max) {
        max = i.manufacturado.minutosPrep;
      }
    }
    return max;
  }

  Actions(id, tipo): void {
    const bid: string = (tipo.target as Element).id;

    switch (bid) {
      case 'suma':
        this.comandas[id - 1].demora += 5;
        break;

      case 'resta':
        this.comandas[id - 1].demora -= 5;
        break;

      case 'aceptar':
        console.log(id);
        this.comandas[id - 1].estadoListo = true;
        break;

      case 'cancelar':
        this.comandas[id - 1].fechaAnulado = moment().utc(true).toDate();
        break;
    }
    this.pedidoSer.modificarPedido((this.comandas[id - 1])).subscribe(data => {
      this.comandas[id - 1] = data;
      this.router.navigate(['cocina']);
    });
  }
}
