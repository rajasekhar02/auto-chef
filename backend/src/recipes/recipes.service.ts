import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

    async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const createRecipe = this.recipeModel.create(createRecipeDto);
        return createRecipe;
    }

    async delete(recipeID: string): Promise<Recipe> {
        const deletedRecipe = await this.recipeModel
            .findOneAndDelete({
                recipe_id: recipeID,
            })
            .exec();
        return deletedRecipe;
    }

    async findOne(recipeID: string): Promise<Recipe> {
        return this.recipeModel.findOne({ recipe_id: recipeID }).exec();
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeModel.find().exec();
    }

    async update(
        recipeID: string,
        CreateRecipeDto: CreateRecipeDto,
    ): Promise<Recipe> {
        const updatedRecipe = await this.recipeModel
            .findOneAndUpdate({ recipe_id: recipeID }, CreateRecipeDto, {
                new: true,
            })
            .exec();
        return updatedRecipe;
    }
}
