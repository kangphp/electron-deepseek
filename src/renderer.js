document.getElementById('send-btn').addEventListener('click', async () => {
  const input = document.getElementById('user-input')
  const message = input.value
  
  appendMessage('user', message)
  input.value = ''

  window.electronAPI.sendQuery(message).then(() => {
    appendMessage('bot', '')
  })
})

window.electron.ipcRenderer.on('chat-update', (_, content) => {
  const lastMessage = document.querySelector('.bot-message:last-child')
  lastMessage.textContent += content
})

function appendMessage(role, text) {
  const div = document.createElement('div')
  div.className = `message ${role}-message`
  div.textContent = text
  document.getElementById('chat-history').appendChild(div)
}