import { injectShell, $ } from './layout.js'

injectShell()

const speedBtn = $('#speedBtn')
const speedValue = $('#speedValue')
const gaugeFill = $('#gaugeFill')
const speedStatus = $('#speedStatus')
const speedResult = $('#speedResult')
const dlValue = $('#dlValue')
const ulValue = $('#ulValue')
const pingValue = $('#pingValue')
const GAUGE_LEN = 251

const setGauge = (pct) => { gaugeFill.style.strokeDashoffset = String(GAUGE_LEN - Math.min(pct, 100) / 100 * GAUGE_LEN) }
setGauge(0)

const wait = (ms) => new Promise(r => setTimeout(r, ms))

async function runSpeedTest() {
  speedBtn.disabled = true
  speedBtn.textContent = 'Testando...'
  speedResult.hidden = true
  speedValue.textContent = '0'
  setGauge(0)
  speedStatus.textContent = 'Medindo download...'

  const download = Math.round(60 + Math.random() * 240)
  const upload = Math.round(download * (0.4 + Math.random() * 0.2))
  const ping = Math.round(8 + Math.random() * 30)
  const target = download
  const duration = 2600
  const steps = 40

  for (let i = 1; i <= steps; i++) {
    await wait(duration / steps)
    const t = i / steps
    const eased = 1 - Math.pow(1 - t, 3)
    const val = Math.round(target * eased)
    speedValue.textContent = val
    setGauge((val / 1000) * 100)
  }

  speedStatus.textContent = 'Teste concluído!'
  dlValue.textContent = download + ' Mbps'
  ulValue.textContent = upload + ' Mbps'
  pingValue.textContent = ping + ' ms'
  speedResult.hidden = false
  speedBtn.disabled = false
  speedBtn.textContent = 'Testar novamente'
}

speedBtn.addEventListener('click', runSpeedTest)
