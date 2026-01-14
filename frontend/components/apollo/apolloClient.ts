import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create ApolloClient instance
const client = new ApolloClient({
  // Send requests to GraphQL endpoint and use in-memory cache
  link: new HttpLink({ uri: "http://localhost:8080/query" }),
  cache: new InMemoryCache(),
});

export default client;
