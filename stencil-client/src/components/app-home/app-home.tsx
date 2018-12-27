import { Component, State, ComponentDidLoad } from '@stencil/core';
import { AllPostsComponent, AddPostComponent } from '../generated-models';
import { accountsClient, accountsGraphQL } from '../../helpers/accounts';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome implements ComponentDidLoad {

  @State() user: any = null;
  @State() title: string;
  @State() content: string;

  public async componentDidLoad() {
    // refresh the session to get a new accessToken if expired
    const tokens = await accountsClient.refreshSession();
    if (!tokens) {
      const ionRouter = document.querySelector('ion-router');
      ionRouter.push('/login');
      return;
    }
    this.user = await accountsGraphQL.getUser();
  }

  public onLogout = async () => {
    await accountsClient.logout();
    const ionRouter = document.querySelector('ion-router');
    ionRouter.push('/login');
  }

  render() {
    if (!this.user) {
      return null;
    }
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          You are logged in.
        </p>
        <p>
          Username: {this.user.username}
        </p>
        <AddPostComponent onReady={
          addPost => (
            <fieldset>
              <legend>
                Add Post
              </legend>
              <form>
                <p>
                  <label htmlFor='title'>
                    Title
                  </label>
                  <input name='title' onChange={e => this.title = e.target['value'] } />
                </p>
                <p>
                  <label htmlFor='content'>
                    Content
                  </label>
                  <input name='content' onChange={e => this.content = e.target['value']} />
                </p>
                <p>
                  <input type='submit' onClick={e => {
                    e.preventDefault();
                    addPost({
                      variables: {
                        title: this.title,
                        content: this.content
                      }
                    });
                  }} />
                </p>
              </form>
            </fieldset>
          )
        } />
        <h2>
          Posts;
        </h2>
        <ul>
          <AllPostsComponent onReady={
            ({data, loading, errors}) => {
              if (loading) {
                return <p>Loading...</p>
              }
              if( errors && errors.length ) {
                return <p>Error: {errors.join('\n')}</p>
              }
              if (data && data.allPosts ) {
                return data.allPosts.map((post, index) => (
                  <li key={index}>
                    <h3>
                      {post.title}
                    </h3>
                    <p>
                      {post.content}
                    </p>
                    <p>
                      {post.author && post.author.username}
                    </p>
                  </li>
                ))
              }
            }
          } />
        </ul>
        <ion-button onClick={this.onLogout} expand="block">Logout</ion-button>
      </ion-content>
    ];
  }
}
