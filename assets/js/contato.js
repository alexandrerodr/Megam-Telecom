import { injectShell, $ } from './layout.js'

injectShell()

const form = $('#contactForm')
const button = $('#submitButton')
const buttonText = button.querySelector('.button-text')
const buttonLoading = button.querySelector('.button-loading')
const feedback = $('#formFeedback')

// =====================================================
// ESTADO INICIAL DO BOTÃO
// =====================================================

function resetButton() {
  button.disabled = false

  // Força o estado correto, mesmo se algum CSS estiver interferindo
  buttonText.style.display = 'inline'
  buttonLoading.style.display = 'none'

  buttonLoading.hidden = true
}

// =====================================================
// MOSTRAR "ENVIANDO..."
// =====================================================

function loadingButton() {
  button.disabled = true

  buttonText.style.display = 'none'
  buttonLoading.style.display = 'inline-flex'

  buttonText.hidden = true
  buttonLoading.hidden = false
}

// =====================================================
// FEEDBACK
// =====================================================

function showFeedback(message, type) {
  feedback.hidden = false
  feedback.className = 'form-feedback ' + type
  feedback.textContent = message
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================

resetButton()
feedback.hidden = true

// =====================================================
// ENVIO
// =====================================================

form.addEventListener('submit', function (event) {

  // Impede o FormSubmit de abrir outra página
  event.preventDefault()

  const nome = $('#nome').value.trim()
  const telefone = $('#telefone').value.trim()
  const assunto = $('#assunto').value.trim()
  const mensagem = $('#mensagem').value.trim()

  // Validação
  if (!nome || !telefone || !assunto) {

    showFeedback(
      'Preencha nome, telefone e assunto para enviar.',
      'err'
    )

    return
  }

  // Mostra somente "Enviando..."
  loadingButton()

  feedback.hidden = true

  // ===================================================
  // ENVIO AJAX PARA O FORMSUBMIT
  // ===================================================

  fetch('https://formsubmit.co/ajax/gxstore0211@gmail.com', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify({
      nome: nome,
      telefone: telefone,
      assunto: assunto,
      mensagem: mensagem,

      _subject: 'Novo contato pelo site - Megam Telecom',
      _template: 'table',
      _captcha: 'false'
    })
  })

    .then(async response => {

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Erro ao enviar formulário.'
        )
      }

      return data
    })

    .then(() => {

      // Limpa os campos
      form.reset()

      // Volta o botão ao normal
      resetButton()

      // Mensagem de sucesso
      showFeedback(
        'Mensagem enviada com sucesso! Em breve entraremos em contato.',
        'ok'
      )

    })

    .catch(error => {

      console.error('Erro FormSubmit:', error)

      // Volta o botão ao normal
      resetButton()

      // Mensagem de erro
      showFeedback(
        'Não foi possível enviar a mensagem. Tente novamente.',
        'err'
      )
    })
})