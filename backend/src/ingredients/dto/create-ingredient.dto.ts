export class CreateIngredientDto {
    readonly ingredient_id: string;
    readonly allergens: string[];
    readonly name: string;
}
