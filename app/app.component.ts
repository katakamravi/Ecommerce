import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/Common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

import { FileUploader } from 'ng2-file-upload';
import { AppService } from './app.service';
// import { createWriteStream } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  RegisterForm: FormGroup;
  private user: SocialUser;
  homeSts = false;
  title = 'ecommerce';
  // uploader: FileUploader;
  //  user: SocialUser;
  loggedIn: boolean;
  loginForm: FormGroup;
  uploader: FileUploader;
  // uploader: FileUploader;
  constructor(private fb: FormBuilder, private http: HttpClient, private appservice: AppService, private authService: AuthService) {


    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.RegisterForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      name: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobile: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.uploader = new FileUploader({
      url: 'http://localhost:3000/saveimage',
      itemAlias: 'image',
      additionalParameter: this.RegisterForm.value
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      // this.toastr.success('File successfully uploaded!');
    };
  }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);

    });
  }
  register() {
    console.log(this.uploader);
    // const fileStream = createWriteStream(this.RegisterForm.get('image').value);
    // this.RegisterForm.get('image').setValue(fileStream);
    // this.uploader = new FileUploader({
    //   url: 'http://localhost:3000/saveimage',
    //   itemAlias: 'image',
    //   additionalParameter: this.RegisterForm.value
    // });
    this.uploader.options.additionalParameter = this.RegisterForm.value;
    this.uploader.uploadAll();
    // this.appservice.register(this.RegisterForm.value).subscribe(res => {
    //   console.log(res);
    // });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  login() {
    this.http.post('http://localhost:3000/saveimage', this.loginForm.value).subscribe(res => {
      console.log(res);
    });
  }
}
