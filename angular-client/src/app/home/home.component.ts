import { Component, OnInit } from '@angular/core';
import { AllPosts, AddPost, AllPostsGQL, AddPostGQL } from 'src/generated-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private allPostsGql: AllPostsGQL, private addPostGql: AddPostGQL) { }

  data: Observable<AllPosts.Query>;
  error: string;
  newPost: AddPost.Variables = {
    title: '',
    content: ''
  };

  ngOnInit() {
    this.data = this.allPostsGql.fetch().pipe(
      map(results => results.data)
    );
  }

  async addPost() {
    try {
      await this.addPostGql.mutate({
          title: this.newPost.title,
          content: this.newPost.content
        }).toPromise();
    } catch (e) {
      this.error = e.message;
    }
  }

}
