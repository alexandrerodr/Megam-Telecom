import { injectShell, $, $$ } from './layout.js'
import { store } from './store.js'

injectShell()

const plansGrid = $('#plansGrid')
const planFilters = $('#planFilters')

async function renderPlans(filter) {
  const allPlans = await store.getPlans()
  const list = filter === 'all'
    ? allPlans
    : allPlans.filter(p => p.type === filter)

  if (!list.length) {
    plansGrid.innerHTML = '<p class="admin-hint">Nenhum plano cadastrado.</p>'
    return
  }

  plansGrid.innerHTML = list.map(p => {
    const link = p.link || 'contato.html'
    const featuresHtml = (p.features || []).map(f => `<li>${f}</li>`).join('')
    const descHtml = p.description ? `<p class="plan-desc">${p.description}</p>` : ''

    return `
      <article class="plan-card ${p.featured ? 'featured' : ''}" data-type="${p.type}">
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

  plansGrid.querySelectorAll('.plan-card').forEach((c, i) => {
    c.style.opacity = '0'
    c.style.animation = `cardIn .55s ${i * .09}s var(--ease) forwards`
    c.style.setProperty('--ease', 'cubic-bezier(.22,.61,.36,1)')
  })
}

if (!document.getElementById('planCardAnim')) {
  const s = document.createElement('style')
  s.id = 'planCardAnim'
  s.textContent = `@keyframes cardIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }`
  document.head.appendChild(s)
}

// INTERNET + APPS selecionado por padrão
renderPlans('internet')

planFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip')
  if (!btn) return

  $$('.chip', planFilters).forEach(c => {
    c.classList.remove('is-active')
    c.setAttribute('aria-selected', 'false')
  })

  btn.classList.add('is-active')
  btn.setAttribute('aria-selected', 'true')

  renderPlans(btn.dataset.filter)
})