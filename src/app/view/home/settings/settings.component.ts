import { Component, OnInit } from '@angular/core';

interface Settings {
  username: string;
  email: string;
  notifications: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
    username: '',
    email: '',
    notifications: false
  };

  constructor() { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    // Simulando carregamento das configurações salvas
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  onSubmit(): void {
    // Salvando as configurações
    localStorage.setItem('settings', JSON.stringify(this.settings));
    alert('Configurações salvas com sucesso!');
  }
}
