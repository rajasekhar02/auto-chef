import {
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Body,
    Param,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from './schemas/recipe.schema';

@Controller('recipes')
export class RecipesController {
    constructor(private recipeService: RecipesService) {}

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto) {
        await this.recipeService.create(createRecipeDto);
    }

    @Delete(':recipe_id')
    async delete(@Param('recipe_id') id) {
        await this.recipeService.delete(id);
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.recipeService.findAll();
    }

    @Get(':recipe_id')
    async findOneByRecipeId(@Param('recipe_id') id): Promise<Recipe> {
        return this.recipeService.findOne(id);
    }

    @Put(':recipe_id')
    async update(
        @Body() createRecipeDto: CreateRecipeDto,
        @Param('recipe_id') id,
    ) {
        await this.recipeService.update(id, createRecipeDto);
    }
}
