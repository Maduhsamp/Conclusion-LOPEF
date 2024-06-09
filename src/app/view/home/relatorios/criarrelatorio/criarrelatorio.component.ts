import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Relatorio } from 'src/app/model/interfaces/relatorio';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-criarrelatorio',
  templateUrl: './criarrelatorio.component.html',
  styleUrls: ['./criarrelatorio.component.css']
})
export class CriarrelatorioComponent implements OnInit {
  itemForm: FormGroup;
  user : any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private authService : AuthService,
    private toast: NgToastService
  ) {
    this.itemForm = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      condicoesRelevo: new FormControl('', Validators.required),
      incrementoMedioAnual: new FormControl('', Validators.required),
      idadeCorte: new FormControl('', Validators.required),
      areaTotalEfetivoPlantio: new FormControl('', Validators.required),
      areaTalhoes: new FormControl('', Validators.required),
      volumeMadeiraTalhoes: new FormControl('', Validators.required),
      lucroMedioMadeiraPe: new FormControl('', Validators.required),
      precoTerraUtil: new FormControl('', Validators.required),
      taxaJuros: new FormControl('', Validators.required),
      tipoSistemaColheita: new FormControl('', Validators.required),
      tipoMaquinaEquipamento: new FormControl('', Validators.required),
      equacaoProdutividade: new FormControl('', Validators.required),
      metaEficienciaOperacional: new FormControl('', Validators.required),
      custoOperacionalHorario: new FormControl('', Validators.required),
      distanciaMediaBaldeio: new FormControl('', Validators.required),
      programacaoTrabalho: new FormControl('', Validators.required),
      metaProducaoModulo: new FormControl('', Validators.required),
      extensaoEstradas: new FormControl('', Validators.required),
      larguraMediaEstradas: new FormControl('', Validators.required),
      custoConstrucaoEstradas: new FormControl('', Validators.required),
      custoManutencaoEstradas: new FormControl('', Validators.required),
      orcamentoConstrucaoEstradas: new FormControl('', Validators.required),
      taxaDepreciacao: new FormControl('', Validators.required),
    });
    this.user = this.authService.getUsuarioLogado();
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      condicoesRelevo: ['', Validators.required],
      incrementoMedioAnual: ['', Validators.required],
      idadeCorte: ['', Validators.required],
      areaTotalEfetivoPlantio: ['', Validators.required],
      areaTalhoes: ['', Validators.required],
      volumeMadeiraTalhoes: ['', Validators.required],
      lucroMedioMadeiraPe: ['', Validators.required],
      precoTerraUtil: ['', Validators.required],
      taxaJuros: ['', Validators.required],
      tipoSistemaColheita: ['', Validators.required],
      tipoMaquinaEquipamento: ['', Validators.required],
      equacaoProdutividade: ['', Validators.required],
      metaEficienciaOperacional: ['', Validators.required],
      custoOperacionalHorario: ['', Validators.required],
      distanciaMediaBaldeio: ['', Validators.required],
      programacaoTrabalho: ['', Validators.required],
      metaProducaoModulo: ['', Validators.required],
      extensaoEstradas: ['', Validators.required],
      larguraMediaEstradas: ['', Validators.required],
      custoConstrucaoEstradas: ['', Validators.required],
      custoManutencaoEstradas: ['', Validators.required],
      taxaDepreciacao: ['', Validators.required],
    });
  }

  cadastro() {
    if (this.itemForm.valid) {
      const {
        titulo,
        condicoesRelevo,
        incrementoMedioAnual,
        idadeCorte,
        areaTotalEfetivoPlantio,
        areaTalhoes,
        volumeMadeiraTalhoes,
        lucroMedioMadeiraPe,
        precoTerraUtil,
        taxaJuros,
        tipoSistemaColheita,
        tipoMaquinaEquipamento,
        equacaoProdutividade,
        metaEficienciaOperacional,
        custoOperacionalHorario,
        distanciaMediaBaldeio,
        programacaoTrabalho,
        metaProducaoModulo,
        extensaoEstradas,
        larguraMediaEstradas,
        custoConstrucaoEstradas,
        custoManutencaoEstradas,
        taxaDepreciacao,
      } = this.itemForm.value;

      const create: Relatorio = new Relatorio(
        titulo,
        condicoesRelevo,
        incrementoMedioAnual,
        idadeCorte,
        areaTotalEfetivoPlantio,
        areaTalhoes,
        volumeMadeiraTalhoes,
        lucroMedioMadeiraPe,
        precoTerraUtil,
        taxaJuros,
        tipoSistemaColheita,
        tipoMaquinaEquipamento,
        equacaoProdutividade,
        metaEficienciaOperacional,
        custoOperacionalHorario,
        distanciaMediaBaldeio,
        programacaoTrabalho,
        metaProducaoModulo,
        extensaoEstradas,
        larguraMediaEstradas,
        custoConstrucaoEstradas,
        custoManutencaoEstradas,
        taxaDepreciacao,
      );
      create.uid = this.user.uid;

      this.firebase.cadastrar(create)
        .then(() => {
          this.router.navigate(['/relatorios']);
          this.toast.success({
            detail: "Sucesso!",
            summary: "Relatório cadastrado com sucesso.",
            duration: 5000,
            position:'topCenter'
          });
        })
        .catch((error) => {
          console.error('Erro ao registrar item:', error);
          this.toast.error({
            detail: "Erro!",
            summary: "Falha ao cadastrar o relatório. Tente novamente.",
            duration: 5000,
            position:'topCenter'
          });
        });
    } else {
      console.error('Formulário não é válido');
      this.toast.warning({
        detail: "Atenção",
        summary: "Formulário inválido. Por favor, corrija os erros e tente novamente.",
        duration: 5000,
        position:'topCenter'
      });
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.itemForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
