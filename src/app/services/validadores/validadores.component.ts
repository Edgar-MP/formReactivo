import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Component({
  selector: 'app-validadores',
  templateUrl: './validadores.component.html',
  styleUrls: ['./validadores.component.css']
})

export class ValidadoresComponent {
  passwordIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1]
      const pass2Control = formGroup.controls[pass2]

      if (pass1Control.value === pass2Control.value) 
        pass2Control.setErrors(null)
      else
        pass2Control.setErrors({ noEsIgual: true })
    }
  }

  noSerrano( control: FormControl):{[s:string]: boolean} {
    if (control.value?.toLowerCase() === 'serrano') {
      return {
        noSerrano:true
      }
    }
    return null;
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{

    if(!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) =>{

      setTimeout(() =>{
        if(control.value === 'strider'){
            resolve({existe:true})
        }else{
          resolve(null)          
        }
      }, 3500 )

    })
  }

}

