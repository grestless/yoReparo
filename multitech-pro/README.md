# YoReparo 🛠️

**YoReparo** es una plataforma moderna para la gestión de servicios técnicos y reparaciones. Facilita la conexión entre clientes que necesitan reparaciones (hogar, empresa, local) y técnicos calificados, ofreciendo un flujo de solicitud intuitivo y un panel de administración completo.

![YoReparo Preview](public/og-image.png) <!-- Asegúrate de tener una imagen aquí o bórralo si no -->

## 🚀 Características Principales

- **Solicitud de Servicios Inteligente**: Formulario paso a paso (Wizard) para capturar detalles del problema, ubicación y urgencia.
- **Gestión de Ubicaciones**: Soporte para diferentes tipos de clientes: Hogar, Empresa y Local Comercial.
- **Seguimiento de Estado**: Portal para que los clientes consulten el estado de su reparación mediante un ID único.
- **Panel de Administración**:
  - Dashboard con métricas clave.
  - Gestión de Técnicos.
  - Visualización y administración de solicitudes.
- **Integración con WhatsApp**: Notificaciones y contacto rápido con clientes.
- **Diseño Responsivo**: Interfaz optimizada para móviles y escritorio.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con las últimas tecnologías web:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Validación de Formularios**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Base de Datos / Auth**: [Supabase](https://supabase.com/) (Integración en progreso)

## 🏁 Comenzando

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos

- Node.js 18+ instalado.
- npm, yarn, pnpm o bun.

### Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/yoreparo.git
    cd yoreparo
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar variables de entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables necesarias (ej. claves de Supabase).

    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
    ```

4.  **Correr el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

- `/app`: Rutas y páginas de la aplicación (App Router).
  - `(public)`: Rutas públicas (Landing, Solicitud, Estado).
  - `(admin)`: Panel de administración protegido.
- `/components`: Componentes reutilizables de React.
- `/lib`: Utilidades, configuraciones y definiciones de tipos.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
