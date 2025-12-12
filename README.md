# YoReparo 🛠️

![YoReparo Preview](public/og-image.png)

[English](#english) | [Español](#español)

---

<a name="english"></a>


**YoReparo** is a modern platform for managing technical services and repairs. It facilitates the connection between customers needing repairs (home, business, retail) and qualified technicians, offering an intuitive request flow and a complete administration panel.

### Project Description

#### Technical Profile (Architecture & Stack)
I developed a full-stack web application for the operational management of technical repair businesses, using **Next.js 16 (App Router)** and **Supabase**. The system optimizes workflow through:
*   **Scalable Architecture:** Implementation of Server Actions, React Server Components, and strict type validation with TypeScript and Zod.
*   **User Experience (UX):** Multi-step "wizard" request form with real-time validation and a self-service portal for clients (status tracking via ID).
*   **Security & Administration:** Role-based authentication, protected routes, and an administrative dashboard for ticket and technician management.
*   **Integrations:** Automated notification system via **WhatsApp API** for instant alerts to technicians and customers.
*   **Stack:** React 19, Tailwind CSS v4, Framer Motion, PostgreSQL (Supabase).

#### Commercial Profile (Business Solution)
**YoReparo: Your Digital Operations Center**

A "turnkey" solution designed to modernize your technical service business. Forget about constant calls and lost sticky notes; YoReparo professionalizes your workshop from day one.

**Key Benefits:**
*   **24/7 Reception:** Your customers can request repairs from their phones at any time, with a professional form that captures all necessary data.
*   **Fewer Calls, More Work:** Includes a "Status Portal" where the customer enters their order number and sees if their equipment is ready. Goodbye to "is it ready yet?" calls!
*   **Automatic Notifications:** The system notifies you via WhatsApp as soon as a new job comes in.
*   **Total Control:** A private panel where you see all orders, assign technicians, and manage your business in an orderly and secure way.
*   **Premium Image:** Differentiate yourself from the competition with a fast, modern web platform with your own brand.

### Key Features

- **Smart Service Request**: Step-by-step form (Wizard) to capture problem details, location, and urgency.
- **Location Management**: Support for different client types: Home, Business, and Retail.
- **Status Tracking**: Portal for clients to check their repair status using a unique ID.
- **Admin Panel**:
  - Dashboard with key metrics.
  - Technician Management.
  - Request visualization and administration.
- **WhatsApp Integration**: Automatic notifications to technicians and admins (via CallMeBot).
- **Security**: Robust authentication with Supabase and route protection (AdminGuard).
- **Responsive Design**: Interface optimized for mobile and desktop.

### Tech Stack

This project is built with the latest web technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database / Auth**: [Supabase](https://supabase.com/)

### Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/yoreparo.git
    cd yoreparo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file and add your Supabase and API keys.

4.  **Run development server:**
    ```bash
    npm run dev
    ```

---

<a name="español"></a>
## 🇪🇸 Español

**YoReparo** es una plataforma moderna para la gestión de servicios técnicos y reparaciones. Facilita la conexión entre clientes que necesitan reparaciones (hogar, empresa, local) y técnicos calificados, ofreciendo un flujo de solicitud intuitivo y un panel de administración completo.

### Descripción del Proyecto

#### Perfil Técnico (Arquitectura & Stack)
Desarrollé una aplicación web completa para la gestión operativa de negocios de reparación técnica, utilizando **Next.js 16 (App Router)** y **Supabase**. El sistema optimiza el flujo de trabajo mediante:
*   **Arquitectura Escalable:** Implementación de Server Actions, React Server Components y validación estricta de tipos con TypeScript y Zod.
*   **Experiencia de Usuario (UX):** Formulario de solicitud tipo "wizard" multi-paso con validación en tiempo real y portal de autogestión para clientes (seguimiento de estado por ID).
*   **Seguridad y Administración:** Autenticación basada en roles, rutas protegidas y un dashboard administrativo para gestión de tickets y técnicos.
*   **Integraciones:** Sistema de notificaciones automatizadas vía **WhatsApp API** para alertas instantáneas a técnicos y clientes.
*   **Stack:** React 19, Tailwind CSS v4, Framer Motion, PostgreSQL (Supabase).

#### Perfil Comercial (Solución de Negocio)
**YoReparo: Tu Centro de Operaciones Digital**

Una solución "llave en mano" diseñada para modernizar tu negocio de servicio técnico. Olvídate de las llamadas constantes, los papelitos perdidos y el desorden; profesionaliza tu taller desde el primer día.

**Beneficios Clave:**
*   **Recepción 24/7:** Tus clientes pueden solicitar reparaciones desde su celular en cualquier momento, con un formulario profesional que captura todos los datos necesarios.
*   **Menos Llamadas, Más Trabajo:** Incluye un "Portal de Estado" donde el cliente ingresa su número de orden y ve si su equipo está listo. 
*   **Notificaciones Automáticas:** El sistema te avisa por WhatsApp apenas entra un trabajo nuevo.
*   **Control Total:** Un panel privado donde ves todas las órdenes, asignas técnicos y gestionas tu negocio de forma ordenada y segura.
*   **Imagen Premium:** Diferénciate de la competencia con una plataforma web rápida, moderna y con tu propia marca.

### Características Principales

- **Solicitud de Servicios Inteligente**: Formulario paso a paso (Wizard) para capturar detalles del problema, ubicación y urgencia.
- **Gestión de Ubicaciones**: Soporte para diferentes tipos de clientes: Hogar, Empresa y Local Comercial.
- **Seguimiento de Estado**: Portal para que los clientes consulten el estado de su reparación mediante un ID único.
- **Panel de Administración**:
  - Dashboard con métricas clave.
  - Gestión de Técnicos.
  - Visualización y administración de solicitudes.
- **Integración con WhatsApp**: Notificaciones automáticas a técnicos y administradores (vía CallMeBot).
- **Seguridad**: Autenticación robusta con Supabase y protección de rutas (AdminGuard).
- **Diseño Responsivo**: Interfaz optimizada para móviles y escritorio.

### Tecnologías Utilizadas

Este proyecto está construido con las últimas tecnologías web:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Validación de Formularios**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Notificaciones**: [Sonner](https://sonner.emilkowal.ski/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Base de Datos / Auth**: [Supabase](https://supabase.com/)

### Comenzando

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/yoreparo.git
    cd yoreparo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables necesarias.

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 📄 License / Licencia

This project is for portfolio purposes. Please contact the author for commercial usage rights.
Este proyecto es para fines de portafolio. Por favor contacta al autor para derechos de uso comercial.

[MIT](https://choosealicense.com/licenses/mit/)
