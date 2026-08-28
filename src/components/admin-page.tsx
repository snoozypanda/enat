'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChefHat, Edit3, LayoutDashboard, List, Plus, Save, Settings, Trash2, Users, X, Utensils, CalendarDays, TrendingUp, Coffee, Star } from 'lucide-react';
import { menuCategories, menuDishes } from '@/lib/menu';

/* ─── Types ─── */

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  price: string;
  image: string;
  tag: string;
  available: boolean;
};

type AdminView = 'dashboard' | 'menu' | 'categories' | 'reservations' | 'settings';

/* ─── Mock Data ─── */

const STORAGE_KEY = 'enat-admin-menu-v2';
const CATEGORIES = menuCategories.filter((category) => category !== 'the full menu');

function getStoredMenu(): MenuItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* noop */ }
  return menuDishes.map((item) => ({ ...item, available: true }));

  /* Legacy mock data retained below only for reference. */
    return [
    { id: 'sambusa', name: "Sambusa", category: 'to start', description: "Crisp pastry, lentils, onion, green chilli", detail: "A hot, crisp parcel filled with spiced lentils, onion and green chilli. Built for passing around the table.", price: '6.5', image: '/menu-assets/enat-injera.jpg', tag: 'crisp / bright', available: true },
    { id: 'shiro', name: "Shiro", category: 'vegetarian', description: "Silky chickpea stew, berbere, garlic, injera", detail: "A smooth, deeply savoury chickpea stew with berbere, garlic and the kind of warmth that asks for another tear of injera.", price: '14', image: '/menu-assets/enat-spice.jpg', tag: 'vegan', available: true },
    { id: 'bozena-shiro', name: "Bozena Shiro", category: 'mains', description: "Chopped lean lamb in Shiro cooked with onion, garlic & pepper", detail: "A rich and comforting stew of chopped lean lamb simmered in our silky chickpea shiro with garlic and berbere pepper.", price: '16', image: '/menu-assets/enat-spice.jpg', tag: 'hearty', available: true },
    { id: 'gored-gored', name: "Gored Gored", category: 'mains', description: "Cubed beef with awaze and spiced butter", detail: "Tender cubes of beef warmly spiced with awaze and niter kibbeh, offering a rich and deeply flavourful bite.", price: '15', image: '/menu-assets/enat-kitfo.jpg', tag: 'classic', available: true },
    { id: 'kitfo', name: "Kitfo", category: 'mains', description: "Hand-cut beef, mitmita, niter kibbeh, ayib", detail: "Hand-cut beef warmed with spiced clarified butter and mitmita, served with fresh ayib cheese and greens.", price: '16', image: '/menu-assets/enat-kitfo.jpg', tag: 'house favourite', available: true },
    { id: 'doro-wot', name: "Doro Wot", category: 'mains', description: "Chicken, slow onions, berbere, boiled egg", detail: "Our long-cooked red stew: chicken, caramelised onions and berbere, finished with a boiled egg and more sauce than seems sensible.", price: '15', image: '/menu-assets/enat-hero.jpg', tag: 'slow / deep', available: true },
    { id: 'beyaynetu', name: "Ye'Tsome Beyaynetu", category: 'vegetarian', description: "A whole garden of miser, gomen, fasolia, shiro", detail: "A generous vegan spread of lentils, greens, beans and shiro arranged over handmade injera. One plate, many directions.", price: '15', image: '/menu-assets/enat-injera.jpg', tag: 'vegan', available: true },
    { id: 'tibs', name: "Awaze Tibs", category: 'mains', description: "Sizzling beef, rosemary, peppers, awaze", detail: "Sizzling strips of beef with rosemary, peppers and awaze — smoky, bright and best eaten straight from the middle of the table.", price: '17', image: '/menu-assets/enat-kitfo.jpg', tag: 'from the fire', available: true },
    { id: 'coffee', name: "Ye'Jebena Buna", category: 'coffee ceremony', description: "Roasted beans, jebena, incense, three cups", detail: "An Ethiopian coffee ceremony at the table. Beans roasted, brewed in a jebena and poured into tiny sini cups, three times over.", price: '12', image: '/menu-assets/enat-coffee.jpg', tag: 'allow 25 min', available: true },
    { id: 'enkulal-firfir', name: "Enkulal Firfir", category: 'breakfast', description: "Scrambled eggs, onions, tomatoes served with bread", detail: "Scrambled eggs cooked with onions, tomatoes, and a touch of our house spices, served warm with bread.", price: '10', image: '/menu-assets/enat-injera.jpg', tag: 'morning favourite', available: true },
    { id: 'ful', name: "Ful", category: 'breakfast', description: "Fava beans, onion, tomatoes topped with green chilli", detail: "Slow-cooked fava beans mixed with onions and tomatoes, finished with fresh green chilli for a bright kick.", price: '10', image: '/menu-assets/enat-injera.jpg', tag: 'hearty', available: true },
    { id: 'ful-special', name: "Ful Special", category: 'breakfast', description: "Bread in spicy tomato sauce topped with yoghurt", detail: "A special preparation of bread soaked in a rich, spicy tomato sauce and topped with cooling yoghurt.", price: '14', image: '/menu-assets/enat-injera.jpg', tag: 'special', available: true },
    { id: 'fata', name: "Fata", category: 'breakfast', description: "Bread in spicy tomato sauce topped with yoghurt", detail: "Torn bread gently folded into our spicy tomato sauce, balanced with a dollop of fresh yoghurt.", price: '10', image: '/menu-assets/enat-injera.jpg', tag: 'comfort', available: true },
    { id: 'fata-special', name: "Fata Special", category: 'breakfast', description: "Bread in spicy tomato sauce topped with yoghurt", detail: "Our enriched version of Fata, prepared with extra care and premium ingredients for a fuller flavour.", price: '14', image: '/menu-assets/enat-injera.jpg', tag: 'special', available: true },
    { id: 'chechebesa', name: "Chechebesa", category: 'breakfast', description: "Pieces of flatbread mixed with spiced butter & berbere", detail: "A beloved classic: torn pieces of fresh flatbread pan-tossed with aromatic spiced butter (niter kibbeh) and warming berbere.", price: '15', image: '/menu-assets/enat-injera.jpg', tag: 'rich', available: true },
    { id: 'genfo', name: "Genfo", category: 'breakfast', description: "Powdered barley cooked in butter served with spices", detail: "A thick, hearty porridge made from powdered barley, served with a well of spiced butter in the center.", price: '12', image: '/menu-assets/enat-injera.jpg', tag: 'traditional', available: true },
    { id: 'bula', name: "Bula", category: 'breakfast', description: "Bula mixed with butter sprinkled with spices", detail: "Prepared from the root of the enset plant, cooked and mixed with spiced butter for a uniquely comforting texture.", price: '12', image: '/menu-assets/enat-injera.jpg', tag: 'unique', available: true },
    { id: 'bula-special', name: "Bula Special", category: 'breakfast', description: "Bula mixed with butter sprinkled with spices", detail: "An elevated Bula dish, featuring extra richness and carefully selected spice blends.", price: '16', image: '/menu-assets/enat-injera.jpg', tag: 'special', available: true },
    { id: 'bula-bekitfo', name: "Bula Be'Kitfo", category: 'breakfast', description: "Bula served with Kitfo", detail: "The ultimate indulgent morning or brunch dish: our traditional Bula served alongside premium Kitfo.", price: '25', image: '/menu-assets/enat-kitfo.jpg', tag: 'indulgent', available: true },
    { id: 'doro-awaze', name: "Doro Awaze", category: 'mains', description: "Tender boneless chicken sauteed in Awaze based sauce", detail: "Boneless chicken pieces swiftly sautéed in a vibrant awaze sauce, offering a bright and fiery profile.", price: '13', image: '/menu-assets/enat-hero.jpg', tag: 'spicy', available: true },
    { id: 'doro-lega', name: "Doro Lega", category: 'mains', description: "Boneless chicken sauteed with onion, spices & mixed herbs", detail: "A milder but deeply flavourful chicken sauté, fragrant with onions, garlic, and mixed fresh herbs.", price: '13', image: '/menu-assets/enat-hero.jpg', tag: 'aromatic', available: true },
    { id: 'miser-besega', name: "Miser Be'Sega", category: 'mains', description: "Cubed lean beef cooked in red lentils spicy sauce", detail: "The perfect pairing of earth and fire: cubed lean beef slowly simmered within our spicy red lentil stew.", price: '15', image: '/menu-assets/enat-spice.jpg', tag: 'rich', available: true },
    { id: 'obama', name: "Obama", category: 'mains', description: "Finely chopped lean beef, cottage cheese, spinach & Kibe", detail: "A beautiful harmony of finely chopped lean beef mixed with fresh cottage cheese, spinach, and our signature niter kibbeh.", price: '15', image: '/menu-assets/enat-kitfo.jpg', tag: 'balanced', available: true },
    { id: 'tibetegna', name: "Tibetegna", category: 'mains', description: "Kitfo mixed with green chillies, onions & cottage cheese", detail: "Our beloved Kitfo given an extra lift by mixing in fresh green chillies, sharp onions, and soothing cottage cheese.", price: '15', image: '/menu-assets/enat-kitfo.jpg', tag: 'vibrant', available: true },
    { id: 'gaslight-tibs', name: "Gaslight Tibs", category: 'mains', description: "Tender meat quickly sautéed at high heat with onions, garlic & spices", detail: "Flash-cooked at high heat to lock in the flavour, this tender meat dish is aromatic with garlic, onions, and bold spices.", price: '16', image: '/menu-assets/enat-kitfo.jpg', tag: 'from the fire', available: true },
    { id: 'enat-50-50', name: "Enat 50/50", category: 'specials', description: "Half & half of two main dishes of your choice", detail: "Can't decide? Choose two of our main dishes and we will serve them half and half on a bed of fresh injera.", price: '15', image: '/menu-assets/enat-injera.jpg', tag: 'custom', available: true },
    { id: 'cornis', name: "Cornis", category: 'specials', description: "Quanta firfir, Kitfo, Dulet, Lega Tibs & Gomen Be'Sega", detail: "A grand feast for 2 to 3 people. Includes Quanta firfir, Kitfo, Dulet, Lega Tibs, and Gomen Be'Sega.", price: '37', image: '/menu-assets/enat-hero.jpg', tag: 'for the table', available: true },
    { id: 'enat-maheberawi-1', name: "Enat Maheberawi I", category: 'specials', description: "Kitfo, Dulet, Awaze Tibs, Kikil, Aybe, Gomen", detail: "A generous sharing platter featuring Kitfo, Dulet, Awaze Tibs, Kikil, Aybe, and Gomen. Designed for groups.", price: '40', image: '/menu-assets/enat-hero.jpg', tag: 'feast', available: true },
    { id: 'enat-maheberawi-2', name: "Enat Maheberawi II", category: 'specials', description: "Kitfo, Obama, Dulet, Gomen Be'Sega, Derek Tibs", detail: "Another beautiful sharing option featuring our Obama dish, Kitfo, Dulet, Gomen Be'Sega, and Derek Tibs.", price: '40', image: '/menu-assets/enat-hero.jpg', tag: 'feast', available: true },
    { id: 'enat-maheberawi-3', name: "Enat Maheberawi III", category: 'specials', description: "Doro Wot, Ye'Beg Wot, Lega Tibs, Aybe, Gomen Be'Sega, Derek Tibs", detail: "The ultimate showcase: Doro Wot, Ye'Beg Wot, Lega Tibs, Aybe, Gomen Be'Sega, and Derek Tibs.", price: '45', image: '/menu-assets/enat-hero.jpg', tag: 'grand feast', available: true },
    { id: 'sini-buna', name: "Ye' Sini Buna", category: 'drinks', description: "A cup of coffee", detail: "A single, perfectly brewed cup of Ethiopian coffee.", price: '3', image: '/menu-assets/enat-coffee.jpg', tag: 'refresh', available: true },
    { id: 'still-water', name: "Still Water", category: 'drinks', description: "Refreshingly crisp water", detail: "Still bottled water.", price: '1', image: '/menu-assets/enat-coffee.jpg', tag: 'refresh', available: true },
    { id: 'sparkling-water', name: "Sparkling Water", category: 'drinks', description: "Carbonated water", detail: "Sparkling bottled water.", price: '2', image: '/menu-assets/enat-coffee.jpg', tag: 'refresh', available: true },
    { id: 'soft-drinks', name: "Soft Drinks", category: 'drinks', description: "Selection of sodas", detail: "A variety of standard soft drinks.", price: '1.50', image: '/menu-assets/enat-coffee.jpg', tag: 'refresh', available: true },
    { id: 'spiced-tea', name: "Spiced Tea", category: 'drinks', description: "Traditional aromatic tea", detail: "A warming, fragrant tea brewed with traditional spices.", price: '2', image: '/menu-assets/enat-coffee.jpg', tag: 'warming', available: true },
    { id: 'beer', name: "Beer", category: 'drinks', description: "Cold local & imported beers", detail: "A selection of cold beers.", price: '3', image: '/menu-assets/enat-coffee.jpg', tag: 'cold', available: true },
    { id: 'glass-wine', name: "Glass of Wine", category: 'drinks', description: "Red, white, or rosé", detail: "A glass of our house selection wine.", price: '5', image: '/menu-assets/enat-coffee.jpg', tag: 'relax', available: true },
    { id: 'bottle-wine', name: "Bottle of Wine", category: 'drinks', description: "Red, white, or rosé", detail: "A full bottle from our wine list.", price: '17', image: '/menu-assets/enat-coffee.jpg', tag: 'for the table', available: true },
  ];
}

/* ─── Admin Page ─── */

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('dashboard');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getStoredMenu);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    document.title = 'Enat Admin — Dashboard';
  }, []);

  const saveItem = (item: MenuItem) => {
    setMenuItems((prev) => {
      const exists = prev.find((m) => m.id === item.id);
      if (exists) return prev.map((m) => m.id === item.id ? item : m);
      return [...prev, item];
    });
    setEditItem(null);
    setShowForm(false);
  };

  const deleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    setDeleteConfirm(null);
  };

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) => prev.map((m) => m.id === id ? { ...m, available: !m.available } : m));
  };

  const stats = {
    totalItems: menuItems.length,
    categories: [...new Set(menuItems.map((m) => m.category))].length,
    available: menuItems.filter((m) => m.available).length,
    avgPrice: (menuItems.reduce((sum, m) => sum + parseFloat(m.price), 0) / menuItems.length).toFixed(1),
  };

  const navItems: { icon: typeof LayoutDashboard; label: string; view: AdminView }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Utensils, label: 'Menu Items', view: 'menu' },
    { icon: List, label: 'Categories', view: 'categories' },
    { icon: CalendarDays, label: 'Reservations', view: 'reservations' },
    { icon: Settings, label: 'Settings', view: 'settings' },
  ];

  // Close sidebar on mobile when navigating
  const handleNavClick = (v: AdminView) => {
    setView(v);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#1a1b19] font-sans text-[#f4f2e9]">
      {/* Sidebar backdrop on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-[#f4f2e9]/10 bg-[#242522] sm:w-[280px]"
      >
        <div className="flex items-center gap-3 border-b border-[#f4f2e9]/10 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3cf22]">
            <ChefHat size={18} className="text-[#242522]" />
          </div>
          <div>
            <span className="text-sm font-bold">Enat Admin</span>
            <span className="block text-[10px] uppercase tracking-wider text-[#f4f2e9]/50">Restaurant CMS</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {navItems.map(({ icon: Icon, label, view: v }) => (
            <motion.button
              key={v}
              type="button"
              onClick={() => handleNavClick(v)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${view === v ? 'bg-[#f3cf22]/15 text-[#f3cf22]' : 'text-[#f4f2e9]/65 hover:bg-[#f4f2e9]/5 hover:text-[#f4f2e9]'}`}
            >
              <Icon size={18} />
              {label}
            </motion.button>
          ))}
        </nav>

        <div className="border-t border-[#f4f2e9]/10 px-6 py-4">
          <a href="/" className="flex items-center gap-2 text-xs text-[#f4f2e9]/50 transition-colors hover:text-[#f3cf22]">
            <ArrowLeft size={14} />
            Back to website
          </a>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#f4f2e9]/10 bg-[#1a1b19]/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#f4f2e9]/15 text-[#f4f2e9]/60 hover:text-[#f4f2e9]"
            >
              {sidebarOpen ? <X size={16} /> : <List size={16} />}
            </motion.button>
            <h1 className="text-base font-bold capitalize sm:text-lg">{view === 'menu' ? 'Menu Items' : view}</h1>
          </div>
          {view === 'menu' && (
            <motion.button
              type="button"
              onClick={() => { setEditItem(null); setShowForm(true); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 rounded-md bg-[#f3cf22] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#242522] sm:gap-2 sm:px-4 sm:text-xs"
            >
              <Plus size={15} />
              Add Item
            </motion.button>
          )}
        </div>

        {/* Views */}
        <div className="p-3 sm:p-4 md:p-6">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <DashboardView stats={stats} menuItems={menuItems} />
              </motion.div>
            )}
            {view === 'menu' && (
              <motion.div key="menu" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <MenuItemsView
                  items={menuItems}
                  onEdit={(item) => { setEditItem(item); setShowForm(true); }}
                  onDelete={(id) => setDeleteConfirm(id)}
                  onToggle={toggleAvailability}
                />
              </motion.div>
            )}
            {view === 'categories' && (
              <motion.div key="categories" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <CategoriesView items={menuItems} />
              </motion.div>
            )}
            {view === 'reservations' && (
              <motion.div key="reservations" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <PlaceholderView title="Reservations" description="Connect your backend to manage reservations. This view will display incoming booking requests." icon={CalendarDays} />
              </motion.div>
            )}
            {view === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                <PlaceholderView title="Settings" description="Restaurant settings, opening hours, contact details, and WhatsApp number will be configurable here once the backend is connected." icon={Settings} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <MenuItemForm
            item={editItem}
            onSave={saveItem}
            onClose={() => { setShowForm(false); setEditItem(null); }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-lg border border-[#f4f2e9]/15 bg-[#242522] p-6"
            >
              <h3 className="text-lg font-bold">Delete menu item?</h3>
              <p className="mt-2 text-sm text-[#f4f2e9]/60">This action cannot be undone. The item will be permanently removed.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setDeleteConfirm(null)} className="rounded-md border border-[#f4f2e9]/20 px-4 py-2 text-sm text-[#f4f2e9]/70 hover:bg-[#f4f2e9]/5">Cancel</button>
                <motion.button
                  type="button"
                  onClick={() => deleteItem(deleteConfirm)}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md bg-[#84373d] px-4 py-2 text-sm font-bold text-white hover:bg-[#9b4045]"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Dashboard View ─── */

function DashboardView({ stats, menuItems }: { stats: { totalItems: number; categories: number; available: number; avgPrice: string }; menuItems: MenuItem[] }) {
  const statCards = [
    { label: 'Total Items', value: stats.totalItems, icon: Utensils, color: '#f3cf22' },
    { label: 'Categories', value: stats.categories, icon: List, color: '#4d684c' },
    { label: 'Available', value: stats.available, icon: TrendingUp, color: '#25D366' },
    { label: 'Avg. Price', value: `£${stats.avgPrice}`, icon: Star, color: '#84373d' },
  ];

  const categoryCounts = menuItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-lg border border-[#f4f2e9]/10 bg-[#242522] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f4f2e9]/50">{label}</span>
              <Icon size={18} style={{ color }} />
            </div>
            <p className="mt-3 text-3xl font-bold" style={{ color }}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 rounded-lg border border-[#f4f2e9]/10 bg-[#242522] p-6"
      >
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#f4f2e9]/50">Items by Category</h3>
        <div className="space-y-3">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs capitalize text-[#f4f2e9]/70">{cat}</span>
              <div className="flex-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / menuItems.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-2 rounded-full bg-[#f3cf22]"
                />
              </div>
              <span className="text-xs font-bold text-[#f3cf22]">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-6 rounded-lg border border-[#f4f2e9]/10 bg-[#242522] p-6"
      >
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#f4f2e9]/50">Menu Overview</h3>
        <div className="divide-y divide-[#f4f2e9]/10">
          {menuItems.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <div className="h-10 w-10 overflow-hidden rounded-md bg-[#84373d]">
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="ml-2 text-[10px] uppercase tracking-wider text-[#f4f2e9]/40">{item.category}</span>
              </div>
              <span className="font-mono text-sm text-[#f3cf22]">£{item.price}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${item.available ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-[#84373d]/15 text-[#84373d]'}`}>
                {item.available ? 'Available' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Menu Items View ─── */

function MenuItemsView({ items, onEdit, onDelete, onToggle }: {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);
  const allCategories = ['all', ...CATEGORIES];

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {allCategories.map((cat) => (
          <motion.button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            whileTap={{ scale: 0.95 }}
            className={`shrink-0 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${filter === cat ? 'bg-[#f3cf22] text-[#242522]' : 'border border-[#f4f2e9]/15 text-[#f4f2e9]/50 hover:text-[#f4f2e9]'}`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto rounded-lg border border-[#f4f2e9]/10 bg-[#242522]">
        <table className="min-w-[600px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#f4f2e9]/10 text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/40">
              <th className="px-4 py-3">Item</th>
              <th className="hidden px-4 py-3 md:table-cell">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="hidden px-4 py-3 sm:table-cell">Tag</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f4f2e9]/5">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.03 }}
                  className="group hover:bg-[#f4f2e9]/[0.03]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-[#84373d]">
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="block text-[11px] text-[#f4f2e9]/40 md:hidden">{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 capitalize text-[#f4f2e9]/60 md:table-cell">{item.category}</td>
                  <td className="px-4 py-3 font-mono text-[#f3cf22]">£{item.price}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="text-[10px] uppercase tracking-wider text-[#f4f2e9]/40">{item.tag}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => onToggle(item.id)} className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase transition-colors ${item.available ? 'bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25' : 'bg-[#84373d]/15 text-[#84373d] hover:bg-[#84373d]/25'}`}>
                      {item.available ? 'Available' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <motion.button type="button" onClick={() => onEdit(item)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f4f2e9]/10 text-[#f4f2e9]/50 hover:border-[#f3cf22] hover:text-[#f3cf22]">
                        <Edit3 size={14} />
                      </motion.button>
                      <motion.button type="button" onClick={() => onDelete(item.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f4f2e9]/10 text-[#f4f2e9]/50 hover:border-[#84373d] hover:text-[#84373d]">
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-sm text-[#f4f2e9]/40">No items in this category.</div>
        )}
      </div>
    </div>
  );
}

/* ─── Categories View ─── */

function CategoriesView({ items }: { items: MenuItem[] }) {
  const categoryCounts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((cat, i) => {
        const count = categoryCounts[cat] || 0;
        const catItems = items.filter((item) => item.category === cat);
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-lg border border-[#f4f2e9]/10 bg-[#242522] p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold capitalize">{cat}</h3>
              <span className="rounded-full bg-[#f3cf22]/15 px-2 py-0.5 text-[10px] font-bold text-[#f3cf22]">{count} items</span>
            </div>
            {catItems.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {catItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs text-[#f4f2e9]/60">
                    <span>{item.name}</span>
                    <span className="font-mono text-[#f3cf22]">£{item.price}</span>
                  </div>
                ))}
              </div>
            )}
            {catItems.length === 0 && (
              <p className="mt-3 text-xs text-[#f4f2e9]/30">No items yet.</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Placeholder View ─── */

function PlaceholderView({ title, description, icon: Icon }: { title: string; description: string; icon: typeof Settings }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3cf22]/10"
      >
        <Icon size={28} className="text-[#f3cf22]" />
      </motion.div>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-[#f4f2e9]/50">{description}</p>
      <span className="mt-6 rounded-full bg-[#f4f2e9]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/30">Coming soon</span>
    </div>
  );
}

/* ─── Menu Item Form (Add/Edit Modal) ─── */

function MenuItemForm({ item, onSave, onClose }: { item: MenuItem | null; onSave: (item: MenuItem) => void; onClose: () => void }) {
  const isEdit = !!item;
  const [form, setForm] = useState<MenuItem>(item || {
    id: `item-${Date.now()}`,
    name: '',
    category: CATEGORIES[0],
    description: '',
    detail: '',
    price: '',
    image: '/menu-assets/enat-injera.jpg',
    tag: '',
    available: true,
  });

  const update = (key: keyof MenuItem, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#f4f2e9]/15 bg-[#242522] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{isEdit ? 'Edit' : 'Add'} Menu Item</h2>
          <motion.button type="button" onClick={onClose} whileTap={{ scale: 0.9 }} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f4f2e9]/15 text-[#f4f2e9]/60">
            <X size={16} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Name</label>
            <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="Dish name" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]">
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Price (£)</label>
              <input required value={form.price} onChange={(e) => update('price', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="12.50" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Short Description</label>
            <input required value={form.description} onChange={(e) => update('description', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="Brief description for menu listing" />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Full Detail</label>
            <textarea value={form.detail} onChange={(e) => update('detail', e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="Detailed description shown in the dish modal" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Tag</label>
              <input value={form.tag} onChange={(e) => update('tag', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="e.g. vegan, house favourite" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9]/50">Image Path</label>
              <input value={form.image} onChange={(e) => update('image', e.target.value)} className="mt-1 w-full rounded-md border border-[#f4f2e9]/15 bg-[#1a1b19] px-3 py-2 text-sm text-[#f4f2e9] outline-none focus:border-[#f3cf22]" placeholder="/menu-assets/image.jpg" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => update('available', !form.available)}
              className={`relative h-6 w-11 rounded-full transition-colors ${form.available ? 'bg-[#25D366]' : 'bg-[#f4f2e9]/20'}`}
            >
              <motion.span
                animate={{ x: form.available ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute top-1 h-4 w-4 rounded-full bg-white"
              />
            </button>
            <span className="text-xs text-[#f4f2e9]/60">Available on menu</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-md border border-[#f4f2e9]/20 px-4 py-2 text-sm text-[#f4f2e9]/70 hover:bg-[#f4f2e9]/5">Cancel</button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-md bg-[#f3cf22] px-4 py-2 text-sm font-bold text-[#242522]"
            >
              <Save size={15} />
              {isEdit ? 'Update' : 'Create'} Item
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
