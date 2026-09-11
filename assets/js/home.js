import { injectShell, $, $$ } from './layout.js'

injectShell()


// =====================================================
// BANNER SLIDER
// =====================================================

const track = $('#bannerTrack')
const originalSlides = track ? $$('.banner-slide', track) : []
const prevBtn = $('#bannerPrev')
const nextBtn = $('#bannerNext')
const slider = $('.banner-slider')

if (track && originalSlides.length > 0) {

  const total = originalSlides.length

  let current = 0
  let position = 1

  let autoTimer = null
  let isAnimating = false

  let dragStartX = 0
  let dragCurrentX = 0
  let isDragging = false

  const AUTOPLAY_TIME = 8000
  const TRANSITION_TIME = 700
  const DRAG_THRESHOLD = 60


  // ---------------------------------------------------
  // CLONES
  // ---------------------------------------------------

  const lastClone =
    originalSlides[total - 1].cloneNode(true)

  const firstClone =
    originalSlides[0].cloneNode(true)

  track.insertBefore(
    lastClone,
    track.firstChild
  )

  track.appendChild(
    firstClone
  )


  // ---------------------------------------------------
  // CONFIGURAÇÃO
  // ---------------------------------------------------

  track.style.transition =
    `transform ${TRANSITION_TIME}ms cubic-bezier(.22,.61,.36,1)`

  track.style.transform =
    `translate3d(-100%, 0, 0)`


  // ---------------------------------------------------
  // FUNÇÃO DE POSIÇÃO
  // ---------------------------------------------------

  function updatePosition(animate = true) {

    track.style.transition = animate
      ? `transform ${TRANSITION_TIME}ms cubic-bezier(.22,.61,.36,1)`
      : 'none'

    track.style.transform =
      `translate3d(-${position * 100}%, 0, 0)`
  }


  // ---------------------------------------------------
  // PRÓXIMO
  // ---------------------------------------------------

  function next(manual = false) {

    if (isAnimating) return

    isAnimating = true

    current++
    position++

    updatePosition(true)

    if (manual) {
      restartAuto()
    }
  }


  // ---------------------------------------------------
  // ANTERIOR
  // ---------------------------------------------------

  function prev() {

    if (isAnimating) return

    isAnimating = true

    current--
    position--

    updatePosition(true)

    restartAuto()
  }


  // ---------------------------------------------------
  // FINAL DA ANIMAÇÃO
  // ---------------------------------------------------

  track.addEventListener(
    'transitionend',
    () => {

      // Último banner -> clone do primeiro
      if (position === total + 1) {

        current = 0
        position = 1

        updatePosition(false)
      }


      // Primeiro banner -> clone do último
      else if (position === 0) {

        current = total - 1
        position = total

        updatePosition(false)
      }


      isAnimating = false
    }
  )


  // ---------------------------------------------------
  // BOTÃO PRÓXIMO
  // ---------------------------------------------------

  if (nextBtn) {

    nextBtn.addEventListener(
      'click',
      () => {
        next(true)
      }
    )
  }


  // ---------------------------------------------------
  // BOTÃO ANTERIOR
  // ---------------------------------------------------

  if (prevBtn) {

    prevBtn.addEventListener(
      'click',
      () => {
        prev()
      }
    )
  }


  // ===================================================
  // ARRASTAR COM MOUSE
  // ===================================================

  if (slider) {

    slider.addEventListener(
      'mousedown',
      (event) => {

        if (isAnimating) return

        isDragging = true

        dragStartX = event.clientX
        dragCurrentX = event.clientX

        track.style.transition = 'none'

        slider.style.cursor = 'grabbing'

        stopAuto()
      }
    )


    slider.addEventListener(
      'mousemove',
      (event) => {

        if (!isDragging) return

        dragCurrentX = event.clientX

        const diff =
          dragCurrentX - dragStartX

        const containerWidth =
          slider.offsetWidth

        const percentage =
          (diff / containerWidth) * 100

        const basePosition =
          -(position * 100)

        track.style.transform =
          `translate3d(${basePosition + percentage}%, 0, 0)`
      }
    )


    slider.addEventListener(
      'mouseup',
      () => {

        if (!isDragging) return

        finishDrag()
      }
    )


    slider.addEventListener(
      'mouseleave',
      () => {

        if (!isDragging) return

        finishDrag()
      }
    )


    function finishDrag() {

      isDragging = false

      slider.style.cursor = 'grab'

      const diff =
        dragCurrentX - dragStartX

      if (Math.abs(diff) >= DRAG_THRESHOLD) {

        if (diff < 0) {
          next(true)
        } else {
          prev()
        }

      } else {

        updatePosition(true)

        setTimeout(() => {
          isAnimating = false
        }, TRANSITION_TIME)
      }

      restartAuto()
    }


    // =================================================
    // TOUCH / CELULAR
    // =================================================

    slider.addEventListener(
      'touchstart',
      (event) => {

        if (isAnimating) return

        dragStartX =
          event.touches[0].clientX

        dragCurrentX =
          dragStartX

        isDragging = true

        stopAuto()

      },
      { passive: true }
    )


    slider.addEventListener(
      'touchmove',
      (event) => {

        if (!isDragging) return

        dragCurrentX =
          event.touches[0].clientX

        const diff =
          dragCurrentX - dragStartX

        const containerWidth =
          slider.offsetWidth

        const percentage =
          (diff / containerWidth) * 100

        const basePosition =
          -(position * 100)

        track.style.transition = 'none'

        track.style.transform =
          `translate3d(${basePosition + percentage}%, 0, 0)`

      },
      { passive: true }
    )


    slider.addEventListener(
      'touchend',
      () => {

        if (!isDragging) return

        const diff =
          dragCurrentX - dragStartX

        isDragging = false

        if (Math.abs(diff) >= DRAG_THRESHOLD) {

          if (diff < 0) {
            next(true)
          } else {
            prev()
          }

        } else {

          updatePosition(true)

          setTimeout(() => {
            isAnimating = false
          }, TRANSITION_TIME)
        }

        restartAuto()

      },
      { passive: true }
    )
  }


  // ===================================================
  // AUTOPLAY
  // ===================================================

  function startAuto() {

    stopAuto()

    autoTimer = setTimeout(
      () => {

        next(false)

        startAuto()

      },
      AUTOPLAY_TIME
    )
  }


  function stopAuto() {

    if (autoTimer) {

      clearTimeout(autoTimer)
      autoTimer = null

    }
  }


  function restartAuto() {

    stopAuto()
    startAuto()

  }


  // ===================================================
  // MOUSE SOBRE O BANNER
  // ===================================================

  if (slider) {

    slider.style.cursor = 'grab'

    slider.addEventListener(
      'mouseenter',
      () => {
        stopAuto()
      }
    )

    slider.addEventListener(
      'mouseleave',
      () => {

        if (!isDragging) {
          restartAuto()
        }

      }
    )
  }


  // ===================================================
  // INICIALIZAÇÃO
  // ===================================================

  current = 0
  position = 1

  updatePosition(false)

  startAuto()

}


// =====================================================
// MAPA DAS UNIDADES MEGAM TELECOM
// MAPA + LEAFLET
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  const mapElement =
    document.getElementById('megamMap')

  if (
    !mapElement ||
    typeof L === 'undefined'
  ) {
    return
  }


  // ---------------------------------------------------
  // LOCALIZAÇÕES
  // ---------------------------------------------------

  const locations = {

    principal: {
      name: 'Escritório Principal',
      city: 'Sarapui - SP',
      lat: -23.641112880079355,
      lng: -47.827610466485204
    },

    capela: {
      name: 'Filial Capela do Alto',
      city: 'Capela do Alto - SP',
      lat: -23.47156617344497,
      lng: -47.74003390409924
    },

    jundiacanga: {
      name: 'Filial Jundiacanga',
      city: 'Araçoiaba da Serra - SP',
      lat: -23.569540,
      lng: -47.688323
    }

  }


  // ---------------------------------------------------
  // CRIA MAPA
  // ---------------------------------------------------

  const map = L.map('megamMap', {

    // Desativado para evitar zoom acidental
    // ao usar o scroll do mouse
    scrollWheelZoom: false

  })


  // ---------------------------------------------------
  // MAPA
  // ---------------------------------------------------

  // Base cartográfica: OpenStreetMap.
  // Uso conforme à Tile Usage Policy: https://operations.osmfoundation.org/policies/tiles/
  // O Leaflet solicita apenas os tiles necessários para a área visível; não há pré-carregamento/offline.
  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'
    }
  ).addTo(map)


  // ---------------------------------------------------
  // ZOOM COM CTRL + RODA DO MOUSE
  // ---------------------------------------------------

  map.getContainer().addEventListener(
    'wheel',
    (event) => {

      // Sem CTRL:
      // não faz zoom
      if (!event.ctrlKey) {
        return
      }

      event.preventDefault()

      const delta =
        event.deltaY < 0 ? 1 : -1

      map.setZoom(
        map.getZoom() + delta
      )

    },
    { passive: false }
  )


  // ---------------------------------------------------
  // ÍCONE PERSONALIZADO
  // ---------------------------------------------------

  const megamIcon = L.icon({

    iconUrl:
      'assets/img/ponto.png',

    iconSize: [
      65,
      65
    ],

    iconAnchor: [
      37,
      65
    ],

    popupAnchor: [
      0,
      -65
    ]

  })


  // ---------------------------------------------------
  // MARCADORES
  // ---------------------------------------------------

  const markers = {}


  Object.entries(locations).forEach(
    ([key, location]) => {

      const marker = L.marker(
        [
          location.lat,
          location.lng
        ],
        {
          icon: megamIcon
        }
      ).addTo(map)


      const mapsUrl =
        `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`


      marker.bindPopup(`

        <div class="map-popup">

          <strong>
            ${location.name}
          </strong>

          <span>
            ${location.city}
          </span>

          <a
            href="${mapsUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Como chegar →
          </a>

        </div>

      `)


      markers[key] = marker

    }
  )


  // ---------------------------------------------------
  // ENQUADRA AS 3 UNIDADES
  // ---------------------------------------------------

  const bounds =
    L.latLngBounds(
      Object.values(locations).map(
        location => [
          location.lat,
          location.lng
        ]
      )
    )


  map.fitBounds(
    bounds,
    {
      padding: [
        50,
        50
      ]
    }
  )


  // ---------------------------------------------------
  // SELEÇÃO DAS UNIDADES
  // ---------------------------------------------------

  const cards =
    document.querySelectorAll(
      '.location-card'
    )


  const routeButton =
    document.getElementById(
      'locationRoute'
    )


  function selectLocation(key) {

    const location =
      locations[key]

    if (!location) {
      return
    }


    // Remove ativo
    cards.forEach(card => {

      card.classList.remove(
        'active'
      )

    })


    // Ativa cartão selecionado
    const selectedCard =
      document.querySelector(
        `.location-card[data-location="${key}"]`
      )


    if (selectedCard) {

      selectedCard.classList.add(
        'active'
      )

    }


    // Centraliza mapa
    map.flyTo(
      [
        location.lat,
        location.lng
      ],
      16,
      {
        duration: 1
      }
    )


    // Abre popup
    if (markers[key]) {

      markers[key].openPopup()

    }


    // Atualiza botão Como chegar
    if (routeButton) {

      routeButton.href =
        `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`

    }

  }


  // ---------------------------------------------------
  // CLIQUE NOS CARTÕES
  // ---------------------------------------------------

  cards.forEach(card => {

    card.addEventListener(
      'click',
      () => {

        const key =
          card.dataset.location

        selectLocation(key)

      }
    )

  })


  // ---------------------------------------------------
  // PRINCIPAL COMO PADRÃO
  // ---------------------------------------------------

  selectLocation(
    'principal'
  )

})