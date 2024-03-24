import {
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Res,
    HttpStatus,
    Body,
    Param,
} from '@nestjs/common';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { RecipeService } from './recipes.service';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Post('')
    async createRecipe(
        @Res() res,
        @Body() createRecipeDTO: CreateRecipeDTO,
    ): Promise<JSON> {
        const createdRecipe =
            await this.recipeService.createRecipe(createRecipeDTO);

        return res.status(HttpStatus.OK).json({
            data: createdRecipe,
            message: 'Recipe was successfully created.',
            status: HttpStatus.OK,
        });
    }

    @Delete(':recipe_id')
    async deleteRecipe(@Res() res, @Param('recipe_id') id): Promise<JSON> {
        let jsonResponse;
        try {
            const deletedRecipe = await this.recipeService.deleteRecipe(id);
            jsonResponse = {
                data: deletedRecipe,
                message: `${deletedRecipe.name} Recipe was deleted.`,
                status: HttpStatus.OK,
            };
        } catch (error) {
            jsonResponse = {
                data: null,
                message: `Recipe with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND,
            };
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Get('')
    async getAllRecipes(@Res() res): Promise<JSON> {
        const recipes = await this.recipeService.getRecipes();

        return res.status(HttpStatus.OK).json({
            data: recipes,
            message: 'Returning all recipes.',
            status: HttpStatus.OK,
        });
    }

    @Get(':id')
    async getRecipeById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const recipe = await this.recipeService.getRecipe(id);
            jsonResponse = {
                data: recipe,
                message: `Returning recipe ${id}.`,
                status: HttpStatus.OK,
            };
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Recipe with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND,
            };
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Put(':id')
    async updateRecipe(
        @Res() res,
        @Body() createRecipeDTO: CreateRecipeDTO,
        @Param('id') id,
    ): Promise<JSON> {
        let jsonResponse;
        console.log(id);
        try {
            const recipe = await this.recipeService.updateRecipe(
                id,
                createRecipeDTO,
            );
            jsonResponse = {
                data: recipe,
                message: `Returning updated recipe ${id}.`,
                status: HttpStatus.OK,
            };
        } catch (error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Recipe with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND,
            };
        }
        return res.status(jsonResponse.status).json(jsonResponse);
    }
}
