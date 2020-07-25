import { createTracerMiddleware } from "./";

import { MockTracer } from "opentracing";

describe(`middleware`, () => {
  it(`should create a span and finish`, async () => {
    const mockTracer = new MockTracer();

    const startSpanSpy = spyOn(mockTracer, "startSpan");

    const middleware = createTracerMiddleware(mockTracer);

    const next = jest.fn(() => Promise.resolve("result"));

    const val = await middleware(
      {
        args: { where: { foo: "bar" } },
        action: "create",
        model: "User",
        dataPath: [],
        runInTransaction: false,
      },
      next
    );

    expect(startSpanSpy).toHaveBeenCalledWith(`User.create`, {
      tags: {
        args: JSON.stringify({ where: { foo: "bar" } }),
        type: `db.prisma.query`,
      },
    });

    expect(next).toHaveBeenCalled();

    expect(val).toBe(`result`);
  });
});
