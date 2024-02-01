import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status-model';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;
  token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      // TODO: Connect
      this.authService.recovery(email).subscribe(
        {
          next: (rta: any) => {
            this.status = 'success';
            this.emailSent = true;
            //obtener el token de la respuesta de la peticion y redirigir a la pagina de cambio de contraseña
            this.token = rta.recoveryToken;
            console.log(rta.recoveryToken);
            if(this.token){
              window.location.href = `/recovery?token=${this.token}`;
            }
            

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
