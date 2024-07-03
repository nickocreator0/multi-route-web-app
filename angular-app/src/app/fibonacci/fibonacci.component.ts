import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrl: './fibonacci.component.css'
})
export class FibonacciComponent {
  title = 'angular-fibonacci';
  fibonacciResult: string = '';
  invalidInputError: string = '';

  constructor(private location: Location) {
  }

  isPositiveNumber(value: number): boolean {
    return value > 0;
  }
  calculateButton(num: HTMLInputElement): boolean {
    const inputValue: number = parseInt(num.value);

    // Check if input is a positive integer
    if (!this.isPositiveNumber(inputValue)) {
      this.invalidInputError = 'Invalid Input! Please enter a number greater than 0.';
      this.fibonacciResult = '';
      console.error('Invalid input!');
      return false; // Stop
    }
    else
      this.invalidInputError = '';

    const result: number = this.fibonacciCalculator(inputValue);
    console.log(`The result is: ${result}`);

    // Determine the ordinal prefix based on the input
    const ordinalPrefixes: string[] = ['th', 'st', 'nd', 'rd'];

    // If input > 3 use `th`, otherwise use the mapping
    const index: number = inputValue <= 3 ? inputValue : 0;
    const ordinalPrefix: string = ordinalPrefixes[index];

    this.fibonacciResult = `The ${inputValue}${ordinalPrefix} number in the Fibonacci sequence is: ${result}`;
    //num.value = '';
    return false;
  }

  fibonacciCalculator(num: number) {
    num += 1;
    let currResult: number = 1;
    let prevResult: number = 0;

    if(num == 1)
      return 0;
    if(num < 4)
      return 1;

    for (let i: number = 0; i < num - 2; ++i) {
      let nextResult: number = currResult + prevResult;
      prevResult = currResult;
      currResult = nextResult;
    }

    return currResult;
  }

  goBack(): void {
    this.location.back();
  }
}

