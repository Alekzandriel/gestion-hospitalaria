import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddCitasComponent } from './add-citas/add-citas.component'; 
import { AddDoctorComponent } from '../doctor/add-doctor/add-doctor.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  
  llPatients : Patient[] = [];
  allDoctors : Doctor[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'doctor', 'gender','action'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allPatients: any[] | undefined;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPatiens();
    this.getAllDoctors();
    
  }

  editDoctor(row : any){
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Editar doctor";
    dialogConfig.data.buttonName = "Actualizar";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateDoctor(data);
        this.openSnackBar("El Doctor se actualizo con exito.", "OK")
      }
    })
  }


  addPatient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Registro Cita Medica',
      buttonName : 'Enviar notificacion'
    }
    const dialogRef = this.dialog.open(AddCitasComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addPatient(data);
        this.openSnackBar("Paciente registrado con exito.", "OK")
      }
    })
  }
  
  getAllPatiens(){

    this.dataApi.getAllPatients().subscribe(res => {
      this.allPatients = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.patient_id = e.payload.doc.id;
        return data;
      })
      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllDoctors(){
    this.dataApi.getAllDoctors().subscribe(res =>{
    this.allDoctors = res.map((e : any) =>{
      const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    })
  }


  getDoctorName(id : string){
    let doctorName = "";
    this.allDoctors.forEach(element => {
      if(element.id == id){
        doctorName = element.name;

      }
    });
    return doctorName;

  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}