import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password';
import GraphQLClient from '@accounts/graphql-client';
import ApolloClient from 'apollo-boost';

// const createHeaders = (client: AccountsClient) => {

// }

export let HEADERS = {
  accessToken: ''
};

const apolloClient = new ApolloClient({
  request: async operation => {
    const tokens = await accountsClient.getTokens();
    if (tokens) {
      operation.setContext({
        headers: {
          'accounts-access-token': tokens.accessToken
        }
      });
    }
  },
  uri: 'http://localhost:4000/graphql',
});

const accountsGraphQL = new GraphQLClient({ graphQLClient: apolloClient });
const accountsClient = new AccountsClient({}, accountsGraphQL);
const accountsPassword = new AccountsClientPassword(accountsClient);

export { accountsClient, accountsGraphQL, accountsPassword, apolloClient };
