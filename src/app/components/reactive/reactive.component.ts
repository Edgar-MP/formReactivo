import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }
  cargarDataAlFormulario() {
    this.form.reset({
      nombre: 'Edgar',
      apellido: 'Martínez Palmero',
      correo: 'edgarmartinezdw2@gmail.com',
      direccion: {
        poblacion: 'Lloret de Mar',
        provincia: 'Girona'
      }
    })
  }

  ng0nInit(): void {}

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,3}$')]],
      direccion: this.fb.group({
        poblacion: ['', Validators.required],
        provincia: ['', Validators.required]
      })
    })

  }

  guardar() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach ((control) => 
          control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      })
    }
    this.form.reset();

  }
  
  get nombreNoValido() {
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.form.get('apellido')?.invalid && this.form.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.form.get('correo')?.invalid && this.form.get('correo')?.touched
  }

  get poblacionNoValida() {
    return this.form.get('direccion.poblacion')?.invalid && this.form.get('direccion.poblacion')?.touched
  }

  get provinciaNoValida() {
    return this.form.get('direccion.provincia')?.invalid && this.form.get('direccion.provincia')?.touched
  }

}
