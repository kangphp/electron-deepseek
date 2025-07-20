const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (query) => ipcRenderer.invoke('chat-completion', query),
  cancelRequest: () => ipcRenderer.send('cancel-request'),
  onChatUpdate: (callback) => ipcRenderer.on('chat-update', (_, content) => callback(content)),
  onChatError: (callback) => ipcRenderer.on('chat-error', (_, error) => callback(error))
});
