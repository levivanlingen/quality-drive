Hier is een concrete checklist met fixes:


Stop met transition: all




Waarom traag: je animeert onbewust layout-eigenschappen (width/height/margin/top/left/box-shadow), die elke frame layout + paint triggert.


Fix: animeer alleen transform en/of opacity.


Tailwind: vervang transition-all door transition-opacity of transition-transform.


Voorbeeld (Tailwind):
<div class="transition-transform duration-200 hover:scale-105 will-change-transform"></div>







Vermijd dure eigenschappen op hover




Dure: box-shadow, filter: blur() / drop-shadow(), backdrop-filter, border-radius veranderingen, background-image/gradient shifts.


Alternatief: gebruik een pseudo-element met een kleine, gecomposite schaduw of een subtiele opacity fade.
<div class="relative">
  <div class="absolute inset-0 rounded-2xl opacity-0 transition-opacity hover:opacity-100"></div>
  <!-- content -->
</div>

En geef de pseudo-laag will-change: opacity.




Promoot de kaart naar eigen compositing layer




Waarom: dan kan de GPU de animatie afhandelen zonder repaint van de hele pagina.


Fix:


CSS: will-change: transform, opacity;


of een no-op transform: transform: translateZ(0);


Tailwind (custom util of inline style):
<div class="[transform:translateZ(0)] will-change-transform will-change-opacity"></div>







Zorg dat de hover geen layout/flow wijzigt




Waarom traag: als je op hover bv. gap, margin, border-dikte of height verandert, moet de hele grid herberekend worden.


Fix: laat de “groei” visueel gebeuren met scale() binnen een “isolerende” wrapper:
<div class="isolate contain-paint"> <!-- of CSS: contain: layout paint; -->
  <div class="transition-transform hover:scale-105"></div>
</div>





Beperk repaint-storm door overlappende effecten




mix-blend-mode, veel semi-transparante lagen, of fixed/sticky elementen die overlappen met het hover-element forceren invalidatie.


Fix: vereenvoudig overlays, geef overlappende lagen ook compositing (will-change) of zet contain: paint; op de card.




Third-party scripts in productie




Chat-widgets, analytics, heatmaps, A/B-testing injecteren listeners op mousemove/hover en blokkeren de main thread.


Fix: laadt ze defer, zet sampling lager, of laad ze pas na user-interaction. Test eens zonder deze scripts (feature flag) en vergelijk FPS.




WebGL/3D modellen satureren de GPU




Zelfs als een specifieke card géén 3D heeft, kan een drukke WebGL-canvas elders de GPU bezighouden → haperende hovers.


Fix:


Pauzeer WebGL wanneer off-screen (IntersectionObserver).


Verlaag canvas FPS/resolutie in idle.


Render 3D alleen on-hover/on-view.


Eén WebGL-context per pagina als het kan.






Grote images/gradients op kaarten




Kosten bij paint. Gebruik vaste width/height + object-fit, serveer juiste srcset/sizes, en voorkom dat de hover de afbeelding-size verandert.




Te veel will-change




Ironisch genoeg kan overmatig gebruik juist slechter worden (te veel GPU-memory/layers).


Richtlijn: alleen op interactieve elementen en verwijder het als het niet nodig is.




DevTools checks (doe deze 4 en je weet meteen waar ‘t lekt)




Performance tab → profiel tijdens hover: kijk naar “Recalculate Style”, “Layout”, “Paint”, “Composite”.


Rendering pane → “Paint flashing” aan: zie je veel groen bij hover? Dan repaints.


Layers pane → check of je card een eigen layer krijgt.


FPS meter → zakt het juist bij hover? Dan is het een compositing/paint issue.


Snelle “good pattern” voor een card-hover (Tailwind):
<article
  class="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4
         transition-transform duration-200 ease-out
         hover:scale-[1.02]
         will-change-transform [transform:translateZ(0)]
         contain-paint">
  <header class="mb-3">
    <h3 class="text-lg font-semibold">Titel</h3>
  </header>
  <p class="opacity-80 transition-opacity duration-200 group-hover:opacity-100">
    Beschrijving…
  </p>
  <!-- i.p.v. box-shadow animatie: een zachte glow-laag -->
  <span class="pointer-events-none absolute inset-0 rounded-2xl opacity-0
               transition-opacity duration-200
               group-hover:opacity-100
               [box-shadow:0_10px_30px_rgba(0,0,0,0.35)] will-change-opacity"></span>
</article>

Samengevat: maak je hover uitsluitend op transform/opacity, isoleer de card (contain/eigen layer), vermijd dure filters/box-shadows, beperk third-party werk op hover, en tem je WebGL. Met de DevTools-checks zie je exact of je last hebt van layout, paint of compositing—en daarmee waar je moet ingrijpen.