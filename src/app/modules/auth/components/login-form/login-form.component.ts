import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status-model';

//importar el servicio de auth
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //inyectar el servicio de auth
    private authService: AuthService,
    //inyectar activatedRoute
    private route: ActivatedRoute
  ) {
    // Obtener el query param de la url y setearlo en el campo email
    this.route.queryParamMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.form.get('email')?.setValue(email);
      }
    });
   }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      // TODO
      // Llamar al servicio de auth para hacer el login
      this.authService.login(email, password).subscribe(
        {
          next: () => {
            this.status = 'success';
            this.router.navigate(['/app']);
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

}
