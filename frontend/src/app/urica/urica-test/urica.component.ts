import { Component } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-urica',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './urica.component.html',
  styleUrls: ['../../shared/assessments.component.css'],
})
export class UricaComponent {
  userId: number | null = null;
  questions: string[] = [];
  answerOptions: { value: number; label: string }[][] = Array(32).fill([]);
  answers: (number | null)[] = Array(32).fill(null);
  showResults = false;
  resultsText = '';
  errorMessage = '';
  answersLocked = false;

  constructor(private uricaService: ServiceService, private router: Router) {
    this.uricaService.getUricaQuestions().subscribe({
      next: (data: string[]) => {
        this.questions = data;
        this.loadAllOptions();
      },
      error: (error) => {
        this.errorMessage = 'Error loading URICA questions.';
      },
    });
  }

  loadAllOptions() {
    for (let i = 0; i < this.questions.length; i++) {
      this.uricaService.getUricaOptions().subscribe({
        next: (options) => {
          this.answerOptions[i] = options;
        },
        error: (error) => {
          this.errorMessage = 'Error loading URICA options.';
        },
      });
    }
  }

  allQuestionsAnswered(): boolean {
    return this.answers.every((answer) => answer !== null);
  }

  submitAnswers() {
    this.errorMessage = '';
    this.showResults = false;
    this.resultsText = '';

    

    if (this.allQuestionsAnswered()) {
      this.answersLocked = true;
      this.uricaService.calculateUricaScore(this.answers).subscribe({
        next: (result: string) => {
          this.resultsText = result;
          this.showResults = true;
          this.errorMessage = '';

          // Extract the score from the result string
          const scoreMatch = result.match(/Score: (\d+)/);
          const totalScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
          
          // Save the results
          this.uricaService.saveUricaResult({
            userId: this.userId!,
            totalScore: totalScore,
            answers: this.answers.map(answer => answer !== null ? answer : 0)
          }).subscribe({
            next: () => {
              this.router.navigate(['/urica/result']);
            },
            error: (error: Error) => {
              this.errorMessage = error.message;
              this.showResults = false;
              this.answersLocked = false;
            }
          });
        },
        error: (error: Error) => {
          this.errorMessage = error.message;
          this.showResults = false;
          this.answersLocked = false;
        },
      });
    } else {
      this.errorMessage = 'Please enter a User ID and answer all questions before submitting.';
    }
  }
}
