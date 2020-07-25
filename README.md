# prisma-opentracing-middleware

[Prisma](https://www.prisma.io/) (2) Client middleware.

## Required Reading

Middlewares are an experimental feature. Read more about them [here](https://github.com/prisma/prisma/releases/tag/2.3.0)

## Quick Start

Install the package using `yarn`:

```bash
yarn add prisma-opentracing-middleware
```

### Feature flag
Middlewares need to be enabled with the feature flag middlewares like so:

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["middlewares"]
}
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
