import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataService } from 'src/app/shared/service/data.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorsArr : any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department' ,'gender', 'action'];
  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

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
     this.dataSource = new MatTableDataSource(this.doctorsArr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    })
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
