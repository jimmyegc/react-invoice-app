## 📘 `README.md`

```md
# MVP Billing System

Sistema de facturación desarrollado con **React + Supabase**.  
Incluye gestión de clientes, catálogos geográficos y facturación.

---

## 🧱 Stack

- Frontend: React + TypeScript
- UI: Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth)
- Data fetching: TanStack Query

---

## 🗄️ Base de datos

La base de datos se inicializa usando un único archivo SQL.

### 📄 Archivo
```

db/init.sql

````

### ▶️ Cómo ejecutar

#### En Supabase
1. Abrir **SQL Editor**
2. Copiar el contenido de `init.sql`
3. Ejecutar el script

#### En PostgreSQL local
```bash
psql -d your_database -f db/init.sql
````

---

## 📦 Estructura de tablas

- `mvp_countries`
- `mvp_states`
- `mvp_cities`
- `mvp_clients`
- `mvp_invoices`
- `mvp_invoice_items`

Relaciones con `ON DELETE CASCADE` donde aplica.

---

## 📄 Estados de factura

Las facturas manejan el siguiente flujo:

```
draft → issued → paid
           ↘
         cancelled
```

Estados válidos:

- `draft`
- `issued`
- `paid`
- `cancelled`

---

## 🔐 Autenticación

El proyecto utiliza **Supabase Auth**.
Todas las tablas principales están relacionadas con `auth.users`.

---

## 🚀 Desarrollo

Instalar dependencias:

```bash
npm install
```

Ejecutar proyecto:

```bash
npm run dev
```

---

## 💻 Screenshots

![Preview](/screenshots/screenshot-01.png)
![Preview](/screenshots/screenshot-02.png)

---

## 🧠 Notas

- El archivo `init.sql` es idempotente (se puede ejecutar múltiples veces).
- El seed de datos es opcional y está comentado.
- Pensado para escalar a migraciones más adelante si el proyecto crece.

---

## 📜 Licencia

MIT
