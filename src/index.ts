import { Tracer, Span } from "opentracing";

export type Action =
  | "findOne"
  | "findMany"
  | "create"
  | "update"
  | "updateMany"
  | "upsert"
  | "delete"
  | "deleteMany"
  | "executeRaw"
  | "queryRaw"
  | "aggregate";

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string;
  action: Action;
  args: any;
  dataPath: string[];
  runInTransaction: boolean;
};

export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>
) => Promise<T>;

export function createTracerMiddleware(tracer: Tracer) {
  return async function prismaTracerMiddleware(
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<any>
  ) {
    let span: Span;

    if (tracer) {
      try {
        span = tracer.startSpan(`${params.model}.${params.action}`, {
          tags: {
            args: JSON.stringify(params.args),
            type: `db.prisma.query`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }

    const result = await next(params);

    if (span) {
      span.finish();
    }

    return result;
  };
}
