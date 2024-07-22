import './app.css'
import App from './App.svelte'

const app = new App({
  // biome-ignore lint/style/noNonNullAssertion: exists
  target: document.getElementById('app')!,
})

export default app
