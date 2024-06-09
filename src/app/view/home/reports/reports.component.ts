import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Relatorio } from 'src/app/model/interfaces/relatorio';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  public relatorios: Relatorio[] = [];
  public relatoriosToShow: Relatorio[] = [];
  searchTerm: string = '';

  title = 'LOPEF | Relatórios';

  constructor(private router: Router,
    private firebase: FirebaseService,
    private titleService: Title) {
    this.firebase.obterTodos().subscribe((res) => {
      this.relatorios = res.map((comando) => {
        return {
          id: comando.payload.doc.id,
          ...(comando.payload.doc.data() as any),
        } as Relatorio;
      });
      this.relatoriosToShow = this.relatorios;
    });

    this.setDocTitle(this.title)
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
 }

  search(e: Event):void{
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.relatoriosToShow = this.relatorios.filter(comando => {
      return comando.titulo.toLowerCase().includes(value);
    })
  }

  addReport() {
    this.router.navigate(["/criarrelatorio"]);
  }

  editar(relatorio: Relatorio) {
    console.log('Item clicado:', relatorio);
    this.router.navigateByUrl("/editarrelatorio", { state: { relatorio: relatorio } });
  }

  gerarPDF(relatorio: Relatorio) {
    const doc = new jsPDF('l', 'mm', 'a4');
    let posY = 10;

    doc.setFontSize(16);
    doc.text(relatorio.titulo, 10, posY);
    posY += 10;

    const fields = [
      { label: 'Condições de relevo', value: relatorio.condicoesRelevo },
      { label: 'Taxa de Depreciação (%)', value: relatorio.taxaDepreciacao },
      { label: 'Incremento Médio Anual (m3/ha/ano)', value: relatorio.incrementoMedioAnual },
      { label: 'Idade de Corte (anos)', value: relatorio.idadeCorte },
      { label: 'Área total de efetivo plantio (ha)', value: relatorio.areaTotalEfetivoPlantio },
      { label: 'Área dos talhões (ha)', value: relatorio.areaTalhoes },
      { label: 'Volume de madeira dos talhões (m3/talhão)', value: relatorio.volumeMadeiraTalhoes },
      { label: 'Lucro médio (R$/m3)', value: relatorio.lucroMedioMadeiraPe },
      { label: 'Preço da terra útil (R$/ha)', value: relatorio.precoTerraUtil },
      { label: 'Taxa de juros (% a.a.)', value: relatorio.taxaJuros },
      { label: 'Tipo de sistema de colheita', value: relatorio.tipoSistemaColheita },
      { label: 'Tipo de máquina e equipamento', value: relatorio.tipoMaquinaEquipamento },
      { label: 'Equação de produtividade', value: relatorio.equacaoProdutividade },
      { label: 'Meta de eficiência operacional (%)', value: relatorio.metaEficienciaOperacional },
      { label: 'Custo operacional horário (R$/h)', value: relatorio.custoOperacionalHorario },
      { label: 'Distância média de baldeio (m)', value: relatorio.distanciaMediaBaldeio },
      { label: 'Programação de trabalho', value: relatorio.programacaoTrabalho },
      { label: 'Meta de produção do módulo (m3/mês)', value: relatorio.metaProducaoModulo },
      { label: 'Extensão das estradas (m)', value: relatorio.extensaoEstradas },
      { label: 'Largura média das estradas (m)', value: relatorio.larguraMediaEstradas },
      { label: 'Custo de construção de estradas (R$/m)', value: relatorio.custoConstrucaoEstradas },
      { label: 'Custo de manutenção de estradas (R$/m)', value: relatorio.custoManutencaoEstradas },
    ];

    // Preparar dados para a tabela
    const tableData = fields.map(field => [field.label, field.value]);

    // Criador da tabela
    autoTable(doc, {
      head: [['Campo', 'Valor']],
      body: tableData,
      startY: posY,
      theme: 'grid'
    });

    // Adicionar uma quebra de página
    doc.addPage();

    // Título para a seção de cálculos
    posY = 10; // Reinicia a posição Y na nova página
    doc.setFontSize(16);
    doc.text("Cálculos", 10, posY);
    posY += 10;

    // Cálculos adicionais
    const distanciaMediaBaldeio = relatorio.distanciaMediaBaldeio; // DMB em metros
    const densidadeEstradas = relatorio.extensaoEstradas / relatorio.areaTotalEfetivoPlantio; // DE em metros linear/ha
    const coeficienteEficienciaViaria = (distanciaMediaBaldeio * densidadeEstradas) / 1000; // a

    // Densidade de estradas projetada (DE projetada)
    const densidadeEstradasProjetada = relatorio.extensaoEstradas / relatorio.areaTotalEfetivoPlantio; // DE projetada em metros linear/ha

    // Distância Média de Baldeio projetada (DMB projetada)
    const distanciaMediaBaldeioProjetada = coeficienteEficienciaViaria / densidadeEstradasProjetada; // DMB projetada em metros

    // Cálculo do custo de depreciação de estradas (DP)
    const DP = (relatorio.custoConstrucaoEstradas * relatorio.taxaDepreciacao) / relatorio.volumeMadeiraTalhoes;

    // Cálculo do custo de oportunidade do capital com estradas (Coc)
    const Coc = DP * (relatorio.taxaJuros / 100);

    // Cálculo do custo unitário de construção de estradas (CC)
    const CC = DP + Coc;

    // Cálculo do custo unitário de baldeio (Cbal)
    const Cbal = relatorio.custoOperacionalHorario / distanciaMediaBaldeio;

    // Cálculo do custo unitário total (CT)
    const CMan = relatorio.custoManutencaoEstradas; // Custo unitário de manutenção de estradas
    const CPAP = relatorio.precoTerraUtil; // Custo unitário de perda de área produtiva
    const CT = Cbal + CC + CMan + CPAP;

    //Cálculo custo unitário de perda de área produtiva (R$/m3)
    const CPAPc = CT / relatorio.volumeMadeiraTalhoes;

    const calculations = [
      ['Coeficiente de Eficiência Viária (a)', coeficienteEficienciaViaria.toFixed(2)],
      ['Distância Média de Baldeio projetada (DMB projetada)', `${distanciaMediaBaldeioProjetada.toFixed(2)} m`],
      ['Custo de Depreciação de Estradas (DP)', `R$ ${DP.toFixed(2)} por m3`],
      ['Custo de Oportunidade do Capital (Coc)', `R$ ${Coc.toFixed(2)} por m3`],
      ['Custo Unitário de Construção de Estradas (CC)', `R$ ${CC.toFixed(2)} por m3`],
      ['Custo Unitário de Baldeio (Cbal)', `R$ ${Cbal.toFixed(2)} por m3`],
      ['Custo Unitário Total (CT)', `R$ ${CT.toFixed(2)} por m3`],
      ['Custo Manutenção de Estradas Florestais (CMan)', `R$ ${CMan.toFixed(2)}`],
      ['Custo unitário de perda de área produtiva (R$/m3)', `R$ ${CPAPc.toFixed(2)} por m3`]
    ];

    // Criador da tabela
    autoTable(doc, {
      head: [['Cálculo', 'Valor']],
      body: calculations,
      startY: posY,
      theme: 'grid'
    });

    // Data e Hora
     const now = new Date();
     const formattedDate = now.toLocaleDateString();
     const formattedTime = now.toLocaleTimeString();
     const dateTimeString = `Relatório gerado em: ${formattedDate} às ${formattedTime}`;

     doc.setFontSize(10);
     doc.text(dateTimeString, 10, doc.internal.pageSize.height - 10);

    // Salva o PDF
    doc.save(`${relatorio.titulo}.pdf`);
  }
}
