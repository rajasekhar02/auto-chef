import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
    id: false,
})
export class Ingredient {
    @Prop({
        type: String,
        unique: true,
        required: true,
        default: function genUUID() {
            return uuid();
        },
    })
    ingredient_id: string;

    @Prop()
    name: string;

    @Prop()
    allergens: string[];
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
