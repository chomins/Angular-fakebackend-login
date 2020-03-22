import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string;



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService

  ) { 

    if( this.authenticationService.currentUserValue) {
      this.router.navigate(['/']) //->user정보가 맞으면 home 라우터로 연결~
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userID: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; //-> 라우트 파라미터로 부터 returnUrl을 가져오거나 default인 '/'로 가져오기

    //회원가입 성공 메시지
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
  }
  }

  get f() {return this.loginForm.controls; }

  onSubmit() {
    this.submitted= true;

    this.error = null;
    this.success = null;


    //->유저정보가 틀린경우
    if (this.loginForm.invalid)  {
      return;
    }

    this.loading =true;
    this.authenticationService.login(this.f.userID.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error= error;
            this.loading= false;
          }
        )
  }

}
