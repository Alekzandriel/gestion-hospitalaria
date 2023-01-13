import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addDoctor(doctor : any) {
    doctor.id = this.afs.createId();
    return this.afs.collection("Doctor/").add(doctor);
  }

}
