## Getting Started 🚀

### Prerequisites

- Node - v20
- Package manager (pnpm preferred)

### Steps to run the project

- Install the package `pnpm i`
- Set up the environment variables. See Below.
- Run the project using `pnpm dev`

### Testing the project

Run the command `pnpm test` . Uses the following tools:

- jest
- supertest

# Setting up environment variables

Environment variables need to be setup with the prefix `VENDING_MACHINE_`.
<br/>
For example:

```sh
VENDING_MACHINE_PORT = 8000
```

They can be inserted directly from the process or loaded from .env file while develpoing.
<br/>
To load from .env file, copy the .env.example to .env and make modifications as needed.

```
cp .env.example .env
```
