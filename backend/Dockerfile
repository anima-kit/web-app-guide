# Dockerfile for Go backend
FROM golang:1.25 AS builder
WORKDIR /app
# Copy and download dependencies
COPY go.mod go.sum ./
RUN go mod download
# Copy all source code and build binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /usr/local/bin/backend .
# Create minimal image and copy binary
FROM scratch
COPY --from=builder /usr/local/bin/backend /
# Define entry point for Docker compose
ENTRYPOINT ["/backend"]
