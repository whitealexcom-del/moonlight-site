/* =========================================================
   Moonlight — сайт студии. Все интерактивные эффекты.
   ========================================================= */

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Шапка: фон при скролле ---------- */
var head = document.getElementById("siteHead");
function onScrollHead(){
  if(window.scrollY > 40) head.classList.add("scrolled");
  else head.classList.remove("scrolled");
}
onScrollHead();
window.addEventListener("scroll", onScrollHead, { passive:true });

/* ---------- Бургер-меню (телефон/планшет) ---------- */
var burger = document.getElementById("burgerBtn");
var mobileMenu = document.getElementById("mobileMenu");
burger.addEventListener("click", function(){
  burger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click", function(){ burger.classList.remove("open"); mobileMenu.classList.remove("open"); });
});

/* ---------- Курсор-прожектор + кастомный курсор (точка/кольцо) ----------
   === NEW: помимо розового "прожектора" теперь ещё рисуем сам курсор сами —
   точка идёт вплотную к мыши, кольцо чуть отстаёт (за счёт CSS-transition на
   left/top). Системный курсор прячется только через класс has-cursor (CSS),
   так что пока JS не поймал первое движение мыши — обычный курсор виден,
   никогда не остаёмся совсем без курсора. */
var glow = document.getElementById("cursorGlow");
var cursorDot = document.getElementById("cursorDot");
var cursorRing = document.getElementById("cursorRing");
var _hasCursor = false;
window.addEventListener("mousemove", function(e){
  document.documentElement.style.setProperty("--cx", e.clientX + "px");
  document.documentElement.style.setProperty("--cy", e.clientY + "px");
  if(cursorDot){ cursorDot.style.left = e.clientX + "px"; cursorDot.style.top = e.clientY + "px"; }
  if(cursorRing){ cursorRing.style.left = e.clientX + "px"; cursorRing.style.top = e.clientY + "px"; }
  if(!_hasCursor){ _hasCursor = true; document.body.classList.add("has-cursor"); }
});
window.addEventListener("mouseleave", function(){ document.body.classList.remove("has-cursor"); });
// Кольцо раздувается над кликабельными элементами — понятно, что тут можно нажать.
if(cursorRing){
  document.addEventListener("mouseover", function(e){
    if(e.target.closest("a, button, .work-card, input, textarea")) cursorRing.classList.add("is-hover");
  });
  document.addEventListener("mouseout", function(e){
    if(e.target.closest("a, button, .work-card, input, textarea")) cursorRing.classList.remove("is-hover");
  });
}

/* ---------- Галерея портфолио: список реальных фото ----------
   Все файлы, которые сейчас лежат в visual/images/portfolio/. Если добавишь
   ещё — пришли мне, обновлю этот список одной строкой (сайт статический,
   сам список папки браузер прочитать не может).
   Каждой карточке ищем видео с тем же именем в visual/video/ (например
   1782536210.mp4) — если файла нет, просто остаётся фото. */
var PORTFOLIO_FILES = [
  "1782536152.jpg","1782536165.jpg","1782536172.jpg","1782536178.jpg","1782536185.jpg","1782536191.jpg",
  "1782536202.jpg","1782536210.jpg","1782536220.jpg","1782536225.jpg","1782536229.jpg","1782536233.jpg",
  "1782536241.jpg","1782536255.jpg","1782536265.jpg","1782536295.jpg","1782536310.jpg","1782536311.jpg",
  "1782536316.jpg","1782536322.jpg","1782536330.jpg","1782536331.jpg","1782536334.jpg","1782536336.jpg",
  "1782536342.jpg","1782536353.jpg","1782536355.jpg","1782536361.jpg","1782536366.jpg","1782536374.jpg",
  "1782536378.jpg","1782536381.jpg","1782536403.jpg","1782536407.jpg","1782536425.jpg","1782536462.jpg",
  "1782536471.jpg","1782536477.jpg","1782536481.jpg","1782536486.jpg","1782536489.jpg","1782536496.jpg",
  "1782536501.jpg","1782536505.jpg","1782536508.jpg","1782536515.jpg","1782536517.jpg","1782536520.jpg",
  "1782536525.jpg","1782536529.jpg","1782536531.jpg","1782536536.jpg","1782536540.jpg","1782536543.jpg",
  "1782536545.jpg","1782536550.jpg","1782536563.jpg","1782536565.jpg","1782536567.jpg","1782536578.jpg",
  "1782536580.jpg","1782536585.jpg","1782536588.jpg","1782536592.jpg","1782536595.jpg","1782536599.jpg",
  "1782536606.jpg","1782536613.jpg","1782536625.jpg","1782536627.jpg","1782536631.jpg","1782536633.jpg",
  "1782536637.jpg","1782536639.jpg","1782536643.jpg","1782536647.jpg","1782536651.jpg","1782536658.jpg",
  "1782536660.jpg","1782536664.jpg","1782536665.jpg","1782536669.jpg","1782536671.jpg","1782536677.jpg",
  "1782536681.jpg","1782536684.jpg","1782536689.jpg","1782536693.jpg","1782536696.jpg","1782536699.jpg",
  "1782536703.jpg","1782536706.jpg","1782536710.jpg","1782536714.jpg","1782536717.jpg","1782536721.jpg",
  "1782536724.jpg","1782536727.jpg","1782536733.jpg","1782536736.jpg","1782536740.jpg","1782536745.jpg",
  "1782536747.jpg","1782536751.jpg","1782536753.jpg","1782536757.jpg","1782536761.jpg","1782536765.jpg",
  "1782536769.jpg","1782536772.jpg","1782536775.jpg","1782536780.jpg","1782536787.jpg","1782536789.jpg",
  "1782536793.jpg","1782536795.jpg","1782536800.jpg","1782536804.jpg","1782536806.jpg","1782536809.jpg",
  "1782536824.jpg","1782536832.jpg","1782536844.jpg","1782536848.jpg","1782536871.jpg","1782536874.jpg",
  "1782536879.jpg","1782536883.jpg","1782536887.jpg","1782536894.jpg","1782536897.jpg","1782536899.jpg",
  "1782536904.jpg","1782536907.jpg","1782536913.jpg","1782536917.jpg","1782536920.jpg","1782536924.jpg",
  "1782536928.jpg","1782536932.jpg","1782536937.jpg","1782536942.jpg","1782536945.jpg","1782536949.jpg",
  "1782536952.jpg","1782536986.jpg","1782536990.jpg","1782536993.jpg","1782536996.jpg","1782536999.jpg",
  "1782537005.jpg","1782537013.jpg","1782537021.jpg","1782537023.jpg","1782537025.jpg","1782537026.jpg",
  "1782537028.jpg","1782537030.jpg","1782537031.jpg","1782981970.jpg","1782981972.jpg","1782981973.jpg",
  "1782981975.jpg","1782981977.jpg","1782981979.jpg","1782981980.jpg","1782981982.jpg","1782981984.jpg",
  "1782981986.jpg","1782981992.jpg","1782981994.jpg","1782981996.jpg","1782981999.jpg","1782982001.jpg",
  "1782982003.jpg","1782982009.jpg","1782982014.jpg","1782982016.jpg","1782982018.jpg","1782982020.jpg",
  "1782982046.jpg","1782982047.jpg","1782982049.jpg","1782982051.jpg","1782982053.jpg","1782982055.jpg",
  "1782982058.jpg","1782982060.jpg","1782982062.jpg","1782982064.jpg","1782982065.jpg","1782982067.jpg",
  "1782982069.jpg","1782982070.jpg","1782982072.jpg","1782982074.jpg","1782982077.jpg",
  "1782982079.jpg","1782982081.jpg","1782982083.jpg","1782982085.jpg","1782982087.jpg","1782982088.jpg",
  "1782982091.jpg","1782982093.jpg","1782982095.jpg","1782982097.jpg","1782982099.jpg","1782982101.jpg",
  "1782982103.jpg","1782982104.jpg","1782982106.jpg","1782982108.jpg","1782982109.jpg","1782982111.jpg",
  "1782982113.jpg","1782982114.jpg","1782982121.jpg","1782982123.jpg",
  "1782982124.jpg","1782982128.jpg","1782982130.jpg","1782982133.jpg","1782982135.jpg","1782982136.jpg",
  "1782982141.jpg","1782982144.jpg","1782982146.jpg","1782982148.jpg",
  "1782982150.jpg","1782982152.jpg","1782982153.jpg","1782982155.jpg","1782982157.jpg","1782982159.jpg",
  "1782982161.jpg","1782982163.jpg","1782982164.jpg","1782982166.jpg","1782982167.jpg","1782982169.jpg",
  "1782982172.jpg","1782982176.jpg","1782982178.jpg","1782982179.jpg","1782982181.jpg",
  "1782982183.jpg","1782982185.jpg","1782982187.jpg","1782982189.jpg","1782982191.jpg","1782982194.jpg",
  "1782982196.jpg","1782982198.jpg","1782982199.jpg","1782982201.jpg","1782982203.jpg","1782982205.jpg",
  "1782982211.jpg","1782982213.jpg","1782982215.jpg","1782982219.jpg","1782982221.jpg","1782982223.jpg",
  "1782982226.jpg","1782982228.jpg","1782982230.jpg","1782982237.jpg","1782982251.jpg","1782982253.jpg",
  "1782982255.jpg","1782982258.jpg","1782982260.jpg","1782982261.jpg","1783313885.jpg",
  "1783313889.jpg"
];
/* ---------- Портфолио: мозаика постранично ----------
   === FIX: пробовал фикс-сетку 5×4 со "span" для высоких карточек — оставляла
   пустые ячейки на стыках страниц (жаловался на дыры). Вернул "каменную
   кладку" (CSS columns, см. style.css) — там физически не бывает пустот,
   каждая карточка просто встаёт в самую короткую колонку. Показываем по 20
   штук за раз, остальные листаются кнопками ‹ › под галереей. */
(function buildPortfolioPager(){
  var grid = document.getElementById("workGrid");
  if(!grid) return;
  var prevBtn = document.getElementById("workPrev");
  var nextBtn = document.getElementById("workNext");
  var label = document.getElementById("workPageLabel");
  var PAGE_SIZE = 20;
  var totalPages = Math.max(1, Math.ceil(PORTFOLIO_FILES.length / PAGE_SIZE));
  var page = 0;

  function cardHtml(fname, absoluteIndex){
    var base = fname.replace(/\.[a-z0-9]+$/i, "");
    return '<div class="work-card" data-index="' + absoluteIndex + '">' +
      '<img src="visual/images/portfolio/' + fname + '" alt="Работа" loading="lazy" onerror="this.parentElement.classList.add(\'img-missing\')">' +
      '<video class="work-video" muted loop playsinline preload="none"><source data-src="visual/video/' + base + '.mp4" type="video/mp4"></video>' +
      '</div>';
  }

  // === NEW: клик по карточке — открываем полноэкранный лайтбокс (см. ниже,
  // openLightbox определена в блоке лайтбокса и ходит по ВСЕМ 289 фото,
  // а не только по текущей странице мозаики).
  grid.addEventListener("click", function(e){
    var card = e.target.closest(".work-card");
    if(!card) return;
    var idx = parseInt(card.getAttribute("data-index"), 10);
    if(!isNaN(idx) && typeof window.openLightbox === "function") window.openLightbox(idx);
  });

  // Ловим наведение через делегирование на всей сетке — карточки внутри
  // пересоздаются при каждой смене страницы, отдельные обработчики на
  // каждую карточку пришлось бы навешивать заново, делегирование проще.
  grid.addEventListener("mousemove", function(e){
    var card = e.target.closest(".work-card");
    if(!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100) + "%");
    card.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100) + "%");
  });
  grid.addEventListener("mouseover", function(e){
    var card = e.target.closest(".work-card");
    if(!card || card.dataset.hoverBound) return;
    card.dataset.hoverBound = "1";
    var video = card.querySelector(".work-video");
    if(!video) return;
    card.addEventListener("mouseenter", function(){
      var source = video.querySelector("source");
      var lazySrc = source && source.getAttribute("data-src");
      if(lazySrc){ source.setAttribute("src", lazySrc); source.removeAttribute("data-src"); video.load(); }
      video.play().catch(function(){ /* нет файла — просто останется статичное фото */ });
    });
    card.addEventListener("mouseleave", function(){ video.pause(); });
  });

  function renderPage(next){
    page = Math.max(0, Math.min(totalPages - 1, next));
    var start = page * PAGE_SIZE;
    grid.innerHTML = PORTFOLIO_FILES.slice(start, start + PAGE_SIZE).map(function(fname, i){
      return cardHtml(fname, start + i);
    }).join("");
    if(label) label.textContent = (page + 1) + " / " + totalPages;
    if(prevBtn) prevBtn.disabled = page === 0;
    if(nextBtn) nextBtn.disabled = page === totalPages - 1;
  }
  // Прокручиваем к началу галереи только когда листаем кнопками — при
  // первой отрисовке (загрузка страницы) скроллить никуда не нужно.
  // === FIX: раньше листалка ещё и принудительно скроллила страницу к началу
  // галереи ("дёргает вверх", жаловался) — просто перерисовываем карточки на
  // месте, без прыжка скролла.
  if(prevBtn) prevBtn.addEventListener("click", function(){ renderPage(page - 1); });
  if(nextBtn) nextBtn.addEventListener("click", function(){ renderPage(page + 1); });
  renderPage(0);
})();

/* ---------- Параллакс фона + скролл-морфинг хиро ----------
   Считаем оба эффекта в одном requestAnimationFrame, чтобы не плодить
   лишние обработчики скролла (важно для слабых телефонов). */
var parallaxLayers = Array.prototype.slice.call(document.querySelectorAll(".parallax-layer"));
var heroSection = document.getElementById("hero");
// === NEW: полоска прогресса скролла и кнопка "наверх" — считаем в этом же
// цикле, чтобы не заводить ещё один scroll-listener.
var scrollProgressEl = document.getElementById("scrollProgress");
var toTopBtn = document.getElementById("toTop");
var _ticking = false;
function updateParallax(){
  var y = window.scrollY;
  parallaxLayers.forEach(function(layer){
    var speed = parseFloat(layer.getAttribute("data-speed")) || 0.2;
    layer.style.transform = "translate3d(0," + (y * speed) + "px,0)";
  });
  updateHeroMorph();
  if(scrollProgressEl){
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgressEl.style.width = (docH > 0 ? Math.min(100, (y / docH) * 100) : 0) + "%";
  }
  if(toTopBtn){ toTopBtn.classList.toggle("is-visible", y > window.innerHeight * 0.6); }
  _ticking = false;
}
// Прогресс "прилипания" хиро (0 в начале, 1 когда докрутили до конца
// увеличенной высоты секции) → CSS-переменная --morph, от которой зависит
// радиус круга морфинга (см. .hero-portrait.color и .hero-moon-fallback в CSS).
function updateHeroMorph(){
  if(!heroSection) return;
  var rect = heroSection.getBoundingClientRect();
  var total = heroSection.offsetHeight - window.innerHeight;
  var progress = 0;
  if(total > 0){ progress = Math.min(1, Math.max(0, -rect.top / total)); }
  document.documentElement.style.setProperty("--morph", progress.toFixed(3));
}
window.addEventListener("scroll", function(){
  if(!_ticking){ requestAnimationFrame(updateParallax); _ticking = true; }
}, { passive:true });
updateParallax();

/* ---------- Плавное появление блоков при скролле ---------- */
var revealEls = document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:"0px 0px -40px 0px" });
  revealEls.forEach(function(el){ io.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add("is-visible"); });
}

/* ---------- Рябь при клике на кнопки (визуальный отклик на тап) ---------- */
document.querySelectorAll(".btn, .social-ico").forEach(function(btn){
  btn.addEventListener("click", function(e){
    var r = btn.getBoundingClientRect();
    var span = document.createElement("span");
    var size = Math.max(r.width, r.height);
    span.className = "ripple";
    span.style.width = span.style.height = size + "px";
    span.style.left = (e.clientX - r.left - size/2) + "px";
    span.style.top = (e.clientY - r.top - size/2) + "px";
    btn.appendChild(span);
    setTimeout(function(){ span.remove(); }, 650);
  });
});

/* ---------- Скрыть видео, если файл фона ещё не подложен ----------
   Пока нет visual/video/hero-bg.mp4 — просто остаётся красивый
   градиентный фон-заглушка (.hero-fallback-bg), ничего не ломается. */
var heroVideo = document.getElementById("heroVideo");
heroVideo.addEventListener("error", function(){ heroVideo.style.display = "none"; }, true);
heroVideo.addEventListener("loadeddata", function(){ heroVideo.style.opacity = "1"; });
heroVideo.style.opacity = "0";
heroVideo.style.transition = "opacity 0.8s ease";

/* ---------- Морфинг с видео вместо статичной цветной фотки ----------
   === NEW: если появится файл visual/video/portrait-color.mp4 — он сам
   подхватится и начнёт играть поверх цветного фото. Пока файла нет —
   остаётся скрытым (opacity:0 из CSS), под дымной маской видно фото,
   как раньше. Никакой доп. настройки не нужно, просто закинь файл. === */
var heroColorVideo = document.getElementById("heroColorVideo");
if(heroColorVideo){
  heroColorVideo.addEventListener("error", function(){ heroColorVideo.style.display = "none"; }, true);
  heroColorVideo.addEventListener("playing", function(){ heroColorVideo.classList.add("is-playing"); });
}

/* ---------- Ссылка на приложение ----------
   === NEW: href уже стоит на реальном адресе приложения —
   https://whitealexcom-del.github.io/Moonlight-perm/ (и у кнопки в CTA,
   и у карточки в разделе "Приложение"), задан прямо в index.html.
   Переедет приложение на свой домен — поменяй href у #ctaAppLink и
   #appLink в index.html на новый адрес. */

/* ---------- Кнопка "наверх" ---------- */
var toTopClick = document.getElementById("toTop");
if(toTopClick){
  toTopClick.addEventListener("click", function(){
    window.scrollTo({ top:0, behavior:"smooth" });
  });
}

/* ---------- Магнитные кнопки ----------
   === NEW: крупные кнопки чуть "притягиваются" к курсору внутри своих
   границ — на 25% от смещения мыши от центра, с плавным возвратом на
   mouseleave. Работает только там, где есть мышь (на тапе просто нет
   mousemove — ничего не сломается). */
document.querySelectorAll(".btn-lg, .nav-cta").forEach(function(btn){
  btn.addEventListener("mousemove", function(e){
    var r = btn.getBoundingClientRect();
    var mx = e.clientX - r.left - r.width / 2;
    var my = e.clientY - r.top - r.height / 2;
    btn.style.transform = "translate(" + (mx * 0.25) + "px," + (my * 0.25) + "px)";
  });
  btn.addEventListener("mouseleave", function(){ btn.style.transform = ""; });
});

/* ---------- Наклон 3D при наведении (тилт) ----------
   === NEW: карточки услуг и фото мастера слегка "наклоняются" вслед за
   курсором — лёгкая параллакс-глубина без библиотек, чистый JS. */
function addTilt(el, strength){
  if(!el) return;
  el.addEventListener("mousemove", function(e){
    var r = el.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width - 0.5;
    var py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = "perspective(700px) rotateX(" + (-py * strength) + "deg) rotateY(" + (px * strength) + "deg)";
  });
  el.addEventListener("mouseleave", function(){ el.style.transform = ""; });
}
document.querySelectorAll(".service-card").forEach(function(el){ addTilt(el, 7); });
addTilt(document.querySelector(".about-photo-frame"), 5);

/* ---------- Бегущая строка-тикер ----------
   === NEW: реальное число работ в портфолио (PORTFOLIO_FILES.length) — не
   захардкожено, поэтому не устареет, если пришлёшь ещё фото и я обновлю
   список. Дублируем контент дважды подряд для бесшовной петли (анимация
   сдвигает на -50%, то есть ровно на одну копию). */
(function buildMarquee(){
  var track = document.getElementById("marqueeTrack");
  if(!track) return;
  var items = [
    PORTFOLIO_FILES.length + " работ в портфолио",
    "Медицинское образование",
    "Авторские эскизы",
    "Тату-студия в Перми",
    "Запись через приложение",
    "Цветная и ч/б графика"
  ];
  var html = items.map(function(t){ return "<span>" + t + "</span>"; }).join("");
  track.innerHTML = html + html;
})();

/* ---------- Лайтбокс портфолио ----------
   === NEW: полноэкранный просмотр по клику на карточку в галерее. Ходит по
   ВСЕМ 289 фото (глобальный индекс через data-index на карточке), а не
   только по текущей странице мозаики — так что ‹ › пролистывают весь
   портфель насквозь. Esc / крест / клик по фону — закрыть. */
(function initLightbox(){
  var lb = document.getElementById("lightbox");
  if(!lb) return;
  var stage = document.getElementById("lightboxStage");
  var closeBtn = document.getElementById("lightboxClose");
  var prevBtn = document.getElementById("lightboxPrev");
  var nextBtn = document.getElementById("lightboxNext");
  var current = 0;

  function show(index){
    var total = PORTFOLIO_FILES.length;
    current = ((index % total) + total) % total;
    var fname = PORTFOLIO_FILES[current];
    stage.innerHTML = '<img src="visual/images/portfolio/' + fname + '" alt="Работа">';
  }
  window.openLightbox = function(index){
    show(index);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  function close(){
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", function(e){ if(e.target === lb) close(); });
  prevBtn.addEventListener("click", function(){ show(current - 1); });
  nextBtn.addEventListener("click", function(){ show(current + 1); });
  window.addEventListener("keydown", function(e){
    if(!lb.classList.contains("is-open")) return;
    if(e.key === "Escape") close();
    if(e.key === "ArrowLeft") show(current - 1);
    if(e.key === "ArrowRight") show(current + 1);
  });
})();

/* ---------- Заголовок вкладки при уходе со страницы ----------
   === NEW: маленькая деталь — если свернуть/переключить вкладку, заголовок
   меняется на игривый, при возврате — обратно на обычный. */
(function tabTitleSwap(){
  var original = document.title;
  document.addEventListener("visibilitychange", function(){
    document.title = document.hidden ? "Не уходи 👀 — Moonlight" : original;
  });
})();

/* ---------- Форма сообщения (уходит в базу приложения) ----------
   === NEW: пишем напрямую в Supabase через обычный fetch (REST API), без
   подключения библиотеки supabase-js с CDN — в приложении именно из-за
   блокировки CDN без VPN её пришлось вшивать в файл, тут той же проблемы
   просто не будет, fetch не зависит от стороннего скрипта.
   Публичный (anon/publishable) ключ — тот же, что уже открыто используется
   в самом приложении в браузере, для него это нормально и безопасно, лишь
   бы на таблице стояла RLS-политика "только insert" (без чтения чужих строк). */
(function leadForm(){
  var form = document.getElementById("leadForm");
  if(!form) return;
  var statusEl = document.getElementById("leadFormStatus");
  var submitBtn = document.getElementById("leadFormSubmit");
  var SUPA_URL = "https://xhsbtasfxfjcbkidvruy.supabase.co";
  var SUPA_KEY = "sb_publishable_s-jY4Ylz5UXjrB123M59vg_1f1RBgMq";

  form.addEventListener("submit", async function(e){
    e.preventDefault();
    var fd = new FormData(form);
    var payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim()
    };
    if(!payload.message){ return; }
    submitBtn.disabled = true;
    statusEl.textContent = "Отправляем…";
    statusEl.className = "lead-form-status";
    try {
      var res = await fetch(SUPA_URL + "/rest/v1/site_leads", {
        method: "POST",
        headers: {
          "apikey": SUPA_KEY,
          "Authorization": "Bearer " + SUPA_KEY,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(payload)
      });
      if(!res.ok) throw new Error("HTTP " + res.status);
      statusEl.textContent = "Отправлено! Мастер скоро ответит.";
      statusEl.className = "lead-form-status ok";
      form.reset();
    } catch(err){
      statusEl.textContent = "Не получилось отправить — напишите в ВК (кнопка выше).";
      statusEl.className = "lead-form-status err";
      console.warn("lead form", err);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();

/* ---------- Баннер про приложение ----------
   === NEW: выезжает снизу через 5 сек после захода — не сразу, чтобы не
   мешать первому впечатлению от хиро. Закрыл (крестик) — запоминаем в
   localStorage и больше не показываем этому браузеру. Клик на кнопку
   "Установить" тоже считаем закрытием (человек и так перешёл в приложение). */
(function installBanner(){
  var banner = document.getElementById("installBanner");
  if(!banner) return;
  var KEY = "moonlight-install-dismissed";
  try{ if(localStorage.getItem(KEY)) return; }catch(e){ /* приватный режим — просто не запоминаем */ }
  var closeBtn = document.getElementById("installBannerClose");
  var openBtn = document.getElementById("installBannerBtn");
  function dismiss(){
    banner.classList.remove("is-visible");
    banner.setAttribute("aria-hidden", "true");
    try{ localStorage.setItem(KEY, "1"); }catch(e){}
  }
  setTimeout(function(){
    banner.setAttribute("aria-hidden", "false");
    banner.classList.add("is-visible");
  }, 5000);
  if(closeBtn) closeBtn.addEventListener("click", dismiss);
  if(openBtn) openBtn.addEventListener("click", dismiss);
})();

/* ---------- Пасхалка: код Конами ----------
   === NEW: ↑↑↓↓←→←→ба — запускает розово-оливковое конфетти. Мелочь, но
   с душой — "не сдерживайся" в чистом виде. */
(function konamiEasterEgg(){
  var CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  var pos = 0;
  window.addEventListener("keydown", function(e){
    pos = (e.key === CODE[pos]) ? pos + 1 : (e.key === CODE[0] ? 1 : 0);
    if(pos === CODE.length){ pos = 0; launchConfetti(); }
  });
  function launchConfetti(){
    for(var i = 0; i < 70; i++){
      (function(i){
        var el = document.createElement("div");
        el.className = "confetti-bit";
        el.style.left = (Math.random() * 100) + "vw";
        el.style.background = i % 2 ? "#E85CB8" : "#A38A5E";
        el.style.animationDuration = (2.4 + Math.random() * 1.6) + "s";
        el.style.animationDelay = (Math.random() * 0.4) + "s";
        document.body.appendChild(el);
        setTimeout(function(){ el.remove(); }, 4200);
      })(i);
    }
  }
})();
