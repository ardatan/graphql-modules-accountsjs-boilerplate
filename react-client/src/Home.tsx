import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { accountsClient, accountsGraphQL } from './utils/accounts';

import { AllPostsComponent, AddPostProps, AddPostComponent } from './generated-models';

interface IState {
  user: any;
  newPost: AddPostProps
}

class Home extends React.Component<RouteComponentProps<{}>, IState> {
  public state = {
    user: null as any,
    newPost: {
      title: '',
      content: ''
    }
  };

  public async componentDidMount() {
    // refresh the session to get a new accessToken if expired
    const tokens = await accountsClient.refreshSession();
    if (!tokens) {
      this.props.history.push('/login');
      return;
    }
    const user = await accountsGraphQL.getUser();
    await this.setState({ user });
  }

  public onLogout = async () => {
    await accountsClient.logout();
    this.props.history.push('/login');
  };

  public render() {
    const { user } = this.state;
    if (!user) {
      return null;
    }

    return (
      <div>
        <Typography gutterBottom={true}>You are logged in</Typography>
        <Typography gutterBottom={true}>Username: {user.username}</Typography>
        <AddPostComponent>
          {addPost => (
            <fieldset>
              <legend>
                Add Post
              </legend>
              <form>
                <p>
                  <label htmlFor='title'>
                    Title
                  </label>
                  <input name='title' value={this.state.newPost.title} onChange={e => this.setState({ newPost: { ...this.state.newPost, title: e.target.value } })} />
                </p>
                <p>
                  <label htmlFor='content'>
                    Content
                  </label>
                  <input name='content' value={this.state.newPost.content} onChange={e => this.setState({ newPost: { ...this.state.newPost, content: e.target.value } })} />
                </p>
                <p>
                  <input type='submit' onClick={e => {
                    e.preventDefault();
                    addPost({
                      variables: this.state.newPost
                    });
                  }} />
                </p>
              </form>
            </fieldset>
          )}
        </AddPostComponent>
        <h2>
          Posts;
        </h2>
        <ul>
          <AllPostsComponent>
            {({data, loading, error}) => {
              if (loading) {
                return <p>Loading...</p>
              } 
              if( error ) {
                return <p>Error: {error}</p>
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
            }}
          </AllPostsComponent>
        </ul>

        <Button variant="raised" color="primary" onClick={this.onLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default Home;
