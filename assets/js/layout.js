/* ---------- DATA ---------- */
export const plans = [
  { type: 'internet', tag: 'Internet', speed: '500', unit: 'Mb', name: 'Básico Fibra', price: '79,90', featured: false,
    features: ['500 Mb de velocidade', 'Wi-Fi 6 grátis', 'Instalação gratuita', 'Antivírus Megam', 'Suporte 24/7'] },
  { type: 'internet', tag: 'Internet', speed: '700', unit: 'Mb', name: 'Ultra Fibra', price: '99,90', featured: true,
    features: ['700 Mb de velocidade', 'Wi-Fi 6 grátis', 'Instalação gratuita', 'Antivírus Megam', 'Suporte prioritário 24/7'] },
  { type: 'combo', tag: 'Combo', speed: '800', unit: 'Mb', name: 'Combo Família', price: '149,90', featured: false,
    features: ['800 Mb de velocidade', '+120 canais de TV', 'GloboPlay e Disney+', 'Wi-Fi 6 grátis', 'Instalação gratuita'] },
  { type: 'combo', tag: 'Combo', speed: '1', unit: 'Gb', name: 'Combo Premium', price: '199,90', featured: true,
    features: ['1 Gb de velocidade', '+180 canais de TV', 'Netflix, Prime e Max', 'Wi-Fi 6 grátis', 'Suporte prioritário 24/7'] },
]

export const faqs = [

  { q: 'O que posso fazer se minha internet não está funcionando?', a: 'Primeiramente, certifique-se de que seu roteador e modem estão ligados. Caso estejam, retire os equipamentos da tomada por aproximadamente 2 minutos. Após religá-los, aguarde até 5 minutos. Se o sinal não for restabelecido, entre em contato com nossa Central de Atendimento pelo (15) 3276-1822, que também atende pelo WhatsApp.' },

  { q: 'Minha internet está lenta. Como posso resolver?', a: 'Feche programas, downloads e atualizações que possam estar consumindo sua conexão. Verifique também se o computador está livre de vírus. Desligue o modem e o roteador por aproximadamente 5 minutos, ligue-os novamente e aguarde alguns instantes. Se o problema persistir, entre em contato com o suporte técnico pelo (15) 3276-1822.' },

  { q: 'Qual a diferença entre a rede 2.4 GHz e 5 GHz?', a: 'A rede 2.4 GHz possui maior alcance, porém oferece menor velocidade e sofre mais interferências de equipamentos como micro-ondas, telefones sem fio e outros dispositivos. A rede 5 GHz oferece maior velocidade e menos interferência, sendo indicada para planos de maior velocidade, mas possui alcance menor. Resumindo: 2.4 GHz tem maior alcance; 5 GHz tem maior velocidade.' },

  { q: 'Não recebi a fatura deste mês. Como faço para pagá-la?', a: 'A 2ª via da fatura está disponível na Área do Cliente. Você também pode solicitar a fatura pelo WhatsApp ou retirá-la em nosso escritório. Mantenha sempre seus dados cadastrais, como telefone, e-mail e endereço, atualizados.' },

  { q: 'Minha TV BOX/IPTV está travando. É problema na conexão de internet?', a: 'Nem sempre. Travamentos em TV BOX/IPTV podem ocorrer devido aos servidores de conteúdo utilizados pelo serviço. Muitos desses servidores estão localizados em outros países, aumentando o tempo de resposta, e podem não suportar a grande quantidade de acessos simultâneos.' },

  { q: 'Como faço para trocar a senha do Wi-Fi?', a: 'Para trocar a senha do Wi-Fi, entre em contato com nossa Central de Atendimento. Recomendamos não realizar esse procedimento por conta própria para evitar problemas na configuração do equipamento.' },

  { q: 'Existe limite de download e upload?', a: 'Não. Nossos planos de internet são ilimitados, sem limite de download ou upload.' },

  { q: 'Meu computador informa que o cabo de rede está desconectado. Como posso resolver?', a: 'Verifique se os equipamentos da internet estão ligados e se os cabos e conectores estão conectados corretamente e sem danos. Teste também outra tomada de energia. Se utilizar uma rede interna, conecte o computador diretamente ao equipamento principal da internet e faça um novo teste. Se o problema persistir, entre em contato com o suporte técnico pelo (15) 3276-1822.' },

  { q: 'Não consigo acessar alguns sites. Como posso resolver?', a: 'O problema pode estar relacionado ao próprio site ou a configurações do computador, como antivírus, firewall ou proxy. Tente limpar o histórico do navegador, verificar as configurações de proxy, utilizar outro navegador e consultar se o site está fora do ar. Se o problema persistir, entre em contato com o suporte técnico pelo (15) 3276-1822.' },

  { q: 'Como evitar danos à instalação e aos equipamentos?', a: 'A fibra óptica e seus componentes são sensíveis ao manuseio incorreto. Evite dobrar, puxar ou movimentar os cabos de fibra. Em caso de ausência prolongada ou durante tempestades com raios, recomendamos retirar os equipamentos da tomada para evitar danos causados por descargas elétricas.' },

]

export const WHATSAPP_NUMBER = '551532761822'
export const WHATSAPP_MSG = 'Olá! Gostaria de mais informações sobre os planos da Megam Telecom.'

/* ---------- HELPERS ---------- */
export const $ = (sel, root = document) => root.querySelector(sel)
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/* ---------- SHARED UI: header, footer, whatsapp, scroll-top ---------- */
const NAV_ITEMS = [
  { href: 'index.html', label: 'Início', icon: 'home' },
  { href: 'planos.html', label: 'Planos', icon: 'wifi' },
  { href: 'cobertura.html', label: 'Cobertura', icon: 'pin' },
  { href: 'premios.html', label: 'Show de Prêmios', icon: 'gift' },
  { href: 'duvidas.html', label: 'Dúvidas Frequentes', icon: 'help' },
  { href: 'velocidade.html', label: 'Teste de Velocidade', icon: 'gauge' },
  { href: 'contato.html', label: 'Fale Conosco', icon: 'chat' },
]

const NAV_ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9"/>',
  wifi: '<path d="M2 8.5a16 16 0 0 1 20 0"/><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16.5a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
  gift: '<rect x="3" y="8.5" width="18" height="12" rx="1"/><path d="M3 12.5h18"/><path d="M12 8.5V21"/><path d="M12 8.5c-1.2-3-3-4-4.5-3.5C6 5.5 6 8.5 8.5 8.5"/><path d="M12 8.5c1.2-3 3-4 4.5-3.5C18 5.5 18 8.5 15.5 8.5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.3 9a2.7 2.7 0 0 1 5.2 1c0 1.7-2.5 2-2.5 3.5"/><circle cx="12" cy="16.6" r=".2" fill="currentColor" stroke="none"/>',
  gauge: '<path d="M4.5 16a7.5 7.5 0 1 1 15 0"/><path d="M12 16l3.2-4.4"/><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/>',
  chat: '<path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.2 3.4A.5.5 0 0 1 4 19V16H3.6A1 1 0 0 1 3 15V6.5a1 1 0 0 1 1-1Z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
  headset: '<path d="M4 13.5v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M20 19v.5A3.5 3.5 0 0 1 16.5 23H13"/>',
}

function navIcon(key) {
  return `<svg class="nav-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${NAV_ICONS[key] || ''}</svg>`
}

function activePage() {
  const path = location.pathname.split('/').pop() || 'index.html'
  return path === '' ? 'index.html' : path
}

function waIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.3c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.3 8.3 0 1 1 12 20.3z"/></svg>`
}

function scrollTopIcon() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`
}

export function injectShell(activeHref) {
  const active = activeHref || activePage()
  document.body.insertAdjacentHTML('afterbegin', `
    <header id="header" class="header">
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="Megam Telecom início">
          <img src="assets/img/logo.png" alt="Megam Telecom" class="brand-logo" />
        </a>
        <nav id="nav" class="nav" aria-label="Menu principal">
          ${NAV_ITEMS.map(n => `<a href="${n.href}" class="nav-link ${n.href === active ? 'active' : ''}">${navIcon(n.icon)}<span>${n.label}</span></a>`).join('')}
          <span class="nav-divider" aria-hidden="true"></span>
          <a href="contato.html" class="nav-link btn-central">${navIcon('headset')}<span>Central de Clientes</span></a>
          <a href="planos.html" class="nav-link btn-assine">${navIcon('bolt')}<span>Assine já</span></a>
        </nav>
        <button id="menuToggle" class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `)

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <img src="assets/img/logo.png" alt="Megam Telecom" class="brand-logo footer-logo" />
          <p class="footer-legal"><strong>Razão Social:</strong> Meganet Sarapuí Telecom Ltda</p>
          <p class="footer-legal"><strong>CNPJ:</strong> 22.372.159/0001-70</p>
          <a class="footer-legal" href="/assets/contrato-de-Prestacao-de-servico.pdf" target="_blank" rel="noopener noreferrer">
    Contrato de Prestação de Serviços
</a>
        </div>
        <div class="footer-column">
          <h3>Institucional</h3>
          <nav class="footer-nav" aria-label="Institucional">
            <a href="index.html">Início</a>
            <a href="contato.html">Empresa</a>
            <a href="premios.html">Show de Prêmios</a>
            <a href="planos.html">Planos</a>
            <a href="contato.html">Contato</a>
            <a href="contato.html">Trabalhe Conosco</a>
          </nav>
        </div>
        <div class="footer-column footer-contact">
          <h3>Fale Conosco</h3>
          <a href="mailto:atendimento@megamtelecom.com.br" class="footer-contact-line">
            <span class="footer-icon" aria-hidden="true">✉</span>
            <span>atendimento@megamtelecom<br />.com.br</span>
          </a>
          <a href="tel:+551532761822" class="footer-contact-line">
            <span class="footer-icon" aria-hidden="true">▣</span>
            <span>(15) 3276-1822</span>
          </a>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" class="footer-contact-line">
            <span class="footer-icon" aria-hidden="true">◔</span>
            <span>(15) 99689-0858</span>
          </a>
          <div class="footer-contact-line footer-address">
            <span class="footer-icon" aria-hidden="true">●</span>
            <span>R. Dr Leôncio Pinheiro, 212 - Centro - Sarapuí-SP 18225-000</span>
          </div>
        </div>
        <div class="footer-column footer-hours">
          <h3>Horários de<br />Atendimento</h3>
          <p><span class="footer-icon" aria-hidden="true">◷</span><span>Segunda a Sexta 08:00<br />até 22:00</span></p>
          <p><span class="footer-icon" aria-hidden="true">◷</span><span>Sábado 09:00 às 18:00</span></p>
          <p><span class="footer-icon" aria-hidden="true">◷</span><span>Domingos e feriados<br />09:00 às 13:00</span></p>
          <div class="footer-socials" aria-label="Redes sociais">
            <span aria-label="Instagram">◎</span>
            <span aria-label="Facebook">f</span>
            <span aria-label="YouTube">▶</span>
          </div>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© <span id="year"></span> Megam Telecom. Todos os direitos reservados.</p>
      </div>
    </footer>

    <a class="whatsapp-float" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      ${waIcon()}
      <span class="whatsapp-tooltip">Fale conosco no WhatsApp</span>
    </a>

    <button class="scroll-top" id="scrollTop" aria-label="Voltar ao topo">${scrollTopIcon()}</button>
  `)

  initShell()
}

function initShell() {
  const $ = (s) => document.querySelector(s)
  const header = $('#header')
  const menuToggle = $('#menuToggle')
  const nav = $('#nav')
  const scrollTop = $('#scrollTop')

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 16)
    scrollTop.classList.toggle('show', window.scrollY > 480)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open')
    menuToggle.classList.toggle('open', open)
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
  })

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open')
    menuToggle.classList.remove('open')
    menuToggle.setAttribute('aria-expanded', 'false')
  }))

  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

  const year = document.querySelector('#year')
  if (year) year.textContent = new Date().getFullYear()
}

/* ---------- REVEAL ON SCROLL ---------- */
export function initReveal() {
  const els = document.querySelectorAll('.reveal')
  if (!els.length) return
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target) }
    })
  }, { threshold: 0.12 })
  els.forEach(el => obs.observe(el))
}

/* ---------- COUNTER ANIMATION ---------- */
export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]')
  if (!counters.length) return
  const animate = (el) => {
    const target = parseFloat(el.dataset.counter)
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0
    const suffix = el.dataset.suffix || ''
    const dur = 1400
    const start = performance.now()
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = target * eased
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); o.unobserve(e.target) } })
  }, { threshold: 0.5 })
  counters.forEach(c => obs.observe(c))
}

/* Auto-init reveal + counters on DOM ready (page-specific scripts call these too) */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { initReveal(); initCounters() })
} else {
  initReveal(); initCounters()
}
