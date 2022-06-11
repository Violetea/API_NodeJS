import { Injectable } from '@angular/core';
import { Socio } from '../interfaces/socio';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuariosService {
  //Datos iniciales, para introducir en la tabla
  listaSocios: Socio[] = [
    {
      numeroSocio: 1,
      nombre: 'Julieta',
      apellidos: 'Alcalde Lamus',
      dni: '48451289Y',
      telefono: '688787878',
      sexo: 'Femenino',
    },
    {
      numeroSocio: 2,
      nombre: 'Kaili',
      apellidos: 'Amaya Lamus',
      dni: '34124551M',
      telefono: '656565432',
      sexo: 'Masculino',
    },
    {
      numeroSocio: 3,
      nombre: 'Duna',
      apellidos: 'Vega Lamus',
      dni: '49784589L',
      telefono: '687654321',
      sexo: 'Femenino',
    },
    {
      numeroSocio: 4,
      nombre: 'Andrea',
      apellidos: 'Vide Prieto',
      dni: '34451289Y',
      telefono: '691787878',
      sexo: 'Femenino',
    },
    {
      numeroSocio: 5,
      nombre: 'Enrique',
      apellidos: 'Iglesias Pastor',
      dni: '21124551M',
      telefono: '621565432',
      sexo: 'Masculino',
    },
    {
      numeroSocio: 6,
      nombre: 'Gabriela',
      apellidos: 'Lemos de León',
      dni: '56784589L',
      telefono: '676654321',
      sexo: 'Femenino',
    },
  ];

  constructor() {}

  /**
   * Función que me da una lista de socios
   * @returns una lista/array de socios
   */
  getListaSocios() {
    return this.listaSocios.slice();
  }

  /**
   * Función que recibe un index
   * Eliminar el socio que coincida con el número de index
   * @param index
   */
  eliminar(index: number) {
    this.listaSocios.splice(index, 1);
  }

  /**
   * Función que recibe un socio
   * Lo añade a la lista/array de socios
   * @param socio
   */
  aniadir(socio: Socio) {
    this.listaSocios.push(socio);
  }

  /**
   * Función que recibe un index
   * Busca el objeto
   * @param index
   * @returns un objeto Socio
   */
  comprobarNumeroDeSocio(index: number) {
    return this.listaSocios.filter((socio) => socio.numeroSocio === index);
  }

  /**
   * Función que cuenta el número de objetos en la lista, le añadimos 1
   * Esta función la usamos para sugerir el número de socio que podemos poner.
   * @returns un número
   */
  contar(): number {
    return this.listaSocios.length + 1;
  }

  /**
   * Función que recibe un objeto socio, para poder editarlo
   * Obtenemos su index
   * @param socio
   * @returns un objeto Socio 'index'
   */
  editar(socio: Socio) {
    const index = this.listaSocios.findIndex(
      (x) => x.numeroSocio === socio.numeroSocio
    );
    return (this.listaSocios[index] = socio);
  }
}
