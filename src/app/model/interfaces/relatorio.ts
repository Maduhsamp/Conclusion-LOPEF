export class Relatorio {
    private _uid! : string;
    private _id!: string;
    private _titulo!: string;

    // Propriedades relacionadas ao povoamento, produção e área florestal
    private _condicoesRelevo!: string;
    private _incrementoMedioAnual!: number;
    private _idadeCorte!: number;
    private _areaTotalEfetivoPlantio!: number;
    private _areaTalhoes!: number;
    private _volumeMadeiraTalhoes!: number;
    private _lucroMedioMadeiraPe!: number;
    private _precoTerraUtil!: number;
    private _taxaJuros!: number;

    // Propriedades relacionadas às operações de colheita florestal
    private _tipoSistemaColheita!: string;
    private _tipoMaquinaEquipamento!: string;
    private _equacaoProdutividade!: string;
    private _metaEficienciaOperacional!: number;
    private _custoOperacionalHorario!: number;
    private _distanciaMediaBaldeio!: number;
    private _programacaoTrabalho!: string;
    private _metaProducaoModulo!: number;

    // Propriedades relacionadas às estradas florestais e seus custos
    private _extensaoEstradas!: number;
    private _larguraMediaEstradas!: number;
    private _custoConstrucaoEstradas!: number;
    private _custoManutencaoEstradas!: number;
    private _taxaDepreciacao!: number;

    constructor(
        titulo: string,
        condicoesRelevo: string,
        incrementoMedioAnual: number,
        idadeCorte: number,
        areaTotalEfetivoPlantio: number,
        areaTalhoes: number,
        volumeMadeiraTalhoes: number,
        lucroMedioMadeiraPe: number,
        precoTerraUtil: number,
        taxaJuros: number,
        tipoSistemaColheita: string,
        tipoMaquinaEquipamento: string,
        equacaoProdutividade: string,
        metaEficienciaOperacional: number,
        custoOperacionalHorario: number,
        distanciaMediaBaldeio: number,
        programacaoTrabalho: string,
        metaProducaoModulo: number,
        extensaoEstradas: number,
        larguraMediaEstradas: number,
        custoConstrucaoEstradas: number,
        custoManutencaoEstradas: number,
        //orcamentoConstrucaoEstradas: number,
        taxaDepreciacao: number,
    ) {
        this._titulo = titulo;
        this._condicoesRelevo = condicoesRelevo;
        this._incrementoMedioAnual = incrementoMedioAnual;
        this._idadeCorte = idadeCorte;
        this._areaTotalEfetivoPlantio = areaTotalEfetivoPlantio;
        this._areaTalhoes = areaTalhoes;
        this._volumeMadeiraTalhoes = volumeMadeiraTalhoes;
        this._lucroMedioMadeiraPe = lucroMedioMadeiraPe;
        this._precoTerraUtil = precoTerraUtil;
        this._taxaJuros = taxaJuros;
        this._tipoSistemaColheita = tipoSistemaColheita;
        this._tipoMaquinaEquipamento = tipoMaquinaEquipamento;
        this._equacaoProdutividade = equacaoProdutividade;
        this._metaEficienciaOperacional = metaEficienciaOperacional;
        this._custoOperacionalHorario = custoOperacionalHorario;
        this._distanciaMediaBaldeio = distanciaMediaBaldeio;
        this._programacaoTrabalho = programacaoTrabalho;
        this._metaProducaoModulo = metaProducaoModulo;
        this._extensaoEstradas = extensaoEstradas;
        this._larguraMediaEstradas = larguraMediaEstradas;
        this._custoConstrucaoEstradas = custoConstrucaoEstradas;
        this._custoManutencaoEstradas = custoManutencaoEstradas;
        //this._orcamentoConstrucaoEstradas = orcamentoConstrucaoEstradas;
        this._taxaDepreciacao = taxaDepreciacao;
    }

    // Getters e Setters
    public get uid(): string {
        return this._uid;
    }
    
    public set uid(value: string) {
        this._uid = value;
    }
    
    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public set titulo(value: string) {
        this._titulo = value;
    }

    public get condicoesRelevo(): string {
        return this._condicoesRelevo;
    }

    public set condicoesRelevo(value: string) {
        this._condicoesRelevo = value;
    }

    public get incrementoMedioAnual(): number {
        return this._incrementoMedioAnual;
    }

    public set incrementoMedioAnual(value: number) {
        this._incrementoMedioAnual = value;
    }

    public get idadeCorte(): number {
        return this._idadeCorte;
    }

    public set idadeCorte(value: number) {
        this._idadeCorte = value;
    }

    public get areaTotalEfetivoPlantio(): number {
        return this._areaTotalEfetivoPlantio;
    }

    public set areaTotalEfetivoPlantio(value: number) {
        this._areaTotalEfetivoPlantio = value;
    }

    public get areaTalhoes(): number {
        return this._areaTalhoes;
    }

    public set areaTalhoes(value: number) {
        this._areaTalhoes = value;
    }

    public get volumeMadeiraTalhoes(): number {
        return this._volumeMadeiraTalhoes;
    }

    public set volumeMadeiraTalhoes(value: number) {
        this._volumeMadeiraTalhoes = value;
    }

    public get lucroMedioMadeiraPe(): number {
        return this._lucroMedioMadeiraPe;
    }

    public set lucroMedioMadeiraPe(value: number) {
        this._lucroMedioMadeiraPe = value;
    }

    public get precoTerraUtil(): number {
        return this._precoTerraUtil;
    }

    public set precoTerraUtil(value: number) {
        this._precoTerraUtil = value;
    }

    public get taxaJuros(): number {
        return this._taxaJuros;
    }

    public set taxaJuros(value: number) {
        this._taxaJuros = value;
    }

    public get tipoSistemaColheita(): string {
        return this._tipoSistemaColheita;
    }

    public set tipoSistemaColheita(value: string) {
        this._tipoSistemaColheita = value;
    }

    public get tipoMaquinaEquipamento(): string {
        return this._tipoMaquinaEquipamento;
    }

    public set tipoMaquinaEquipamento(value: string) {
        this._tipoMaquinaEquipamento = value;
    }

    public get equacaoProdutividade(): string {
        return this._equacaoProdutividade;
    }

    public set equacaoProdutividade(value: string) {
        this._equacaoProdutividade = value;
    }

    public get metaEficienciaOperacional(): number {
        return this._metaEficienciaOperacional;
    }

    public set metaEficienciaOperacional(value: number) {
        this._metaEficienciaOperacional = value;
    }

    public get custoOperacionalHorario(): number {
        return this._custoOperacionalHorario;
    }

    public set custoOperacionalHorario(value: number) {
        this._custoOperacionalHorario = value;
    }

    public get distanciaMediaBaldeio(): number {
        return this._distanciaMediaBaldeio;
    }

    public set distanciaMediaBaldeio(value: number) {
        this._distanciaMediaBaldeio = value;
    }

    public get programacaoTrabalho(): string {
        return this._programacaoTrabalho;
    }

    public set programacaoTrabalho(value: string) {
        this._programacaoTrabalho = value;
    }

    public get metaProducaoModulo(): number {
        return this._metaProducaoModulo;
    }

    public set metaProducaoModulo(value: number) {
        this._metaProducaoModulo = value;
    }

    public get extensaoEstradas(): number {
        return this._extensaoEstradas;
    }

    public set extensaoEstradas(value: number) {
        this._extensaoEstradas = value;
    }

    public get larguraMediaEstradas(): number {
        return this._larguraMediaEstradas;
    }

    public set larguraMediaEstradas(value: number) {
        this._larguraMediaEstradas = value;
    }

    public get custoConstrucaoEstradas(): number {
        return this._custoConstrucaoEstradas;
    }

    public set custoConstrucaoEstradas(value: number) {
        this._custoConstrucaoEstradas = value;
    }

    public get custoManutencaoEstradas(): number {
        return this._custoManutencaoEstradas;
    }

    public set custoManutencaoEstradas(value: number) {
        this._custoManutencaoEstradas = value;
    }

    public get taxaDepreciacao(): number {
        return this._taxaDepreciacao;
    }

    public set taxaDepreciacao(value: number) {
        this._taxaDepreciacao = value;
    }
}
