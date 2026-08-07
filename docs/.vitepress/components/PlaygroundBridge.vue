<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

const router = useRouter()
const prefix = 'antdv-superform:repl'

function decode(value: string) {
  const bytes = Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function openPlayground(event: MouseEvent) {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-playground-code]')
  if (!button) return
  const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  localStorage.setItem(`${prefix}:snippet:${id}`, JSON.stringify({
    code: decode(button.dataset.playgroundCode ?? ''),
    source: location.pathname,
    createdAt: new Date().toISOString(),
  }))
  router.go(withBase(`/playground?snippet=${encodeURIComponent(id)}`))
}

onMounted(() => document.addEventListener('click', openPlayground))
onBeforeUnmount(() => document.removeEventListener('click', openPlayground))
</script>

<template><span aria-hidden="true" /></template>
