import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './entities/ingredient.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Ingredient.name, schema: IngredientSchema },
        ]),
    ],
    controllers: [IngredientsController],
    providers: [IngredientsService],
})
export class IngredientsModule {}
