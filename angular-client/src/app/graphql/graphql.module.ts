import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const auth = setContext(() => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accounts:accessToken');
  // return the headers to the context so httpLink can read them
  // in this example we assume headers property exists
  // and it is an instance of HttpHeaders
  if (!token) {
    return {};
  } else {
    return {
      headers: {
        'accounts-access-token': token
      }
    };
  }
});

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: auth.concat(httpLink.create({
      uri,
    })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
