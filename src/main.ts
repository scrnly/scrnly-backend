import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clerkMiddleware } from '@clerk/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    clerkMiddleware({
      debug: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Server is running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
