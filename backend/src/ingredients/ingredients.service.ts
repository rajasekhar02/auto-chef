import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IngredientsService {
    constructor(
        @InjectModel(Ingredient.name)
        private ingredientModel: Model<Ingredient>,
    ) {}
    create(createIngredientDto: CreateIngredientDto) {
        const createIngredient =
            this.ingredientModel.create(createIngredientDto);
        return createIngredient;
    }

    findAll() {
        return this.ingredientModel.find().exec();
    }

    findOne(ingredientId: string) {
        return this.ingredientModel
            .findOne({ ingredient_id: ingredientId })
            .exec();
    }

    async update(
        ingredientId: string,
        updateIngredientDto: UpdateIngredientDto,
    ) {
        const updatedRecipe = await this.ingredientModel
            .findOneAndUpdate(
                { ingredient_id: ingredientId },
                updateIngredientDto,
                {
                    new: true,
                },
            )
            .exec();
        return updatedRecipe;
    }

    async remove(ingredient_id: string) {
        const deletedRecipe = await this.ingredientModel
            .findOneAndDelete({
                ingredient_id: ingredient_id,
            })
            .exec();
        return deletedRecipe;
    }
}
