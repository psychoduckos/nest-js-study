import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt.auth.guard";


async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Studing Nest js')
    .setDescription('This is my first expiriens with nest js and swagger')
    .setVersion('1.0.0')
    .addTag('psychoduck')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)


  await app.listen(PORT, () => {
    console.log(`Server was started on PORT: ${PORT}`)
  })
}

main()