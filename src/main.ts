import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cookieParser from "cookie-parser";
import { urlencoded } from "express";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Глобальний пайп використовується для валідації, або зміни даних
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: process.env.CLIENT_URL });

  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));

  await app.listen(PORT, () => {
    console.log("Server started on port");
  });
}

start();
