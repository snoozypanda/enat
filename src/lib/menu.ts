export type MenuDish = {
  id: string;
  category: string;
  name: string;
  description: string;
  detail: string;
  price: string;
  image: string;
  tag: string;
};

const images = {
  breakfast: '/menu-assets/menu-breakfast-ful-medames.jpg',
  breakfastSpiced: '/menu-assets/menu-starters-ethiopian.jpg',
  starters: '/menu-assets/menu-starters-ethiopian.jpg',
  hummus: '/menu-assets/menu-starters-hummus.jpg',
  sambusa: '/menu-assets/menu-starters-sambusa.jpg',
  vegetarian: '/menu-assets/menu-vegetarian-fasting-platter.jpg',
  doroWot: '/menu-assets/menu-mains-doro-wat.jpg',
  tibs: '/room-gallery/kitfo-and-tibs.jpg',
  kitfo: '/menu-assets/enat-kitfo.jpg',
  fish: '/menu-assets/menu-fish-tilapia.jpg',
  specials: '/room-gallery/house-specials.jpg',
  packages: '/menu-assets/menu-platter-ethiopian.jpg',
  coffee: '/menu-assets/menu-coffee-ceremony.jpg',
  drinks: '/menu-assets/enat-coffee.jpg',
};

const dish = (
  id: string,
  category: string,
  name: string,
  description: string,
  price: string,
  image: string,
  tag: string,
): MenuDish => ({
  id,
  category,
  name,
  description,
  detail: description,
  price,
  image,
  tag,
});

export const menuDishes: MenuDish[] = [
  // Breakfast
  dish('enkulal-firfir', 'breakfast', 'Enkulal Firfir', 'Scrambled eggs, onions, tomatoes served with bread.', '10', images.breakfastSpiced, 'breakfast'),
  dish('fata', 'breakfast', 'Fata', 'Bread in spicy tomato sauce topped with yoghurt.', '10', images.breakfastSpiced, 'breakfast'),
  dish('fata-special', 'breakfast', 'Fata Special', 'Bread in spicy tomato sauce topped with yoghurt.', '14', images.breakfastSpiced, 'breakfast'),
  dish('ful', 'breakfast', 'Ful', 'Fava beans, onion and tomatoes topped with green chilli.', '10', images.breakfast, 'breakfast'),
  dish('ful-special', 'breakfast', 'Ful Special', 'Bread in spicy tomato sauce topped with yoghurt.', '14', images.breakfast, 'breakfast'),
  dish('genfo', 'breakfast', 'Genfo', 'Powdered barley cooked in butter and served with spices.', '12', images.breakfast, 'breakfast'),
  dish('bula', 'breakfast', 'Bula', 'Bula mixed with butter and sprinkled with spices.', '12', images.breakfast, 'breakfast'),
  dish('bula-special', 'breakfast', 'Bula Special', 'Bula mixed with butter and sprinkled with spices.', '16', images.breakfast, 'breakfast'),
  dish('bula-bekitfo', 'breakfast', 'Bula Be’Kitfo', 'Bula served with Kitfo.', '25', images.kitfo, 'breakfast'),
  dish('chechebsa', 'breakfast', 'Chechebsa', 'Pieces of flatbread mixed with spiced butter and berbere.', '15', images.breakfastSpiced, 'breakfast'),

  // Starters and sides
  dish('kategna', 'starters', 'Kategna', 'Fresh injera topped with spiced butter and berbere.', '8', images.starters, 'starter'),
  dish('spinach-roll', 'starters', 'Spinach Roll', 'Pastry roll filled with seasoned spinach.', '7', images.starters, 'starter'),
  dish('beetroot-roll', 'starters', 'Beetroot Roll', 'Pastry roll filled with seasoned beetroot.', '7', images.starters, 'starter'),
  dish('hummus', 'starters', 'Hummus', 'Cooked & mashed chick peas blended with tahini, olive oil, garlic', '7', images.hummus, 'starter'),
  dish('samosa', 'starters', 'Samosa', 'Fried pastry with a savoury filling of mixed vegetables.', '5', images.sambusa, 'starter'),
  dish('habesha-salad', 'starters', 'Habesha Salad', 'Finely chopped fresh tomatoes, onion and green chillies in olive oil and freshly squeezed lemon.', '5', images.starters, 'starter'),
  dish('salad', 'starters', 'Salad', 'Lettuce, tomatoes, green peppers and cucumbers in olive oil and freshly squeezed lemon.', '5', images.starters, 'starter'),
  dish('sing-qarya', 'starters', 'Sing Q’arya', 'Green chillies stuffed with finely chopped tomatoes — 3 pieces.', '3', images.starters, 'starter'),
  dish('side-dishes', 'starters', 'Side Dishes', 'A selection of side dishes; ask for details.', '9', images.starters, 'side'),
  dish('side-vegetable-dish', 'starters', 'Side Vegetable Dish', 'A selection of fresh vegetables cooked with Ethiopian spices.', '10', images.vegetarian, 'side'),
  dish('side-special-kitfo', 'starters', 'Side Special Kitfo', 'Finely chopped lean beef prepared with Ethiopian butter (Kibe) and Mitmita, served as a side.', '10', images.kitfo, 'side'),

  // Vegetarian
  dish('shiro', 'vegetarian', 'Shiro', 'Ground chickpea stew with onion, garlic and spices.', '14', images.vegetarian, 'vegan'),
  dish('shimbra-asa', 'vegetarian', 'Shimbra Asa / Chickpea Flour “Fish”', 'Crispy, spiced chickpea flour shaped and cooked like fish.', '15', images.vegetarian, 'vegan'),
  dish('suf-fitfit', 'vegetarian', 'Suf Fitfit / Oat', 'Soft oats mixed with fresh injera and seasoned with Ethiopian spices.', '6', images.vegetarian, 'vegan'),
  dish('ater-fitfit', 'vegetarian', 'Ater Fitfit', 'Split peas mixed with fresh injera, turmeric sauce and Ethiopian spices.', '8', images.vegetarian, 'vegan'),
  dish('ye-dinch-salad', 'vegetarian', 'Ye Dinch Salad / Ethiopian Potato Salad', 'Boiled potatoes mixed with fresh vegetables and a light dressing.', '10', images.vegetarian, 'vegan'),
  dish('dinch-wot', 'vegetarian', 'Dinch Wot / Potato Stew', 'Potatoes slowly cooked in a rich Ethiopian spiced sauce.', '12', images.vegetarian, 'vegan'),
  dish('yetsom-awaze-tibs', 'vegetarian', 'Yetsom Awaze Tibs / Fasting Awaze Tibs', 'Tender plant-based pieces sautéed with tomatoes, onions and spicy awaze.', '13', images.vegetarian, 'vegan'),
  dish('ye-som-enkulal-firfir', 'vegetarian', 'Ye-Som Enkulal Firfir / Fasting “Egg”', 'A plant-based egg-style dish mixed with injera and Ethiopian spices.', '14', images.vegetarian, 'vegan'),
  dish('timatim-lebleb', 'vegetarian', 'Timatim Lebleb / Spicy Tomatoes', 'Fresh tomatoes, onions and peppers tossed with Ethiopian spices.', '10', images.vegetarian, 'vegan'),
  dish('yetsome-beyaynetu', 'vegetarian', 'Ye’Tsome Beyanetu', 'Mixed vegan platter, Fasolia, Aterkik, Miser and Gomen.', '16', images.vegetarian, 'vegan'),
  dish('yetsome-special', 'vegetarian', 'Ye’Tsome Special', 'Powdered chickpeas, onions and garlic cooked in rich and tasty sauce topped with green chilli.', '40', images.vegetarian, 'vegan'),
  dish('yetsome-50-50', 'vegetarian', 'Ye’Tsome 50/50', 'Half and half of main vegetarian dishes.', '15', images.vegetarian, 'vegan'),
  dish('yetsome-firfir', 'vegetarian', 'Yetsome Firfir', 'Injera mixed with spiced sauce and vegetables.', '14', images.vegetarian, 'vegan'),
  dish('yetsome-dulet', 'vegetarian', 'Ye’tsome Dulet', 'Finely chopped vegetables and lentils cooked with Ethiopian spices.', '14', images.vegetarian, 'vegan'),
  dish('pasta-beatkilt', 'vegetarian', 'Pasta Be’Atkilt', 'Pasta mixed with fresh vegetables and Ethiopian spices.', '15', images.vegetarian, 'vegan'),
  dish('pasta-besgo', 'vegetarian', 'Pasta Be’Sgo', 'Pasta cooked with onions, tomatoes and Ethiopian spices.', '14', images.vegetarian, 'vegan'),
  dish('vegetable-anababero', 'vegetarian', 'Vegetable Anababero', 'A pancake-like Ethiopian dish served with a variety of vegetable stews, including lentils, mixed vegetables, split peas, and collard greens.', '10', images.vegetarian, 'vegan'),

  // Mains
  dish('doro-wot', 'mains', 'Doro Wot', 'Tender chicken slow cooked to perfection in a spicy berbere stew.', '16', images.doroWot, 'main'),
  dish('doro-awaze', 'mains', 'Doro Awaze', 'Tender boneless chicken sautéed in an awaze-based sauce.', '15', images.doroWot, 'main'),
  dish('doro-lega', 'mains', 'Doro Lega', 'Boneless chicken sautéed with onion, spices and mixed herbs.', '15', images.doroWot, 'main'),
  dish('miser-besega', 'mains', 'Miser Be’Sega', 'Cubed lean beef cooked in a spicy red lentil sauce.', '15', images.tibs, 'main'),
  dish('bozena-shiro', 'mains', 'Bozena Shiro', 'Chopped lean lamb in shiro cooked with onion, garlic and pepper.', '16', images.tibs, 'main'),
  dish('obama', 'mains', 'Obama', 'Finely chopped lean beef, cottage cheese, spinach and Kibe.', '18', images.kitfo, 'main'),
  dish('tibetegna', 'mains', 'Tibetegna', 'Kitfo mixed with green chillies, onions and cottage cheese.', '17', images.kitfo, 'main'),
  dish('lega-yebeg-tibs', 'mains', 'Lega Ye’Beg Tibs', 'Cubes of lean lamb cooked with onions, garlic and traditional spices.', '15', images.tibs, 'main'),
  dish('awaze-tibs', 'mains', 'Awaze Tibs', 'Tender lamb cubes cooked in traditional spiced awaze sauce.', '15', images.tibs, 'main'),
  dish('alicha-fitfit-kikel', 'mains', 'Alicha Fitfit (Kikel)', 'Rolled pieces of injera soaked in mild lamb stew.', '15', images.tibs, 'main'),
  dish('quanta-firfir', 'mains', 'Quanta Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce.', '17', images.tibs, 'main'),
  dish('tibis-firfir', 'mains', 'Tibis Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce.', '16', images.tibs, 'main'),
  dish('gomen-besiga', 'mains', 'Gomen Be’Siga', 'Cubed lamb cooked with spinach in traditional herbs and spices.', '15', images.tibs, 'main'),
  dish('geba-weta', 'mains', 'Geba Weta', 'Cubes of beef cooked with onion, garlic and traditional Ethiopian spices.', '18', images.tibs, 'main'),
  dish('kitfo', 'mains', 'Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita).', '16', images.kitfo, 'main'),
  dish('special-kitfo', 'mains', 'Special Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita), served with cottage cheese and spinach.', '18', images.kitfo, 'main'),
  dish('derek-tibs', 'mains', 'Derek Tibs', 'Lean and tender beef fried with onions, chilli and rosemary.', '19', images.tibs, 'main'),
  dish('goden-tibs', 'mains', 'Goden Tibs', 'Sizzling lamb ribs cooked with onion, rosemary and traditional spices.', '18', images.tibs, 'main'),
  dish('gaslight-tibs', 'mains', 'Gaslight Tibs', 'Tender meat quickly sautéed at high heat with onions, garlic and spices.', '18', images.tibs, 'main'),
  dish('dulet', 'mains', 'Dulet', 'Finely chopped lamb tripe, minced liver and beef cooked in spices.', '15', images.tibs, 'main'),
  dish('yebeg-wot', 'mains', 'Ye’Beg Wot', 'Cubes of lean lamb prepared in a spicy berbere-based stew.', '15', images.doroWot, 'main'),
  dish('gored-gored', 'mains', 'Gored Gored', 'Cubed raw beef mixed with mitmita, butter and spices.', '15', images.kitfo, 'main'),

  // Fish
  dish('asa-goulash', 'fish', 'Asa Goulash / Tilapia Goulash', 'Tender tilapia cooked in a rich tomato and vegetable sauce, served with rice and fresh vegetables.', '15', images.fish, 'fish'),
  dish('asa-tilapia', 'fish', 'Asa Tilapia / Fried Tilapia', 'Crispy fried tilapia served with rice and fresh vegetables.', '15', images.fish, 'fish'),
  dish('spicy-fish-fillet', 'fish', 'Spicy Fish Fillet', 'Tender fish fillet in a bold spicy sauce, served with rice and vegetables.', '15', images.fish, 'fish'),

  // Enat special
  dish('enat-yetaba-kintot', 'enat special', "Enat Yet'aba Kintot", 'Kitfo / minced beef, Obama / special beef, Gored Gored, Derek Awaze / spicy grilled beef, Ayib / cottage cheese, Ayib Begomen / cottage cheese and greens, Gomen Be’Sega / greens and beef.', '55', images.specials, 'sharing'),
  dish('enat-50-50', 'enat special', 'Enat 50/50', 'Half and half of two main dishes of your choice.', '16/18', images.specials, 'sharing'),
  dish('half-kornis', 'enat special', 'Half Kornis', 'Quanta Firfir, Kitfo, Dulet, Lega Tibs and Gomen Be’Sega.', '40', images.specials, 'sharing'),
  dish('kornis', 'enat special', 'Kornis', 'Quanta Firfir, Kitfo, Dulet, Lega Tibs and Gomen Be’Sega. For 2 or 3 people.', '75', images.specials, 'sharing'),
  dish('enat-maheberawi-1', 'enat special', 'Enat Maheberawi I', 'Kitfo, Dulet, Awaze Tibs, Aliche and Gomen.', '50', images.specials, 'sharing'),
  dish('enat-maheberawi-2', 'enat special', 'Enat Maheberawi II', 'Kitfo, Obama, Dulet, Gomen Be’Sega and Derek Tibs.', '50', images.specials, 'sharing'),
  dish('enat-maheberawi-3', 'enat special', 'Enat Maheberawi III', 'Doro Wot, Ye’Beg Wot, Lega Tibs, Ayib, Gomen Be’Sega and Derek Tibs.', '50', images.specials, 'sharing'),

  // Packages
  dish('mulu-doro-package', 'packages', 'Mulu Doro Package', 'A traditional Ethiopian chicken package served with 12 eggs and 4 pieces of injera with Ayib / cottage cheese.', '70', images.packages, 'package'),
  dish('agelgil-yetsom', 'packages', 'Agelgil Yetsom', 'A traditional Ethiopian platter featuring a variety of flavourful vegetarian dishes and vegetable wots.', '40', images.packages, 'package'),
  dish('agelgil-yefsig', 'packages', 'Agelgil Yefsig / Meat Platter', 'A traditional Ethiopian platter featuring a selection of flavourful meat dishes and traditional Ethiopian specialities.', '40', images.packages, 'package'),

  // Coffee ceremony
  dish('ye-jebena-buna', 'coffee ceremony', 'Ye’ Jebena Buna', 'A pot of coffee.', '12.00', images.coffee, 'coffee'),
  dish('ye-sini-buna', 'coffee ceremony', 'Ye’ Sini Buna', 'A cup of coffee.', '3.00', images.coffee, 'coffee'),

  // Drinks, beer and wine
  dish('still-water', 'drinks', 'Still Water', 'Still water.', '1.00', images.drinks, 'drink'),
  dish('sparkling-water', 'drinks', 'Sparkling Water', 'Sparkling water.', '2.00', images.drinks, 'drink'),
  dish('soft-drinks', 'drinks', 'Soft Drinks', 'Soft drinks.', '1.50', images.drinks, 'drink'),
  dish('spiced-tea', 'drinks', 'Spiced Tea', 'Spiced tea.', '2.00', images.drinks, 'drink'),
  dish('latte', 'drinks', 'Latte', 'Latte.', '3.50', images.drinks, 'drink'),
  dish('beer', 'drinks', 'Beer', 'Beer.', '3.00', images.drinks, 'beer & wine'),
  dish('glass-of-wine', 'drinks', 'Glass of Wine', 'Glass of wine.', '6.00', images.drinks, 'beer & wine'),
  dish('bottle-of-wine', 'drinks', 'Bottle of Wine', 'Bottle of wine.', '17.00', images.drinks, 'beer & wine'),
  dish('single-whiskey', 'drinks', 'Single Whiskey', 'Single whiskey.', '4.00', images.drinks, 'beer & wine'),
  dish('areke-single', 'drinks', 'Areke Single', 'Single serving of areke.', '3.00', images.drinks, 'beer & wine'),
  dish('glass-of-tej', 'drinks', 'Glass of Tej', 'Traditional honey wine served by the glass.', '5', images.drinks, 'beer & wine'),
  dish('bottle-of-tej', 'drinks', 'Bottle of Tej', 'Traditional honey wine served by the bottle.', '22.00', images.drinks, 'beer & wine'),
];

// These are the supplied, current menu entries. Keep their current copy when
// an older admin save is loaded, while preserving each dish's availability.
export const canonicalCatalogDishIds = new Set([
  'yetsome-beyaynetu',
  'yetsome-special',
  'yetsome-50-50',
  'yetsome-firfir',
  'yetsome-dulet',
  'pasta-beatkilt',
  'pasta-besgo',
  'vegetable-anababero',
  'enat-yetaba-kintot',
  'enat-50-50',
  'half-kornis',
  'kornis',
  'enat-maheberawi-1',
  'enat-maheberawi-2',
  'enat-maheberawi-3',
]);

export function normalizeMenuPrice(price: string): string {
  return price
    .split('/')
    .map((part) => part.trim().replace(/^£\s*/, ''))
    .filter(Boolean)
    .join('/');
}

export function formatMenuPrice(price: string): string {
  return normalizeMenuPrice(price)
    .split('/')
    .filter(Boolean)
    .map((part) => `£${part}`)
    .join(' / ');
}

export const menuCategories = [
  'starters',
  'the full menu',
  'breakfast',
  'vegetarian',
  'mains',
  'fish',
  'enat special',
  'packages',
  'coffee ceremony',
  'drinks',
];
