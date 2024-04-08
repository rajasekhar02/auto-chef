export class CreateRecipeDto {
    readonly recipe_id: string;
    readonly name: string;
    readonly ingredients: string[];
    readonly cuisine: string[];
    readonly diet: string[];
    readonly meal_type: string[];
    readonly youtube_url: string;
    readonly image_url: string;
    readonly max_serving: number;
    readonly min_serving: number;
    readonly cooking_time_in_mins: number;
}
