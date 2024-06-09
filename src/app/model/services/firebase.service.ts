import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Relatorio } from '../interfaces/relatorio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: any;
  private PATH : string = "Relatorios";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private authService : AuthService) {
      this.user = this.authService.getUsuarioLogado();
    }

    //relarotios 

    obterTodos(){
      return this.firestore.collection(this.PATH, ref => ref.where('uid', '==', this.user.uid)).snapshotChanges();
    }

    cadastrar(relatorio: Relatorio) {
      return this.firestore.collection(this.PATH).add({
        titulo: relatorio.titulo,
        condicoesRelevo: relatorio.condicoesRelevo,
        incrementoMedioAnual: relatorio.incrementoMedioAnual,
        idadeCorte: relatorio.idadeCorte,
        areaTotalEfetivoPlantio: relatorio.areaTotalEfetivoPlantio,
        areaTalhoes: relatorio.areaTalhoes,
        volumeMadeiraTalhoes: relatorio.volumeMadeiraTalhoes,
        lucroMedioMadeiraPe: relatorio.lucroMedioMadeiraPe,
        precoTerraUtil: relatorio.precoTerraUtil,
        taxaJuros: relatorio.taxaJuros,
        tipoSistemaColheita: relatorio.tipoSistemaColheita,
        tipoMaquinaEquipamento: relatorio.tipoMaquinaEquipamento,
        equacaoProdutividade: relatorio.equacaoProdutividade,
        metaEficienciaOperacional: relatorio.metaEficienciaOperacional,
        custoOperacionalHorario: relatorio.custoOperacionalHorario,
        distanciaMediaBaldeio: relatorio.distanciaMediaBaldeio,
        programacaoTrabalho: relatorio.programacaoTrabalho,
        metaProducaoModulo: relatorio.metaProducaoModulo,
        extensaoEstradas: relatorio.extensaoEstradas,
        larguraMediaEstradas: relatorio.larguraMediaEstradas,
        custoConstrucaoEstradas: relatorio.custoConstrucaoEstradas,
        custoManutencaoEstradas: relatorio.custoManutencaoEstradas,
        //orcamentoConstrucaoEstradas: relatorio.orcamentoConstrucaoEstradas,
        taxaDepreciacao: relatorio.taxaDepreciacao,
        uid: relatorio.uid,
      });
    }
    
    editar(relatorio: Relatorio, id: string) {
      return this.firestore.collection(this.PATH).doc(id).update({
        titulo: relatorio.titulo,
        condicoesRelevo: relatorio.condicoesRelevo,
        incrementoMedioAnual: relatorio.incrementoMedioAnual,
        idadeCorte: relatorio.idadeCorte,
        areaTotalEfetivoPlantio: relatorio.areaTotalEfetivoPlantio,
        areaTalhoes: relatorio.areaTalhoes,
        volumeMadeiraTalhoes: relatorio.volumeMadeiraTalhoes,
        lucroMedioMadeiraPe: relatorio.lucroMedioMadeiraPe,
        precoTerraUtil: relatorio.precoTerraUtil,
        taxaJuros: relatorio.taxaJuros,
        tipoSistemaColheita: relatorio.tipoSistemaColheita,
        tipoMaquinaEquipamento: relatorio.tipoMaquinaEquipamento,
        equacaoProdutividade: relatorio.equacaoProdutividade,
        metaEficienciaOperacional: relatorio.metaEficienciaOperacional,
        custoOperacionalHorario: relatorio.custoOperacionalHorario,
        distanciaMediaBaldeio: relatorio.distanciaMediaBaldeio,
        programacaoTrabalho: relatorio.programacaoTrabalho,
        metaProducaoModulo: relatorio.metaProducaoModulo,
        extensaoEstradas: relatorio.extensaoEstradas,
        larguraMediaEstradas: relatorio.larguraMediaEstradas,
        custoConstrucaoEstradas: relatorio.custoConstrucaoEstradas,
        custoManutencaoEstradas: relatorio.custoManutencaoEstradas,
        //orcamentoConstrucaoEstradas: relatorio.orcamentoConstrucaoEstradas,
        taxaDepreciacao: relatorio.taxaDepreciacao,
        uid: relatorio.uid,
      });
    }    

    excluir(id: string) {
      return this.firestore.collection(this.PATH).doc(id).delete();
    } 
}
