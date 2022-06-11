import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

//Componentes
import { Socio } from '../../interfaces/socio';
import { ServicioUsuariosService } from 'src/app/servicios/servicio-usuarios.service';
import { NumeroSocioComponent } from '../dialog/numero-socio/numero-socio.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  //Propiedades formulario
  socioForm: FormGroup;
  opcionesSexo: string[] = ['Femenino', 'Masculino'];

  //Propiedades para la tabla
  dataSource!: MatTableDataSource<Socio>;
  displayedColumns: string[] = [
    'numeroSocio',
    'dni',
    'nombre',
    'apellidos',
    'telefono',
    'sexo',
    'acciones',
  ];

  //Array con datos iniciales, es donde se van a guardar todos los contactos que creemos.
  listaSocios: Socio[] = [];

  //Propiedad que guarda el indice del array, se usa en la edición del registro.
  index: number = this.listaSocios.length;

  //Propiedad para mostrar o esconder elementos
  mostrar: boolean = false;

  //Propiedad para cambiar la ruta de la imagen según el sexo seleccionado
  ruta: string = '';

  /**
   * En el constructor podemos dar valores iniciales al formulario, y también las validaciones de los campos.
   * @param fb
   * @param snackBar
   * @param servicio
   * @param dialog
   */
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private servicio: ServicioUsuariosService,
    public dialog: MatDialog
  ) {
    this.socioForm = this.fb.group({
      numeroSocio: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}[a-zA-Z]{1}')]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      sexo: ['', [Validators.required]],
    });
  }

  /**
   * Función inicial, carga la tabla
   */
  ngOnInit(): void {
    this.cargarContactos();
  }

  /**
   * Cargamos los registros en la tabla (Se cargan unos registros iniciales, simulando la BBDD)
   */
  cargarContactos() {
    this.listaSocios = this.servicio.getListaSocios();
    this.dataSource = new MatTableDataSource(this.listaSocios);
  }

  /**
   * Envía los datos del nuevo socio.
   * @param formGroupDirectiva
   */
  onSubmit(formGroupDirectiva: FormGroupDirective): void {
    //editamos el socio
    if (this.mostrar) {
      //Habitilo el campo al enviar el formulario, para poder obtener el valor de del número del socio.
      this.socioForm.get('numeroSocio')?.enable();
      this.servicio.listaSocios[this.index] = this.servicio.editar(this.socioForm.value);
      let sexo = this.socioForm.value.sexo;
      this.snackBar.open('Socio actualizado con exito', 'X', {duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom'});
      this.mostrar = false;
    }
    //Guardamos el nuevo socio
    else {
      this.servicio.aniadir(this.socioForm.value);
      this.snackBar.open('Socio registrado con exito', 'X', {duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom'});
    }
    this.socioForm.reset();
    formGroupDirectiva.resetForm();
    //Refresco la tabla
    this.cargarContactos();
  }

  /**
   * Obtengo el socio y lo guardo en el objeto nuevoSocio vacío, para poder editarlo.
   * @param index
   * @param mostrar
   */
  abrirParaEditar(index: number, mostrar: boolean) {
    this.index = index;
    this.fb.group({
      numeroSocio: this.socioForm.controls['numeroSocio'].setValue(this.listaSocios[index].numeroSocio),
      dni: this.socioForm.controls['dni'].setValue(this.listaSocios[index].dni),
      nombre: this.socioForm.controls['nombre'].setValue(this.listaSocios[index].nombre),
      apellidos: this.socioForm.controls['apellidos'].setValue(this.listaSocios[index].apellidos),
      telefono: this.socioForm.controls['telefono'].setValue(this.listaSocios[index].telefono),
      sexo: this.socioForm.controls['sexo'].setValue(this.listaSocios[index].sexo),
    });
    //Mostramos el botón para guardar las actualizaciones del formulario
    this.mostrar = mostrar;
    //Deshabilito el campo número de socio, para que no pueda ser modificado por el usuario.
    this.socioForm.get('numeroSocio')?.disable();
    this.cambiarImagen();
  }

  /**
   * Función que me permite cambiar la ruta de la imagen según el valor que contenga el campo sexo,
   * solo funciona en la edición del formulario.
   */
  cambiarImagen() {
    (this.socioForm.controls['sexo'].value === 'Femenino')? this.ruta = 'chica.svg' : this.ruta = 'chico.svg';
  }

  /**
   * Al cancelar la ación de editar o de guardar, se limpia el formulario
   * @param formGroupDirectiva
   */
  cancelar(formGroupDirectiva: FormGroupDirective) {
    this.mostrar = false;
    this.socioForm.reset();
    formGroupDirectiva.resetForm();
    this.socioForm.get('numeroSocio')?.enable();
  }

  /**
   * Función que recibe el número de indice del array, para eliminar un registro.
   * @param index
   */
  eliminarContacto(index: number) {
    if (confirm('¿Desea borrar el socio Nº ' + this.listaSocios[index].numeroSocio + ' ' + this.listaSocios[index].nombre + ' ' + this.listaSocios[index].apellidos + '?')) {
      this.servicio.eliminar(index);
      this.snackBar.open('Socio eliminado con exito', 'X', {duration: 4000, horizontalPosition: 'center', verticalPosition: 'bottom'});
      this.cargarContactos();
      this.mostrar = false;
      this.socioForm.reset();
      this.socioForm.get('numeroSocio')?.enable();
    }
  }

  /**
   * Función que me permite mostrar la ventana de dialogo en caso de que el número de usuario ya exista.
   * Sugiere un número que no exista en la tabla.
   */
  abrirDialogo() {
    this.dialog.open(NumeroSocioComponent);
  }

  /**
   *  Función que compureba el número de usuario, si el número ya existe muestra la ventana de dialogo advirtiendo del error,
   *  elimina el valor del campo numeroSocio.
   */
  comprobarNumeroDeSocio() {
    let coincidencia = this.servicio.comprobarNumeroDeSocio(this.socioForm.controls['numeroSocio'].value);

    //Si la coincidencia es mayor que 0, el número de usuario ya existe.
    if (coincidencia.length > 0) {
      this.abrirDialogo();
      this.socioForm.controls['numeroSocio'].setValue('');
    }
  }
}
