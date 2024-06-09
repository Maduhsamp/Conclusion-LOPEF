import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  title = 'LOPEF';

  constructor(private auth: AuthService,
    private titleService: Title){

      this.setDocTitle(this.title)
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }

}
