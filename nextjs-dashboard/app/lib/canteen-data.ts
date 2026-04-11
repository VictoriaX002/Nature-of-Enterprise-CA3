export type CanteenMenuItem = {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  mealPeriod: 'Breakfast' | 'Lunch' | 'Dinner';
  name: string;
  description: string;
  allergens: string[];
  dietaryTags: Array<'Vegan' | 'Vegetarian' | 'Halal-Friendly' | 'Gluten-Free'>;
  priceLabel: string;
};

export const fallbackCanteenMenu: CanteenMenuItem[] = [
  {
    id: 'm-breakfast-oats',
    day: 'Monday',
    mealPeriod: 'Breakfast',
    name: 'Berry Overnight Oats',
    description: 'Rolled oats with oat milk, mixed berries, and maple drizzle.',
    allergens: ['Oats'],
    dietaryTags: ['Vegan', 'Gluten-Free'],
    priceLabel: '$4.50',
  },
  {
    id: 'm-lunch-wrap',
    day: 'Monday',
    mealPeriod: 'Lunch',
    name: 'Roasted Veggie Wrap',
    description: 'Wholegrain wrap with roast pumpkin, spinach, and hummus.',
    allergens: ['Sesame', 'Wheat'],
    dietaryTags: ['Vegan'],
    priceLabel: '$8.00',
  },
  {
    id: 'm-dinner-curry',
    day: 'Monday',
    mealPeriod: 'Dinner',
    name: 'Chickpea Coconut Curry',
    description: 'Mild curry served with steamed jasmine rice.',
    allergens: ['Coconut'],
    dietaryTags: ['Vegan', 'Gluten-Free'],
    priceLabel: '$10.00',
  },
  {
    id: 't-lunch-bowl',
    day: 'Tuesday',
    mealPeriod: 'Lunch',
    name: 'Falafel Grain Bowl',
    description: 'Quinoa, falafel, cucumber salad, and tahini dressing.',
    allergens: ['Sesame'],
    dietaryTags: ['Vegetarian', 'Halal-Friendly'],
    priceLabel: '$9.50',
  },
  {
    id: 'w-dinner-pasta',
    day: 'Wednesday',
    mealPeriod: 'Dinner',
    name: 'Tomato Basil Pasta',
    description: 'Penne pasta in rich tomato sauce with basil.',
    allergens: ['Wheat'],
    dietaryTags: ['Vegetarian'],
    priceLabel: '$9.00',
  },
  {
    id: 'th-breakfast-omelette',
    day: 'Thursday',
    mealPeriod: 'Breakfast',
    name: 'Spinach Omelette',
    description: 'Free-range eggs, spinach, and mushrooms with toast.',
    allergens: ['Eggs', 'Wheat'],
    dietaryTags: ['Vegetarian'],
    priceLabel: '$6.00',
  },
  {
    id: 'f-lunch-chicken',
    day: 'Friday',
    mealPeriod: 'Lunch',
    name: 'Lemon Herb Chicken',
    description: 'Grilled chicken with potato mash and green beans.',
    allergens: [],
    dietaryTags: ['Halal-Friendly', 'Gluten-Free'],
    priceLabel: '$10.50',
  },
];
