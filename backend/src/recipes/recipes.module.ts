import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { RecipeSchema, Recipe } from './schemas/recipe.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Recipe.name, schema: RecipeSchema },
        ]),
    ],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
