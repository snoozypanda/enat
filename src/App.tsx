'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Clock3, Coffee, Flame, MapPin, Menu, MessageCircle, Music2, Plus, Quote, Star, Utensils, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { menuCategories, menuDishes } from '@/lib/menu';
const images = {
  hero: '/menu-assets/enat-hero.jpg',
  kitfo: '/menu-assets/enat-kitfo.jpg',
  coffee: '/menu-assets/enat-coffee.jpg',
  room: '/menu-assets/enat-room.jpg',
  injera: '/menu-assets/enat-injera.jpg',
  spice: '/menu-assets/enat-spice.jpg',
};

type Dish = { id: string; category: string; name: string; description: string; price: string; image: string; detail: string; tag?: string };
const legacyDishes: Dish[] = [
  { id: 'sambusa', category: 'to start', name: "Sambusa", description: "Crisp pastry, lentils, onion, green chilli", price: '6.5', image: images.injera, detail: "A hot, crisp parcel filled with spiced lentils, onion and green chilli. Built for passing around the table.", tag: 'crisp / bright' },
  { id: 'shiro', category: 'vegetarian', name: "Shiro", description: "Silky chickpea stew, berbere, garlic, injera", price: '14', image: images.spice, detail: "A smooth, deeply savoury chickpea stew with berbere, garlic and the kind of warmth that asks for another tear of injera.", tag: 'vegan' },
  { id: 'bozena-shiro', category: 'mains', name: "Bozena Shiro", description: "Chopped lean lamb in Shiro cooked with onion, garlic & pepper", price: '16', image: images.spice, detail: "A rich and comforting stew of chopped lean lamb simmered in our silky chickpea shiro with garlic and berbere pepper.", tag: 'hearty' },
  { id: 'gored-gored', category: 'mains', name: "Gored Gored", description: "Cubed beef with awaze and spiced butter", price: '15', image: images.kitfo, detail: "Tender cubes of beef warmly spiced with awaze and niter kibbeh, offering a rich and deeply flavourful bite.", tag: 'classic' },
  { id: 'kitfo', category: 'mains', name: "Kitfo", description: "Hand-cut beef, mitmita, niter kibbeh, ayib", price: '16', image: images.kitfo, detail: "Hand-cut beef warmed with spiced clarified butter and mitmita, served with fresh ayib cheese and greens.", tag: 'house favourite' },
  { id: 'doro-wot', category: 'mains', name: "Doro Wot", description: "Chicken, slow onions, berbere, boiled egg", price: '15', image: images.hero, detail: "Our long-cooked red stew: chicken, caramelised onions and berbere, finished with a boiled egg and more sauce than seems sensible.", tag: 'slow / deep' },
  { id: 'beyaynetu', category: 'vegetarian', name: "Ye'Tsome Beyaynetu", description: "A whole garden of miser, gomen, fasolia, shiro", price: '15', image: images.injera, detail: "A generous vegan spread of lentils, greens, beans and shiro arranged over handmade injera. One plate, many directions.", tag: 'vegan' },
  { id: 'tibs', category: 'mains', name: "Awaze Tibs", description: "Sizzling beef, rosemary, peppers, awaze", price: '17', image: images.kitfo, detail: "Sizzling strips of beef with rosemary, peppers and awaze — smoky, bright and best eaten straight from the middle of the table.", tag: 'from the fire' },
  { id: 'coffee', category: 'coffee ceremony', name: "Ye'Jebena Buna", description: "Roasted beans, jebena, incense, three cups", price: '12', image: images.coffee, detail: "An Ethiopian coffee ceremony at the table. Beans roasted, brewed in a jebena and poured into tiny sini cups, three times over.", tag: 'allow 25 min' },
  { id: 'enkulal-firfir', category: 'breakfast', name: "Enkulal Firfir", description: "Scrambled eggs, onions, tomatoes served with bread", price: '10', image: images.injera, detail: "Scrambled eggs cooked with onions, tomatoes, and a touch of our house spices, served warm with bread.", tag: 'morning favourite' },
  { id: 'ful', category: 'breakfast', name: "Ful", description: "Fava beans, onion, tomatoes topped with green chilli", price: '10', image: images.injera, detail: "Slow-cooked fava beans mixed with onions and tomatoes, finished with fresh green chilli for a bright kick.", tag: 'hearty' },
  { id: 'ful-special', category: 'breakfast', name: "Ful Special", description: "Bread in spicy tomato sauce topped with yoghurt", price: '14', image: images.injera, detail: "A special preparation of bread soaked in a rich, spicy tomato sauce and topped with cooling yoghurt.", tag: 'special' },
  { id: 'fata', category: 'breakfast', name: "Fata", description: "Bread in spicy tomato sauce topped with yoghurt", price: '10', image: images.injera, detail: "Torn bread gently folded into our spicy tomato sauce, balanced with a dollop of fresh yoghurt.", tag: 'comfort' },
  { id: 'fata-special', category: 'breakfast', name: "Fata Special", description: "Bread in spicy tomato sauce topped with yoghurt", price: '14', image: images.injera, detail: "Our enriched version of Fata, prepared with extra care and premium ingredients for a fuller flavour.", tag: 'special' },
  { id: 'chechebesa', category: 'breakfast', name: "Chechebesa", description: "Pieces of flatbread mixed with spiced butter & berbere", price: '15', image: images.injera, detail: "A beloved classic: torn pieces of fresh flatbread pan-tossed with aromatic spiced butter (niter kibbeh) and warming berbere.", tag: 'rich' },
  { id: 'genfo', category: 'breakfast', name: "Genfo", description: "Powdered barley cooked in butter served with spices", price: '12', image: images.injera, detail: "A thick, hearty porridge made from powdered barley, served with a well of spiced butter in the center.", tag: 'traditional' },
  { id: 'bula', category: 'breakfast', name: "Bula", description: "Bula mixed with butter sprinkled with spices", price: '12', image: images.injera, detail: "Prepared from the root of the enset plant, cooked and mixed with spiced butter for a uniquely comforting texture.", tag: 'unique' },
  { id: 'bula-special', category: 'breakfast', name: "Bula Special", description: "Bula mixed with butter sprinkled with spices", price: '16', image: images.injera, detail: "An elevated Bula dish, featuring extra richness and carefully selected spice blends.", tag: 'special' },
  { id: 'bula-bekitfo', category: 'breakfast', name: "Bula Be'Kitfo", description: "Bula served with Kitfo", price: '25', image: images.kitfo, detail: "The ultimate indulgent morning or brunch dish: our traditional Bula served alongside premium Kitfo.", tag: 'indulgent' },
  { id: 'doro-awaze', category: 'mains', name: "Doro Awaze", description: "Tender boneless chicken sauteed in Awaze based sauce", price: '13', image: images.hero, detail: "Boneless chicken pieces swiftly sautéed in a vibrant awaze sauce, offering a bright and fiery profile.", tag: 'spicy' },
  { id: 'doro-lega', category: 'mains', name: "Doro Lega", description: "Boneless chicken sauteed with onion, spices & mixed herbs", price: '13', image: images.hero, detail: "A milder but deeply flavourful chicken sauté, fragrant with onions, garlic, and mixed fresh herbs.", tag: 'aromatic' },
  { id: 'miser-besega', category: 'mains', name: "Miser Be'Sega", description: "Cubed lean beef cooked in red lentils spicy sauce", price: '15', image: images.spice, detail: "The perfect pairing of earth and fire: cubed lean beef slowly simmered within our spicy red lentil stew.", tag: 'rich' },
  { id: 'obama', category: 'mains', name: "Obama", description: "Finely chopped lean beef, cottage cheese, spinach & Kibe", price: '15', image: images.kitfo, detail: "A beautiful harmony of finely chopped lean beef mixed with fresh cottage cheese, spinach, and our signature niter kibbeh.", tag: 'balanced' },
  { id: 'tibetegna', category: 'mains', name: "Tibetegna", description: "Kitfo mixed with green chillies, onions & cottage cheese", price: '15', image: images.kitfo, detail: "Our beloved Kitfo given an extra lift by mixing in fresh green chillies, sharp onions, and soothing cottage cheese.", tag: 'vibrant' },
  { id: 'gaslight-tibs', category: 'mains', name: "Gaslight Tibs", description: "Tender meat quickly sautéed at high heat with onions, garlic & spices", price: '16', image: images.kitfo, detail: "Flash-cooked at high heat to lock in the flavour, this tender meat dish is aromatic with garlic, onions, and bold spices.", tag: 'from the fire' },
  { id: 'enat-50-50', category: 'specials', name: "Enat 50/50", description: "Half & half of two main dishes of your choice", price: '15', image: images.injera, detail: "Can't decide? Choose two of our main dishes and we will serve them half and half on a bed of fresh injera.", tag: 'custom' },
  { id: 'cornis', category: 'specials', name: "Cornis", description: "Quanta firfir, Kitfo, Dulet, Lega Tibs & Gomen Be'Sega", price: '37', image: images.hero, detail: "A grand feast for 2 to 3 people. Includes Quanta firfir, Kitfo, Dulet, Lega Tibs, and Gomen Be'Sega.", tag: 'for the table' },
  { id: 'enat-maheberawi-1', category: 'specials', name: "Enat Maheberawi I", description: "Kitfo, Dulet, Awaze Tibs, Kikil, Aybe, Gomen", price: '40', image: images.hero, detail: "A generous sharing platter featuring Kitfo, Dulet, Awaze Tibs, Kikil, Aybe, and Gomen. Designed for groups.", tag: 'feast' },
  { id: 'enat-maheberawi-2', category: 'specials', name: "Enat Maheberawi II", description: "Kitfo, Obama, Dulet, Gomen Be'Sega, Derek Tibs", price: '40', image: images.hero, detail: "Another beautiful sharing option featuring our Obama dish, Kitfo, Dulet, Gomen Be'Sega, and Derek Tibs.", tag: 'feast' },
  { id: 'enat-maheberawi-3', category: 'specials', name: "Enat Maheberawi III", description: "Doro Wot, Ye'Beg Wot, Lega Tibs, Aybe, Gomen Be'Sega, Derek Tibs", price: '45', image: images.hero, detail: "The ultimate showcase: Doro Wot, Ye'Beg Wot, Lega Tibs, Aybe, Gomen Be'Sega, and Derek Tibs.", tag: 'grand feast' },
  { id: 'sini-buna', category: 'drinks', name: "Ye' Sini Buna", description: "A cup of coffee", price: '3', image: images.coffee, detail: "A single, perfectly brewed cup of Ethiopian coffee.", tag: 'refresh' },
  { id: 'still-water', category: 'drinks', name: "Still Water", description: "Refreshingly crisp water", price: '1', image: images.coffee, detail: "Still bottled water.", tag: 'refresh' },
  { id: 'sparkling-water', category: 'drinks', name: "Sparkling Water", description: "Carbonated water", price: '2', image: images.coffee, detail: "Sparkling bottled water.", tag: 'refresh' },
  { id: 'soft-drinks', category: 'drinks', name: "Soft Drinks", description: "Selection of sodas", price: '1.50', image: images.coffee, detail: "A variety of standard soft drinks.", tag: 'refresh' },
  { id: 'spiced-tea', category: 'drinks', name: "Spiced Tea", description: "Traditional aromatic tea", price: '2', image: images.coffee, detail: "A warming, fragrant tea brewed with traditional spices.", tag: 'warming' },
  { id: 'beer', category: 'drinks', name: "Beer", description: "Cold local & imported beers", price: '3', image: images.coffee, detail: "A selection of cold beers.", tag: 'cold' },
  { id: 'glass-wine', category: 'drinks', name: "Glass of Wine", description: "Red, white, or rosé", price: '5', image: images.coffee, detail: "A glass of our house selection wine.", tag: 'relax' },
  { id: 'bottle-wine', category: 'drinks', name: "Bottle of Wine", description: "Red, white, or rosé", price: '17', image: images.coffee, detail: "A full bottle from our wine list.", tag: 'for the table' },
];
const dishes: Dish[] = menuDishes;
const categories = menuCategories;
const gallery = [
  { src: 'https://lh3.googleusercontent.com/grass-cs/ACvplmMdOpqa62J3czhraxPrsSDNCp2rsW_CtGKjMY3QHZPkViHGsDTqH0AFc5csDFU70lC9yPADHguTPqTInxoa75tspdv7XHH3Qrpssnv5Ga_sTgfQ9FcQxLvxRovZyw8Mc848ib-4MVuuNM8=w1200-h1200-n-k-no', alt: 'Public photo of Enate Restaurant in London', title: 'Enate, in the moment' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ACvplmPojEEkUSIvqQdiPfngtMwGVlPE4RkARkfH96_-oxcz4z5AwCbZQV6xBmSm277MPXGDaVjzgGZ70LEILaAxBxWbARm6_tyqCNfY2VI0UVEY9zWtvsKjDFr5Y0SNKS232Qgb2ieg3zg5KYht=w1200-h1200-n-k-no', alt: 'Public food photo from Enate Restaurant', title: 'Food made to share' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ACvplmM1lmihhNBoszIugRDYyKDGq8rhW0yQpQsLzoHiLPV3drC0OsPZV66sR9vvLGhbHwUSgect1YggicvJLtT2HkpLAogfICQnMkAIj_lbwwAkj1ARHWLRExCLIuM_IJQ8_YGupKXIkGuya5ep=w1200-h1200-n-k-no', alt: 'Public photo from Enate Restaurant in London', title: 'Flavour at the table' },
  { src: 'https://lh3.googleusercontent.com/grass-cs/ACvplmO60qDShAg0z9elOTF0CH3gyibh9bDw_3hqZQQUygwJgro_-YdK5fo3kdgTaSbjORTJNfzLj6ng71Xvl5ixdCDYL1B2E92h1iGCNeJ5kA10RiyHLgPsUlqBRY-b1T4Q6Eu2NHzYWlWVgyOo=w1200-h1800-p-k-no', alt: 'Customer food photo from David Andrew’s Google review of Enate Restaurant', title: 'David Andrew’s review' },
];

/* ─── Animation helpers ─── */

function Reveal({ children, className, delay = 0, direction = 'up', distance = 30, duration = 0.7, once = true }: {
  children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right'; distance?: number; duration?: number; once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });
  const dirs = { up: { y: distance }, down: { y: -distance }, left: { x: distance }, right: { x: -distance } };
  const from = dirs[direction];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, className, stagger = 0.08, delay = 0 }: {
  children: ReactNode; className?: string; stagger?: number; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerItemRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── Header ─── */

function Header({ onMenu }: { onMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
      className={`absolute inset-x-0 top-0 z-20 px-5 py-5 text-[#f4f2e9] transition-all duration-500 md:px-10 md:py-7 ${scrolled ? 'backdrop-blur-md bg-[#242522]/40' : ''}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a href="#top" data-testid="link-logo" className="group flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#f3cf22] bg-[#f4f2e9]"
          >
            <img src="/menu-assets/enate-logo.jpg" alt="Enate Ethiopian & Eritrean Restaurant" className="h-full w-full object-cover" />
          </motion.span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {['menu', 'story', 'the room', 'events'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.replace(' ', '-')}`}
              data-testid={`link-nav-${item.replace(' ', '-')}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="eyebrow text-[9px] text-[#f4f2e9]/80 transition-colors hover:text-[#f3cf22]"
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <motion.a
            href="#reserve"
            data-testid="link-header-reserve"
            whileHover={{ scale: 1.05 }}
            className="hidden border-b-2 border-[#f3cf22] pb-1 text-[11px] font-bold uppercase tracking-[.16em] text-[#f3cf22] sm:block"
          >
            Book a table
          </motion.a>
          <motion.button
            type="button"
            onClick={onMenu}
            data-testid="button-open-menu"
            aria-label="Open navigation menu"
            whileHover={{ scale: 1.08, color: '#f3cf22' }}
            whileTap={{ scale: 0.92 }}
            className="flex h-10 w-10 items-center justify-center text-[#f4f2e9] transition-colors hover:text-[#f3cf22] lg:hidden"
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

/* ─── Mobile Menu ─── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [['Menu', '#menu'], ['Our story', '#story'], ['The room', '#the-room'], ['Events', '#events'], ['Book a table', '#reserve']];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col bg-[#242522] px-6 py-6 text-[#f4f2e9] mobile-safe"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[#f3cf22]">Enate / እናቴ / My mother</span>
            <motion.button
              type="button"
              onClick={onClose}
              data-testid="button-close-menu"
              aria-label="Close navigation menu"
              whileHover={{ scale: 1.08, color: '#f3cf22' }}
              whileTap={{ scale: 0.85 }}
              className="flex h-10 w-10 items-center justify-center text-[#f4f2e9] transition-colors hover:text-[#f3cf22]"
            >
              <X size={24} />
            </motion.button>
          </div>
          <nav className="mt-20 flex flex-1 flex-col gap-5" aria-label="Mobile navigation">
            {links.map(([label, href], index) => (
              <motion.a
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                key={href}
                href={href}
                onClick={onClose}
                data-testid={`link-mobile-${label!.toLowerCase().replaceAll(' ', '-')}`}
                className="display flex items-center justify-between border-b border-[#f4f2e9]/15 pb-4 text-[clamp(2.7rem,11vw,4.8rem)] text-[#f4f2e9]"
              >
                {label}
                <ArrowRight className="text-[#f3cf22]" size={26} />
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-end justify-between border-t border-[#f4f2e9]/15 pt-5 text-xs text-[#f4f2e9]/65"
          >
            <span>16 Bateman Street<br />Soho, London W1D 3AH</span>
            <span className="text-right">Wed—Sat<br />17:30—23:00</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero ─── */

function Hero({ onReserve, onMenu }: { onReserve: () => void; onMenu: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#242522] text-[#f4f2e9] md:min-h-[95svh]">
      <motion.img
        src={images.hero}
        alt="A generous Ethiopian and Eritrean platter at Enate"
        fetchPriority="high"
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
      />
      <div className="hero-overlay absolute inset-0" />
      <Header onMenu={onMenu} />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-9 pt-36 md:px-10 md:pb-20">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_260px]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="mb-7 flex items-center gap-3 text-[#f3cf22]"
            >
              <span className="gold-rule" />
              <span className="eyebrow">Ethiopian + Eritrean / Soho, London</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                className="display max-w-4xl text-[clamp(5.2rem,17vw,13rem)] leading-[.78] text-[#f4f2e9]"
              >
                Eat<br /><em>together.</em>
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end"
            >
              <p className="max-w-[270px] text-sm leading-6 text-[#f4f2e9]/78">A loud, generous table of berbere, injera and buna. Food from home, made for this city.</p>
              <motion.button
                type="button"
                onClick={onReserve}
                data-testid="button-hero-reserve"
                whileHover={{ scale: 1.04, backgroundColor: '#f4f2e9' }}
                whileTap={{ scale: 0.97 }}
                className="group flex w-fit items-center gap-4 bg-[#f3cf22] px-5 py-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#242522] transition-colors"
              >
                <span>Find your table</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden md:block"
          >
            <div className="border-l border-[#f4f2e9]/35 pl-5">
              <span className="eyebrow text-[#f3cf22]">Tonight, in the middle</span>
              <p className="mt-4 font-mono text-xs leading-6 text-[#f4f2e9]/70">Injera is the plate.<br />Your hands are the cutlery.<br />Nobody eats alone.</p>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.a
        href="#story"
        data-testid="link-scroll-story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-5 right-6 z-10 hidden items-center gap-3 text-[#f4f2e9]/65 md:flex"
      >
        <span className="eyebrow">Scroll to gather</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ─── Intro Story ─── */

function IntroStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#f3cf22] px-5 py-20 md:px-10 md:py-32">
      <div className="absolute right-0 top-0 h-full w-1/4 pattern-grid opacity-40" />
      <div className="relative mx-auto max-w-[1220px]">
        <Reveal delay={0.1} direction="left">
          <div className="flex items-center gap-4">
            <span className="eyebrow">01 / The idea</span>
            <span className="h-[3px] w-10 bg-[#84373d]" />
          </div>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-24">
          <StaggerChildren stagger={0.15} delay={0.2}>
            <motion.div variants={staggerItem}>
              <span className="stamp inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#84373d]">Since 2018 <Flame size={14} /></span>
            </motion.div>
            <motion.p variants={staggerItem} className="mt-12 max-w-[300px] font-mono text-sm leading-7 text-[#242522]/70 md:text-base">
              Enate means mother in Amharic. It is a word for the person who makes sure there is always enough.
            </motion.p>
          </StaggerChildren>
          <div>
            <Reveal delay={0.2}>
              <h2 className="display max-w-4xl text-[clamp(3.4rem,8vw,7.2rem)] leading-[.84] text-[#242522]">
                A table should<br /><span className="text-[#84373d]">make room.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-9 max-w-xl text-base leading-7 text-[#242522]/75 md:text-lg">
                We cook the food we grew up with — the slow onions, the bright heat, the soft injera — and set it in the middle. Addis and Asmara by way of Soho. Come hungry. Bring people.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <motion.a
                href="#menu"
                data-testid="link-story-menu"
                whileHover={{ x: 5 }}
                className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#242522] pb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#242522]"
              >
                See what is cooking <ArrowRight size={15} />
              </motion.a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Menu Section ─── */

function MenuSection({ onDish }: { onDish: (dish: Dish) => void }) {
  const [active, setActive] = useState('starters');
  const visible = useMemo(() => active === 'the full menu' ? dishes : dishes.filter((dish) => dish.category === active), [active]);
  return (
    <section id="menu" className="dark-panel relative overflow-hidden px-5 py-20 md:px-10 md:py-32">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '12rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute left-0 top-20 w-3 bg-[#f3cf22]"
      />
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-10 md:grid-cols-[1fr_280px] md:items-end">
          <StaggerChildren stagger={0.12}>
            <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#f3cf22]">
              <span className="eyebrow">02 / At the table</span>
              <span className="gold-rule" />
            </motion.div>
            <motion.h2 variants={staggerItem} className="display text-[clamp(4.5rem,11vw,9rem)] leading-[.78]">
              The<br /><em>menu.</em>
            </motion.h2>
          </StaggerChildren>
          <Reveal delay={0.3} direction="right">
            <div className="border-l border-[#f4f2e9]/25 pl-5">
              <Utensils className="mb-4 text-[#f3cf22]" size={19} />
              <p className="text-sm leading-6 text-[#f4f2e9]/68">A menu made for tearing, dipping, passing. Order a little or order the room.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-16">
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#f4f2e9]/48 md:hidden">
              Swipe sideways for more categories <ArrowRight size={13} aria-hidden="true" />
            </p>
            <div className="flex gap-2 overflow-x-auto border-b border-[#f4f2e9]/20 pb-px scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                type="button"
                key={category}
                onClick={() => setActive(category)}
                data-testid={`button-category-${category.replaceAll(' ', '-')}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 px-3 pb-4 text-[10px] font-bold uppercase tracking-[.15em] transition-colors ${active === category ? 'border-b-3 border-[#f3cf22] text-[#f3cf22]' : 'text-[#f4f2e9]/48 hover:text-[#f4f2e9]'}`}
              >
                {category}
              </motion.button>
            ))}
            </div>
          </div>
        </Reveal>
        <div className="divide-y divide-[#f4f2e9]/15">
          <AnimatePresence mode="wait">
            {visible.map((dish, i) => (
              <motion.button
                type="button"
                onClick={() => onDish(dish)}
                data-testid={`button-dish-${dish.id}`}
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ backgroundColor: 'rgba(244,242,233,0.04)' }}
                className="group grid w-full gap-3 py-4 text-left md:grid-cols-[72px_1.15fr_1fr_auto] md:items-center md:gap-5 md:py-6"
              >
                <span className="eyebrow text-[#f3cf22]">0{i + 1}</span>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#84373d] md:hidden">
                    <img src={dish.image} alt="" className="image-fade h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="display text-2xl leading-none text-[#f4f2e9] md:text-3xl">{dish.name}</h3>
                    <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#f3cf22]/75">{dish.tag}</span>
                  </div>
                </div>
                <p className="hidden text-sm leading-6 text-[#f4f2e9]/55 md:block">{dish.description}</p>
                <span className="flex items-center gap-3 pl-[92px] font-mono text-sm font-semibold text-[#f3cf22] md:pl-0">
                  £{dish.price} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-4 border-t border-[#f4f2e9]/15 pt-5 text-xs text-[#f4f2e9]/50 sm:grid-cols-2">
            <span>Vegetarian, vegan & dietary requirements happily accommodated.</span>
            <span className="sm:text-right"><Coffee className="mr-2 inline text-[#f3cf22]" size={14} /> Coffee ceremony needs a little time.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Dish Modal ─── */

function DishModal({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-end justify-center bg-[#171815]/80 p-0 md:items-center md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto bg-[#f4f2e9] text-[#242522] md:grid md:grid-cols-2"
          >
            <motion.button
              type="button"
              onClick={onClose}
              data-testid="button-close-dish"
              aria-label="Close dish details"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.85 }}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-[#f3cf22] text-[#242522]"
            >
              <X size={17} />
            </motion.button>
            <motion.img
              src={dish.image}
              alt={dish.name}
              loading="lazy"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-64 w-full object-cover md:h-full md:min-h-[430px]"
            />
            <div className="flex flex-col justify-center p-7 md:p-10">
              <span className="eyebrow text-[#84373d]">{dish.category} / {dish.tag}</span>
              <h2 className="display mt-4 text-5xl leading-[.85]">{dish.name}</h2>
              <p className="mt-6 text-sm leading-7 text-[#242522]/72">{dish.detail}</p>
              <div className="mt-8 flex items-center justify-between border-t border-[#242522]/20 pt-5">
                <span className="font-mono text-sm font-semibold text-[#84373d]">£{dish.price}</span>
                <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#242522]/55">Tap outside to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Special / Coffee Section ─── */

function SpecialSection() {
  return (
    <section className="burgundy-block px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1220px] gap-12 md:grid-cols-[1fr_.9fr] md:items-center">
        <Reveal direction="left" distance={40} duration={0.9}>
          <div className="relative aspect-[4/3] overflow-hidden border-[10px] border-[#f3cf22]">
            <motion.img
              src={images.coffee}
              alt="Ethiopian coffee ceremony with a jebena and sini cups"
              loading="lazy"
              whileInView={{ scale: [1.08, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="h-full w-full object-cover"
            />
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-3 left-3 bg-[#f3cf22] px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#242522]"
            >
              The ceremony
            </motion.span>
          </div>
        </Reveal>
        <div className="md:pl-8">
          <StaggerChildren stagger={0.12} delay={0.2}>
            <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#f3cf22]">
              <span className="eyebrow">03 / Slow down</span>
              <span className="gold-rule" />
            </motion.div>
            <motion.h2 variants={staggerItem} className="display text-[clamp(4rem,9vw,8rem)] leading-[.78]">
              Buna<br /><em>time.</em>
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-8 max-w-sm text-sm leading-7 text-[#f4f2e9]/78">
              Coffee is not a quick finish here. We roast the beans, grind them, brew them in the jebena and pour three rounds: abol, tona, baraka.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-8 flex items-center gap-4 text-xs text-[#f3cf22]">
              <span className="font-mono">£12 / for two</span>
              <span className="h-px w-10 bg-[#f3cf22]/60" />
              <span className="eyebrow text-[#f4f2e9]/65">Allow 25 minutes</span>
            </motion.div>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ─── */

function GallerySection({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="the-room" className="bg-[#f4f2e9] px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <StaggerChildren stagger={0.1}>
            <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#84373d]">
              <span className="eyebrow">04 / Set the scene</span>
              <span className="h-[3px] w-10 bg-[#84373d]" />
            </motion.div>
            <motion.h2 variants={staggerItem} className="display text-[clamp(4rem,10vw,8rem)] leading-[.76]">
              The<br /><span className="text-[#4d684c]">room.</span>
            </motion.h2>
          </StaggerChildren>
          <Reveal delay={0.3} direction="right">
            <p className="max-w-xs text-sm leading-6 text-[#242522]/70">A welcoming table on Goldhawk Road, where Ethiopian and Eritrean cooking, music and generous plates make you feel at home.</p>
          </Reveal>
        </div>
        <StaggerChildren className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4" stagger={0.1}>
          {gallery.map((item, index) => (
            <motion.button
              type="button"
              key={item.src}
              onClick={() => onOpen(index)}
              data-testid={`button-gallery-${index}`}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden text-left ${index === 0 ? 'col-span-2 row-span-2' : index === 1 ? 'row-span-2' : ''}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" className="image-fade h-full w-full object-cover" />
              <span className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.12em] text-[#f4f2e9] opacity-0 transition-opacity group-hover:opacity-100">
                <span>{item.title}</span>
                <Plus size={14} />
              </span>
              <span className="absolute inset-0 bg-[#242522]/0 transition-colors group-hover:bg-[#242522]/30" />
            </motion.button>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── Gallery Viewer ─── */

function GalleryViewer({ index, onClose, onStep }: { index: number | null; onClose: () => void; onStep: (dir: number) => void }) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171815]/95 p-5"
          onClick={onClose}
        >
          <button type="button" onClick={onClose} data-testid="button-close-gallery" aria-label="Close gallery" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[#f4f2e9]/35 text-[#f4f2e9]"><X size={18} /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); onStep(-1); }} data-testid="button-gallery-prev" aria-label="Previous gallery image" className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#f4f2e9]/25 text-[#f4f2e9]"><ArrowLeft size={18} /></button>
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={gallery[index].src} alt={gallery[index].alt} className="max-h-[76svh] w-auto object-contain" />
            <figcaption className="mt-4 flex items-center justify-between text-[#f4f2e9]">
              <span className="display text-2xl">{gallery[index].title}</span>
              <span className="eyebrow text-[#f3cf22]">{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
            </figcaption>
          </motion.figure>
          <button type="button" onClick={(event) => { event.stopPropagation(); onStep(1); }} data-testid="button-gallery-next" aria-label="Next gallery image" className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#f4f2e9]/25 text-[#f4f2e9]"><ArrowRight size={18} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Reviews ─── */

function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const quote = "Felt like back home, when walking in the aroma, the music and the people.";
  const words = quote.split(' ');

  return (
    <section ref={ref} className="dark-panel px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1220px]">
        <div className="flex items-start justify-between">
          <Reveal direction="left">
            <div className="flex items-center gap-3 text-[#f3cf22]">
              <span className="eyebrow">05 / In good company</span>
              <span className="gold-rule" />
            </div>
          </Reveal>
          <motion.div
            initial={{ rotate: -15, opacity: 0 }}
            animate={inView ? { rotate: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Quote className="text-[#f3cf22]" size={38} strokeWidth={1} />
          </motion.div>
        </div>
        <blockquote className="display mt-12 max-w-5xl text-[clamp(2.5rem,6vw,6.5rem)] leading-[.9] text-[#f4f2e9]">
          {'\u201C'}
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              className="inline-block"
            >
              {word}{i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
          {'\u201D'}
        </blockquote>
        <Reveal delay={0.8}>
          <div className="mt-10 flex items-center gap-4 text-xs text-[#f4f2e9]/58">
            <span className="h-[3px] w-10 bg-[#f3cf22]" />
            <span>Yonatan Tiruneh / Google review</span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-20 grid gap-4 border-t border-[#f4f2e9]/15 pt-5 text-xs text-[#f4f2e9]/55 sm:grid-cols-3">
            <span>5.0 / 5 Google rating</span>
            <span className="sm:text-center">57 Google reviews</span>
            <span className="sm:text-right">Goldhawk Road, W12</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Events ─── */

function Events() {
  const events = [
    ['18 APR', 'Spring on the injera', 'A five-course table of new-season vegetables, bright sauces and something cold to pour.'],
    ['02 MAY', 'Buna after dark', 'An evening of coffee, cardamom and conversation, with the ceremony taking centre stage.'],
    ['SUNDAYS', 'The long lunch', 'Three courses, no clock-watching. Bring your favourite people and stay a while.'],
  ];
  return (
    <section id="events" className="leaf-block px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1220px] gap-12 md:grid-cols-[.75fr_1.25fr]">
        <StaggerChildren stagger={0.12}>
          <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#f3cf22]">
            <span className="eyebrow">06 / Keep the night going</span>
            <span className="h-[3px] w-10 bg-[#f3cf22]" />
          </motion.div>
          <motion.h2 variants={staggerItem} className="display text-[clamp(4rem,10vw,8rem)] leading-[.76]">
            More<br /><em>together.</em>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-8 max-w-xs text-sm leading-6 text-[#f4f2e9]/75">
            The calendar changes. The welcome does not.
          </motion.p>
        </StaggerChildren>
        <StaggerChildren className="divide-y divide-[#f4f2e9]/25 border-y border-[#f4f2e9]/25" stagger={0.15} delay={0.2}>
          {events.map(([date, title, description], i) => (
            <motion.div key={title} variants={staggerItemRight} className="grid gap-4 py-6 sm:grid-cols-[100px_1fr_auto] sm:items-start">
              <span className="eyebrow pt-1 text-[#f3cf22]">{date}</span>
              <div>
                <h3 className="display text-3xl text-[#f4f2e9]">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#f4f2e9]/72">{description}</p>
              </div>
              <motion.a href="#reserve" data-testid={`link-event-reserve-${i}`} whileHover={{ x: 4 }} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#f3cf22] sm:pt-2">Enquire <ArrowRight size={14} /></motion.a>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ─── Reservation ─── */

function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState('2 guests');
  const [form, setForm] = useState({ name: '', email: '', date: '', note: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <section id="reserve" className="bg-[#f4f2e9] px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1220px] gap-12 md:grid-cols-[.7fr_1.3fr]">
        <StaggerChildren stagger={0.1}>
          <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#84373d]">
            <span className="eyebrow">07 / Pull up a chair</span>
            <span className="h-[3px] w-10 bg-[#84373d]" />
          </motion.div>
          <motion.h2 variants={staggerItem} className="display text-[clamp(4.2rem,10vw,8rem)] leading-[.76]">
            Your<br /><span className="text-[#84373d]">table.</span>
          </motion.h2>
          <motion.div variants={staggerItem} className="mt-10 space-y-3 text-sm leading-6 text-[#242522]/72">
            <p><Clock3 size={15} className="mr-2 inline text-[#84373d]" /> Wednesday—Saturday, 17:30—23:00</p>
            <p><MapPin size={15} className="mr-2 inline text-[#84373d]" /> 16 Bateman Street, Soho, London</p>
          </motion.div>
        </StaggerChildren>
        {submitted ? (
          <Reveal>
            <div className="flex min-h-[360px] flex-col justify-center border-t border-[#242522]/20 md:border-l md:border-t-0 md:pl-16">
              <span className="eyebrow text-[#84373d]">Enquiry received</span>
              <h3 className="display mt-5 max-w-lg text-5xl leading-[.85]">We saved you<br /><span className="text-[#84373d]">a little space.</span></h3>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#242522]/72">Thank you, {form.name || 'friend'}. We will be in touch shortly to confirm your evening.</p>
              <button type="button" onClick={() => setSubmitted(false)} data-testid="button-new-enquiry" className="mt-8 w-fit border-b-2 border-[#242522] pb-2 text-[10px] font-bold uppercase tracking-[.16em]">Make another enquiry</button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="grid gap-7 border-t border-[#242522]/20 pt-8 md:border-l md:border-t-0 md:pl-16" data-testid="form-reservation">
              <label className="block">
                <span className="eyebrow text-[#84373d]">Your name</span>
                <input required value={form.name} onChange={(event) => update('name', event.target.value)} data-testid="input-reservation-name" className="mt-3 w-full border-0 border-b border-[#242522]/25 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-[#242522]/35 focus:border-[#84373d]" placeholder="How should we address you?" />
              </label>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-[#84373d]">Email address</span>
                  <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} data-testid="input-reservation-email" className="mt-3 w-full border-0 border-b border-[#242522]/25 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-[#242522]/35 focus:border-[#84373d]" placeholder="you@example.com" />
                </label>
                <label className="block">
                  <span className="eyebrow text-[#84373d]">Preferred date</span>
                  <input required type="date" value={form.date} onChange={(event) => update('date', event.target.value)} data-testid="input-reservation-date" className="mt-3 w-full border-0 border-b border-[#242522]/25 bg-transparent px-0 py-3 text-lg outline-none focus:border-[#84373d]" />
                </label>
              </div>
              <label className="block">
                <span className="eyebrow text-[#84373d]">Party size</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['2 guests', '3 guests', '4 guests', '5+ guests'].map((value) => (
                    <motion.button type="button" key={value} onClick={() => setGuests(value)} data-testid={`button-guests-${value.split(' ')[0]}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`border px-3 py-2 text-xs transition-colors ${guests === value ? 'border-[#242522] bg-[#242522] text-[#f4f2e9]' : 'border-[#242522]/25 text-[#242522]/75 hover:border-[#242522]'}`}>{value}</motion.button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="eyebrow text-[#84373d]">A note for us <span className="text-[#242522]/50">(optional)</span></span>
                <textarea value={form.note} onChange={(event) => update('note', event.target.value)} data-testid="input-reservation-note" className="mt-3 min-h-20 w-full resize-y border-0 border-b border-[#242522]/25 bg-transparent px-0 py-3 text-lg outline-none placeholder:text-[#242522]/35 focus:border-[#84373d]" placeholder="A birthday, a preference, a little secret..." />
              </label>
              <motion.button type="submit" data-testid="button-submit-reservation" whileHover={{ scale: 1.01, backgroundColor: '#242522' }} whileTap={{ scale: 0.98 }} className="group flex w-full items-center justify-between bg-[#84373d] px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[.17em] text-[#f4f2e9] transition-colors">
                <span>Send reservation enquiry</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
              <p className="text-xs leading-5 text-[#242522]/60">This is an enquiry, not a confirmed booking. We will respond within one working day.</p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function LocationFooter() {
  return (
    <footer className="dark-panel px-5 pb-8 pt-20 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-14 md:grid-cols-[1.2fr_.8fr]">
          <StaggerChildren stagger={0.12}>
            <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-[#f3cf22]">
              <span className="eyebrow">08 / Until next time</span>
              <span className="gold-rule" />
            </motion.div>
            <motion.h2 variants={staggerItem} className="display max-w-3xl text-[clamp(4.2rem,10vw,10rem)] leading-[.76]">
              See you<br /><em>at the table.</em>
            </motion.h2>
            <motion.div variants={staggerItem}>
              <motion.a href="#reserve" data-testid="link-footer-reserve" whileHover={{ scale: 1.04, backgroundColor: '#f4f2e9' }} whileTap={{ scale: 0.97 }} className="mt-10 inline-flex items-center gap-3 bg-[#f3cf22] px-5 py-4 text-[11px] font-bold uppercase tracking-[.18em] text-[#242522] transition-colors">Reserve your evening <ArrowRight size={15} /></motion.a>
            </motion.div>
          </StaggerChildren>
          <StaggerChildren className="flex flex-col justify-end gap-10 md:pb-2" stagger={0.1} delay={0.2}>
            <motion.div variants={staggerItem}>
              <span className="eyebrow text-[#f3cf22]">Find us</span>
              <p className="mt-3 text-sm leading-6 text-[#f4f2e9]/70">16 Bateman Street<br />Soho, London W1D 3AH<br />+44 (0)20 7946 0812</p>
            </motion.div>
            <motion.div variants={staggerItem}>
              <span className="eyebrow text-[#f3cf22]">Stay close</span>
              <div className="mt-3 flex items-center gap-5">
                <motion.a href="https://www.tiktok.com/@enate.restaurant" target="_blank" rel="noreferrer" data-testid="link-tiktok" aria-label="TikTok" whileHover={{ scale: 1.2, color: '#f3cf22' }} className="text-[#f4f2e9]/70 transition-colors"><Music2 size={19} /></motion.a>
                <motion.a href="mailto:hello@enatrestaurant.co.uk" data-testid="link-email" whileHover={{ color: '#f3cf22' }} className="text-xs text-[#f4f2e9]/70 transition-colors">hello@enatrestaurant.co.uk</motion.a>
              </div>
            </motion.div>
          </StaggerChildren>
        </div>
        <Reveal delay={0.3}>
          <div className="mt-24 flex flex-col gap-4 border-t border-[#f4f2e9]/15 pt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[#f4f2e9]/40 sm:flex-row sm:justify-between">
            <span>© 2025 Enate</span>
            <span>Addis / Asmara / Soho</span>
            <a href="#top" data-testid="link-footer-top" className="hover:text-[#f3cf22]">Back to the beginning ↑</a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

/* ─── Floating Action Buttons (WhatsApp + Review) ─── */

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3"
        >
          {/* Leave a Review */}
          <motion.a
            href="https://www.google.com/maps?cid=7536817678853431196"
            target="_blank"
            rel="noreferrer"
            data-testid="fab-review"
            aria-label="Leave us a review on Google"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#f3cf22] text-[#242522] shadow-lg transition-shadow hover:shadow-xl"
          >
            <Star size={20} fill="currentColor" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#242522] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9] opacity-0 transition-opacity group-hover:opacity-100">
              Leave a review
            </span>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/442079460812?text=Hello%20Enat%2C%20I%27d%20like%20to%20make%20an%20enquiry."
            target="_blank"
            rel="noreferrer"
            data-testid="fab-whatsapp"
            aria-label="Chat with us on WhatsApp"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg fab-pulse"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#242522] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f4f2e9] opacity-0 transition-opacity group-hover:opacity-100">
              Chat with us
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Home ─── */

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dish, setDish] = useState<Dish | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const goToReserve = () => document.getElementById('reserve')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  const stepGallery = (dir: number) => setGalleryIndex((current) => current === null ? null : (current + dir + gallery.length) % gallery.length);
  useEffect(() => { document.body.style.overflow = menuOpen || dish !== null || galleryIndex !== null ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen, dish, galleryIndex]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setDish(null); setGalleryIndex(null); } if (galleryIndex !== null && event.key === 'ArrowRight') stepGallery(1); if (galleryIndex !== null && event.key === 'ArrowLeft') stepGallery(-1); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [galleryIndex]);
  useEffect(() => { document.title = 'Enate \u2014 Ethiopian & Eritrean Restaurant'; const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta'); description.setAttribute('name', 'description'); description.setAttribute('content', 'Enate is an Ethiopian and Eritrean restaurant in London. Berbere, injera, buna and generous tables.'); document.head.appendChild(description); }, []);
  return (
    <main className="site-shell grain min-h-[100dvh]">
      <Hero onReserve={goToReserve} onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <IntroStory />
      <MenuSection onDish={setDish} />
      <SpecialSection />
      <GallerySection onOpen={setGalleryIndex} />
      <Reviews />
      <Events />
      <Reservation />
      <LocationFooter />
      <DishModal dish={dish} onClose={() => setDish(null)} />
      <GalleryViewer index={galleryIndex} onClose={() => setGalleryIndex(null)} onStep={stepGallery} />
      <FloatingActions />
    </main>
  );
}

function App() {
  return <ErrorBoundary><Home /></ErrorBoundary>;
}

export default App;
