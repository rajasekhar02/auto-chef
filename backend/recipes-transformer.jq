.data.Recipes_E3 
| [ 
    .[]  
    |   {
        recipe_id: .id,
        name: .name,
        cuisine: .cuisine,
        diet: .diet,
        meal_type: .meal_type,
        image_url: .Recipe_Variations[0].image_url,
        max_serving: .Recipe_Variations[0].max_serving,
        min_serving: .Recipe_Variations[0].min_serving,
        prep_time: .Recipe_Variations[0].prep_time,
        cooking_time: .Recipe_Variations[0].cooking_time,
        ingredients: .Recipe_Variations[0].ingredients
    }
]