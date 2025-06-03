import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ChartTypeRegistry
} from 'chart.js';
import { provideCharts, BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { isNullOrUndef } from 'chart.js/helpers';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-aims-result',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  providers: [provideCharts()],
  templateUrl: './aims-result.component.html',
  styleUrls: ['./aims-result.component.css'],
})
export class AimsResultComponent implements OnInit {
  userId: number | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  aimsQuestions: string[] = [];
  questionCharts: {
    data: ChartConfiguration['data'];
    options: ChartConfiguration['options'];
  }[] = [];
  totalScoreChart: ChartConfiguration | null = null;
  totalScorePlugins: Plugin[] = [];
  showPredictions: boolean = false;
  predictionDays: number = 30;

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

    // First load the questions
    this.service.getAimsQuestions().subscribe({
      next: (questions: string[]) => {
        this.aimsQuestions = questions;
        // Then load the results
        this.service.getAimsResultsByUser(userId).subscribe({
          next: (results) => {
            if (results && results.length > 0) {
              results.sort(
                (a, b) =>
                  new Date(a.dateTaken).getTime() - new Date(b.dateTaken).getTime()
              );

              // Prepare data for prediction
              const pastData = results.map((r) => ({
                date: new Date(r.dateTaken),
                score: r.totalScore,
              }));

              // Generate prediction series if we have enough data points
               let predictionData: { date: Date; score: number } | null = null;
              if (results.length >= 2 && this.showPredictions) {
                try {
                  const predictionResult = this.predictionService.predictNextScore(pastData, this.predictionDays);
                  predictionData = {
                    date: predictionResult.predictionDate,
                    score: predictionResult.predictedScore
                  };
                  console.log('Prediction result:', predictionResult);
                  console.log('Prediction data:', predictionData);
                } catch (error) {
                  console.error('Error generating predictions:', error);
                }
              }

              // Create background zone plugin
              const backgroundZonePlugin: Plugin = {
                id: 'backgroundZones',
                beforeDraw: (chart) => {
                  const ctx = chart.ctx;
                  const chartArea = chart.chartArea;
                  const yScale = chart.scales['y'];

                  if (!yScale) return;

                  const getY = (value: number) => yScale.getPixelForValue(value);

                  ctx.fillStyle = 'rgb(90, 158, 124)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(7),
                    chartArea.width,
                    getY(0) - getY(7)
                  );

                  ctx.fillStyle = 'rgb(247, 206, 70)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(14),
                    chartArea.width,
                    getY(7) - getY(14)
                  );

                  ctx.fillStyle = 'rgb(241, 158, 56)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(21),
                    chartArea.width,
                    getY(14) - getY(21)
                  );

                  ctx.fillStyle = 'rgb(237, 109, 133)';
                  ctx.fillRect(
                    chartArea.left,
                    getY(28),
                    chartArea.width,
                    getY(21) - getY(28)
                  );
                },
              };

              const originalDates = results.map((r) => new Date(r.dateTaken));
              const originalScores = results.map((r) => r.totalScore);

              // Create datasets array with actual and prediction data
              const datasets: ChartDataset<'line', (number | null)[]>[] = [{
                label: 'Actual Score',
                data: originalScores,
                borderColor: 'rgb(255, 255, 255)',
                pointBackgroundColor: 'rgb(0, 0, 0)',
                pointBorderColor: 'rgb(255, 255, 255)',
                pointHoverBackgroundColor: 'rgb(255, 255, 255)',
                pointHoverBorderColor: 'rgb(0, 0, 0)',
                fill: false,
                tension: 0.4,
                borderWidth: 2,
              }];

              // Add prediction dataset if available
              if (predictionData) {
                console.log('Adding prediction dataset');
                // Add the last actual point to connect the lines
                const lastActualScore = originalScores[originalScores.length - 1];
                
                // Create a new array with the last actual score and prediction
                // We need to pad the array with null values to align with the actual data points
                const predictionScores = new Array(originalScores.length - 1).fill(null);
                predictionScores.push(lastActualScore, predictionData.score);
                
                console.log('Prediction scores:', predictionScores);
                
                const predictionDataset: ChartDataset<'line', (number | null)[]> = {
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
                  pointRadius: [0, 0, 4], // Hide points for padding and connecting line, show point for prediction
                  pointHoverRadius: [0, 0, 6],
                  borderDash: [5, 5], // Add dashed line style
                  segment: {
                    borderDash: (ctx) => [5, 5], // Ensure dashed line style is applied
                  },
                  spanGaps: true, // Allow gaps in the data (null values)
                };
                
                datasets.push(predictionDataset);
                console.log('Final datasets:', datasets);
              }

              // Combine all dates for labels
              const allDates = [
                ...originalDates,
                ...(predictionData ? [predictionData.date] : [])
              ].map(d => d.toLocaleDateString());

              console.log('All dates for labels:', allDates);

              this.totalScoreChart = {
                type: 'line',
                data: {
                  labels: allDates,
                  datasets: datasets
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
                          const isPrediction = context.dataset.label === 'Predicted Score';
                          return `${context.dataset.label}: ${value.toFixed(1)}${
                            isPrediction ? ' (predicted)' : ''
                          }`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                        color: 'black'
                      },
                      ticks: { color: 'black' },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    y: {
                      min: 0,
                      max: 28,
                      title: {
                        display: true,
                        text: 'Score',
                        color: 'black'
                      },
                      ticks: { 
                        color: 'black',
                        stepSize: 4
                      },
                      grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                  }
                }
              };

              this.totalScorePlugins = [backgroundZonePlugin];

              this.questionCharts = [];
              for (let i = 0; i < 12; i++) {
                let scores = results.map((r) => r.allQuestions[i]);
                let labels = results.map((r) => new Date(r.dateTaken).toLocaleDateString());

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
                      label: this.aimsQuestions[i] || `Question ${i + 1}`,
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
                      text: this.aimsQuestions[i] || `Question ${i + 1}`,
                      color: 'black',
                      font: {
                        size: 12,
                        weight: 'normal'
                      },
                      padding: {
                        top: 20,
                        bottom: 20
                      },
                      align: 'center',
                      position: 'top'
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
                        callback: function (tickValue: number | string): string {
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
        this.errorMessage = 'Error loading AIMS questions.';
        this.isLoading = false;
      },
    });
  }

  togglePredictions() {
    this.showPredictions = !this.showPredictions;
    console.log('Toggled predictions:', this.showPredictions);
    if (this.userId) {
      this.loadUserResults(this.userId);
    }
  }

  updatePredictionDays(days: number) {
    this.predictionDays = days;
    if (this.userId && this.showPredictions) {
      this.loadUserResults(this.userId);
    }
  }
}