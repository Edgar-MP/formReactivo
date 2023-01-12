import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresComponent } from '../../services/validadores/validadores.component';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresComponent) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  crearListeners() {
    this.form.valueChanges.subscribe( valor => {
      // console.log(valor);
    })

    this.form.statusChanges.subscribe(status => console.log(status))
  }

  cargarDataAlFormulario() {
    this.form.reset({
      nombre: 'Edgar',
      apellido: 'Martínez Palmero',
      correo: 'edgarmartinezdw2@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        poblacion: 'Lloret de Mar',
        provincia: 'Girona'
      },

    });
  }

  ng0nInit(): void {}

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noSerrano]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,3}$'),
        ],
      ],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        poblacion: ['', Validators.required],
        provincia: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([]),
    },{
      Validators: this.validadores.passwordIguales('pass1', 'pass2')
    });
  }

  guardar() {
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.form.reset();
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required))
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched;
  }

  get usuarioNoValido() {
    return this.form.get('usuario')?.invalid && this.form.get('usuario')?.touched;
  }

  get apellidoNoValido() {
    return (
      this.form.get('apellido')?.invalid && this.form.get('apellido')?.touched
    );
  }

  get pass1NoValida() {
    return this.form.get('pass1')?.invalid && this.form.get('pass1')?.touched;
  }
  
  get pass2NoValida() {
    return (this.form.get('pass1').value === this.form.get('pass2').value) ?false : true;
  }

  get correoNoValido() {
    return this.form.get('correo')?.invalid && this.form.get('correo')?.touched;
  }

  get poblacionNoValida() {
    return (
      this.form.get('direccion.poblacion')?.invalid &&
      this.form.get('direccion.poblacion')?.touched
    );
  }

  get provinciaNoValida() {
    return (
      this.form.get('direccion.provincia')?.invalid &&
      this.form.get('direccion.provincia')?.touched
    );
  }
}
