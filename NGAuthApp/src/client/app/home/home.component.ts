import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { User } from '../shared/user';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  loginForm : FormGroup;
  username : string;
  password : string;
  result : any = "No result yet";
  statuscode : number;
  statusText : string;

  constructor(private http: Http, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
    }); 
  }

  login() {
    var user : User =  new User(this.username, this.password);
    this.http.get('http://localhost:3653/api/login').subscribe(response => {
      this.statuscode = response.status,
      this.statusText = response.statusText,
      this.result = response.json();
    });
  }
}
