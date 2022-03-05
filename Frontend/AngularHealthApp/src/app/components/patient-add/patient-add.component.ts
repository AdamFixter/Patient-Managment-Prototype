import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  validationMsg = ''

  patient: Patient = {
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

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      delete: [false, Validators.required]
    })
  }

  //Get the form controls from the form
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const data = {
      title: this.patient.title,
      firstname: this.patient.firstname,
      surname: this.patient.surname,
      dob: this.patient.dob,
      gender: this.patient.gender,
      address1: this.patient.address1,
      address2: this.patient.address2,
      town: this.patient.town,
      county: this.patient.county,
      postcode: this.patient.postcode,
      telephoneNumber: this.patient.telephoneNumber,
      mobileNumber: this.patient.mobileNumber,
      email: this.patient.email,
      deleted: this.patient.deleted
    }

    console.log(data);
    this.patientService.create(data)
      .subscribe({
        next: (val) => this.router.navigate(["/patients"]),
        error: (err) => {
          console.log(err)
          this.validationMsg = err.error.message || "Message not configured"
        },
        complete: () => {}
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  createPatient(): void {
    this.submitted = false;
    this.patient = {
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
  }

}
