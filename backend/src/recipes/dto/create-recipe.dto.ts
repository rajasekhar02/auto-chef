import { IsNotEmpty, IsUrl, IsUUID } from 'class-validator';
export class CreateRecipeDto {
    @IsNotEmpty()
    @IsUUID('4')
    readonly recipe_id: string;
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly ingredients: string[];
    readonly cuisine: string[];
    readonly diet: string[];
    readonly meal_type: string[];
    @IsUrl()
    readonly youtube_url: string;
    @IsUrl()
    readonly image_url: string;
    readonly max_serving: number;
    readonly min_serving: number;
    readonly cooking_time_in_mins: number;
}
