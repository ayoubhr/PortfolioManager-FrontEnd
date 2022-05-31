import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/social-network/services/api.service';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() add = new EventEmitter<User>();
  @ViewChild('userForm') userForm!: NgForm;

  newUser: User = {
    username: '',
    lastname: '',
    email: '',
    password: '',
    avatar: '',
  };

  emailDos: string = '';

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  registerUser(user: User) {
    if (this.userForm.valid) {
      user.birthDate = "18/11/1994";
      user.avatar = "abcdef.jpg";
      this.apiService.saveUser(user).subscribe({
        next: (e) => {
          //console.log(e)
          this.router.navigate(['']);
        },
        error: (error) => {
          alert("error registering");
          location.reload();
        },
      });
    }
  }

  loginRoute() {
    this.router.navigate(['auth/login']);
  }

  resetform() {
    this.newUser = {
      username: '',
      lastname: '',
      email: '',
      password: '',
      avatar: '',
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newUser.avatar = reader.result as string;
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  validEmails(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid && this.newUser.email === this.emailDos,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
