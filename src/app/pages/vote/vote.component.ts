import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  isSubmitted: boolean = false;
  isLoaded: boolean = false;
  isValid: boolean = false; // user name cant have spaces or special chars except -, numbers ok, uppercase and lower are the same
  
  books: any[] = [];
  //username: string = "";

  constructor() {}

  voteForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    book: new FormControl(''),
    stars: new FormControl('')
  });

  onSubmit(): void {
    this.isSubmitted = true;
    console.log(this.voteForm.value);
  }
}
