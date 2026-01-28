# 🌐 Web App Guide

A web app template for integrating [Next][next] on the frontend and [Go][go], [gqlgen][gqlgen], and [LangChain][langchain] on the backend. This guide was created so that I could have a template for a quick web app scaffolding.

You can also check out my more [in-depth tutorial][tutorial] to see how to integrate the Go + gqlgen logic with Next. Stay tuned for a tutorial discussing how to integrate the LangChain agent logic. 

## 🏁 Getting started

Clone the repo and navigate there:

```
git clone https://github.com/anima-kit/web-app-guide.git
cd web-app-guide
```

Create .env file for LLM parameters:

```
cp ./frontend/.env.example ./frontend/.env
```

Build and run Docker containers:

```
docker compose up --build
```

Now the frontend should be running on http://localhost:3000 and the GraphQL backend on http://localhost:8080/. By default, this app uses a local [LM Studio][lm-studio] server to host LLMs which runs on http://locahost:1234.

## 🛠️ Build scaffold by hand

Below are some instructions for building the Next frontend and Go backend by hand. You can also see more details in the [tutorial here][tutorial].  

First, create a space for your project.

```
mkdir web-app-guide
cd web-app-guide
```

Now that we have a place to house our web app, let's focus on setting up the frontend.

### 🖥️ Frontend

Using Next makes setting up a project *ridiculously easy*. With one command, we get all the necessary files for creating a basic frontend project.

1.  Make sure `npm` and `npx` is installed.

    See installation instructions [here][npm-install] (installs Node.js with automatic `npm` install).

1.  Create your Next project: 

    ```
    npx create-next-app@latest frontend --yes
    ```

    > This will create a Next app (in `./frontend`) that uses Typescript for the source code, ESLint for linting, Tailwind CSS for easy component customization, the App Router for navigation, and Turbopack as the bundler.

1.  Serve your app locally to start playing around!

    <a id="serve-frontend"></a>

    ```
    npm run dev
    ```

    > This will serve your app at http://localhost:3000 by default.

And that's it, your frontend scaffold is now set up! If everything worked correctly, you can navigate to http://localhost:3000 (after following [step 3][serve-frontend]). ✨

### 🛠️ Backend 

In this guide, we're going to set up a backend using Go + gqlgen.  My backend choice was mostly due to the fact that I wanted to learn Go and GraphQL (using gqlgen), and I found them to be pretty simple to learn and start playing around with (see [A Tour of Go][go-tour] and [GraphQL's Playground][graphql-playground]).

1.  Make sure Go is installed.

    See installation instructions [here][go-install].

1.  Create your backend directory and navigate there:

    ```
    mkdir backend
    cd backend
    ```

1.  Create your Go project:

    ```
    go mod init github.com/<your-github-handle>/<your-project-name>
    ```

    > This will create a Go project that you can use both locally and through your remote Github repo.

    For example, I created the backend for this guide with: `go mod init github.com/anima-kit/web-app-guide`

1.  Install gqlgen:

    ```
    go get -tool github.com/99designs/gqlgen
    ```

1.  Create the gqlgen scaffold:

    ```
    go tool gqlgen init
    ```

1.  Run the gqlgen server locally:

    ```
    go run ./server.go
    ```

    > This will host the GraphQL Playground on http://localhost:8080/ by default.

And that's it, your backend scaffold is now set up! If everything worked correctly, you can navigate to http://localhost:8080/ (after following [step 6][serve-backend]). ✨

## 🚀 Next Steps

This guide shows how to set up a basic scaffold, but there's still much to learn, like deployment, setting up CI/CD, connecting the backend and frontend logic, testing, formatting, linting. Check out the [full tutorial][tutorial] to see:

-  How to create your own gqlgen schemas and generate the necessary Go code.
-  How to create Next components to interact with your Go backend.
-  How to set up Docker deployment.
-  How to set up a simple CI script.
-  How to add formatting and linting.

I may also add some tutorials for setting up persistence with Postgres and adding LLM logic if time permits.

## ⚙️ Tech 

Thanks to all the projects that make this possible:

- [Apollo][apollo]: Client library for GraphQL management in Next
- [ESLint][eslint]: Frontend linting
- [Go][go]: Backend logic
- [Go CORS][go-cors]: Connecting backend & frontend logic safely
- [golangci-lint][golangci-lint]: Backend formatting and linting
- [gqlgen][gqlgen]: GraphQL on the backend
- [GraphQL][graphql]: Query logic APIs
- [LangChain][langchain]: Agent functionality
- [LM Studio][lm-studio]: Local hosting of LLM server
- [Next][next]: Frontend logic
- [Prettier][prettier]: Frontend formatting
- [Tailwind][tailwind]: CSS customization

## 🔗 Contributing 

This project is a work in progress. If you'd like to suggest or add improvements, clarify your confusion, help others understand, or share your own relevant projects, feel free to contribute through [discussions][discussions]. Check out the [contributing guidelines][contributing] to get started.

## 📑 License

This project is [licensed under MIT][license].

<!-- LINKS -->
[apollo]: https://www.apollographql.com/docs/react
[contributing]: CONTRIBUTING.md
[discussions]: https://github.com/anima-kit/web-app-guide/discussions
[eslint]: https://eslint.org/
[go]: https://go.dev/
[go-cors]: https://github.com/rs/cors
[go-install]: https://go.dev/doc/install
[go-tour]: https://go.dev/tour/welcome/1
[golangci-lint]: https://golangci-lint.run/
[golangci-lint-install]: https://golangci-lint.run/docs/welcome/install/
[gqlgen]: https://gqlgen.com/
[graphql]: https://graphql.org/
[graphql-playground]: https://graphql.org/swapi-graphql/
[jest]: https://jestjs.io/docs/next/testing-frameworks
[langchain]: https://www.langchain.com/
[license]: LICENSE
[lm-studio]: https://lmstudio.ai/
[next]: https://nextjs.org/
[npm-install]: https://nodejs.org/en/download/
[postgres]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[serve-backend]: https://github.com/anima-kit/web-app-guide/blob/main/README.md#serve-backend
[serve-frontend]: https://github.com/anima-kit/web-app-guide/blob/main/README.md#serve-frontend
[tailwind]: https://tailwindcss.com/
[tutorial]: https://anima-kit.github.io/tutorials/applications/web-apps/go-next-basics/