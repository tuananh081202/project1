import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';//static file
import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);// stactic file
  const config = new DocumentBuilder()
    .setTitle('APIs')
    .setDescription('APIs')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addBearerAuth()
    .build();
  
  // app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../../'));
  await app.listen(3000);
}
bootstrap();
