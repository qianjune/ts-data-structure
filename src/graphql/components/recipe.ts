import { Arg, Authorized, Ctx, Field, ID, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Recipe {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}

@Resolver()
class RecipeResolver {
  // constructor(private recipeService: RecipeService) {}

  @Query(returns => Int)
  async recipe() {
    const recipe = 1;
    if (recipe === undefined) {
      throw new Error('1');
    }
    return recipe;
  }
}

export { RecipeResolver }