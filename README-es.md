👉 [Ir a la versión en inglés](./README.md)

# Conexa Challenge – React Native Developer

**Aplicación mobile desarrollada con React Native y Expo** como parte del challenge técnico de Conexa.

Este documento explica cómo **levantar el proyecto localmente** y las **decisiones técnicas tomadas para cada feature**.

## Requisitos

Antes de ejecutar el proyecto, asegurarse de tener instalado:

- **Node.js** ≥ 18 (en este proyecto se utilizó la versión 24.12.0)
- **npm** o **yarn**
- **Expo CLI**
- **Android Studio** (para emulador Android) o **Xcode** (para simulador iOS)
- Un dispositivo físico con **Expo Go** (opcional)

## Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone git@github.com:valentinbegnis/conexa-challenge.git
cd conexa-challenge
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Iniciar el servidor de desarrollo de Expo

```bash
npx expo start
```

## Decisiones técnicas

### Obtención de datos y caching

La aplicación utiliza **React Query (TanStack Query)** para obtener datos desde la **API pública JSONPlaceholder**.

Fuentes de datos:

- Posts
- Users

React Query se encarga de:

- Realizar las peticiones remotas
- Cachear las respuestas en memoria
- Evitar refetches innecesarios
- Exponer estados de loading y error a la UI

¿Por qué React Query?

- Elimina la necesidad de manejar manualmente estados de carga y error
- El caching integrado mejora la performance y la experiencia de usuario
- Mantiene el estado del servidor claramente separado del estado del cliente

Los datos cacheados viven en memoria y se reutilizan automáticamente entre pantallas (por ejemplo, al navegar entre Home, Users y Post Detail).

### Estado del servidor vs estado del cliente

Se estableció una separación clara entre **estado del servidor** y **estado del cliente**:

- **Estado del servidor**
  - Administrado por React Query
  - Posts y usuarios obtenidos desde JSONPlaceholder
  - Cacheados en memoria
  - Refetch solo cuando es necesario

- **Estado del cliente**
  - Administrado con Zustand
  - Posts favoritos
  - Estado de autenticación

Esta separación evita mezclar responsabilidades y mantiene una arquitectura predecible y escalable.

### Gestión de favoritos

Los posts favoritos se gestionan mediante un **store dedicado de Zustand**.

Responsabilidades:

- Agregar y remover posts de favoritos
- Exponer estado derivado (por ejemplo, cantidad de favoritos)
- Compartir estado entre múltiples pantallas (Home, Favorites y Post Detail)

¿Por qué Zustand?

- Boilerplate mínimo
- Ideal para estado global simple
- Evita complejidad innecesaria frente a soluciones más pesadas como Redux

### Estado de autenticación

La autenticación se maneja mediante un **store dedicado de Zustand**.

Características:

- Flujo de autenticación mockeado (sin backend)
- Manejo de sesión y estado de login
- Persistencia mediante AsyncStorage
- Estado compartido en toda la aplicación

¿Por qué un store de auth separado?

- Separación clara de responsabilidades
- Fácil de extender a un flujo real con tokens o API
- Replica patrones comunes de aplicaciones en producción

Las rutas protegidas dependen directamente de este store, haciendo explícitos los límites de autenticación.

### Persistencia de estado (AsyncStorage)

Zustand se integra con **AsyncStorage** para persistir estado crítico entre reinicios de la app.

Estado persistido:

- Posts favoritos
- Sesión de autenticación

¿Por qué persistir estado?

- Los favoritos no deberían perderse al cerrar la app
- El usuario debería mantenerse logueado tras reiniciar
- Refleja el comportamiento esperado en apps reales

Implementación:

- Middleware `persist` de Zustand
- AsyncStorage como motor de almacenamiento
- Rehidratación automática al iniciar la app

### Post Detail y funcionalidad de compartir

La pantalla de detalle de post incluye un **feature extra**: compartir contenido.

Características:

- Permite compartir una parte breve del post junto con un link al mismo (mock)
- Compatible con WhatsApp y cualquier app instalada que soporte compartir
- Implementado usando la API nativa Share

### Performance y optimización de listas

La performance base de las listas era adecuada para el alcance del challenge.

Como validación, se recolectaron métricas de frames en Android utilizando `adb dumpsys gfxinfo`. A partir de estos resultados, se aplicaron ajustes menores para evitar renders innecesarios:

- Memoización de renderItem usando useCallback
- Uso de useMemo para datos derivados (filtros, favoritos)
- Evitar funciones inline y closures innecesarios

### Arquitectura de navegación

La app utiliza **Expo Router** con una separación clara entre capas de navegación:

- **Stack navigation**
  - Autenticación
  - Pantalla de detalle de post

- **Tab navigation**
  - Home
  - Favorites
  - Users

¿Por qué esta estructura?

- Aísla correctamente la navegación por tabs
- Permite vistas full-screen para detalles
- Simplifica el manejo de rutas protegidas

### Estrategia de testing

El proyecto incluye **tests unitarios y de pantallas** utilizando:

- Jest
- React Native Testing Library
- Preset jest-expo

Áreas testeadas:

- Store de Zustand (favoritos)
- Comportamiento del buscador en Home
- Estados vacío y con datos en Favorites

### UX de login y validación

Aunque la autenticación es mockeada, el flujo de login fue diseñado para reflejar expectativas reales de UX:

- Validación de formato de email
- Botón de submit deshabilitado para input inválido
- Feedback visual durante el login
- Manejo y dismiss del teclado
