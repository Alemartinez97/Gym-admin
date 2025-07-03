export function emitEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail })
    document.dispatchEvent(event)
  }
  
  export function onEvent(name, callback) {
    const handler = (e) => callback(e.detail)
    document.addEventListener(name, handler)
    return () => document.removeEventListener(name, handler) 
  }
  