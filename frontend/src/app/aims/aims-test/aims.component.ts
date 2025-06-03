import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../shared/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aims',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './aims.component.html',
  styleUrls: ['../../shared/assessments.component.css'],
})
export class AimsComponent implements OnInit {
  userId: number | null = null;
  dateTaken: string = new Date().toISOString().split('T')[0]; // Default to today's date
  questions: string[] = [];
  answerOptions: { value: number; label: string }[][] = Array(12).fill([]);
  answers: (number | null)[] = Array(12).fill(null);
  showResults = false;
  resultsText = '';
  errorMessage = '';
  answersLocked = false;


  constructor(private aimsService: ServiceService, private router: Router) {}

  ngOnInit() {
    this.aimsService.getAimsQuestions().subscribe({
      next: (data: string[]) => {
        this.questions = data;
        this.loadAllOptions();
      },
      error: (error) => {
        this.errorMessage = 'Error loading AIMS questions.';
      },
    });
  }

  loadAllOptions() {
    for (let i = 0; i < this.questions.length; i++) {
      if (i < 10) {
        this.aimsService.getAimsFiveOptions().subscribe({
          next: (options) => {
            this.answerOptions[i] = options;
          },
          error: (error) => {
            this.errorMessage = 'Error loading AIMS options.';
          }
        });
      } else {
        this.aimsService.getAimsTwoOptions().subscribe({
          next: (options) => {
            this.answerOptions[i] = options;
          },
          error: (error) => {
            this.errorMessage = 'Error loading AIMS options.';
          }
        });
      }
    }
  }

  allQuestionsAnswered(): boolean {
    return this.answers.every((answer) => answer !== null) && this.userId !== null;
  }

  submitAnswers() {
    this.errorMessage = '';
    this.showResults = false;
    this.resultsText = '';

    if (this.allQuestionsAnswered()) {
      this.answersLocked = true;
      this.aimsService.calculateAimsScore(this.answers).subscribe({
        next: (result: string) => {
          this.resultsText = result;
          this.showResults = true;
          this.errorMessage = '';
          
          // Extract the score from the result string
          const scoreMatch = result.match(/Score: (\d+)/);
          const totalScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
          
          // Save the results with the selected date
          this.aimsService.saveAimsResult({
            userId: this.userId!,
            totalScore: totalScore,
            answers: this.answers.map(answer => answer !== null ? answer : 0),
            dateTaken: this.dateTaken // Include the selected date
          }).subscribe({
            next: () => {
              this.router.navigate(['/aims/result', this.userId]);
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
