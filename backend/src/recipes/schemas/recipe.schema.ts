import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
