import { DataService } from 'src/app/shared/service/data.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent {

  id !: any;
  doctorObj !: any; 

  constructor(private router : ActivatedRoute ,
    private dataApi : DataService ){
    this.id = router.snapshot.paramMap.get('id');
  }
 
  ngOnInit(): void { 
    this.getDoctorById(); 
 }
 getDoctorById(){
  this.dataApi.getDoctorById(this.id).subscribe(res => {
    this.doctorObj = res;
    console.log(this.doctorObj);
  });


 }

}
