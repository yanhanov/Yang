<template>
  <div class="loader">
    <div class="loader-ring" />
    <p class="loader-text base-font">&lt;Yan /&gt;</p>
  </div>
</template>

<style scoped>
.loader {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: var(--surface);
}

.loader-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--border);
  border-top-color: var(--brand);
  animation: spin 0.8s linear infinite;
}

.loader-text {
  color: var(--brand);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>
