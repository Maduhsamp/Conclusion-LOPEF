import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  contactForm!: FormGroup;
  title = 'LOPEF | Relate Bugs';

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private titleService: Title,
    private toast: NgToastService
  ) {
    this.setDocTitle(this.title);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const userEmail = this.authService.getUserEmail();

    this.contactForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: [userEmail, [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required]],
      titulo: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.contactForm.valid) {
      const dados = {
        ...this.contactForm.value,
        timestamp: new Date(),
      };

      this.firestore.collection('mensagens').add(dados)
        .then(() => {
          console.log('Mensagem enviado com sucesso!');
          this.contactForm.reset();
          this.toast.success({
            detail: "Sucesso!",
            summary: "Mensagem enviada com sucesso",
            duration: 5000,
            position: 'topCenter'
          });
        })
        .catch((error) => {
          console.error('Erro ao enviar o Mensagem:', error);
          this.toast.error({
            detail: "Erro!",
            summary: "Falha ao enviar o Mensagem. Tente novamente mais tarde.",
            duration: 5000,
            position: 'topCenter'
          });
        });
    } else {
      this.toast.error({
        detail: "Erro!",
        summary: "Preencha todos os campos obrigatórios",
        duration: 5000,
        position: 'topCenter'
      });
    }
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  isInvalidControl(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
