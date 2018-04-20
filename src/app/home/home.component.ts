import { Component, ViewChild, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { UIChart } from 'primeng/primeng';
import { Ligacoes } from '../models/ligacoes.model';
import { Grafico1 } from '../models/grafico1.model';
import { LigacoesService } from '../services/ligacoes.service';
import { Grafico2 } from '../models/grafico2.model';
import { Grafico } from '../models/gafrico.model';
import { Grafico3 } from '../models/grafico3.model';
import { Dataset } from '../models/dataset.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    filter = new Ligacoes('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    chart1 = null;//new Grafico1([], [],0);
    chart2 = new Grafico2([], new Grafico("", []));
    chartList: Grafico[] = [];
    chart3 = new Grafico3([], this.chartList);
    chart4 = new Grafico1([], [],0);
    msgs: Message[] = [];
    piedata: any;
    bardata: any;
    bardata2: any;
    linedata: any;
    doughnutdata: any;
    doughnutdata2: any;
    options: any;
    activeIndex: number = 0;
    tempo: string;

    loader1: boolean = false;
    loader2: boolean = false;
    loader3: boolean = false;
    loader4: boolean = false;

    reloadChart=false;

    titleChart2: string = 'Redes';

    bardataTotal: number = 0;
    doughnutdataTotal: number = 0;
    linedataTotal: number = 0;

    chartOptions: any = {
       
        scales: {
            xAxes: [{
                
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    options3:any= {
        tooltips: {enabled: false},
        hover: {mode: null},
        events: []
      }

    borderColors: string[] = [
        "#FFCE56",
        '#75bbc8',
        '#16556f',
        '#c2f5ff',
        '#162a2e',
        "#E7E9ED",
        "#36A2EB"
    ]



    constructor(
        private ligacoesService: LigacoesService
    ) { }

    chart1Init(filter: Ligacoes) {
        //this.loader1 = false;
        this.ligacoesService.getChart1(filter)
            .subscribe(
                data => 
                    {
                        if(this.chart1==null){
                            this.chart1 = data
                            this.reloadChart=true;
                        }else{
                            if(this.chart1.total==data.total){
                                this.reloadChart=false;
                            }else{
                                this.chart1 = data
                                this.reloadChart=true;
                            }
                        }
                    },
                err => {
                    console.log(err)
                },
                () => {
                  //  this.loader1 = true;
                    console.log("respuesta1:"+this.chart1)
                    if( this.reloadChart)
                    this.chart1Build();
                    
                }
            );
    }

    chart2Init(filter: Ligacoes) {
        this.loader2 = false;
        if (filter.rede != '') {
            if (filter.regional != '') {
                this.titleChart2 = 'Agências';
            } else {
                this.titleChart2 = 'Regionais';
            }
        } else {
            this.titleChart2 = 'Redes';
        }
        this.ligacoesService.getChart2(filter)
            .subscribe(
                data => this.chart2 = data,
                err => {
                    console.log(err)
                },
                () => {
                    console.log(this.chart2)
                    this.chart2Build();
                    // this.chart3Init(filter);
                }
            );
    }

    chart3Init(filter: Ligacoes) {
        this.loader3 = false;
        this.ligacoesService.getChart3(filter)
            .subscribe(
                data => {
                this.chart3 = data
                    this.tempo = data.lenda;
                },
                err => {
                    console.log(err)
                },
                () => {
                    console.log(this.chart3)
                    this.chart3Build();
                }
            );
    }

    chart4Init(filter: Ligacoes) {
        this.loader4 = false;
        this.ligacoesService.getChart4(filter)
            .subscribe(
                data => this.chart4 = data,
                err => {
                    console.log(err)
                },
                () => {
                    console.log(this.chart4)
                    this.chart4Build();
                    // this.chart2Init(filter);
                }
            );
    }

    chart1Build() {
        let total = 0;
        for (let i = 0; i < this.chart1.values.length; i++) {
            total = total + Number(this.chart1.values[i]);
            this.doughnutdataTotal = total;
        }
        for (let i = 0; i < this.chart1.labels.length; i++) {
            if (this.chart1.labels[i] == 'NÃ£o atendida') {
                this.chart1.labels[i] = 'Não atendida'
            }
            this.chart1.labels[i] = this.chart1.labels[i] + " (" + ((Number(this.chart1.values[i]) / total * 100) + "").substr(0, 4) + "%)"
        }
        this.doughnutdata = {
            labels: this.chart1.labels,
            datasets: [
                {
                    data: this.chart1.values,
                    backgroundColor: [
                        '#75bbc8',
                        '#16556f',
                        '#c2f5ff',
                        '#162a2e'
                    ],
                    hoverBackgroundColor: [
                        '#75bbc8',
                        '#16556f',
                        '#c2f5ff',
                        '#162a2e'
                    ]
                }]
        };
        this.loader1 = true;
    }

    chart2Build() {
        let total = 0;
        for (let i = 0; i < this.chart2.datasets.values.length; i++) {
            total = total + Number(this.chart2.datasets.values[i]);
            this.bardataTotal = total;
        }
        for (let i = 0; i < this.chart2.labels.length; i++) {
            this.chart2.labels[i] = this.chart2.labels[i] + " (" + ((Number(this.chart2.datasets.values[i]) / total * 100) + "").substr(0, 4) + "%)"
        }
        this.bardata = {
            labels: this.chart2.labels,
            datasets: [
                {
                    label: this.chart2.datasets.label,
                    backgroundColor: '#8c3362',
                    borderColor: '#8c3362',
                    data: this.chart2.datasets.values
                }
            ]
        };
        this.loader2 = true;
    }

    chart3Build() {
        const dataset: Dataset[] = [];
        for (let i = 0; i < this.chart3.datasets.length; i++) {
            if (this.chart3.datasets[i].label == 'NÃ£o atendida') {
                this.chart3.datasets[i].label = 'Não atendida'
                dataset.push(new Dataset(this.chart3.datasets[i].label, this.chart3.datasets[i].values, "#fa0707"))
            } else if (this.chart3.datasets[i].label == 'Atendida') {
                dataset.push(new Dataset(this.chart3.datasets[i].label, this.chart3.datasets[i].values, "#35a30f"))
            } else {
                dataset.push(new Dataset(this.chart3.datasets[i].label, this.chart3.datasets[i].values, this.borderColors[i]))
            }
        }
        this.linedata = {
            labels: this.chart3.labels,
            datasets: dataset
        };
        this.loader3 = true;
    }

    chart4Build() {
        let total = 0;
        for (let i = 0; i < this.chart4.values.length; i++) {
            total = total + Number(this.chart4.values[i]);
            this.doughnutdataTotal = total;
        }
        for (let i = 0; i < this.chart4.labels.length; i++) {
            this.chart4.labels[i] = this.chart4.labels[i] + " (" + ((Number(this.chart4.values[i]) / total * 100) + "").substr(0, 4) + "%)"
        }
        this.doughnutdata2 = {
            labels: this.chart4.labels,
            datasets: [
                {
                    data: this.chart4.values,
                    backgroundColor: [
                        "#6B0848",
                        "#A40A3C",
                        "#EC610A",
                        "#FFC300",
                        "#00698C"
                    ],
                    hoverBackgroundColor: [
                        "#f0b322",
                        "#c28f17",
                        "#ffdc87",
                        "#b8a476",
                        "#967a38"
                    ]
                }]
        };
        this.loader4 = true;
    }

    ngOnInit() {

    }

    onChangeStep(label: string) {
        this.msgs.length = 0;
        this.msgs.push({ severity: 'info', summary: label });
    }

    selectData(event: any) {
        let total = 0;
        for (let i = 0; i < this.linedata.datasets.length ; i++) {
            total = total + Number(this.linedata.datasets[i].data[event.element._index])
            console.log("total: " + total)
        }

        let percent = Number(this.linedata.datasets[event.element._datasetIndex].data[event.element._index]) / total * 100;
        console.log("percent: " + percent)
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary:  this.linedata.labels[event.element._index] + ' - ' + this.linedata.datasets[event.element._datasetIndex].label,
            detail: percent.toString().substr(0,4) + '%'
        });
    }
}
