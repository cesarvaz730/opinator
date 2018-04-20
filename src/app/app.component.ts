import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CombosService } from './services/combos.service';
import { HomeComponent } from './home/home.component';
import { Ligacoes } from './models/ligacoes.model';
import { LigacoesService } from './services/ligacoes.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    sub: any;
    title = 'app';

    filterForm: FormGroup;
    submitted: boolean;
    events: any[] = [];

    isSelected = true;
    filter = new Ligacoes('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    comboAno: string[] = [];
    comboMes: string[] = [];
    comboSemana: string[] = [];
    comboDia: string[] = [];
    comboRede: any[] = [];
    comboRegional: string[] = [];
    comboAgencia: string[] = [];
    comboPorteAg: string[] = [];
    comboSegmento: string[] = [];
    redeSelected: any;

    isChecked1: boolean = false;
    isChecked2: boolean = false;

    isChecked3: boolean = false;
    isChecked4: boolean = false;
    isChecked5: boolean = false;
    isChecked6: boolean = false;
    isChecked7: boolean = false;

    isChecked8: boolean = false;
    isChecked9: boolean = false;
    isChecked10: boolean = false;
    isChecked11: boolean = false;
    isChecked12: boolean = false;
    isChecked13: boolean = false;
    isChecked14: boolean = false;

    isChecked15: boolean = false;
    isChecked16: boolean = false;
    isChecked17: boolean = false;
    isChecked18: boolean = false;

    loadingVar: boolean = true;
    selectAno: any;

    semana: string = "";
    dia: string = "";
    tipo: string = "";

    public maskChamador = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    public maskHora = [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/];
    public maskDuracao = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    public maskRamal = [/\d/, /\d/, /\d/, /\d/];

    @ViewChild(HomeComponent) homeComponent: HomeComponent;

    constructor(
        private fb: FormBuilder,
        private comboService: CombosService,
        private ligacoesService: LigacoesService
    ) { }

    ngOnInit() {
        this.loadingVar = true;
        this.buildForm();
        //this.getCombos();
        this.loadingVar = true;
        // this.getCombosMOCK();      
    }

    ngAfterViewInit() {
        this.homeComponent.chart1Init(this.filter);
        this.sub = Observable.interval(3000)
        .subscribe((val) => {  this.homeComponent.chart1Init(this.filter); });
        // console.log(this.homeComponent.atendidas)
       // this.homeComponent.chart1Init(this.filter);
        /* this.homeComponent.chart2Init(this.filter);
        this.homeComponent.chart3Init(this.filter);
        this.homeComponent.chart4Init(this.filter); */
        
    }

    subcribeToFormChanges() {
        const filterFormStatusChanges$ = this.filterForm.statusChanges;
        const filterFormValueChanges$ = this.filterForm.valueChanges;
        filterFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        filterFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    buildForm(): void {
        this.filterForm = this.fb.group({
            referencia: [''],
            ano: [''],
            mesNum: [''],
            semanaMes: [''],
            diaSemana: [''],
            rede: [''],
            regional: [''],
            tipo: [''],
            uniorg: [''],
            nome: [''],
            ramal: [''],
            duracao: [''],
            horaLigacao: [''],
            porte: [''],
            numeroEntrada: [''],
            segmento: ['']
        });
    }

    resetForm() {
        this.filter = new Ligacoes('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

        this.homeComponent.chart1Init(this.filter);
        /* this.homeComponent.chart2Init(this.filter);
        this.homeComponent.chart3Init(this.filter);
        this.homeComponent.chart4Init(this.filter); */

        this.filterForm.clearValidators();
        this.filterForm.markAsPristine();
        this.filterForm.markAsUntouched();
        this.submitted = false;
        this.isChecked1 = false;
        this.isChecked2 = false;

        this.isChecked3 = false;
        this.isChecked4 = false;
        this.isChecked5 = false;
        this.isChecked6 = false;
        this.isChecked7 = false;

        this.isChecked8 = false;
        this.isChecked9 = false;
        this.isChecked10 = false;
        this.isChecked11 = false;
        this.isChecked12 = false;
        this.isChecked13 = false;
        this.isChecked14 = false;

        this.isChecked15 = false;
        this.isChecked16 = false;
        this.isChecked17 = false;
        this.isChecked18 = false;

        this.comboRegional = [];
        this.comboAgencia = [];
        this.comboPorteAg = [];

        this.semana = "";
        this.dia = "";
        this.tipo = "";
    }

    onSelectReferencia(referencia: string) {
        if (referencia == "1") {
            this.isChecked1 = !this.isChecked1;
            if (this.isChecked2) {
                this.isChecked2 = false;
            }
            if (this.isChecked1) {
                this.selectAno = this.comboAno[0];
            }

        }
        if (referencia == "2") {
            this.isChecked2 = !this.isChecked2;
            if (this.isChecked1) {
                this.isChecked1 = false;
            }
        }
        // console.log(referencia);
    }

    onSelectSemana(semana: string) {
        this.isChecked3 = semana == "1" ? !this.isChecked3 : this.isChecked3;
        this.isChecked4 = semana == "2" ? !this.isChecked4 : this.isChecked4;
        this.isChecked5 = semana == "3" ? !this.isChecked5 : this.isChecked5;
        this.isChecked6 = semana == "4" ? !this.isChecked6 : this.isChecked6;
        this.isChecked7 = semana == "5" ? !this.isChecked7 : this.isChecked7;
        this.semana = this.getSemana();
        // console.log(semana);
    }
    getSemana() {
        return (this.isChecked3 ? "1," : "") +
            (this.isChecked4 ? "2," : "") +
            (this.isChecked5 ? "3," : "") +
            (this.isChecked6 ? "4," : "") +
            (this.isChecked7 ? "5," : "");
    }
    onSelectDia(dia: string) {

        this.isChecked8 = dia == "2" ? !this.isChecked8 : this.isChecked8;
        this.isChecked9 = dia == "3" ? !this.isChecked9 : this.isChecked9;
        this.isChecked10 = dia == "4" ? !this.isChecked10 : this.isChecked10;
        this.isChecked11 = dia == "5" ? !this.isChecked11 : this.isChecked11;
        this.isChecked12 = dia == "6" ? !this.isChecked12 : this.isChecked12;
        this.isChecked13 = dia == "7" ? !this.isChecked13 : this.isChecked13;
        this.isChecked14 = dia == "8" ? !this.isChecked14 : this.isChecked14;

        this.dia = this.getDia();
    }
    getDia() {
        return (this.isChecked8 ? "Segunda-Feira," : "") +
            (this.isChecked9 ? "Terça-Feira," : "") +
            (this.isChecked10 ? "Quarta-Feira," : "") +
            (this.isChecked11 ? "Quinta-Feira," : "") +
            (this.isChecked12 ? "Sexta-Feira," : "") +
            (this.isChecked13 ? "Sábado," : "") +
            (this.isChecked14 ? "Domingo," : "");
    }
    onSelectTipo(tipo: string) {
        this.isChecked15 = tipo == "1" ? !this.isChecked15 : this.isChecked15;
        this.isChecked16 = tipo == "2" ? !this.isChecked16 : this.isChecked16;
        this.isChecked17 = tipo == "3" ? !this.isChecked17 : this.isChecked17;
        this.isChecked18 = tipo == "4" ? !this.isChecked18 : this.isChecked18;

        this.tipo = this.getTipo();
        // console.log(tipo);
    }

    getTipo() {
        return (this.isChecked15 ? "Atendida," : "") +
            (this.isChecked16 ? "NÃ£o atendida," : "") +
            (this.isChecked17 ? "Transferidas PF," : "") +
            (this.isChecked18 ? "Transferidas PJ," : "");
    }
    selectRede(rede: string) {
        console.log(rede);
        this.comboRegional = [];
        this.comboAgencia = [];
        this.comboPorteAg = [];
        this.comboService.getRegional(rede)
            .subscribe(
                data => this.comboRegional = data,
                err => {
                    console.log(err)
                },
                () => {
                    console.log(this.comboRegional)
                }
            );
    }

    selectRegional(regional: string) {
        console.log(regional);
        this.comboAgencia = [];
        this.comboPorteAg = [];
        this.comboService.getAgencia(regional)
            .subscribe(
                data => this.comboAgencia = data,
                err => {
                    console.log(err)
                }
            );
    }

    selectAgencia(uniorg: string) {
        console.log(uniorg);
        this.comboPorteAg = [];
        this.comboService.getPorteAg(uniorg)
            .subscribe(
                data => this.comboPorteAg = data,
                err => {
                    console.log(err)
                }
            );
    }

    submitFilter() {
        console.log(this.filterForm.value);
        this.filter = this.filterForm.value;
        this.filter.semanaMes = this.semana;
        this.filter.diaSemana = this.dia;
        this.filter.tipo = this.tipo;
        this.filter.mesNum = this.isChecked1 ? "" : this.filter.mesNum;

        this.validateFilter();

        this.homeComponent.chart1Init(this.filter);
        /* this.homeComponent.chart2Init(this.filter);
        this.homeComponent.chart3Init(this.filter);
        this.homeComponent.chart4Init(this.filter); */
    }

    validateFilter() {
        this.filter.referencia = this.filter.referencia == null ? "" : this.filter.referencia;
        this.filter.ano = this.filter.ano == null ? "" : this.filter.ano;
        this.filter.mesNum = this.filter.mesNum == null ? "" : this.filter.mesNum;
        this.filter.semanaMes = this.filter.semanaMes == null ? "" : this.filter.semanaMes;
        this.filter.diaSemana = this.filter.diaSemana == null ? "" : this.filter.diaSemana;
        this.filter.rede = this.filter.rede == null ? "" : this.filter.rede;
        this.filter.regional = this.filter.regional == null ? "" : this.filter.regional;
        this.filter.tipo = this.filter.tipo == null ? "" : this.filter.tipo;
        this.filter.uniorg = this.filter.uniorg == null ? "" : this.filter.uniorg;
        this.filter.nome = this.filter.nome == null ? "" : this.filter.nome;
        this.filter.ramal = this.filter.ramal == null ? "" : this.filter.ramal;
        this.filter.duracao = this.filter.duracao == null ? "" : this.filter.duracao;
        this.filter.horaLigacao = this.filter.horaLigacao == null ? "" : this.filter.horaLigacao;
        this.filter.porte = this.filter.porte == null ? "" : this.filter.porte;
        this.filter.numeroEntrada = this.filter.numeroEntrada == null ? "" : this.filter.numeroEntrada;
        this.filter.segmento = this.filter.segmento == null ? "" : this.filter.segmento;
    }

    getCombosMOCK() {
        // this.comboPeriodo = ["periodo1", "periodo2", "periodo3",]
        // this.comboRede = ["rede1", "rede2", "rede3",]
        // this.comboRegional = ["regional1", "regional2", "regional3",]
        // this.comboAgencia = ["agencia1", "agencia2", "agencia3",]
        // this.comboPorteAg = ["porte1", "porte2", "porte3",]
        // this.comboSegmento = ["segmento1", "segmento2", "segmento3",]
    }

    getCombos() {
        this.comboService.getAno()
            .subscribe(
                data => this.comboAno = data,
                err => {
                    console.log(err)
                }
            );

        this.comboService.getMes()
            .subscribe(
                data => this.comboMes = data,
                err => {
                    console.log(err)
                }
            );

        this.comboService.getSemana()
            .subscribe(
                data => this.comboSemana = data,
                err => {
                    console.log(err)
                }
            );

        this.comboService.getDia()
            .subscribe(
                data => this.comboDia = data,
                err => {
                    console.log(err)
                }
            );

        this.comboService.getRede()
            .subscribe(
                data => this.comboRede = data,
                err => {
                    console.log(err)
                }
            );

        // this.comboService.getSegmento()
        // .subscribe(
        // data => this.comboSegmento = data,
        // err => {
        //     console.log(err)
        // }
        // );
    }
}
