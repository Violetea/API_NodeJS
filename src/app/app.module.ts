import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos
import { MaterialModule } from './material/material.module';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './home/formulario/formulario.component';
import { NumeroSocioComponent } from './home/dialog/numero-socio/numero-socio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormularioComponent,
    NumeroSocioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
