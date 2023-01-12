import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveComponent } from './components/reactive/reactive.component';
import { ValidadoresComponent } from './services/validadores/validadores.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    ValidadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ValidadoresComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
