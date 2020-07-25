# prisma-opentracing-middleware

Prisma (2) Client middleware.

## Required Reading

Middlewares are an experimental feature. Read more about them [here](https://github.com/prisma/prisma/releases/tag/2.3.0)

## Quick Start

Install the package using `yarn`:

```bash
yarn add prisma-opentracing-middleware
```

## Code

```js
import { PrismaClient } from "@prisma/client";
import { createTracerMiddleware } from "prisma-opentracing-middleware";
import { Tracer } from "elastic-apm-node-opentracing";

const db = new PrismaClient();

const tracer = new Tracer();

db.use(createTracerMiddleware(tracer));
```
