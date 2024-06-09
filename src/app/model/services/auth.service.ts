import { Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private auth: Auth,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  loginPath(): boolean {
    return this.router.url === '/';
  }

  login({email, senha}: User) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

  register(email: string, senha: string) {
    return createUserWithEmailAndPassword(this.auth, email, senha);
  }

  deslogar() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  public getUsuarioLogado(){
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    return (user !== null) ? user : null;
   }

   public getUserEmail(): string {
    const user = this.getUsuarioLogado();
    return user ? user.email : '';
  }
  
}
