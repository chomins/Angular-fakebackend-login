import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { 

    if(this.authenticationService.currentUserValue) {
      this.router.navigate(['/'])
    }

  }

  ngOnInit(): void {

      this.signupForm = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        userID: ['',Validators.required],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  }

  get f() {return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if( this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.signupForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/login'], { queryParams: { registered: true }});
          },
          error => {
            this.error= error;
            this.loading = false;
          }
        );
  }

}
