import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestLogin } from '../../interfaces/Requestlogin.interface';
import { AuthServices } from '../../services/AuthServices';
import { Router } from '@angular/router';
import { ResponseLogin } from '../../interfaces/ResponseLogin.interface';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authServices: AuthServices) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {

    if (!this.loginForm.valid) {
      console.log('Datos:', this.loginForm.value);
    }

    const requestLogin : RequestLogin =
    {
      nombre: this.loginForm.get('usuario')?.value,
      contrasenia: this.loginForm.get('password')?.value
    }

    this.authServices.login(requestLogin).subscribe({
    next: (response : ResponseLogin) => {
      if (response && response.token) {
        localStorage.setItem('token_inventario', response.token);
      }
    this.router.navigate(['/dashboard']);
  },
  error: (err) => {
    console.error('Hubo un error', err);
  }
  });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
}
}
