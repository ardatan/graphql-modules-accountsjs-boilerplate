import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AllPosts, AddPost } from 'src/generated-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  data: Observable<AllPosts.Query>;
  error: string;
  newPost: AddPost.Variables = {
    title: '',
    content: ''
  };

  ngOnInit() {
    this.data = this.apollo.query<AllPosts.Query, AllPosts.Variables>({
      query: gql`
        query AllPosts {
          allPosts{
              id
              title
              content
              author {
                  username
              }
          }
      }
      `
    }).pipe(
      map(results => results.data)
    );
  }

  async addPost() {
    try {
      await this.apollo.mutate<AddPost.Mutation, AddPost.Variables>({
        mutation: gql`
          mutation AddPost($title: String, $content: String) {
              addPost(title: $title, content: $content) {
                  id
                  title
                  content
                  author {
                    username
                  }
              }
          }
        `,
        variables: {
          title: this.newPost.title,
          content: this.newPost.content
        }
      }).toPromise();
    } catch (e) {
      this.error = e.message;
    }
  }

}
