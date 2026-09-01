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
  breakfastFul: '/menu-assets/menu-breakfast.jpg',
  breakfastSpiced: '/menu-assets/menu-breakfast-spiced.jpg',
  breakfastBula: '/menu-assets/menu-breakfast-bula.jpg',
  startersHummus: '/menu-assets/menu-starters.jpg',
  startersSides: '/menu-assets/menu-starter-sides.jpg',
  vegetarian: '/menu-assets/menu-vegetarian.jpg',
  mainsStew: '/menu-assets/menu-mains-stew.jpg',
  mainsWot: '/menu-assets/menu-mains-wot.jpg',
  mainsTibs: '/menu-assets/menu-mains-tibs.jpg',
  mainsFish: '/menu-assets/menu-mains-doro.jpg',
  mainsKitfo: '/menu-assets/enat-kitfo.jpg',
  specials: '/menu-assets/menu-specials.jpg',
  coffee: '/menu-assets/menu-coffee-real.jpg',
};

const dish = (id: string, category: string, name: string, description: string, price: string, image: string, tag: string): MenuDish => ({
  id, category, name, description, detail: description, price, image, tag,
});

export const menuDishes: MenuDish[] = [
  dish('enkulal-firfir', 'breakfast', 'Enkulal Firfir', 'Scrambled eggs, onions, tomatoes served with bread', '10', images.breakfastSpiced, 'breakfast'),
  dish('ful', 'breakfast', 'Ful', 'Fava beans, onion, tomatoes topped with green chilli', '10', images.breakfastFul, 'breakfast'),
  dish('ful-special', 'breakfast', 'Ful Special', 'Bread in spicy tomato sauce topped with yoghurt', '14', images.breakfastFul, 'breakfast'),
  dish('fata', 'breakfast', 'Fata', 'Bread in spicy tomato sauce topped with yoghurt', '10', images.breakfastSpiced, 'breakfast'),
  dish('fata-special', 'breakfast', 'Fata Special', 'Bread in spicy tomato sauce topped with yoghurt', '14', images.breakfastSpiced, 'breakfast'),
  dish('chechebesa', 'breakfast', 'Chechebesa', 'Pieces of flatbread mixed with spiced butter and berbere', '15', images.breakfastSpiced, 'breakfast'),
  dish('genfo', 'breakfast', 'Genfo', 'Powdered barley cooked in butter served with spices', '12', images.breakfastBula, 'breakfast'),
  dish('bula', 'breakfast', 'Bula', 'Bula mixed with butter sprinkled with spices', '12', images.breakfastBula, 'breakfast'),
  dish('bula-special', 'breakfast', 'Bula Special', 'Bula mixed with butter sprinkled with spices', '16', images.breakfastBula, 'breakfast'),
  dish('bula-bekitfo', 'breakfast', "Bula Be'Kitfo", 'Bula served with Kitfo', '25', images.mainsKitfo, 'breakfast'),

  dish('hummus', 'starters', 'Hummus', 'Cooked and mashed chickpeas blended with tahini, olive oil, garlic', '7', images.startersHummus, 'starter'),
  dish('samosa', 'starters', 'Sambusa', 'Fried pastry with a savoury filling of mixed vegetables', '5', images.startersSides, 'starter'),
  dish('habesha-salad', 'starters', 'Habesha Salad', 'Finely chopped fresh tomatoes, onion, green chillies in olive oil and freshly squeezed lemon', '5', images.startersSides, 'starter'),
  dish('salad', 'starters', 'Salad', 'Lettuce, tomatoes, green peppers, cucumbers in olive oil and freshly squeezed lemon', '5', images.startersSides, 'starter'),
  dish('sing-qarya', 'starters', "Sing Q'arya", 'Green chillies stuffed with finely chopped tomatoes - 3 pieces', '2', images.startersSides, 'starter'),
  dish('side-dishes', 'starters', 'Side Dishes', 'A selection of side dishes, ask for details', '6', images.startersSides, 'starter'),

  dish('yetsome-beyaynetu', 'vegetarian', "Ye'Tsome Beyaynetu", 'Mixed vegan platter, Fasolia, Aterkik, Miser and Gomen', '15', images.vegetarian, 'vegan'),
  dish('yetsome-special', 'vegetarian', "Ye'Tsome Special", 'Powdered chickpeas, onions and garlic cooked in rich and tasty sauce topped with green chilli', '32', images.vegetarian, 'vegan'),
  dish('yetsome-50-50', 'vegetarian', "Ye'Tsome 50/50", 'Half and half of main vegetarian dishes', '14', images.vegetarian, 'vegan'),

  dish('lega-yebeg-tibs', 'mains', "Lega Ye'Beg Tibs", 'Cubes of lean lamb cooked with onions, garlic and traditional spices', '14', images.mainsTibs, 'main'),
  dish('awaze-tibs', 'mains', 'Awaze Tibs', 'Tender lamb cubes cooked in traditional spiced Awaze sauce', '14', images.mainsTibs, 'main'),
  dish('alicha-fitfit-kikel', 'mains', 'Alicha Fitfit (Kikel)', 'Rolled pieces of injera soaked in mild lamb stew', '14', images.mainsStew, 'main'),
  dish('quanta-firfir', 'mains', 'Quanta Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce', '15', images.mainsStew, 'main'),
  dish('tibis-firfir', 'mains', 'Tibis Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce', '14', images.mainsStew, 'main'),
  dish('gomen-besiga', 'mains', "Gomen Be'Siga", 'Cubed lamb cooked with spinach in traditional herbs and spices', '14', images.mainsStew, 'main'),
  dish('geba-weta', 'mains', 'Geba Weta', 'Cubes of beef cooked with onion, garlic and traditional Ethiopian spices', '16', images.mainsWot, 'main'),
  dish('kitfo', 'mains', 'Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita)', '14', images.mainsKitfo, 'main'),
  dish('special-kitfo', 'mains', 'Special Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita), served with cottage cheese and spinach', '16', images.mainsKitfo, 'main'),
  dish('derek-tibs', 'mains', 'Derek Tibs', 'Lean and tender beef fried with onions, chilli and rosemary', '16', images.mainsTibs, 'main'),
  dish('goden-tibs', 'mains', 'Goden Tibs', 'Sizzling lamb ribs cooked with onion, rosemary and traditional spices', '17', images.mainsTibs, 'main'),
  dish('dulet', 'mains', 'Dulet', 'Finely chopped lamb tripe, minced liver and beef cooked in spices', '14', images.mainsTibs, 'main'),
  dish('yebeg-wot', 'mains', "Ye'Beg Wot", 'Cubes of lean lamb prepared in a spicy Berbere-based stew', '14', images.mainsWot, 'main'),
  dish('asa-goulash', 'mains', 'Asa Goulash', 'Fish fillet cubes braised with onions, garlic and Berbere', '15', images.mainsFish, 'main'),
  dish('doro-wot', 'mains', 'Doro Wot', 'Tender chicken slow cooked to perfection in a spicy Berbere stew', '15', images.mainsWot, 'main'),
  dish('doro-awaze', 'mains', 'Doro Awaze', 'Tender boneless chicken sauteed in Awaze-based sauce', '13', images.mainsTibs, 'main'),
  dish('doro-lega', 'mains', 'Doro Lega', 'Boneless chicken sauteed with onion, spices and mixed herbs', '13', images.mainsTibs, 'main'),
  dish('bozena-shiro', 'mains', 'Bozena Shiro', 'Chopped lean lamb in shiro cooked with onion, garlic and pepper', '14', images.mainsStew, 'main'),
  dish('miser-besega', 'mains', "Miser Be'Sega", 'Cubed lean beef cooked in red lentils spicy sauce (Miser)', '15', images.mainsStew, 'main'),
  dish('obama', 'mains', 'Obama', 'Finely chopped lean beef, cottage cheese, spinach and Kibe', '15', images.mainsKitfo, 'main'),
  dish('tibetegna', 'mains', 'Tibetegna', 'Kitfo mixed with green chillies, onions and cottage cheese', '15', images.mainsKitfo, 'main'),
  dish('gaslight-tibs', 'mains', 'Gaslight Tibs', 'Tender meat quickly sauteed at high heat with onions, garlic and spices', '16', images.mainsTibs, 'main'),

  dish('enat-50-50', 'specials', 'Enat 50/50', 'Half and half of two main dishes of your choice', '15', images.specials, 'sharing'),
  dish('cornis', 'specials', 'Cornis', "Quanta Firfir, Kitfo, Dulet, Lega Tibs and Gomen Be'Sega - for 2 or 3 people", '30 / £37', images.specials, 'sharing'),
  dish('enat-maheberawi-1', 'specials', 'Enat Maheberawi I', 'Kitfo, Dulet, Awaze Tibs, Kikel, Aybe, Gomen', '40', images.specials, 'sharing'),
  dish('enat-maheberawi-2', 'specials', 'Enat Maheberawi II', "Kitfo, Obama, Dulet, Gomen Be'Sega, Derek Tibs", '40', images.specials, 'sharing'),
  dish('enat-maheberawi-3', 'specials', 'Enat Maheberawi III', "Doro Wot, Ye'Beg Wot, Lega Tibs, Aybe, Gomen Be'Sega, Derek Tibs", '45', images.specials, 'sharing'),

  dish('ye-jebena-buna', 'coffee ceremony', "Ye' Jebena Buna", 'A pot of coffee', '12.00', images.coffee, 'coffee'),
  dish('ye-sini-buna', 'coffee ceremony', "Ye' Sini Buna", 'A cup of coffee', '3.00', images.coffee, 'coffee'),
  dish('still-water', 'drinks', 'Still Water', 'Still water', '1.00', images.coffee, 'drink'),
  dish('sparkling-water', 'drinks', 'Sparkling Water', 'Sparkling water', '2.00', images.coffee, 'drink'),
  dish('soft-drinks', 'drinks', 'Soft Drinks', 'Soft drinks', '1.50', images.coffee, 'drink'),
  dish('spiced-tea', 'drinks', 'Spiced Tea', 'Spiced tea', '2.00', images.coffee, 'drink'),
  dish('beer', 'drinks', 'Beer', 'Beer', '3.00', images.coffee, 'beer and wine'),
  dish('glass-of-wine', 'drinks', 'Glass of Wine', 'Glass of wine', '5.00', images.coffee, 'beer and wine'),
  dish('bottle-of-wine', 'drinks', 'Bottle of Wine', 'Bottle of wine', '17.00', images.coffee, 'beer and wine'),
];

export const menuCategories = ['starters', 'the full menu', 'breakfast', 'vegetarian', 'mains', 'specials', 'coffee ceremony', 'drinks'];
