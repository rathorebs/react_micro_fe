import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";

import constants from "../utils/constants";

const httpLink = createHttpLink({
  uri: constants.API_URL,
  fetchOptions: {
    keepalive: true,
  },
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const authenticationFailed = () => {
  alert("Your token has expired. Please log in again.");
};

const errorControl = onError(({ graphQLErrors, operation }) => {
  const { response } = operation.getContext();
  if (response?.status === 401) {
    authenticationFailed();
  } else if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (
        message === "Error decoding signature" ||
        message === "User is disabled"
      ) {
        authenticationFailed();
      }
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Authtoken");

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: errorControl.concat(retryLink.concat(authLink.concat(httpLink))),
  cache: new InMemoryCache(),
});

export default function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
