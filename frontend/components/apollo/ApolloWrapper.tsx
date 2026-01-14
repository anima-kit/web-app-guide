"use client";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "@/components/apollo/apolloClient";
import { ApolloWrapperProps } from "@/types/apollo";

// Wrap all children with ApolloProvider to use GraphQL API
export default function ApolloWrapper({ children }: ApolloWrapperProps) {
  // Use our Apollo client in the provider
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
