// MY-NOTE-7
import { defineConfig } from 'vitest/config'; // Импорт функции для конфигурации Vitest
import react from '@vitejs/plugin-react-swc'; // Плагин для работы с React через SWC (быстрее Babel)
import { resolve } from 'path'; // Утилита Node.js для работы с путями

export default defineConfig({
  plugins: [react()], // Плагин React оставили без изменений
  test: {
    globals: true, // Позволяет использовать функции тестирования (test, expect) глобально, без импорта
    environment: 'jsdom', // Имитация браузерной среды для тестов React
    setupFiles: resolve(__dirname, 'src/setupTests.ts'), // Указываем файл, который выполняется перед всеми тестами (например, для настройки jest-dom)
  },
});

