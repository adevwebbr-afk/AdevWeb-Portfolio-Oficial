document
  .getElementById('whatsappForm')
  .addEventListener('submit', function (e) {
    e.preventDefault() 
    const numeroWhats = '5583986306588'


    const nome = document.getElementById('name').value
    const whatsappCliente = document.getElementById('whatsapp').value
    const servicoSelect = document.getElementById('service')
    const servicoTexto = servicoSelect.options[servicoSelect.selectedIndex].text
    const mensagemAdicional =
      document.getElementById('message').value || 'Não informada'

    const textoMensagem =
      `Olá, gostaria de solicitar um orçamento!%0A%0A` +
      `*Nome/Empresa:* ${nome}%0A` +
      `*WhatsApp:* ${whatsappCliente}%0A` +
      `*Solução desejada:* ${servicoTexto}%0A` +
      `*Sobre o negócio:* ${mensagemAdicional}`

    const urlLink = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${textoMensagem}`

    window.open(urlLink, '_blank')
  })
