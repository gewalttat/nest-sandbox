import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
    const PORT = process.env.PORT || 5000;
    /** app creation */
    const app = await NestFactory.create(AppModule);

    const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest practice')
    .setDescription('api docs')
    .setVersion('1.0.0')
    .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, swaggerDocument);
    
    /** listener */
    await app.listen(PORT, () => console.log(`started on ${PORT}`));
}

start();