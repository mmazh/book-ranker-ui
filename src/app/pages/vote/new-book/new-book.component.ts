import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  public books: any;
  public loaded: boolean = false;

  public newBookForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[ a-zA-Z0-9]+$')]),
    author: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[ a-zA-Z0-9]+$')])
  });

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      this.loaded = true;
    });
  }

  public onSubmit(): void {
    if (this.newBookForm.invalid) return;
    if (this.bookExists()) {
      window.alert("book already exists");
      window.location.reload();
    }
    let payload = { 
      title: this.newBookForm.value.title,
      author: this.newBookForm.value.author
    };
    console.log(payload);
    this.bookService.createNewBook(payload).subscribe((response:any) => {
      console.log(response);
      this.router.navigate(['vote']);
    })
  }

  private bookExists() {
    let title = this.newBookForm.value.title?.toLowerCase();
    let author = this.newBookForm.value.author?.toLowerCase();
    let check = this.books.find((x: any) => x.title.toLowerCase() === title && x.author.toLowerCase() === author);
    return typeof check !== "undefined";
  }

  get title() { return this.newBookForm.get('title'); }

  get author() { return this.newBookForm.get('author'); }
}
