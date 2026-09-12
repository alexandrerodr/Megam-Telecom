import { injectShell, $, $$, initReveal } from './layout.js'
import { store, ADMIN_PASSWORD } from './store.js'
import { WHATSAPP_NUMBER } from './layout.js'
const L = window.L

injectShell()

/* Coordenadas iniciais: Sarapuí - SP */
const SARAPUI_LAT = -23.641144
const SARAPUI_LNG = -47.827518

/* Base cartográfica: OpenStreetMap (uso conforme à Tile Usage Policy)
 * https://operations.osmfoundation.org/policies/tiles/
 * Não há pré-carregamento/offline; o Leaflet solicita apenas os tiles visíveis.
 */
const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_TILE_OPTIONS = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',
  maxZoom: 19
}

/* ============================ CLIENT MAP ============================ */
const mapEl = $('#mapCobertura')
const map = L.map(mapEl, { zoomControl: true }).setView([SARAPUI_LAT, SARAPUI_LNG], 14)
L.tileLayer(OSM_TILE_URL, OSM_TILE_OPTIONS).addTo(map)

/* Ícone personalizado da Megam */
const megamMarkerIcon = L.icon({
  iconUrl: 'assets/img/ponto.png',
  iconSize: [65, 65],
  iconAnchor: [37, 65],
  popupAnchor: [0, -65]
})

const coordsInput = $('#coords'), checkBtn = $('#checkBtn'), useGps = $('#useGps')
const covStatus = $('#covStatus'), covResult = $('#covResult')
let marker = null, regionLayers = []

async function loadClientRegions() {
  regionLayers.forEach(l => map.removeLayer(l))
  regionLayers = []
  const regions = await store.getRegions()
  regions.forEach(r => {
    const poly = (r.polygon || []).map(p => [p[0], p[1]])
    if (poly.length >= 3) {
      const layer = L.polygon(poly, { color: r.color, weight: 2, fillColor: r.color, fillOpacity: 0.15 })
      layer.addTo(map).bindTooltip(r.name, { sticky: true })
      regionLayers.push(layer)
    }
  })
}
loadClientRegions()
setTimeout(() => map.invalidateSize(), 200)

function setStatus(kind, msg) { covStatus.className = `cov-status ${kind}`; covStatus.textContent = msg }

/* Rola a página automaticamente até o resultado (planos/whatsapp),
   assim que ele aparece, para o cliente ver sem precisar rolar manualmente. */
function scrollToResult() {
  requestAnimationFrame(() => {
    covResult.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function placeMarker(lat, lng) {
  if (marker) map.removeLayer(marker)

  marker = L.marker([lat, lng], {
    icon: megamMarkerIcon
  })
    .addTo(map)
    .bindPopup('Sua localização')
    .openPopup()

  map.setView([lat, lng], 15)
}

function parseCoords(text) {
  if (!text) return null
  const parts = text.split(',').map(s => parseFloat(s.trim()))
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null
  return { lat: parts[0], lng: parts[1] }
}

map.on('click', (e) => {
  const lat = e.latlng.lat.toFixed(6)
  const lng = e.latlng.lng.toFixed(6)
  coordsInput.value = `${lat}, ${lng}`
  placeMarker(e.latlng.lat, e.latlng.lng)
})

useGps.addEventListener('click', () => {
  if (!navigator.geolocation) { setStatus('fail', 'Seu navegador não suporta GPS.'); return }
  setStatus('loading', 'Localizando...')
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(6)
      const lng = pos.coords.longitude.toFixed(6)
      coordsInput.value = `${lat}, ${lng}`
      placeMarker(pos.coords.latitude, pos.coords.longitude)
      setStatus('idle', 'Localização capturada. Clique em verificar.')
    },
    () => setStatus('fail', 'Não foi possível obter sua localização.')
  )
})

function pointInPolygon(point, polygon) {
  const [x, y] = point; let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j]
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside
  }
  return inside
}

checkBtn.addEventListener('click', async () => {
  const parsed = parseCoords(coordsInput.value)
  if (!parsed) { setStatus('fail', 'Informe as coordenadas no formato: lat, lng (ex: -23.641, -47.827)'); return }
  const { lat, lng } = parsed
  placeMarker(lat, lng)
  setStatus('loading', 'Verificando disponibilidade...')
  const regions = await store.getRegions()
  const found = regions.find(r => { const poly = (r.polygon || []).map(p => [p[0], p[1]]); return poly.length >= 3 && pointInPolygon([lat, lng], poly) })
  if (!found) {
    setStatus('fail', 'Que pena! Ainda não atendemos sua região.')
    const msg = `Olá! Verifiquei a cobertura no site e minha região (${lat}, ${lng}) ainda não consta como atendida. Podem confirmar se já chegamos aí?`
    covResult.hidden = false
    covResult.innerHTML = `
      <p class="cov-fallback-text">Fale com um de nossos atendentes no WhatsApp para confirmar a disponibilidade no seu endereço.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="btn btn-primary btn-block cov-whatsapp-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/></svg>
        Falar com um atendente no WhatsApp
      </a>`
    scrollToResult()
    return
  }
  const planRows = await store.getRegionPlans(found.id)
  setStatus('ok', `Boa notícia! Atendemos sua região: ${found.name}.`)
  if (!planRows.length) {
    const msg = `Olá! Verifiquei no site que atendemos minha região (${found.name}), mas não vi os planos disponíveis. Podem me passar as opções?`
    covResult.hidden = false
    covResult.innerHTML = `
      <p class="cov-fallback-text">Atendemos sua região, mas ainda não há planos cadastrados para ela. Fale com um atendente para conferir as opções disponíveis.</p>
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="btn btn-primary btn-block cov-whatsapp-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/></svg>
        Falar com um atendente no WhatsApp
      </a>`
    scrollToResult()
    return
  }
  covResult.hidden = false
  currentRegionPlans = planRows
  covResult.innerHTML = `
    <h4>Planos disponíveis para sua região:</h4>
    <div class="plan-filters reveal" id="covPlanFilters" role="tablist" aria-label="Tipo de plano">
      <button class="chip" data-filter="internet" role="tab" aria-selected="false">internet + apps</button>
      <button class="chip" data-filter="combo" role="tab" aria-selected="false">Internet + TV e Cinema</button>
      <button class="chip" data-filter="esportes" role="tab" aria-selected="false">Internet + TV e Esportes</button>
      <button class="chip is-active" data-filter="all" role="tab" aria-selected="true">Todos</button>
    </div>
    <div class="plans-grid" id="regionPlans"></div>
  `
  renderRegionPlans('all')
  initReveal()
  scrollToResult()
})

/* ============================ FILTRO DE PLANOS DA REGIÃO ============================ */
let currentRegionPlans = []

function renderRegionPlans(filter) {
  const grid = $('#regionPlans')
  if (!grid) return
  const list = filter === 'all' ? currentRegionPlans : currentRegionPlans.filter(p => p.type === filter)

  if (!list.length) {
    grid.innerHTML = '<p class="admin-hint">Nenhum plano deste tipo disponível para sua região.</p>'
    return
  }

  grid.innerHTML = list.map(p => {
    const link = p.link || 'contato.html'
    const featuresHtml = (p.features || []).map(f => `<li>${f}</li>`).join('')
    const descHtml = p.description ? `<p class="plan-desc">${p.description}</p>` : ''
    return `
      <article class="plan-card ${p.featured ? 'featured' : ''}">
        ${p.featured ? '<span class="plan-badge">Mais vendido</span>' : ''}
        <span class="plan-tag">${p.tag || p.type}</span>
        <div class="plan-speed">${p.speed}<small> ${p.unit}</small></div>
        <div class="plan-name">${p.name}</div>
        ${descHtml}
        <div class="plan-price">R$ <strong>${p.price}</strong><span>/mês</span></div>
        <ul class="plan-features">${featuresHtml}</ul>
        <a href="${link}" class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'}">Assinar plano</a>
      </article>
    `
  }).join('')

  grid.querySelectorAll('.plan-card').forEach((card, i) => {
    card.style.animation = `cardIn .5s ${i * .08}s var(--ease) both`
  })
}

// Delegação de clique: o menu de filtros é recriado a cada consulta,
// então o listener fica no container fixo (#covResult) em vez do menu em si.
covResult.addEventListener('click', (e) => {
  const btn = e.target.closest('#covPlanFilters .chip')
  if (!btn) return
  $$('#covPlanFilters .chip').forEach(c => {
    c.classList.remove('is-active')
    c.setAttribute('aria-selected', 'false')
  })
  btn.classList.add('is-active')
  btn.setAttribute('aria-selected', 'true')
  renderRegionPlans(btn.dataset.filter)
})

/* ============================ ADMIN GATE ============================ */
const gate = $('#adminGate'), adminContent = $('#adminContent')
const passwordInput = $('#passwordInput'), unlockBtn = $('#unlockBtn'), gateError = $('#gateError')
let adminReady = false

unlockBtn.addEventListener('click', tryUnlock)
passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryUnlock() })

function tryUnlock() {
  if (passwordInput.value === ADMIN_PASSWORD) {
    gate.hidden = true; adminContent.hidden = false
    if (!adminReady) { adminReady = true; initAdmin() }
    else { adminMap.invalidateSize(); refreshAdmin() }
  } else {
    gateError.hidden = false; gateError.textContent = 'Senha incorreta.'; passwordInput.value = ''; passwordInput.focus()
  }
}

/* ============================ ADMIN MAP ============================ */
let adminMap = null
let adminRegionLayers = {}
let adminEditors = {}
let activeRegionId = null
let editingMode = false
let drawingMode = false
let drawPoints = []
let drawMarkers = []
let drawPreview = null
let selectedVertexIdx = -1
let adminRegions = []
let allPlans = []
let editingPlanId = null

const COLORS = ['#e11d29', '#2563eb', '#16a34a', '#f59e0b', '#7c3aed', '#0891b2', '#db2777', '#ea580c']
let colorIdx = 0

/* ---- DOM refs ---- */
const newRegionBtn = $('#newRegionBtn')
const finishRegionBtn = $('#finishRegionBtn')
const cancelRegionBtn = $('#cancelRegionBtn')
const stopEditBtn = $('#stopEditBtn')
const removePointBtn = $('#removePointBtn')
const undoPointBtn = $('#undoPointBtn')
const clearPointsBtn = $('#clearPointsBtn')
const adminHint = $('#adminHint')
const regionListEl = $('#regionList')
const planChecksEl = $('#planChecks')
const regionForm = $('#regionForm')
const regionNameInput = $('#regionNameInput')
const saveRegionBtn = $('#saveRegionBtn')
const deleteRegionBtn = $('#deleteRegionBtn')

/* ---- Stable editable polygon ---- */
class EditablePolygon {
  constructor(map, region, onUpdate) {
    this.map = map
    this.region = region
    this.onUpdate = onUpdate
    this.latlngs = (region.polygon || []).map(p => L.latLng(p[0], p[1]))
    this.polygon = null
    this.vertices = []
    this.midpoints = []
    this.centerHandle = null
    this._draggingAll = false
    this.visible = false
    this.editing = false
  }

  show() {
    if (this.visible) return
    this.visible = true
    this._render()
  }

  hide() {
    this._clear()
    this.visible = false
    this.editing = false
  }

  startEditing() {
    if (!this.visible) this.show()
    this.editing = true
    this._renderHandles()
  }

  stopEditing() {
    this.editing = false
    this._removeHandles()
  }

  _render() {
    if (this.latlngs.length < 3) return
    this.polygon = L.polygon(this.latlngs, {
      color: this.region.color, weight: 2, fillColor: this.region.color, fillOpacity: 0.15,
    }).addTo(this.map)
    this.polygon.on('click', (e) => { L.DomEvent.stopPropagation(e); this.onUpdate('select', this.region.id) })
    if (this.editing) this._renderHandles()
  }

  _renderHandles() {
    this._removeHandles()
    if (!this.polygon) return

    this.vertices = this.latlngs.map((ll, i) => {
      const m = L.marker(ll, { icon: this._vertexIcon(), draggable: true }).addTo(this.map)
      m.on('drag', () => {
        this.latlngs[i] = m.getLatLng()
        this.polygon.setLatLngs(this.latlngs)
        this._refreshMidpoints()
        this._refreshCenter()
      })
      m.on('dragend', () => this._save())
      m.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        selectedVertexIdx = i
        this._highlightVertex(i)
        this.onUpdate('vertexSelected', i)
      })
      return m
    })

    this._refreshMidpoints()
    this._refreshCenter()
  }

  _refreshMidpoints() {
    this.midpoints.forEach(m => this.map.removeLayer(m))
    this.midpoints = []
    const n = this.latlngs.length
    for (let i = 0; i < n; i++) {
      const a = this.latlngs[i], b = this.latlngs[(i + 1) % n]
      const mid = L.latLng((a.lat + b.lat) / 2, (a.lng + b.lng) / 2)
      const m = L.marker(mid, { icon: this._midpointIcon() }).addTo(this.map)
      const insertIdx = i + 1
      m.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        this.latlngs.splice(insertIdx, 0, mid)
        this._save()
        this._renderHandles()
      })
      this.midpoints.push(m)
    }
  }

  _refreshCenter() {
    if (this.centerHandle) this.map.removeLayer(this.centerHandle)
    if (!this.polygon) return
    const center = this.polygon.getBounds().getCenter()
    this.centerHandle = L.marker(center, { icon: this._centerIcon(), draggable: true }).addTo(this.map)
    this.centerHandle.on('dragstart', () => {
      this._draggingAll = true
      this._dragStart = center
      this._dragStartLatLngs = this.latlngs.map(ll => L.latLng(ll.lat, ll.lng))
    })
    this.centerHandle.on('drag', () => {
      if (!this._draggingAll) return
      const d = this.centerHandle.getLatLng().subtract(this._dragStart)
      this.latlngs = this._dragStartLatLngs.map(ll => L.latLng(ll.lat + d.lat, ll.lng + d.lng))
      this.polygon.setLatLngs(this.latlngs)
      this.vertices.forEach((m, i) => m.setLatLng(this.latlngs[i]))
      this._refreshMidpoints()
    })
    this.centerHandle.on('dragend', () => { this._draggingAll = false; this._save() })
  }

  _highlightVertex(idx) {
    this.vertices.forEach((m, i) => {
      const el = m.getElement()
      if (el) el.classList.toggle('vp-selected', i === idx)
    })
  }

  removeVertex(idx) {
    if (this.latlngs.length <= 3) { this.onUpdate('flash', 'Mínimo de 3 pontos.'); return false }
    this.latlngs.splice(idx, 1)
    selectedVertexIdx = -1
    this._save()
    this._renderHandles()
    return true
  }

  _vertexIcon() {
    return L.divIcon({ className: 'vp-vertex', html: '<div class="vp-vertex-dot"></div>', iconSize: [16, 16], iconAnchor: [8, 8] })
  }
  _midpointIcon() {
    return L.divIcon({ className: 'vp-midpoint', html: '<div class="vp-midpoint-dot">+</div>', iconSize: [20, 20], iconAnchor: [10, 10] })
  }
  _centerIcon() {
    return L.divIcon({ className: 'vp-center', html: '<div class="vp-center-dot"></div>', iconSize: [24, 24], iconAnchor: [12, 12] })
  }

  _save() {
    this.region.polygon = this.latlngs.map(ll => [ll.lat, ll.lng])
    store.updateRegion(this.region.id, { polygon: this.region.polygon })
    this.onUpdate('flash', 'Região salva.')
  }

  _removeHandles() {
    this.vertices.forEach(m => this.map.removeLayer(m))
    this.midpoints.forEach(m => this.map.removeLayer(m))
    if (this.centerHandle) this.map.removeLayer(this.centerHandle)
    this.vertices = []; this.midpoints = []; this.centerHandle = null
  }

  _clear() {
    this._removeHandles()
    if (this.polygon) { this.map.removeLayer(this.polygon); this.polygon = null }
    this.visible = false; this.editing = false
  }

  fitBounds() { if (this.polygon) this.map.fitBounds(this.polygon.getBounds(), { padding: [40, 40] }) }
}

/* ---- Init admin ---- */
function initAdmin() {
  adminMap = L.map('mapAdmin', { zoomControl: true }).setView([SARAPUI_LAT, SARAPUI_LNG], 14)
  L.tileLayer(OSM_TILE_URL, OSM_TILE_OPTIONS).addTo(adminMap)

  adminMap.on('click', (e) => {
    if (drawingMode) {
      drawPoints.push([e.latlng.lat, e.latlng.lng])
      refreshDrawPreview()
    }
  })

  setupAdminButtons()
  refreshAdmin()
  setTimeout(() => adminMap.invalidateSize(), 200)
}

async function refreshAdmin() {
  allPlans = await store.getPlans()
  adminRegions = await store.getRegions()

  Object.values(adminEditors).forEach(ed => ed.hide())
  adminEditors = {}
  adminRegionLayers = {}

  adminRegions.forEach(r => {
    const ed = new EditablePolygon(adminMap, r, handleEditorUpdate)
    adminEditors[r.id] = ed
    adminRegionLayers[r.id] = ed
    ed.show()
  })

  renderRegionList()
  renderPlanChecks()
  renderPlanAdminList()
}

function handleEditorUpdate(type, data) {
  if (type === 'select') selectRegion(data)
  else if (type === 'flash') showFlash(data)
  else if (type === 'vertexSelected') {
    removePointBtn.disabled = false
    adminHint.textContent = `Ponto ${data + 1} selecionado. Use "Remover ponto selecionado" para excluí-lo.`
  }
}

function showFlash(msg) {
  adminHint.textContent = msg
  adminHint.classList.add('flash')
  setTimeout(() => adminHint.classList.remove('flash'), 2000)
}

/* ---- Region list ---- */
function renderRegionList() {
  regionListEl.innerHTML = adminRegions.map(r => `
    <div class="region-item ${r.id === activeRegionId ? 'active' : ''}" data-id="${r.id}">
      <span class="region-dot" style="background:${r.color}"></span>
      <span class="ri-name">${r.name}</span>
      <button class="ri-del" data-id="${r.id}" aria-label="Excluir">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
      </button>
    </div>`).join('')

  $$('.region-item', regionListEl).forEach(el => {
    el.addEventListener('click', (e) => { if (!e.target.closest('.ri-del')) selectRegion(el.dataset.id) })
  })
  $$('.ri-del', regionListEl).forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation()
      if (!confirm('Excluir esta região?')) return
      if (adminEditors[btn.dataset.id]) adminEditors[btn.dataset.id].hide()
      delete adminEditors[btn.dataset.id]
      await store.deleteRegion(btn.dataset.id)
      if (activeRegionId === btn.dataset.id) { activeRegionId = null; exitEditMode() }
      refreshAdmin()
    })
  })
}

function selectRegion(id) {
  if (drawingMode) cancelDrawing()
  if (activeRegionId && adminEditors[activeRegionId]) adminEditors[activeRegionId].stopEditing()
  activeRegionId = id
  selectedVertexIdx = -1
  renderRegionList()
  renderPlanChecks()

  const region = adminRegions.find(r => r.id === id)
  if (region) {
    regionForm.hidden = false
    regionNameInput.value = region.name
    if (adminEditors[id]) {
      adminEditors[id].show()
      adminEditors[id].startEditing()
      adminEditors[id].fitBounds()
      editingMode = true
      stopEditBtn.disabled = false
      removePointBtn.disabled = false
      adminHint.textContent = 'Arraste os pontos para ajustar a área. Clique num ponto para selecioná-lo. Use "+" para inserir e "Remover" para excluir.'
    }
  }
}

function exitEditMode() {
  if (activeRegionId && adminEditors[activeRegionId]) adminEditors[activeRegionId].stopEditing()
  editingMode = false
  stopEditBtn.disabled = true
  removePointBtn.disabled = true
  selectedVertexIdx = -1
  regionForm.hidden = true
  adminHint.textContent = 'Selecione uma região no mapa ou na lista para editar.'
}

/* ---- Drawing new region ---- */
function startDrawing() {
  if (drawingMode) return
  Object.values(adminEditors).forEach(ed => ed.hide())
  if (activeRegionId && adminEditors[activeRegionId]) adminEditors[activeRegionId].stopEditing()
  activeRegionId = null
  renderRegionList()
  regionForm.hidden = true

  drawingMode = true
  drawPoints = []
  drawMarkers = []
  drawPreview = null
  newRegionBtn.disabled = true
  finishRegionBtn.disabled = false
  cancelRegionBtn.disabled = false
  undoPointBtn.disabled = false
  clearPointsBtn.disabled = false
  stopEditBtn.disabled = true
  removePointBtn.disabled = true
  adminHint.textContent = 'Clique no mapa para marcar os pontos (mínimo 3). Arraste os pontos para ajustar antes de concluir.'
  adminMap.getContainer().style.cursor = 'crosshair'
}

function cancelDrawing() {
  drawingMode = false
  drawMarkers.forEach(m => adminMap.removeLayer(m))
  if (drawPreview) adminMap.removeLayer(drawPreview)
  drawPoints = []; drawMarkers = []; drawPreview = null
  newRegionBtn.disabled = false
  finishRegionBtn.disabled = true
  cancelRegionBtn.disabled = true
  undoPointBtn.disabled = true
  clearPointsBtn.disabled = true
  adminMap.getContainer().style.cursor = ''
  adminHint.textContent = 'Desenho cancelado.'
  Object.values(adminEditors).forEach(ed => ed.show())
}

function refreshDrawPreview() {
  drawMarkers.forEach(m => adminMap.removeLayer(m))
  if (drawPreview) adminMap.removeLayer(drawPreview)
  drawMarkers = []
  drawPreview = null

  drawPoints.forEach((pt, i) => {
    const m = L.marker(pt, {
      icon: L.divIcon({ className: 'vp-vertex', html: '<div class="vp-vertex-dot"></div>', iconSize: [16, 16], iconAnchor: [8, 8] }),
      draggable: true,
    }).addTo(adminMap)
    m.on('drag', () => { drawPoints[i] = [m.getLatLng().lat, m.getLatLng().lng]; updateDrawShape() })
    drawMarkers.push(m)
  })

  if (drawPoints.length >= 2) {
    drawPreview = L.polygon(drawPoints, { color: COLORS[colorIdx % COLORS.length], weight: 2, dashArray: '6 6', fillOpacity: 0.08 }).addTo(adminMap)
  }
  updateDrawHint()
}

function updateDrawShape() { if (drawPreview) drawPreview.setLatLngs(drawPoints) }

function updateDrawHint() {
  if (!drawingMode) return
  if (drawPoints.length === 0) adminHint.textContent = 'Clique no mapa para marcar os pontos (mínimo 3).'
  else if (drawPoints.length < 3) adminHint.textContent = `Pontos: ${drawPoints.length}. Marque mais ${3 - drawPoints.length}.`
  else adminHint.textContent = `Pontos: ${drawPoints.length}. Clique em "Concluir desenho" para salvar.`
}

async function finishDrawing() {
  if (drawPoints.length < 3) { adminHint.textContent = 'Mínimo de 3 pontos.'; return }
  const name = prompt('Nome da região:', `Região ${adminRegions.length + 1}`)
  if (!name) return cancelDrawing()
  const color = COLORS[colorIdx % COLORS.length]; colorIdx++
  await store.addRegion({ name, color, polygon: drawPoints })
  drawPoints = []
  drawingMode = false
  newRegionBtn.disabled = false
  finishRegionBtn.disabled = true
  cancelRegionBtn.disabled = true
  undoPointBtn.disabled = true
  clearPointsBtn.disabled = true
  adminMap.getContainer().style.cursor = ''
  await refreshAdmin()
  const newRegion = (await store.getRegions()).slice(-1)[0]
  if (newRegion) selectRegion(newRegion.id)
}

/* ---- Plan checks ---- */
function renderPlanChecks() {
  if (!activeRegionId) { planChecksEl.innerHTML = '<p class="admin-hint">Selecione uma região.</p>'; return }
  if (!allPlans.length) { planChecksEl.innerHTML = '<p class="admin-hint">Nenhum plano cadastrado.</p>'; return }
  const region = adminRegions.find(r => r.id === activeRegionId)
  const linked = new Set(region ? (region.planIds || []) : [])
  planChecksEl.innerHTML = allPlans.map(p => `
    <label class="plan-check ${linked.has(p.id) ? 'checked' : ''}" data-id="${p.id}">
      <input type="checkbox" ${linked.has(p.id) ? 'checked' : ''} />
      <span class="pc-name">${p.speed}${p.unit} - ${p.name}</span>
      <span class="pc-price">R$ ${p.price}/mês</span>
    </label>`).join('')
  $$('.plan-check', planChecksEl).forEach(label => {
    const cb = label.querySelector('input')
    cb.addEventListener('change', async () => {
      const region = adminRegions.find(r => r.id === activeRegionId)
      if (!region) return
      let ids = new Set(region.planIds || [])
      if (cb.checked) { ids.add(label.dataset.id); label.classList.add('checked') }
      else { ids.delete(label.dataset.id); label.classList.remove('checked') }
      await store.setRegionPlans(activeRegionId, [...ids])
      region.planIds = [...ids]
    })
  })
}

/* ---- Region name / delete ---- */
saveRegionBtn.addEventListener('click', async () => {
  if (!activeRegionId) return
  const name = regionNameInput.value.trim()
  if (!name) return
  await store.updateRegion(activeRegionId, { name })
  const r = adminRegions.find(x => x.id === activeRegionId)
  if (r) r.name = name
  renderRegionList()
  showFlash('Nome salvo.')
})

deleteRegionBtn.addEventListener('click', async () => {
  if (!activeRegionId) return
  if (!confirm('Excluir esta região?')) return
  if (adminEditors[activeRegionId]) adminEditors[activeRegionId].hide()
  delete adminEditors[activeRegionId]
  await store.deleteRegion(activeRegionId)
  activeRegionId = null
  exitEditMode()
  refreshAdmin()
})

/* ============================ PLAN MANAGER ============================ */
const newPlanBtn = $('#newPlanBtn')
const planEditor = $('#planEditor')
const planEditorTitle = $('#planEditorTitle')
const planAdminList = $('#planAdminList')
const cancelPlanBtn = $('#cancelPlanBtn')

newPlanBtn.addEventListener('click', () => {
  editingPlanId = null
  planEditorTitle.textContent = 'Novo plano'
  planEditor.hidden = false
  $('#planName').value = ''
  $('#planSpeed').value = ''
  $('#planUnit').value = 'Mb'
  $('#planPrice').value = ''
  $('#planType').value = 'internet'
  $('#planTag').value = ''
  $('#planDescription').value = ''
  $('#planFeatures').value = ''
  $('#planLink').value = ''
  $('#planFeatured').checked = false
})

cancelPlanBtn.addEventListener('click', () => { planEditor.hidden = true; editingPlanId = null })

planEditor.addEventListener('submit', async (e) => {
  e.preventDefault()
  const features = $('#planFeatures').value.split('\n').map(s => s.trim()).filter(Boolean)
  const plan = {
    name: $('#planName').value.trim(),
    speed: $('#planSpeed').value.trim(),
    unit: $('#planUnit').value,
    price: $('#planPrice').value.trim(),
    type: $('#planType').value,
    tag: $('#planTag').value.trim() || ($('#planType').value === 'combo' ? 'Combo' : 'Internet'),
    description: $('#planDescription').value.trim(),
    features,
    link: $('#planLink').value.trim(),
    featured: $('#planFeatured').checked,
  }
  if (!plan.name || !plan.speed || !plan.price) { alert('Preencha nome, velocidade e valor.'); return }
  if (editingPlanId) {
    await store.updatePlan(editingPlanId, plan)
  } else {
    await store.addPlan(plan)
  }
  planEditor.hidden = true
  editingPlanId = null
  refreshAdmin()
})

function renderPlanAdminList() {
  if (!allPlans.length) { planAdminList.innerHTML = '<p class="admin-hint">Nenhum plano. Clique em "Adicionar plano".</p>'; return }
  planAdminList.innerHTML = allPlans.map(p => `
    <div class="plan-admin-card" data-id="${p.id}">
      <div class="pac-head">
        <span class="pac-tag ${p.type}">${p.tag || p.type}</span>
        ${p.featured ? '<span class="pac-featured">Mais vendido</span>' : ''}
      </div>
      <div class="pac-speed">${p.speed} ${p.unit}</div>
      <div class="pac-name">${p.name}</div>
      <div class="pac-price">R$ ${p.price}/mês</div>
      ${p.description ? `<p class="pac-desc">${p.description}</p>` : ''}
      ${p.link ? `<p class="pac-link">Link: ${p.link}</p>` : ''}
      <div class="pac-actions">
        <button class="btn btn-ghost btn-sm" data-edit="${p.id}">Editar</button>
        <button class="btn btn-danger btn-sm" data-del="${p.id}">Excluir</button>
      </div>
    </div>`).join('')

  $$('[data-edit]', planAdminList).forEach(btn => {
    btn.addEventListener('click', () => editPlan(btn.dataset.edit))
  })
  $$('[data-del]', planAdminList).forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Excluir este plano?')) return
      await store.deletePlan(btn.dataset.del)
      refreshAdmin()
    })
  })
}

function editPlan(id) {
  const p = allPlans.find(x => x.id === id)
  if (!p) return
  editingPlanId = id
  planEditorTitle.textContent = 'Editar plano'
  planEditor.hidden = false
  $('#planName').value = p.name || ''
  $('#planSpeed').value = p.speed || ''
  $('#planUnit').value = p.unit || 'Mb'
  $('#planPrice').value = p.price || ''
  $('#planType').value = p.type || 'internet'
  $('#planTag').value = p.tag || ''
  $('#planDescription').value = p.description || ''
  $('#planFeatures').value = (p.features || []).join('\n')
  $('#planLink').value = p.link || ''
  $('#planFeatured').checked = !!p.featured
}

/* ============================ BUTTONS ============================ */
function setupAdminButtons() {
  newRegionBtn.addEventListener('click', startDrawing)
  finishRegionBtn.addEventListener('click', finishDrawing)
  cancelRegionBtn.addEventListener('click', cancelDrawing)
  stopEditBtn.addEventListener('click', () => { exitEditMode(); renderRegionList(); renderPlanChecks() })
  removePointBtn.addEventListener('click', () => {
    if (activeRegionId && selectedVertexIdx >= 0 && adminEditors[activeRegionId]) {
      adminEditors[activeRegionId].removeVertex(selectedVertexIdx)
      removePointBtn.disabled = true
      selectedVertexIdx = -1
    }
  })
  undoPointBtn.addEventListener('click', () => {
    if (!drawingMode || !drawPoints.length) return
    drawPoints.pop()
    refreshDrawPreview()
  })
  clearPointsBtn.addEventListener('click', () => {
    if (!drawingMode) return
    drawPoints = []
    refreshDrawPreview()
  })
}
