import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Patient } from '../models/patient.model';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestingController: HttpTestingController
  const baseUrl = 'http://localhost:8080/patient';

  const mockPatients: Patient[] = [
    {
      id: "1",
      title: "Mr",
      firstname: "Adam",
      surname: "Tester",
      dob: new  Date("2021-12-23T00:00:00.000+00:00"),
      gender: "male",
      address1: "Address 1",
      address2: "Address 2",
      town: "TestTown",
      county: "TestCounty",
      postcode: "ABC123",
      telephoneNumber: "483848585793",
      mobileNumber: "3489655849478",
      email: "adamTester@mail.com",
      deleted: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(PatientService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  //getAll -> test if all patients are returned
  it('getAll() - should make a GET request to return all data items', () => {
    service.getAll().subscribe(res => {
      expect(res).toEqual(mockPatients);
      expect(res.length).toBe(1);
     });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockPatients);
    httpTestingController.verify();
   });

   //getById(id) -> test if patient is returned
  it('getById(id) - should make a GET request to return patient with id 1', () => {
    let id = "1";
    service.getById(id).subscribe(res => {
      expect(res).toContain(mockPatients[0])
      });
    const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockPatients);
    httpTestingController.verify();
  });

  //delete(id) -> test if patient is deleted
  it('delete(id) - should make a DELETE request to delete the patient with id 1', () => {
    let id = "1";

    service.delete(id).subscribe(res => {
      expect(res).toBe(id);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/1`, 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(id);
    httpTestingController.verify();
  });

  //update(id, data) -> test if patient can be updated
  it('update(id, data) - should make a PUT request with id and data to update the patients firstname', () => {
    let id = "1";
    const updateObj = { firstName: "Tested" };

    service.update(id, updateObj).subscribe(res => {
      expect(res.firstName).toBe('Tested');
    });

    const req = httpTestingController.expectOne(`${baseUrl}/${id}`, 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
  });

  //create(data) -> should make a POST request to create a patient
  it('create(data) should make a POST request with body to create a patient', () => {
    const patient =
    {
      id: "1234",
      title: "Mr",
      firstname: "Adam",
      surname: "Tester",
      dob: new  Date("2021-12-23T00:00:00.000+00:00"),
      gender: "male",
      address1: "Address 1",
      address2: "Address 2",
      town: "TestTown",
      county: "TestCounty",
      postcode: "ABC123",
      telephoneNumber: "483848585793",
      mobileNumber: "3489655849478",
      email: "adamTester@mail.com",
      deleted: false
    };

    service.create(patient).subscribe(res => {
      console.log(patient)
      console.log(res.id)
      expect(res).toBe(patient);
    });

    const req = httpTestingController.expectOne(`${baseUrl}`, 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(patient);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(patient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPatient')

});
