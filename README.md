# ComuniApp 🏘️

Red de servicios comunitarios — conecta vecinos con emprendedores locales de confianza.

## Tecnologías

- React 18 + Vite
- React Router DOM v6
- Vitest + Testing Library (pruebas)
- Desplegado en Vercel

## Instalación local

```bash
npm install
npm run dev
```

## Pruebas

```bash
npm test
```

## Build para producción

```bash
npm run build
```

## Despliegue en Vercel

1. Sube esta carpeta a un repositorio GitHub
2. Importa el repositorio en vercel.com
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Haz clic en Deploy

## Funcionalidades del MVP

- Búsqueda y filtrado de servicios por texto y categoría
- Ordenamiento por calificación, reseñas o fecha
- Registro de usuarios (Vecino / Emprendedor) con validación
- Inicio de sesión con validación
- Perfil detallado de cada emprendedor
- Botón de contacto directo por WhatsApp

## Estructura del proyecto

```
src/
  components/   # Navbar, Footer, ServiceCard, Stars
  pages/        # Home, Login, Registro, Busqueda, Perfil
  data/         # servicios.js, usuarios.js (lógica de negocio)
  tests/        # 31 pruebas unitarias e integración
```
