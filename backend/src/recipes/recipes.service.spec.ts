import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RecipesService } from './recipes.service';
import { Recipe } from './schemas/recipe.schema';

const mockRecipe = {
    name: 'Recipe #1',
    recipe_id: 'recipe id 1',
};

describe('RecipesService', () => {
    let service: RecipesService;
    let model: Model<Recipe>;

    const recipesArray = [
        {
            name: 'Recipe #1',
            recipe_id: 'recipe_id 1',
        },
        {
            name: 'Recipe #2',
            recipe_id: 'recipe_id 2',
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecipesService,
                {
                    provide: getModelToken('Recipe'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockRecipe),
                        constructor: jest.fn().mockResolvedValue(mockRecipe),
                        find: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RecipesService>(RecipesService);
        model = module.get<Model<Recipe>>(getModelToken('Recipe'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all recipes', async () => {
        jest.spyOn(model, 'find').mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(recipesArray),
        } as any);
        const recipes = await service.findAll();
        expect(recipes).toEqual(recipesArray);
    });

    it('should insert a new recipe', async () => {
        jest.spyOn(model, 'create').mockImplementationOnce(() =>
            Promise.resolve({
                name: 'Recipe #1',
                recipe_id: 'recipe id 1',
            } as any),
        );
        const newRecipe = await service.create({
            name: 'Recipe #1',
            recipe_id: 'recipe id 1',
        });
        expect(newRecipe).toEqual(mockRecipe);
    });
});
