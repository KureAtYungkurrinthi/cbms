import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => this.posts = data,
        error => console.error('Error fetching data:', error));
  }

}
