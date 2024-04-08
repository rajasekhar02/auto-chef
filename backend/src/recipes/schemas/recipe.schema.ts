import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
    id: false,
})
export class Recipe {
    @Prop({
        type: String,
        unique: true,
        required: true,
        default: function genUUID() {
            return uuid();
        },
    })
    recipe_id: string;
    @Prop()
    name: string;
    @Prop([{ type: String, ref: 'Ingredient', required: true }])
    ingredients: Types.ObjectId[];
    @Prop()
    cuisine: string[];
    @Prop()
    diet: string[];
    @Prop()
    meal_type: string[];
    @Prop()
    youtube_url: string;
    @Prop()
    image_url: string;
    @Prop()
    max_serving: number;
    @Prop()
    min_serving: number;
    @Prop()
    cooking_time_in_mins: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
