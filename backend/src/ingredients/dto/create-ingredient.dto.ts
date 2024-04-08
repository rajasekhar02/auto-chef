import { IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
    readonly ingredient_id: string;
    readonly allergens: string[];
    @IsNotEmpty()
    readonly name: string;
}
