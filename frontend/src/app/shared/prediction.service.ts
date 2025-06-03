import { Injectable } from '@angular/core';

interface ScoreDataPoint {
  date: Date;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  constructor() {}

  /**
   * Predicts the next score using linear regression
   * @param pastData Array of historical scores with dates
   * @param daysToPredict Number of days in the future to predict
   * @returns Predicted score and confidence interval
   */
  predictNextScore(pastData: ScoreDataPoint[], daysToPredict: number = 30): {
   //  confidenceInterval: { lower: number; upper: number };
    predictionDate: Date;
    predictedScore: number;
  } {
    if (pastData.length < 2) {
      throw new Error('Need at least 2 data points for prediction');
    }

    // Convert dates to numeric values (days since first measurement)
    const firstDate = pastData[0].date;
    const xValues = pastData.map(d => 
      (d.date.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const yValues = pastData.map(d => d.score);

    // Calculate means
    let sumX = xValues.reduce((a, b) => a + b, 0);
    let sumY = yValues.reduce((a, b) => a + b, 0);
    // const xMean = sumX / xValues.length;
    // const yMean = sumY / yValues.length;

    // Calculate slope (m) and y-intercept (b)
     let combinedXandY = 0;
     for (let i = 0; i < xValues.length; i++) {
       combinedXandY += xValues[i] * yValues[i];
     }
     let sumXSquared = xValues.reduce((a, b) => a + Math.pow(b, 2), 0);

    const slope = ((xValues.length * combinedXandY) - (sumX * sumY)) / (xValues.length * sumXSquared - Math.pow(sumX, 2));
    const yIntercept = (sumY - (slope * sumX)) / xValues.length;

    // Calculate R-squared for confidence
    // const yPredicted = xValues.map(x => slope * x + yIntercept);
    // const ssTotal = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    // const ssResidual = yValues.reduce((sum, y, i) => 
    //   sum + Math.pow(y - yPredicted[i], 2), 0);
    // const rSquared = 1 - (ssResidual / ssTotal);

    // Calculate standard error
    // const standardError = Math.sqrt(ssResidual / (xValues.length - 2));

    // Predict next score
    const lastDate = pastData[pastData.length - 1].date;
    const daysSinceFirst = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
    const predictionDate = new Date(lastDate.getTime() + daysToPredict * 24 * 60 * 60 * 1000);
    const daysToPredictFromFirst = daysSinceFirst + daysToPredict;
    
    const predictedScore = slope * daysToPredictFromFirst + yIntercept;

    // Calculate confidence interval (95%)
    // const confidenceInterval = {
    //   lower: Math.max(0, predictedScore - 1.96 * standardError),
    //   upper: Math.min(28, predictedScore + 1.96 * standardError)
    // };

    return {
      predictionDate,
      predictedScore: Math.max(0, Math.min(28, predictedScore)) // Clamp between 0 and 28
      // confidenceInterval,
    };
  }

  // /**
  //  * Generates a series of predicted scores for visualization
  //  * @param pastData Array of historical scores with dates
  //  * @param daysToPredict Number of days to predict into the future
  //  * @returns Array of predicted scores with dates
  //  */
  // generatePredictionSeries(
  //   pastData: ScoreDataPoint[],
  //   daysToPredict: number = 30
  // ): ScoreDataPoint[] {
  //   const lastDate = pastData[pastData.length - 1].date;
  //   const prediction = this.predictNextScore(pastData, daysToPredict);
    
  //   // Generate daily predictions
  //   const predictions: ScoreDataPoint[] = [];
  //   for (let i = 1; i <= daysToPredict; i++) {
  //     const date = new Date(lastDate.getTime() + i * 24 * 60 * 60 * 1000);
  //     const daysSinceFirst = (date.getTime() - pastData[0].date.getTime()) / (1000 * 60 * 60 * 24);
  //     const predictedScore = this.predictNextScore(pastData, i).predictedScore;
      
  //     predictions.push({
  //       date,
  //       score: predictedScore
  //     });
  //   }

  //   return predictions;
  
} 