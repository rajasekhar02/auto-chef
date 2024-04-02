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

    create(
        createIngredientDto: CreateIngredientDto[],
    ): Promise<CreateIngredientDto[]> {
        const createIngredients =
            this.ingredientModel.insertMany(createIngredientDto);
        return createIngredients;
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
        const updatedIngredient = await this.ingredientModel
            .findOneAndUpdate(
                { ingredient_id: ingredientId },
                updateIngredientDto,
                {
                    new: true,
                },
            )
            .exec();
        return updatedIngredient;
    }

    async remove(ingredient_ids: string[]) {
        // TODO: provide proper response to notify the successfull deletion
        // TODO: provide proper response to notify error
        const deleteIngredients = await this.ingredientModel
            .deleteMany({
                ingredient_id: { $in: ingredient_ids },
            })
            .exec();
        console.log(deleteIngredients);
        return deleteIngredients;
    }
}
