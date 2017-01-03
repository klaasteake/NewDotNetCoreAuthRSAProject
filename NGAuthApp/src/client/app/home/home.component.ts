import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers} from '@angular/http';
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

@Injectable()
export class HomeComponent implements OnInit {

  loginForm : FormGroup;
  username : string;
  password : string;
  result : any = "No result yet";
  statuscode : number;
  statustext : string;
  token : string = localStorage.getItem('token');

  constructor(private http: Http, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }); 
  }

  getPublicData() {
    this.http.get('http://localhost:3653/api/login').subscribe(response => {
      this.statuscode = response.status,
      this.statustext = response.statusText,
      this.result = response.json();
    }, (errors) => {this.statustext = errors, this.result = "No data received"});
  }

  login(){
    let body : string = "username=" + this.loginForm.value.username+"&password=" + this.loginForm.value.password;
    let headerToken = new Headers();
    headerToken.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3653/token', body , { headers: headerToken })
      .subscribe(
        response => {
          localStorage.setItem('token', response.json().access_token);
          this.getPrivateData(response.json().access_token);
        },
        error => {
          this.result = "Er is een fout opgetreden bij het inloggen.";
          this.statustext = error["statusText"];
          this.statuscode = error["status"];
        }
      );
  }

  getPrivateData(token : string){
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Bearer ' + token);
    
    this.http.get('http://localhost:3653/api/login/5', {headers: authHeader}).subscribe(response => {
      this.statuscode = response.status,
      this.statustext = response.statusText,
      this.result = response.json();
    }, (errors) => {this.statustext = errors, this.result = "No data received"});
  }
}
