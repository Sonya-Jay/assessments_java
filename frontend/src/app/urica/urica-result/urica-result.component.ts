import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../shared/service.service';
import { PredictionService } from '../../shared/prediction.service';
import { ActivatedRoute } from '@angular/router';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables,
  ScriptableContext,
  Plugin,
  ScriptableLineSegmentContext,
  TooltipItem,
  ChartData,
  ChartDataset,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry,
  Point,
  ChartTypeRegistry,
} from 'chart.js';
import { provideCharts, BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { isNullOrUndef } from 'chart.js/helpers';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-urica-result',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, FormsModule],
  providers: [provideCharts()],
  templateUrl: './urica-result.component.html',
  styleUrls: ['../../shared/results.component.css'],
})
export class UricaResultComponent implements OnInit {
  userId: number | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  uricaQuestions: string[] = [];
  questionCharts: {
    data: ChartConfiguration['data'];
    options: ChartConfiguration['options'];
  }[] = [];
  totalScorePlugins: Plugin[] = [];
  totalScoreChart: ChartConfiguration | null = null;
  showPredictions: boolean = false;

  public lineChartType: ChartType = 'line';

  constructor(
    private service: ServiceService,
    private predictionService: PredictionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.userId = Number(userId);
        this.loadUserResults(this.userId);
      }
    });
  }

  loadChartData() {
    if (this.userId) {
      this.loadUserResults(this.userId);
    } else {
      this.errorMessage = 'Please enter a User ID';
    }
  }

  private getFillColor(score: number): string {
    if (score < 2) {
      return 'rgb(90, 158, 124)';
    } else if (score <= 3) {
      return 'rgb(241, 158, 56)';
    } else {
      return 'rgb(237, 109, 133)';
    }
  }

  private getLineColor(score: number): string {
    if (score < 2) {
      return 'rgb(45, 117, 81)';
    } else if (score <= 3) {
      return 'rgb(180, 114, 35)';
    } else {
      return 'rgb(192, 44, 71)';
    }
  }

  private loadUserResults(userId: number) {
    this.isLoading = true;
    this.errorMessage = '';

    // Getting questions
    this.service.getUricaQuestions().subscribe({
      next: (questions: string[]) => {
        this.uricaQuestions = questions;

        this.service.getUricaResultsByUser(userId).subscribe({
          next: (results) => {
            if (results && results.length > 0) {
              results.sort(
                (a, b) =>
                  new Date(a.dateTaken).getTime() -
                  new Date(b.dateTaken).getTime()
              );
              const pastData = results.map((r) => ({
                date: new Date(r.dateTaken),
                score: r.totalScore,
              }));

              // Get prediction if theres enough data
              let predictionData: { date: Date; score: number } | null = null;
              if (results.length >= 2 && this.showPredictions) {
                try {
                  const predictionResult =
                    this.predictionService.predictNextScore(pastData, 15);
                  predictionData = {
                    date: predictionResult.predictionDate,
                    score: predictionResult.predictedScore,
                  };
                } catch (error) {
                  console.error('Error generating predictions:', error);
                }
              }
              const backgroundZonePlugin: Plugin = {
                id: 'backgroundZones',
                beforeDraw: (chart) => {
                  const ctx = chart.ctx;
                  const chartArea = chart.chartArea;
                  const yScale = chart.scales['y'];

                  if (!yScale) return;

                  const getY = (value: number) =>
                    yScale.getPixelForValue(value);

                  ctx.fillStyle = 'rgb(90, 158, 124)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(8),
                    chartArea.width,
                    getY(0) - getY(8)
                  );

                  ctx.fillStyle = 'rgb(247, 206, 70)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(11),
                    chartArea.width,
                    getY(8) - getY(11)
                  );

                  ctx.fillStyle = 'rgb(241, 158, 56)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(14),
                    chartArea.width,
                    getY(11) - getY(14)
                  );

                  ctx.fillStyle = 'rgb(237, 109, 133)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(15),
                    chartArea.width,
                    getY(14) - getY(15)
                  );
                },
              };

              let originalDates: (Date | null)[] = results.map(
                (r) => new Date(r.dateTaken)
              );
              let originalScores = results.map((r) => r.totalScore);

              if (originalScores.length === 1) {
                originalScores = [originalScores[0], originalScores[0]];
                originalDates = [null, originalDates[0]];
              }

              const datasets: ChartDataset<'line', (number | null)[]>[] = [
                {
                  label: 'Total Score',
                  data: originalScores,
                  borderColor: 'rgb(255, 255, 255)',
                  pointBackgroundColor: 'rgb(0, 0, 0)',
                  pointBorderColor: 'rgb(255, 255, 255)',
                  pointHoverBackgroundColor: 'rgb(255, 255, 255)',
                  pointHoverBorderColor: 'rgb(0, 0, 0)',
                  fill: false,
                  tension: 0.4,
                  borderWidth: 2,
                },
              ];

              if (predictionData) {
                const lastActualScore =
                  originalScores[originalScores.length - 1];

                const predictionScores = new Array(
                  originalScores.length - 1
                ).fill(null);
                predictionScores.push(lastActualScore, predictionData.score);

                const predictionDataset: ChartDataset<
                  'line',
                  (number | null)[]
                > = {
                  label: 'Predicted Score',
                  data: predictionScores,
                  borderColor: 'rgb(255, 255, 255)',
                  pointBackgroundColor: 'rgb(255, 255, 255)',
                  pointBorderColor: 'rgb(0, 0, 0)',
                  pointHoverBackgroundColor: 'rgb(255, 255, 255)',
                  pointHoverBorderColor: 'rgb(0, 0, 0)',
                  fill: false,
                  tension: 0.4,
                  borderWidth: 2,
                  pointRadius: [0, 0, 4],
                  pointHoverRadius: [0, 0, 6],
                  borderDash: [5, 5],
                  segment: {
                    borderDash: (ctx) => [5, 5],
                  },
                  spanGaps: true,
                };

                datasets.push(predictionDataset);
              }

              const allDates = [
                ...originalDates,
                ...(predictionData ? [predictionData.date] : []),
              ].map((d) => (d ? d.toLocaleDateString() : ''));

              this.totalScoreChart = {
                type: 'line',
                data: {
                  labels: allDates,
                  datasets: datasets,
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top' as const,
                      labels: { color: 'black' },
                    },
                    tooltip: {
                      enabled: true,
                      callbacks: {
                        label: function (context) {
                          const value = context.parsed.y;
                          const isPrediction =
                            context.dataset.label === 'Predicted Score';
                          return `${context.dataset.label}: ${value.toFixed(
                            1
                          )}${isPrediction ? ' (predicted)' : ''}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                        color: 'black',
                      },
                      ticks: { color: 'black' },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    },
                    y: {
                      min: 0,
                      max: 15,
                      title: {
                        display: true,
                        text: 'Score',
                        color: 'black',
                      },
                      ticks: {
                        color: 'black',
                        stepSize: 2,
                      },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    },
                  },
                },
              };

              this.totalScorePlugins = [backgroundZonePlugin];

              this.questionCharts = [];
              for (let i = 0; i < 32; i++) {
                let scores = results.map((r) => r.allQuestions[i]);
                let labels = results.map((r) =>
                  new Date(r.dateTaken).toLocaleDateString()
                );

                if (scores.length === 1) {
                  scores = [scores[0], scores[0]];
                  labels = ['', labels[0]];
                }

                const mostRecentScore = scores[scores.length - 1];
                const fillColor = this.getFillColor(mostRecentScore);
                const lineColor = this.getLineColor(mostRecentScore);

                const chartData: ChartData<'line'> = {
                  datasets: [
                    {
                      data: scores,
                      label: this.uricaQuestions[i] || `Question ${i + 1}`,
                      backgroundColor: fillColor,
                      borderColor: lineColor,
                      borderWidth: 2,
                      pointBackgroundColor: 'rgb(0, 0, 0)',
                      pointBorderColor: 'rgb(255, 255, 255)',
                      pointBorderWidth: 2,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                      pointHoverBackgroundColor: 'rgb(0, 0, 0)',
                      pointHoverBorderColor: 'rgb(255, 255, 255)',
                      fill: 'origin',
                      tension: 0.4,
                    },
                  ],
                  labels: labels,
                };

                const questionOptions: ChartConfiguration['options'] = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    subtitle: {
                      display: true,
                      text: this.uricaQuestions[i] || `Question ${i + 1}`,
                      color: 'black',
                      font: {
                        size: 12,
                        weight: 'normal',
                      },
                      padding: {
                        top: 20,
                        bottom: 20,
                      },
                      align: 'center',
                      position: 'top',
                    },
                    tooltip: {
                      enabled: true,
                      callbacks: {
                        label: function (context: TooltipItem<'line'>) {
                          let value = context.parsed.y;
                          return `Input: ${value}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      type: 'category',
                      ticks: { color: 'black' },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    },
                    y: {
                      type: 'linear',
                      ticks: {
                        color: 'black',
                        stepSize: 1,
                        callback: function (
                          tickValue: number | string
                        ): string {
                          return tickValue.toString();
                        },
                      },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' },
                      max: 4,
                      min: 0,
                      beginAtZero: true,
                    },
                  },
                };

                this.questionCharts.push({
                  data: chartData,
                  options: questionOptions,
                });
              }
            } else {
              this.errorMessage = 'No results found for this user';
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Error loading results. Please try again.';
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading URICA questions.';
        this.isLoading = false;
      },
    });
  }

  togglePredictions() {
    this.showPredictions = !this.showPredictions;
    if (this.userId) {
      this.loadUserResults(this.userId);
    }
  }
}
