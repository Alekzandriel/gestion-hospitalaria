import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-citas',
  templateUrl: './add-citas.component.html',
  styleUrls: ['./add-citas.component.css']
})
export class AddCitasComponent {

   datos : FormGroup;
   constructor(private httpclien:HttpClient){

    this.datos = new FormGroup ({
      nombre: new FormControl("", [Validators.required,Validators.email]),
      correo: new FormControl("", Validators.required),
      mensaje
      : new FormControl("", Validators.required),


    })

  }

  envioCorreo(){
    let params = {
      nombre:this.datos.value.nombre,
      email:this.datos.value.correo,
      mensaje:this.datos.value.mensaje
      ,


    }

    console.log(params);

   this.httpclien.post('http://localhost:4200/envio',params).subscribe(resp => {
    console.log(resp)
   })
  }
  

  }