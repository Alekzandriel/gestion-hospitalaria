import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/shared/service/data.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorsArr : any[] = [];

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ){ }
  ngOnInit(): void {
    this.getAllDoctors();
  }
  addDoctor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Registrar Doctor'
    }

    const dialogRef = this.dialog.open(AddDoctorComponent,dialogConfig);
  
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.addDoctor(data);
this.openSnackBar("Doctor Registrado Exitosamente","OK")
      }
    })
  }

  getAllDoctors(){
    this.dataApi.getAllDoctors().subscribe(res =>{
    this.doctorsArr = res.map((e : any) =>{
      const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
    })
  console.log(this.doctorsArr);

    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
