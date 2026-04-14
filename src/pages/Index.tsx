/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2c4086eb-2888-4451-9336-90d331018dad/files/6037af97-3601-45a5-81b6-b8e2f9941306.jpg";
const ROOM_IMAGE = "https://cdn.poehali.dev/projects/2c4086eb-2888-4451-9336-90d331018dad/files/ba3dd288-4a6b-4636-a5bd-520b737b3c3c.jpg";
const BEACH_IMAGE = "https://cdn.poehali.dev/projects/2c4086eb-2888-4451-9336-90d331018dad/files/67aaa0b6-f362-469a-933d-7f937f90c381.jpg";

const ROOMS = [
  {
    id: 1,
    name: "Стандарт",
    description: "Уютный номер с видом на сад, двуспальная кровать, все удобства",
    priceWeekday: 3500,
    priceWeekend: 4500,
    pricePeak: 5500,
    capacity: 2,
    size: 20,
    amenities: ["Wi-Fi", "Кондиционер", "Телевизор", "Холодильник"],
    image: ROOM_IMAGE,
  },
  {
    id: 2,
    name: "Семейный",
    description: "Просторный номер для семьи, две спальни, мини-кухня",
    priceWeekday: 5500,
    priceWeekend: 7000,
    pricePeak: 8500,
    capacity: 4,
    size: 35,
    amenities: ["Wi-Fi", "Кондиционер", "Кухня", "2 ванные"],
    image: ROOM_IMAGE,
  },
  {
    id: 3,
    name: "Люкс Морской",
    description: "Номер с панорамным видом на море, терраса, джакузи",
    priceWeekday: 8000,
    priceWeekend: 10000,
    pricePeak: 13000,
    capacity: 2,
    size: 45,
    amenities: ["Wi-Fi", "Джакузи", "Терраса", "Вид на море"],
    image: ROOM_IMAGE,
  },
];

const SERVICES = [
  { icon: "UtensilsCrossed", title: "Завтрак включён", desc: "Свежий домашний завтрак каждый день с 7:00 до 10:00" },
  { icon: "Waves", title: "Выход к пляжу", desc: "Прямой выход на частный пляж, лежаки и зонты в подарок" },
  { icon: "Car", title: "Парковка", desc: "Бесплатная охраняемая парковка на территории" },
  { icon: "Wifi", title: "Быстрый Wi-Fi", desc: "Высокоскоростной интернет во всех номерах и зонах отдыха" },
  { icon: "Sailboat", title: "Аренда лодок", desc: "Моторные и вёсельные лодки, морские прогулки" },
  { icon: "Dumbbell", title: "Спортзал", desc: "Современный тренажёрный зал и площадка для волейбола" },
  { icon: "Tent", title: "Барбекю-зона", desc: "Беседки с мангалом для семейного отдыха" },
  { icon: "Baby", title: "Детский уголок", desc: "Игровая площадка и развлечения для самых маленьких" },
];

const REVIEWS = [
  {
    name: "Анна Соколова",
    date: "Август 2024",
    rating: 5,
    text: "Восхитительное место! Номер «Люкс Морской» оправдал все ожидания — вид с террасы просто невероятный. Хозяева очень радушные, завтраки домашние и вкусные. Обязательно вернёмся!",
    city: "Москва",
  },
  {
    name: "Дмитрий и Марина",
    date: "Июль 2024",
    rating: 5,
    text: "Отдыхали семьёй с двумя детьми. Семейный номер — просто находка: места много, кухня есть, дети в восторге от пляжа. Персонал всегда готов помочь. Спасибо за незабываемый отдых!",
    city: "Санкт-Петербург",
  },
  {
    name: "Светлана К.",
    date: "Июнь 2024",
    rating: 5,
    text: "Уже третий год приезжаем сюда. Атмосфера как у бабушки на даче, только у моря. Тишина, чистота, вкусная еда. Лучшее место для перезагрузки!",
    city: "Краснодар",
  },
];

const FAQ_ITEMS = [
  {
    q: "До скольки нужно заезжать и выезжать?",
    a: "Заезд с 14:00, выезд до 12:00. Ранний заезд и поздний выезд возможны по предварительной договорённости при наличии свободных номеров.",
  },
  {
    q: "Включены ли завтраки в стоимость?",
    a: "Да, завтрак включён в стоимость всех номеров. Подаётся с 7:00 до 10:00 в столовой первого этажа. Обед и ужин заказываются отдельно.",
  },
  {
    q: "Можно ли привозить домашних животных?",
    a: "Небольших домашних животных принимаем с доплатой 500 руб/сутки. Просим заранее уведомить при бронировании.",
  },
  {
    q: "Есть ли парковка?",
    a: "Да, бесплатная охраняемая парковка на территории гостевого дома на 20 мест. Место не нужно бронировать заранее.",
  },
  {
    q: "Как добраться от ж/д вокзала?",
    a: "Расстояние от вокзала — 4 км. Можно добраться на такси (~200 руб) или автобусе №15 (остановка «Морская»). Встреча гостей по предварительной договорённости.",
  },
  {
    q: "Как оплатить бронирование?",
    a: "Принимаем онлайн-оплату картой, наличные при заезде. Предоплата 30% для подтверждения бронирования в высокий сезон.",
  },
];

const GALLERY_IMAGES = [HERO_IMAGE, ROOM_IMAGE, BEACH_IMAGE, ROOM_IMAGE, BEACH_IMAGE, HERO_IMAGE];

const BOOKED_DATES: string[] = [
  "2026-04-16", "2026-04-17", "2026-04-18", "2026-04-22", "2026-04-23",
  "2026-05-01", "2026-05-02", "2026-05-03", "2026-05-08", "2026-05-09", "2026-05-10",
];

const PEAK_MONTHS = [6, 7, 8];

const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAY_NAMES = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function getPriceForDate(date: Date, room: typeof ROOMS[0]) {
  const month = date.getMonth() + 1;
  const day = date.getDay();
  if (PEAK_MONTHS.includes(month)) return room.pricePeak;
  if (day === 0 || day === 6) return room.priceWeekend;
  return room.priceWeekday;
}

function formatDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function useSectionFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [bookingStart, setBookingStart] = useState<string | null>(null);
  const [bookingEnd, setBookingEnd] = useState<string | null>(null);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [season, setSeason] = useState<"low" | "mid" | "high">("mid");

  const heroRef = useSectionFade();
  const roomsRef = useSectionFade();
  const servicesRef = useSectionFade();
  const aboutRef = useSectionFade();
  const galleryRef = useSectionFade();
  const reviewsRef = useSectionFade();
  const priceRef = useSectionFade();
  const faqRef = useSectionFade();
  const contactRef = useSectionFade();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };

  const handleDateClick = (dateStr: string) => {
    if (BOOKED_DATES.includes(dateStr)) return;
    if (!bookingStart || (bookingStart && bookingEnd)) {
      setBookingStart(dateStr);
      setBookingEnd(null);
    } else {
      if (dateStr < bookingStart) {
        setBookingEnd(bookingStart);
        setBookingStart(dateStr);
      } else {
        setBookingEnd(dateStr);
      }
    }
  };

  const isInRange = (dateStr: string) => {
    if (!bookingStart || !bookingEnd) return false;
    return dateStr > bookingStart && dateStr < bookingEnd;
  };

  const calcTotalPrice = () => {
    if (!bookingStart || !bookingEnd) return null;
    let total = 0;
    const start = new Date(bookingStart);
    const end = new Date(bookingEnd);
    const days = Math.round((end.getTime() - start.getTime()) / 86400000);
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      total += getPriceForDate(d, selectedRoom);
    }
    return { days, total };
  };

  const priceCalc = calcTotalPrice();

  const navLinks = [
    { href: "#rooms", label: "Номера" },
    { href: "#services", label: "Услуги" },
    { href: "#about", label: "О нас" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#price", label: "Цены" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-sand-light font-golos overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("#home")} className="font-cormorant text-2xl font-semibold text-sea-dark flex items-center gap-2">
            <span>🌊</span> Морской Берег
          </button>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-golos text-foreground/80 hover:text-sea transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#booking")}
              className="bg-sea text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-sea-dark transition-colors">
              Забронировать
            </button>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} className="text-sea-dark" />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-sand-light border-t border-sand px-4 py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-left py-2 text-foreground/80 hover:text-sea transition-colors border-b border-sand/50">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#booking")}
              className="bg-sea text-white px-5 py-2 rounded-full text-sm font-medium mt-2">
              Забронировать
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" ref={heroRef as any} className="relative min-h-screen flex items-center justify-center section-fade">
        <div className="absolute inset-0 bg-gradient-to-b from-sea-dark/60 via-sea/30 to-sand-light/80 z-10" />
        <img src={HERO_IMAGE} alt="Гостевой дом у моря" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-sand-light/90 tracking-[0.3em] uppercase text-sm font-golos mb-4 animate-fade-in">Гостевой дом на черноморском побережье</p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-white text-shadow mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Морской Берег
          </h1>
          <p className="text-sand-light/90 text-lg md:text-xl font-golos max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Где волны убаюкивают, солнце греет душу, а время течёт иначе
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <button onClick={() => scrollTo("#booking")}
              className="bg-terra text-white px-8 py-4 rounded-full text-base font-medium hover:bg-terra-dark transition-all hover:scale-105 shadow-lg">
              Забронировать номер
            </button>
            <button onClick={() => scrollTo("#rooms")}
              className="glass text-white border border-white/30 px-8 py-4 rounded-full text-base font-medium hover:bg-white/20 transition-all">
              Смотреть номера
            </button>
          </div>
          <div className="flex justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[["15", "лет у моря"], ["12", "уютных номеров"], ["4.9★", "рейтинг"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-cormorant text-3xl font-semibold text-white">{num}</div>
                <div className="text-sand-light/80 text-xs uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
          <Icon name="ChevronDown" size={32} className="text-white/70" />
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" ref={roomsRef as any} className="py-24 px-4 bg-sand-light section-fade">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Выберите свой уют</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Наши номера</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative overflow-hidden h-56">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-terra text-white text-xs font-medium px-3 py-1 rounded-full">
                    от {room.priceWeekday.toLocaleString()} ₽/ночь
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-2">{room.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Icon name="Users" size={14} /> {room.capacity} чел.</span>
                    <span className="flex items-center gap-1"><Icon name="Maximize" size={14} /> {room.size} м²</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities.map(a => (
                      <span key={a} className="bg-sea/10 text-sea-dark text-xs px-2 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                  <button onClick={() => { setSelectedRoom(room); scrollTo("#booking"); }}
                    className="w-full bg-sea text-white py-3 rounded-xl font-medium hover:bg-sea-dark transition-colors">
                    Выбрать и забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CALENDAR */}
      <section id="booking" className="py-24 px-4 bg-gradient-to-br from-sea-dark to-sea">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sea-light text-sm tracking-[0.3em] uppercase mb-3">Онлайн-бронирование</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white">Выберите даты</h2>
            <div className="w-20 h-0.5 bg-sea-light mx-auto mt-4" />
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {ROOMS.map(room => (
                <button key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedRoom.id === room.id ? "bg-terra text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
                  {room.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button onClick={() => {
                if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                else setCalMonth(m => m - 1);
              }} className="text-white hover:text-sea-light transition-colors p-2">
                <Icon name="ChevronLeft" size={24} />
              </button>
              <h3 className="font-cormorant text-2xl font-semibold text-white">
                {MONTH_NAMES[calMonth]} {calYear}
              </h3>
              <button onClick={() => {
                if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                else setCalMonth(m => m + 1);
              }} className="text-white hover:text-sea-light transition-colors p-2">
                <Icon name="ChevronRight" size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-sea-light/70 text-xs font-medium py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: getFirstDayOfMonth(calYear, calMonth) }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: getDaysInMonth(calYear, calMonth) }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(calYear, calMonth, day);
                const isBooked = BOOKED_DATES.includes(dateStr);
                const isStart = bookingStart === dateStr;
                const isEnd = bookingEnd === dateStr;
                const inRange = isInRange(dateStr);
                const isPast = new Date(dateStr) < new Date(new Date().setHours(0, 0, 0, 0));
                const date = new Date(dateStr);
                const price = getPriceForDate(date, selectedRoom);
                const isPeak = PEAK_MONTHS.includes(calMonth + 1);
                return (
                  <button
                    key={day}
                    onClick={() => !isPast && !isBooked && handleDateClick(dateStr)}
                    disabled={isBooked || isPast}
                    className={[
                      "relative flex flex-col items-center justify-center rounded-xl py-2 text-sm transition-all",
                      isBooked ? "bg-red-400/30 text-white/40 cursor-not-allowed line-through" : "",
                      isPast ? "opacity-30 cursor-not-allowed" : "",
                      (isStart || isEnd) ? "bg-terra text-white font-bold" : "",
                      inRange ? "bg-sea/30 text-white" : "",
                      !isBooked && !isPast && !isStart && !isEnd && !inRange ? "hover:bg-white/20 text-white cursor-pointer" : "",
                    ].join(" ")}
                  >
                    <span>{day}</span>
                    {!isBooked && !isPast && (
                      <span className={`text-[9px] mt-0.5 ${isPeak ? "text-sunset" : "text-sea-light/80"}`}>
                        {(price / 1000).toFixed(1)}к
                      </span>
                    )}
                    {isBooked && <span className="text-[9px] text-red-300/80">занят</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs text-white/70">
              {[["bg-white/20", "Будни"], ["bg-white/40", "Выходные"], ["bg-sunset/60", "Высокий сезон"], ["bg-red-400/30", "Занято"], ["bg-terra", "Выбрано"]].map(([cls, label]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded ${cls} inline-block`} />{label}
                </span>
              ))}
            </div>

            {bookingStart && (
              <div className="mt-8 bg-white/15 rounded-2xl p-6 border border-white/20">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sea-light/70 text-xs uppercase tracking-wide mb-1">Номер</p>
                    <p className="text-white font-medium">{selectedRoom.name}</p>
                  </div>
                  <div>
                    <p className="text-sea-light/70 text-xs uppercase tracking-wide mb-1">Заезд</p>
                    <p className="text-white font-medium">{bookingStart}</p>
                  </div>
                  <div>
                    <p className="text-sea-light/70 text-xs uppercase tracking-wide mb-1">Выезд</p>
                    <p className="text-white font-medium">{bookingEnd || "выберите дату"}</p>
                  </div>
                </div>
                {priceCalc && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sea-light/70 text-sm">{priceCalc.days} {priceCalc.days === 1 ? "ночь" : priceCalc.days < 5 ? "ночи" : "ночей"}</p>
                      <p className="font-cormorant text-3xl text-white">{priceCalc.total.toLocaleString()} ₽</p>
                    </div>
                    <button className="bg-terra hover:bg-terra-dark text-white px-8 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto">
                      Оформить бронирование
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef as any} className="py-24 px-4 bg-sand-light section-fade">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Всё включено</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Услуги и удобства</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-sand/50">
                <div className="w-12 h-12 bg-sea/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sea/20 transition-colors">
                  <Icon name={s.icon as any} size={24} className="text-sea" />
                </div>
                <h3 className="font-golos font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef as any} className="py-24 px-4 bg-white section-fade">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Наша история</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-6">О нас</h2>
              <div className="w-20 h-0.5 bg-sea mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Гостевой дом «Морской Берег» — это семейное дело, которое начиналось с маленького дома с садом прямо у моря.
                Вот уже 15 лет мы принимаем гостей, которые ищут настоящий отдых: без суеты, с домашней едой и живой атмосферой.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Мы верим, что лучший отдых — это когда ты чувствуешь себя как дома, но при этом тебя окружает море, солнце и
                забота хозяев. Каждый номер обустроен с любовью, а завтраки готовятся из свежих местных продуктов.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[["2009", "год основания"], ["1200+", "довольных семей"], ["100м", "до пляжа"]].map(([n, l]) => (
                  <div key={l} className="text-center p-4 bg-sand-light rounded-2xl">
                    <div className="font-cormorant text-3xl font-semibold text-sea-dark">{n}</div>
                    <div className="text-muted-foreground text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={BEACH_IMAGE} alt="Пляж" className="rounded-3xl w-full h-80 object-cover shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-terra text-white p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="font-cormorant text-2xl font-semibold mb-1">«Море лечит»</div>
                <div className="text-white/80 text-sm">Семья Ковалёвых, хозяева</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" ref={galleryRef as any} className="py-24 px-4 bg-sand-light section-fade">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Атмосфера</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Галерея</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} onClick={() => setActiveGallery(idx)}
                className={`cursor-pointer overflow-hidden rounded-2xl ${idx === 0 ? "md:row-span-2" : ""} group`}>
                <img src={img} alt={`Галерея ${idx + 1}`}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${idx === 0 ? "h-full min-h-[300px]" : "h-48"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeGallery !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setActiveGallery(null)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setActiveGallery(null)}>
            <Icon name="X" size={32} />
          </button>
          <img src={GALLERY_IMAGES[activeGallery]} alt="Фото" className="max-h-[90vh] max-w-full rounded-xl" onClick={e => e.stopPropagation()} />
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-sea-light" onClick={e => { e.stopPropagation(); setActiveGallery(i => (i! - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }}>
            <Icon name="ChevronLeft" size={48} />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-sea-light" onClick={e => { e.stopPropagation(); setActiveGallery(i => (i! + 1) % GALLERY_IMAGES.length); }}>
            <Icon name="ChevronRight" size={48} />
          </button>
        </div>
      )}

      {/* REVIEWS */}
      <section id="reviews" ref={reviewsRef as any} className="py-24 px-4 bg-white section-fade">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Мнения гостей</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Отзывы</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-sand-light rounded-2xl p-8 border border-sand/50 hover:shadow-lg transition-all">
                <div className="flex text-sunset mb-4 text-xl">
                  {Array.from({ length: r.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sea/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} className="text-sea" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.city} · {r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE LIST */}
      <section id="price" ref={priceRef as any} className="py-24 px-4 bg-sand-light section-fade">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Прозрачные цены</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Прайс-лист</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(["low", "mid", "high"] as const).map((s) => (
              <button key={s} onClick={() => setSeason(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${season === s ? "bg-sea text-white" : "bg-white text-foreground hover:bg-sea/10 border border-sand"}`}>
                {s === "low" ? "Низкий сезон" : s === "mid" ? "Межсезонье" : "Высокий сезон"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-sand/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sea/10">
                    <th className="text-left px-6 py-4 font-golos font-semibold text-foreground">Номер</th>
                    <th className="text-center px-4 py-4 font-golos font-semibold text-foreground">Гости</th>
                    <th className="text-right px-6 py-4 font-golos font-semibold text-foreground">Будни</th>
                    <th className="text-right px-6 py-4 font-golos font-semibold text-foreground">Выходные</th>
                    {season === "high" && <th className="text-right px-6 py-4 font-golos font-semibold text-sunset">Пик</th>}
                  </tr>
                </thead>
                <tbody>
                  {ROOMS.map((room, idx) => {
                    const mult = season === "low" ? 0.8 : 1;
                    return (
                      <tr key={room.id} className={idx % 2 === 0 ? "bg-white" : "bg-sand-light/50"}>
                        <td className="px-6 py-5">
                          <p className="font-semibold text-foreground">{room.name}</p>
                          <p className="text-muted-foreground text-sm">{room.size} м²</p>
                        </td>
                        <td className="text-center px-4 py-5 text-muted-foreground">{room.capacity} чел.</td>
                        <td className="text-right px-6 py-5 font-semibold text-foreground">
                          {Math.round(room.priceWeekday * mult).toLocaleString()} ₽
                        </td>
                        <td className="text-right px-6 py-5 font-semibold text-terra">
                          {Math.round(room.priceWeekend * mult).toLocaleString()} ₽
                        </td>
                        {season === "high" && (
                          <td className="text-right px-6 py-5 font-semibold text-sunset">
                            {room.pricePeak.toLocaleString()} ₽
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: "Percent", text: "Скидка 10% при бронировании от 7 ночей" },
              { icon: "Baby", text: "Дети до 5 лет — бесплатно" },
              { icon: "RotateCcw", text: "Бесплатная отмена за 3 дня до заезда" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-sand/50">
                <div className="w-8 h-8 bg-sea/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as any} size={16} className="text-sea" />
                </div>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Как нас найти</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Мы на карте</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="bg-sand-light rounded-3xl p-8 border border-sand/50">
            <div className="bg-gradient-to-br from-sea/20 to-sea-dark/30 rounded-2xl h-64 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(42,154,180,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(26,111,133,0.2) 0%, transparent 50%)`,
              }} />
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-terra rounded-full flex items-center justify-center mx-auto mb-3 animate-float shadow-lg">
                  <Icon name="MapPin" size={24} className="text-white" />
                </div>
                <p className="font-cormorant text-2xl text-sea-dark font-semibold">Гостевой дом «Морской Берег»</p>
                <p className="text-sea-dark/70 text-sm mt-1">г. Анапа, ул. Морская, 15</p>
                <p className="text-sea text-xs mt-2">100 метров от пляжа</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "Waves", name: "Пляж «Золотой»", dist: "100 м" },
                { icon: "Anchor", name: "Яхт-клуб", dist: "400 м" },
                { icon: "ShoppingBag", name: "Рынок", dist: "700 м" },
                { icon: "Footprints", name: "Набережная", dist: "1.2 км" },
              ].map((poi) => (
                <div key={poi.name} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-sand/50">
                  <div className="w-9 h-9 bg-sea/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={poi.icon as any} size={18} className="text-sea" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{poi.name}</p>
                    <p className="text-xs text-sea font-semibold">{poi.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef as any} className="py-24 px-4 bg-sand-light section-fade">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Частые вопросы</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Вопросы и ответы</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="bg-white rounded-2xl border border-sand/50 px-6 overflow-hidden">
                <AccordionTrigger className="font-golos font-medium text-foreground hover:text-sea hover:no-underline py-5 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactRef as any} className="py-24 px-4 bg-white section-fade">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sea text-sm tracking-[0.3em] uppercase mb-3">Всегда рады</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Контакты</h2>
            <div className="w-20 h-0.5 bg-sea mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (861) 234-56-78", sub: "Ежедневно с 8:00 до 22:00" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (903) 456-78-90", sub: "Ответим в течение часа" },
                { icon: "Mail", label: "Email", value: "info@morskoy-bereg.ru", sub: "Для деловых вопросов" },
                { icon: "MapPin", label: "Адрес", value: "г. Анапа, ул. Морская, 15", sub: "100 метров от пляжа" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 bg-sand-light rounded-2xl p-5 border border-sand/50">
                  <div className="w-11 h-11 bg-sea/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as any} size={20} className="text-sea" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{c.label}</p>
                    <p className="font-semibold text-foreground">{c.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-sea-dark to-sea rounded-3xl p-8 text-white">
              <h3 className="font-cormorant text-3xl font-light mb-4">Напишите нам</h3>
              <p className="text-sea-light/80 text-sm mb-6">Задайте любой вопрос — ответим быстро</p>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя"
                  className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40" />
                <input type="tel" placeholder="Номер телефона"
                  className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40" />
                <textarea rows={3} placeholder="Ваш вопрос..."
                  className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 resize-none" />
                <button className="w-full bg-terra hover:bg-terra-dark text-white py-3 rounded-xl font-medium transition-colors">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sea-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="font-cormorant text-3xl font-light">🌊 Морской Берег</div>
            <div className="flex flex-wrap gap-6 text-sm text-white/70 justify-center">
              {navLinks.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="hover:text-white transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2026 Гостевой дом «Морской Берег». Все права защищены.</p>
            <p>г. Анапа, ул. Морская, 15 · +7 (861) 234-56-78</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;