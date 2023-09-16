import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

import * as cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { useContainer } from "class-validator";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(urlencoded({ extended: true }));

  // Глобальний пайп використовується для валідації, або зміни даних
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

  app.use(cookieParser());

  // enable DI for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

start();
