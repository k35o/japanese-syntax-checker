import { Hono } from 'hono';
import { validator } from 'hono/validator'
import { z } from "zod";
import { lintText } from "./textlint.ts";

const app = new Hono()

const schema = z.object({
    text: z.string(),
});

app.post('/api',
  validator('json', (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json({
        msg: "Invalid body"
      }, 400);
    }

    return parsed.data;
  }),
  async (c) => {
  const result = await lintText(c.req.valid('json').text);
  return c.json({
    text: c.req.valid('json').text,
    msgs: result.messages,
  }, 200);
})

Deno.serve(app.fetch)
