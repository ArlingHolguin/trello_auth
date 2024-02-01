import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status-model';

import { CustomValidators } from '@utils/validators';
//conectar el servicio de auth
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  statusUser: RequestStatus = 'init';
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showregister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //inyectar el servicio de auth
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      //hacermos la conexion al servicio de auth para hacer el registro
      this.authService.register(name, email, password).subscribe(
        {
          next: () => {
            this.status = 'success';
            this.router.navigate(['/login']);
          },
          error: () => {
            this.status = 'failed';
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if(this.formUser.valid){
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      //hacermos la conexion al servicio de auth para validar el email
      this.authService.isAvailableEmail(email).subscribe(
        {
          next: (rta) => {
            this.statusUser = 'success';
            if(rta.isAvailable){        
              this.showregister = true;    
              this.form.controls.email.setValue(email);
            }
            else{
              this.router.navigate(['/login'], { queryParams: { email } });
            }
          },
          error: () => {
            this.statusUser = 'failed';
          }
        }
      );

    }else{
      this.formUser.markAllAsTouched();
    }
  }
}
