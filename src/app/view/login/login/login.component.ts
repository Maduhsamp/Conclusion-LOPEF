import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';
import { User } from 'src/app/model/interfaces/user';
import { NgToastService } from 'ng-angular-popup';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrapper: HTMLElement | null = null;
  registerLink: HTMLElement | null = null;
  loginLink: HTMLElement | null = null;

  loginForm: FormGroup;
  registerForm: FormGroup;
  confirmarSenhaInvalid: boolean = false;
  loginError: string | null = null;
  registerError: string | null = null;

  title = 'LOPEF | Login/Cadastro';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private titleService: Title
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.setDocTitle(this.title)
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }

  ngOnInit(): void {
    this.wrapper = document.querySelector('.wrapper');
    this.registerLink = document.querySelector('.register-link');
    this.loginLink = document.querySelector('.login-link');

    if (this.registerLink) {
      this.registerLink.onclick = () => {
        if (this.wrapper) {
          this.wrapper.classList.add('active');
        }
      };
    }

    if (this.loginLink) {
      this.loginLink.onclick = () => {
        if (this.wrapper) {
          this.wrapper.classList.remove('active');
        }
      };
    }
  }

  togglePasswordLogin() {
    const passwordInputLogin = document.getElementById('senhaLoginInput') as HTMLInputElement;
    const showPasswordIconLogin = document.getElementById('showPasswordIconLogin');
    const hidePasswordIconLogin = document.getElementById('hidePasswordIconLogin');

    if (passwordInputLogin.type === 'password') {
      passwordInputLogin.type = 'text';
      if (showPasswordIconLogin) showPasswordIconLogin.style.display = 'none';
      if (hidePasswordIconLogin) hidePasswordIconLogin.style.display = 'inline';
    } else {
      passwordInputLogin.type = 'password';
      if (showPasswordIconLogin) showPasswordIconLogin.style.display = 'inline';
      if (hidePasswordIconLogin) hidePasswordIconLogin.style.display = 'none';
    }
  }

  togglePasswordRegister() {
    const passwordInputRegister = document.getElementById('senhaRegisterInput') as HTMLInputElement;
    const showPasswordIconRegister = document.getElementById('showPasswordIconRegister');
    const hidePasswordIconRegister = document.getElementById('hidePasswordIconRegister');

    if (passwordInputRegister.type === 'password') {
      passwordInputRegister.type = 'text';
      if (showPasswordIconRegister) showPasswordIconRegister.style.display = 'none';
      if (hidePasswordIconRegister) hidePasswordIconRegister.style.display = 'inline';
    } else {
      passwordInputRegister.type = 'password';
      if (showPasswordIconRegister) showPasswordIconRegister.style.display = 'inline';
      if (hidePasswordIconRegister) hidePasswordIconRegister.style.display = 'none';
    }
  }

  toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirmarSenhaInput') as HTMLInputElement;
    const showConfirmPasswordIcon = document.getElementById('showConfirmPasswordIcon');
    const hideConfirmPasswordIcon = document.getElementById('hideConfirmPasswordIcon');

    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      if (showConfirmPasswordIcon) showConfirmPasswordIcon.style.display = 'none';
      if (hideConfirmPasswordIcon) hideConfirmPasswordIcon.style.display = 'inline';
    } else {
      confirmPasswordInput.type = 'password';
      if (showConfirmPasswordIcon) showConfirmPasswordIcon.style.display = 'inline';
      if (hideConfirmPasswordIcon) hideConfirmPasswordIcon.style.display = 'none';
    }
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const user: User = this.loginForm.value;

    this.authService.login(user).then(() => {
      this.router.navigate(['/dashboard']);
      this.toast.success({
        detail: "Sucesso!",
        summary: "Seja Bem-Vindo(a).",
        duration: 5000,
        position:'topCenter'
      });
    }).catch((e: any) => {
      this.loginError = 'Falha ao fazer login. Verifique suas credenciais.';
      this.toast.error({
        detail: "Erro!",
        summary: "Falha ao fazer login. Verifique suas credenciais.",
        duration: 5000,
        position:'topCenter'
      });
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = this.registerForm.value;

    this.authService.register(newUser.email, newUser.senha).then((res) => {
      this.registerForm.reset();
      this.toast.success({
        detail: "Sucesso!",
        summary: "Cadastro Efetuado com Sucesso.",
        duration: 5000,
        position:'topCenter'
      });
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }).catch((error) => {
      this.registerError = 'Falha ao fazer cadastro. Verifique suas credenciais.';
      this.toast.error({
        detail: "Erro!",
        summary: "Falha ao fazer cadastro. Verifique suas credenciais.",
        duration: 5000,
        position:'topCenter'
      });
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('senha');
    const confirmPassword = form.get('confirmarSenha');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value !== confirmPassword.value ? { 'noMatch': true } : null;
  }

  validatePasswordConfirmation() {
    const confirmarSenhaControl = this.registerForm.get('confirmarSenha');
    if (!confirmarSenhaControl) {
      return;
    }

    this.confirmarSenhaInvalid = this.registerForm.hasError('noMatch') && confirmarSenhaControl.touched;
  }
}
