import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const router = new Router();
router
  .post("/", async (context) => {
    const body = context.request.body();
    if (body.type !== "json") {
      context.response.status = 400;
      context.response.body = { msg: "Invalid body type" };
      return;
    }
    context.response.body = await body.value;
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
