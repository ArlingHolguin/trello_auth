import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

//importar el servicio de auth
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { User } from '@models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user: User | null = null;

  constructor(
    //inyectar el servicio de auth
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    // TODO
    // Llamar al servicio de auth para hacer el logout
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // TODO
    // Obtener el usuario autenticado
    this.authService.getProfile().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error al obtener el usuario autenticado', error);
      }
    );
  }
}
