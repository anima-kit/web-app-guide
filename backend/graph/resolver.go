package graph

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require
// here.

import (
	"github.com/anima-kit/web-app-guide/graph/model"
)

// Add an in-memory tracker for todos
type Resolver struct {
	todos []*model.Todo
}
