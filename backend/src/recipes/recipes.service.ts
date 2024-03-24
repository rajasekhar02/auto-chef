import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDTO } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel('RecipeDBSchema') private recipeModel: Model<Recipe>,
    ) {}

    async createRecipe(CreateRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
        console.log(CreateRecipeDTO);
        const recipe = new this.recipeModel(CreateRecipeDTO);
        const dbResp = await recipe.save();
        console.log(dbResp);
        return dbResp;
    }

    async deleteRecipe(recipeID: string): Promise<Recipe> {
        const deletedRecipe = await this.recipeModel.findOneAndDelete({
            recipe_id: recipeID,
        });
        console.log(deletedRecipe, recipeID);
        return deletedRecipe;
    }

    async getRecipe(recipeID: string): Promise<Recipe> {
        const recipe = await this.recipeModel.findOne({ recipe_id: recipeID });
        return recipe;
    }

    async getRecipes(): Promise<Recipe[]> {
        const recipes = await this.recipeModel.find();
        return recipes;
    }

    async updateRecipe(
        recipeID: string,
        CreateRecipeDTO: CreateRecipeDTO,
    ): Promise<Recipe> {
        const updatedRecipe = await this.recipeModel.findOneAndUpdate(
            { recipe_id: recipeID },
            CreateRecipeDTO,
            { new: true },
        );
        return updatedRecipe;
    }
}
