import { injectShell, faqs, $, $$ } from './layout.js'

injectShell()

const faqList = $('#faqList')
faqList.innerHTML = faqs.map((f, i) => `
  <div class="faq-item" id="faq-${i}">
    <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
      <span>${f.q}</span>
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>
    <div class="faq-a" id="faq-a-${i}" role="region"><p>${f.a}</p></div>
  </div>
`).join('')

faqList.addEventListener('click', (e) => {
  const btn = e.target.closest('.faq-q')
  if (!btn) return
  const item = btn.closest('.faq-item')
  const answer = item.querySelector('.faq-a')
  const isOpen = item.classList.contains('open')
  $$('.faq-item').forEach(other => {
    other.classList.remove('open')
    other.querySelector('.faq-q').setAttribute('aria-expanded', 'false')
    other.querySelector('.faq-a').style.maxHeight = null
  })
  if (!isOpen) {
    item.classList.add('open')
    btn.setAttribute('aria-expanded', 'true')
    answer.style.maxHeight = answer.scrollHeight + 'px'
  }
})
