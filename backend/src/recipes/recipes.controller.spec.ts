import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipesService } from './recipes.service';

describe('Recipes Controller', () => {
    let controller: RecipesController;
    let service: RecipesService;
    const createRecipeDto: CreateRecipeDto = {
        name: 'Recipe #1',
        recipe_id: 'a id',
    };
    const mockRecipe = {
        name: 'Recipe #1',
        recipe_id: 'a id',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RecipesController],
            providers: [
                {
                    provide: RecipesService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            {
                                name: 'Recipe #1',
                                breed: 'Bread #1',
                                age: 4,
                            },
                            {
                                name: 'Recipe #2',
                                breed: 'Breed #2',
                                age: 3,
                            },
                            {
                                name: 'Recipe #3',
                                breed: 'Breed #3',
                                age: 2,
                            },
                        ]),
                        create: jest.fn().mockResolvedValue(createRecipeDto),
                    },
                },
            ],
        }).compile();

        controller = module.get<RecipesController>(RecipesController);
        service = module.get<RecipesService>(RecipesService);
    });

    describe('create()', () => {
        it('should create a new recipe', async () => {
            const createSpy = jest
                .spyOn(service, 'create')
                .mockResolvedValueOnce(mockRecipe);

            await controller.create(createRecipeDto);
            expect(createSpy).toHaveBeenCalledWith(createRecipeDto);
        });
    });

    describe('findAll()', () => {
        it('should return an array of recipes', async () => {
            expect(controller.findAll()).resolves.toEqual([
                {
                    name: 'Recipe #1',
                    breed: 'Bread #1',
                    age: 4,
                },
                {
                    name: 'Recipe #2',
                    breed: 'Breed #2',
                    age: 3,
                },
                {
                    name: 'Recipe #3',
                    breed: 'Breed #3',
                    age: 2,
                },
            ]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });
});
