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
  breakfast: '/menu-assets/enat-injera.jpg',
  starters: '/menu-assets/enat-spice.jpg',
  vegetarian: '/menu-assets/enat-injera.jpg',
  mains: '/menu-assets/enat-kitfo.jpg',
  specials: '/menu-assets/enat-hero.jpg',
  coffee: '/menu-assets/enat-coffee.jpg',
};

const dish = (id: string, category: string, name: string, description: string, price: string, image: string, tag: string): MenuDish => ({
  id, category, name, description, detail: description, price, image, tag,
});

export const menuDishes: MenuDish[] = [
  dish('enkulal-firfir', 'breakfast', 'Enkulal Firfir', 'Scrambled eggs, onions, tomatoes served with bread', '10', images.breakfast, 'breakfast'),
  dish('ful', 'breakfast', 'Ful', 'Fava beans, onion, tomatoes topped with green chilli', '10', images.breakfast, 'breakfast'),
  dish('ful-special', 'breakfast', 'Ful Special', 'Bread in spicy tomato sauce topped with yoghurt', '14', images.breakfast, 'breakfast'),
  dish('fata', 'breakfast', 'Fata', 'Bread in spicy tomato sauce topped with yoghurt', '10', images.breakfast, 'breakfast'),
  dish('fata-special', 'breakfast', 'Fata Special', 'Bread in spicy tomato sauce topped with yoghurt', '14', images.breakfast, 'breakfast'),
  dish('chechebesa', 'breakfast', 'Chechebesa', 'Pieces of flatbread mixed with spiced butter and berbere', '15', images.breakfast, 'breakfast'),
  dish('genfo', 'breakfast', 'Genfo', 'Powdered barley cooked in butter served with spices', '12', images.breakfast, 'breakfast'),
  dish('bula', 'breakfast', 'Bula', 'Bula mixed with butter sprinkled with spices', '12', images.breakfast, 'breakfast'),
  dish('bula-special', 'breakfast', 'Bula Special', 'Bula mixed with butter sprinkled with spices', '16', images.breakfast, 'breakfast'),
  dish('bula-bekitfo', 'breakfast', "Bula Be'Kitfo", 'Bula served with Kitfo', '25', images.breakfast, 'breakfast'),

  dish('hummus', 'starters', 'Hummus', 'Cooked and mashed chickpeas blended with tahini, olive oil, garlic', '7', images.starters, 'starter'),
  dish('samosa', 'starters', 'Samosa', 'Fried pastry with a savoury filling of mixed vegetables', '5', images.starters, 'starter'),
  dish('habesha-salad', 'starters', 'Habesha Salad', 'Finely chopped fresh tomatoes, onion, green chillies in olive oil and freshly squeezed lemon', '5', images.starters, 'starter'),
  dish('salad', 'starters', 'Salad', 'Lettuce, tomatoes, green peppers, cucumbers in olive oil and freshly squeezed lemon', '5', images.starters, 'starter'),
  dish('sing-qarya', 'starters', "Sing Q'arya", 'Green chillies stuffed with finely chopped tomatoes - 3 pieces', '2', images.starters, 'starter'),
  dish('side-dishes', 'starters', 'Side Dishes', 'A selection of side dishes, ask for details', '6', images.starters, 'starter'),

  dish('yetsome-beyaynetu', 'vegetarian', "Ye'Tsome Beyaynetu", 'Mixed vegan platter, Fasolia, Aterkik, Miser and Gomen', '15', images.vegetarian, 'vegan'),
  dish('yetsome-special', 'vegetarian', "Ye'Tsome Special", 'Powdered chickpeas, onions and garlic cooked in rich and tasty sauce topped with green chilli', '32', images.vegetarian, 'vegan'),
  dish('yetsome-50-50', 'vegetarian', "Ye'Tsome 50/50", 'Half and half of main vegetarian dishes', '14', images.vegetarian, 'vegan'),

  dish('lega-yebeg-tibs', 'mains', "Lega Ye'Beg Tibs", 'Cubes of lean lamb cooked with onions, garlic and traditional spices', '14', images.mains, 'main'),
  dish('awaze-tibs', 'mains', 'Awaze Tibs', 'Tender lamb cubes cooked in traditional spiced Awaze sauce', '14', images.mains, 'main'),
  dish('alicha-fitfit-kikel', 'mains', 'Alicha Fitfit (Kikel)', 'Rolled pieces of injera soaked in mild lamb stew', '14', images.mains, 'main'),
  dish('quanta-firfir', 'mains', 'Quanta Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce', '15', images.mains, 'main'),
  dish('tibis-firfir', 'mains', 'Tibis Firfir', 'Pieces of injera soaked in diced lamb cubes in a spicy sauce', '14', images.mains, 'main'),
  dish('gomen-besiga', 'mains', "Gomen Be'Siga", 'Cubed lamb cooked with spinach in traditional herbs and spices', '14', images.mains, 'main'),
  dish('geba-weta', 'mains', 'Geba Weta', 'Cubes of beef cooked with onion, garlic and traditional Ethiopian spices', '16', images.mains, 'main'),
  dish('kitfo', 'mains', 'Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita)', '14', images.mains, 'main'),
  dish('special-kitfo', 'mains', 'Special Kitfo', 'Finely chopped lean beef prepared with Ethiopian ghee (Kibe) and chilli powder (Mitmita), served with cottage cheese and spinach', '16', images.mains, 'main'),
  dish('derek-tibs', 'mains', 'Derek Tibs', 'Lean and tender beef fried with onions, chilli and rosemary', '16', images.mains, 'main'),
  dish('goden-tibs', 'mains', 'Goden Tibs', 'Sizzling lamb ribs cooked with onion, rosemary and traditional spices', '17', images.mains, 'main'),
  dish('dulet', 'mains', 'Dulet', 'Finely chopped lamb tripe, minced liver and beef cooked in spices', '14', images.mains, 'main'),
  dish('yebeg-wot', 'mains', "Ye'Beg Wot", 'Cubes of lean lamb prepared in a spicy Berbere-based stew', '14', images.mains, 'main'),
  dish('asa-goulash', 'mains', 'Asa Goulash', 'Fish fillet cubes braised with onions, garlic and Berbere', '15', images.mains, 'main'),
  dish('doro-wot', 'mains', 'Doro Wot', 'Tender chicken slow cooked to perfection in a spicy Berbere stew', '15', images.mains, 'main'),
  dish('doro-awaze', 'mains', 'Doro Awaze', 'Tender boneless chicken sauteed in Awaze-based sauce', '13', images.mains, 'main'),
  dish('doro-lega', 'mains', 'Doro Lega', 'Boneless chicken sauteed with onion, spices and mixed herbs', '13', images.mains, 'main'),
  dish('bozena-shiro', 'mains', 'Bozena Shiro', 'Chopped lean lamb in shiro cooked with onion, garlic and pepper', '14', images.mains, 'main'),
  dish('miser-besega', 'mains', "Miser Be'Sega", 'Cubed lean beef cooked in red lentils spicy sauce (Miser)', '15', images.mains, 'main'),
  dish('obama', 'mains', 'Obama', 'Finely chopped lean beef, cottage cheese, spinach and Kibe', '15', images.mains, 'main'),
  dish('tibetegna', 'mains', 'Tibetegna', 'Kitfo mixed with green chillies, onions and cottage cheese', '15', images.mains, 'main'),
  dish('gaslight-tibs', 'mains', 'Gaslight Tibs', 'Tender meat quickly sauteed at high heat with onions, garlic and spices', '16', images.mains, 'main'),

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

export const menuCategories = ['the full menu', 'breakfast', 'starters', 'vegetarian', 'mains', 'specials', 'coffee ceremony', 'drinks'];
