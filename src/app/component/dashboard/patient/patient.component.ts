import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddPatientComponent } from './add-patient/add-patient.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {

  allPatients : Patient[] = [];
  allDoctors : Doctor[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'doctor', 'gender','action'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPatients();
    this.getAllDoctors();
  }
  getAllDoctors() {
    throw new Error('Method not implemented.');
  }
  getAllPatients() {
    throw new Error('Method not implemented.');
  }

  addPatient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Registrar Paciente',
      buttonName : 'Registrar'
    }
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addPatient(data);
        this.openSnackBar("Paciente registrado con exito.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
