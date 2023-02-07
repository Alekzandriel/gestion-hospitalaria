import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-add-citas',
  templateUrl: './add-citas.component.html',
  styleUrls: ['./add-citas.component.css']
})
export class AddCitasComponent {

   datos : FormGroup;
   constructor(private httpclien:HttpClient,

    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddCitasComponent>){
   

    this.datos = new FormGroup ({
      nombre: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required,Validators.email]),
      mensaje: new FormControl("", Validators.required),
      


    })

  }
  

  envioCorreo(){
    let params = {
      nombre:this.datos.value.nombre,
      email:this.datos.value.correo,
      mensaje:this.datos.value.mensaje,
      


    }

    console.log(params);

   this.httpclien.post('https://formspree.io/f/mdoveobp',params).subscribe(resp => {
    console.log(resp)
   })
  }
  
  close() {
    this.dialogRef.close();
  }




  }

