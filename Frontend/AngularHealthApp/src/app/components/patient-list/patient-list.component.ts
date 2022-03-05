import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients?: Patient[];
  currentPatient: Patient = {};
  currentIndex = -1;
  id = '';
  alertMsg = ''

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPatients();

    this.alertMsg = this.route.snapshot.paramMap.get('message') || '';
  }

  getPatients(): void {
    this.patientService.getAll()
      .subscribe({
        next: data => this.patients = data,
        error: err => console.error(err),
        complete: () => {}
      })
  }

  refreshList(): void {
    this.getPatients();
    this.currentPatient = {};
    this.currentIndex = -1;
  }

  setActivePatient(patient: Patient, index: number): void {
    this.currentPatient = patient;
    this.currentIndex = index;
  }

  deleteAllPatients(): void {
    this.patientService.deleteAll()
      .subscribe({
        next: data => {
          this.refreshList();
          this.alertMsg = data.message || "No message configured when deleting all patients!";
        },
        error: err => console.error(err),
        complete: () => {}
      })
  }
  searchPatientById(): void {
    this.currentPatient = {}
    this.currentIndex = -1;

    this.patientService.searchById(this.id)
      .subscribe({
        next: data => this.patients = data,
        error: err => console.error(err),
        complete: () => {}
      })
  }

  deletePatient(): void {
    this.patientService.delete(this.currentPatient.id)
      .subscribe({
        next: data => {
          this.refreshList();
          this.alertMsg = data.message || "No message configured when delete a patient!"
        },
        error: err => console.error(err),
        complete: () => {}
      });
  }

}
