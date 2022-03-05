import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  form: FormGroup;
  currentPatient: Patient = {
    title: '',
    firstname: '',
    surname: '',
    dob: undefined,
    gender: '',
    address1: '',
    address2: '',
    town: '',
    county: '',
    postcode: '',
    telephoneNumber: '',
    mobileNumber: '',
    email: '',
    deleted: false
  }
  submitted = false;
  message = '';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPatient(this.route.snapshot.params.id);

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      town: ['', Validators.required],
      county: ['', Validators.required],
      postcode: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      deleted: []
    })
  }

    //Get the form controls from the form
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }

  getPatient(id: any): void {
    this.patientService.getById(id)
      .subscribe({
        next: data => {
          this.currentPatient = data
        },
        error: err => console.error(err),
        complete: () => {}
      });
  }
  onSubmit(): void {
    console.log("on submit")
    this.submitted = true;

    if (this.form.invalid) {
      console.log("invlalid")
      return;
    }

    this.patientService.update(this.currentPatient.id, this.currentPatient)
      .subscribe({
        next: data => this.router.navigate(["/patients", {
          message: data.message || "No message configured when updating a patient!"
        }]),
        error: err => console.error(err),
        complete: () => {}
      });
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  deletePatient(): void {
    this.patientService.delete(this.currentPatient.id)
      .subscribe({
        next: data => this.router.navigate(['/patients', {
          message: data.message || "No message configured when deleting a patient!"
        }]),
        error: err => console.error(err),
        complete: () => {}
      });
  }

}
