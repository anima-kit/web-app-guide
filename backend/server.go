package main

import (
	"log"
	"net/http"

	// GraphQL server packages
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"

	// CORS middleware
	"github.com/rs/cors"
	// Query caching
	"github.com/vektah/gqlparser/v2/ast"

	// Local GraphQL functionality
	"github.com/anima-kit/web-app-guide/graph"
)

func main() {
	// Define port
	port := "8080"

	// Create GraphQL server instance
	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// Enable HTTP requests
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	// Cache query options
	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	// Integrate with GraphQL Playground
	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{Cache: lru.New[string](100)})

	// Enable CORS for backend/frontend communication
	graphqlHandler := cors.Default().Handler(srv)

	// Define HTTP routes for GraphQL Playground and endpoint.
	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", graphqlHandler)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	// Start HTTP server
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
