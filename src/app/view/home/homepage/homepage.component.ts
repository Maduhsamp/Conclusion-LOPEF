import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  title = 'LOPEF';
  showEmail: boolean = false;

  constructor(private auth: AuthService,
    private toast: NgToastService,
    private titleService: Title){

      this.setDocTitle(this.title)
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }

  ngAfterViewInit(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null;
    const toggleBtn = document.querySelector('.toggle-btn') as HTMLElement | null;
    const listItems = document.querySelectorAll('.list-item');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }

    listItems.forEach(item => {
      item.addEventListener('click', () => {

        listItems.forEach(li => {
          li.classList.remove('active');
        });

        item.classList.add('active');
      });
    });


    const currentPageUrl = window.location.href;
    listItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === currentPageUrl) {
        item.classList.add('active');
      }
    });
  }

  deslogar() {
    const confirmLogout = window.confirm('Tem certeza que deseja sair?');
    if (confirmLogout) {
      this.auth.deslogar().then(() => {
        this.toast.success({
          detail: "Deslogado",
          summary: "Você saiu da sua conta com sucesso.",
          duration: 5000,
          position:'topCenter'
        });
      }).catch((error) => {
        this.toast.error({
          detail: "Erro",
          summary: "Falha ao sair da conta. Tente novamente.",
          duration: 5000,
          position:'topCenter'
        });
      });
    }
  }

  toggleEmail() {
    this.showEmail = !this.showEmail;
  }  

  isLogin(): boolean {
    return this.auth.loginPath();
  }
}
