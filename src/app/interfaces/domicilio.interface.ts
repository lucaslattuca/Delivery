import {Distrito} from './distrito.interface';

export interface Domicilio{
    id_domicilio:number;
    calle:string;
    numCasa:number;
    numDepartamento:number;
    numPiso:number;
    distrito:Distrito;
  } 
