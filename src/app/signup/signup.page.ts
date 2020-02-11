import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../entity/user';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: User;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) {
    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: 'USER'
    };
  }

  ngOnInit() {
  }

  signup() {
    if (this.user.username == null || this.user.username === '') {
      alert('you must set a username');
      return;
    }
    if (this.user.password == null || this.user.password === '') {
      alert('you must set a password');
      return;
    }
    if (this.user.phone == null || this.user.phone === '') {
      alert('you must set a phone');
      return;
    }
    if (this.user.email == null || this.user.email === '') {
      alert('you must set a email');
      return;
    }
    this.http.post(this.constant.baseUrl + '/user/signup', this.user).subscribe(res => {
      console.log(res);
      this.constant.setUser((res as any).result);
      localStorage.setItem('uid', this.constant.getUser().id);
    });
    this.router.navigate(['/tabs/me']);
  }
}

