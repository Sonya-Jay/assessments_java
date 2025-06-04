import { Injectable } from '@angular/core';

interface ScoreDataPoint {
  date: Date;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  constructor() {}

  predictNextScore(
    pastData: ScoreDataPoint[],
    maxVal: number
  ): {
    predictionDate: Date;
    predictedScore: number;
  } {
    if (pastData.length < 2) {
      throw new Error('Need at least 2 data points for prediction');
    }
    // Converting Date Values
    const toMilliseconds = 1000 * 60 * 60 * 24;
    const firstDate = pastData[0].date;
    const xValues = pastData.map(
      (d) => (d.date.getTime() - firstDate.getTime()) / toMilliseconds
    );
    const yValues = pastData.map((d) => d.score);

    let sumX = xValues.reduce((a, b) => a + b, 0);
    let sumY = yValues.reduce((a, b) => a + b, 0);

    // Getting Slope and Y-intercept
    let combinedXandY = 0;
    for (let i = 0; i < xValues.length; i++) {
      combinedXandY += xValues[i] * yValues[i];
    }
    let sumXSquared = xValues.reduce((a, b) => a + Math.pow(b, 2), 0);

    const slope =
      (xValues.length * combinedXandY - sumX * sumY) /
      (xValues.length * sumXSquared - Math.pow(sumX, 2));
    const yIntercept = (sumY - slope * sumX) / xValues.length;

    // Predict next score
    const lastDate = pastData[pastData.length - 1].date;
    const daysSinceFirst =
      (lastDate.getTime() - firstDate.getTime()) / toMilliseconds;
    const predictionDate = new Date(
      lastDate.getTime() + 30 * toMilliseconds
    );
    const daysAfterLast = daysSinceFirst + 30;

    const predictedScore = slope * daysAfterLast + yIntercept;

    return {
      predictionDate,
      predictedScore: Math.max(0, Math.min(maxVal, predictedScore)),
    };
  }
}
