# Guía de Navegación - Sistema Helpdesk

## Estructura de Navegación

El sistema está completamente navegable con 4 roles de usuario diferentes, cada uno con su propio dashboard y funcionalidades.

### 🔐 Autenticación

**Página de Login:** `/`
- Ingresa cualquier email y contraseña
- Selecciona un rol para demostración (Usuario, Técnico, Supervisor, Admin)
- El sistema te redirigirá automáticamente al dashboard correspondiente

### 👤 Usuario Final
**Dashboard:** `/dashboard/user`

**Funcionalidades:**
- Ver mis tickets abiertos
- Crear nuevos tickets
- Ver historial de tickets resueltos
- Acceder a la base de conocimiento
- Ver satisfacción promedio

**Navegación:**
- Inicio → `/dashboard/user`
- Mis Tickets → `/dashboard/user`
- Base de Conocimiento → `/dashboard/kb`

---

### 🔧 Técnico de Soporte
**Dashboard:** `/dashboard/technician`

**Funcionalidades:**
- Ver cola de tickets asignados
- Filtrar por prioridad, estado y SLA
- Actualizar estado de tickets
- Asignar tickets a otros técnicos
- Ver métricas personales
- Acceder a la base de conocimiento

**Navegación:**
- Inicio → `/dashboard/technician`
- Cola de Tickets → `/dashboard/technician`
- Base de Conocimiento → `/dashboard/kb`

---

### 📊 Supervisor
**Dashboard:** `/dashboard/supervisor`

**Funcionalidades:**
- Ver análisis y métricas del equipo
- Monitorear desempeño de técnicos
- Ver cumplimiento de SLA
- Analizar tendencias de tickets
- Generar reportes
- Acceder a la base de conocimiento

**Navegación:**
- Inicio → `/dashboard/supervisor`
- Análisis → `/dashboard/supervisor`
- Equipo → `/dashboard/supervisor`
- Base de Conocimiento → `/dashboard/kb`

---

### ⚙️ Administrador
**Dashboard:** `/dashboard/admin`

**Funcionalidades:**
- Gestionar usuarios del sistema
- Crear y editar categorías de tickets
- Configurar SLA y notificaciones
- Ver estadísticas generales del sistema
- Monitorear uptime
- Acceder a la base de conocimiento

**Navegación:**
- Inicio → `/dashboard/admin`
- Administración → `/dashboard/admin`
- Usuarios → `/dashboard/admin`
- Configuración → `/dashboard/admin`
- Base de Conocimiento → `/dashboard/kb`

---

## 📚 Base de Conocimiento
**Acceso:** `/dashboard/kb` (disponible para todos los roles)

**Funcionalidades:**
- Buscar artículos
- Filtrar por categoría
- Ver artículos relacionados
- Votar utilidad de artículos

---

## 🚪 Cerrar Sesión

Haz clic en el botón "Cerrar sesión" en la parte inferior del sidebar para volver a la página de login.

---

## 🎯 Flujos Principales

### Crear un Ticket (Usuario)
1. Ir a `/dashboard/user`
2. Hacer clic en "+ Nuevo Ticket"
3. Completar el formulario
4. Enviar

### Resolver un Ticket (Técnico)
1. Ir a `/dashboard/technician`
2. Seleccionar un ticket de la cola
3. Actualizar el estado
4. Asignar si es necesario
5. Marcar como resuelto

### Monitorear Equipo (Supervisor)
1. Ir a `/dashboard/supervisor`
2. Ver métricas en tiempo real
3. Analizar gráficos de tendencias
4. Revisar desempeño individual

### Administrar Sistema (Admin)
1. Ir a `/dashboard/admin`
2. Seleccionar la pestaña deseada
3. Gestionar usuarios, categorías o configuración

---

## 🔄 Componentes de Navegación

### Sidebar
- Colapsable (botón ← →)
- Muestra el nombre del usuario y rol
- Botón de cerrar sesión
- Links a todas las secciones disponibles

### Protección de Rutas
- Las rutas `/dashboard/*` están protegidas
- Si no hay sesión activa, redirige a `/`
- Cada rol solo ve las opciones disponibles para él

---

## 📱 Responsive Design
El sistema está optimizado para desktop (1366x768px mínimo) pero es totalmente responsive.
