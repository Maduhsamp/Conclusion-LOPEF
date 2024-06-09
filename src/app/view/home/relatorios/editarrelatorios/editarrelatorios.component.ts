import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Relatorio } from 'src/app/model/interfaces/relatorio';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editarrelatorios',
  templateUrl: './editarrelatorios.component.html',
  styleUrls: ['./editarrelatorios.component.css']
})
export class EditarrelatoriosComponent {
  editar!: FormGroup;
  relatorio!: Relatorio;
  user: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private auth: AuthService,
    private toast: NgToastService
  ){
    this.user = this.auth.getUsuarioLogado();
  }

  ngOnInit() {
    this.relatorio = history.state.relatorio;
    console.log('Informações do relatorio:', this.relatorio);

    this.editar = this.formBuilder.group({
      titulo: [this.relatorio?.titulo, [Validators.required]],
      condicoesRelevo: [this.relatorio?.condicoesRelevo, [Validators.required]],
      incrementoMedioAnual: [this.relatorio?.incrementoMedioAnual, [Validators.required]],
      idadeCorte: [this.relatorio?.idadeCorte, [Validators.required]],
      areaTotalEfetivoPlantio: [this.relatorio?.areaTotalEfetivoPlantio, [Validators.required]],
      areaTalhoes: [this.relatorio?.areaTalhoes, [Validators.required]],
      volumeMadeiraTalhoes: [this.relatorio?.volumeMadeiraTalhoes, [Validators.required]],
      lucroMedioMadeiraPe: [this.relatorio?.lucroMedioMadeiraPe, [Validators.required]],
      precoTerraUtil: [this.relatorio?.precoTerraUtil, [Validators.required]],
      taxaJuros: [this.relatorio?.taxaJuros, [Validators.required]],
      tipoSistemaColheita: [this.relatorio?.tipoSistemaColheita, [Validators.required]],
      tipoMaquinaEquipamento: [this.relatorio?.tipoMaquinaEquipamento, [Validators.required]],
      equacaoProdutividade: [this.relatorio?.equacaoProdutividade, [Validators.required]],
      metaEficienciaOperacional: [this.relatorio?.metaEficienciaOperacional, [Validators.required]],
      custoOperacionalHorario: [this.relatorio?.custoOperacionalHorario, [Validators.required]],
      distanciaMediaBaldeio: [this.relatorio?.distanciaMediaBaldeio, [Validators.required]],
      programacaoTrabalho: [this.relatorio?.programacaoTrabalho, [Validators.required]],
      metaProducaoModulo: [this.relatorio?.metaProducaoModulo, [Validators.required]],
      extensaoEstradas: [this.relatorio?.extensaoEstradas, [Validators.required]],
      larguraMediaEstradas: [this.relatorio?.larguraMediaEstradas, [Validators.required]],
      custoConstrucaoEstradas: [this.relatorio?.custoConstrucaoEstradas, [Validators.required]],
      custoManutencaoEstradas: [this.relatorio?.custoManutencaoEstradas, [Validators.required]],
      taxaDepreciacao: [this.relatorio?.taxaDepreciacao, [Validators.required]],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: Relatorio = {
            ...this.editar.value,
            id: this.relatorio.id,
            uid: this.user.uid,
        };

        const navigateAndToastSuccess = () => {
            this.router.navigate(['/relatorios']);
            this.toast.success({
                detail: "Sucesso!",
                summary: "Item editado com sucesso.",
                duration: 5000,
                position:'topCenter'
            });
        };

        const handleEditError = (error: any) => {
            this.toast.error({
                detail: "Erro!",
                summary: "Falha ao editar o item. Tente novamente.",
                duration: 5000,
                position:'topCenter'
            });
        };

        this.firebase.editar(new_part, this.relatorio.id)
            .then(navigateAndToastSuccess)
            .catch(handleEditError);

    } else {
        this.toast.warning({
            detail: "Atenção",
            summary: "Formulário inválido. Por favor, corrija os erros e tente novamente.",
            duration: 5000,
            position:'topCenter'
        });
    }
}


delete() {
  const confirmDelete = window.confirm('Tem certeza de que deseja excluir este relatório?');
  if (confirmDelete) {
      this.firebase.excluir(this.relatorio.id)
          .then(() => {
              this.router.navigate(['/relatorios']);
              this.toast.success({
                  detail: "Sucesso!",
                  summary: "Relatório excluído com sucesso.",
                  duration: 5000,
                  position:'topCenter'
              });
          })
          .catch((error) => {
              console.error('Erro ao deletar relatório:', error);
              this.toast.error({
                  detail: "Erro!",
                  summary: "Falha ao excluir o relatório. Tente novamente.",
                  duration: 5000,
                  position:'topCenter'
              });
          });
    }
  }



  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
