import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                console.log(config);
                return {
                    uri: config.get<string>('MONGODB_CONNECTION'), // Loaded from .ENV
                };
            },
        }),
        RecipesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
