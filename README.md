# HOTEL-PLANNING-API

## 1. Descripción

API REST para la gestión de planificación de turnos de trabajadores de hotel. Permite crear y administrar departamentos, usuarios y plannings semanales con control de roles (admin/user).

## 2. Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken) para autenticación
- Bcrypt para encriptación de contraseñas

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGODB_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta_jwt
PORT=3000
```

## 4 Endpoints

### Autenticación

| Método | Endpoint             | Descripción             | Auth | Rol |
| ------ | -------------------- | ----------------------- | ---- | --- |
| POST   | `/api/auth/register` | Registrar nuevo usuario | ❌   | -   |
| POST   | `/api/auth/login`    | Iniciar sesión          | ❌   | -   |

### Departamentos

| Método | Endpoint               | Descripción                     | Auth | Rol         |
| ------ | ---------------------- | ------------------------------- | ---- | ----------- |
| GET    | `/api/departments`     | Obtener todos los departamentos | ✅   | admin, user |
| GET    | `/api/departments/:id` | Obtener departamento por ID     | ✅   | admin, user |
| POST   | `/api/departments`     | Crear departamento              | ✅   | admin       |
| PUT    | `/api/departments/:id` | Actualizar departamento         | ✅   | admin       |
| DELETE | `/api/departments/:id` | Eliminar departamento           | ✅   | admin       |

### Usuarios

| Método | Endpoint         | Descripción                | Auth | Rol         |
| ------ | ---------------- | -------------------------- | ---- | ----------- |
| GET    | `/api/users`     | Obtener todos los usuarios | ✅   | admin       |
| GET    | `/api/users/:id` | Obtener usuario por ID     | ✅   | admin, user |
| PUT    | `/api/users/:id` | Actualizar usuario         | ✅   | admin, user |
| DELETE | `/api/users/:id` | Eliminar usuario           | ✅   | admin       |

### Plannings

| Método | Endpoint                      | Descripción                     | Auth | Rol         |
| ------ | ----------------------------- | ------------------------------- | ---- | ----------- |
| POST   | `/api/plannings`              | Crear planning                  | ✅   | admin       |
| GET    | `/api/plannings`              | Obtener todos los plannings     | ✅   | admin, user |
| GET    | `/api/plannings/:id`          | Obtener planning por ID         | ✅   | admin, user |
| GET    | `/api/plannings/user/:userId` | Obtener plannings de un usuario | ✅   | admin, user |
| PUT    | `/api/plannings/:id`          | Actualizar planning             | ✅   | admin       |
| DELETE | `/api/plannings/:id`          | Eliminar planning               | ✅   | admin       |
| PATCH  | `/api/plannings/:id/publish`  | Publicar planning               | ✅   | admin       |

## 5. Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login y tiene una duración de 1 hora.

## 6. Roles y Permisos

- **admin**: Acceso completo (crear, leer, actualizar, eliminar)
- **user**: Solo lectura de plannings y visualización de su propio perfil

## 7. Estructura del Proyecto

```
hotel-planning-api/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── departmentController.js
│   │   │   ├── planningController.js
│   │   │   └── userController.js
│   │   ├── middlewares/
│   │   │   ├── authenticate.js
│   │   │   └── checkRole.js
│   │   ├── models/
│   │   │   ├── department.js
│   │   │   ├── planning.js
│   │   │   └── user.js
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       ├── departmentRoutes.js
│   │       ├── planningRoutes.js
│   │       └── userRoutes.js
│   ├── config/
│   │   └── db.js
│   └── utils/
│       └── seeds/
│           ├── data.js
│           └── seed.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 8. Autor

Tania - [GitHub](https://github.com/Taniadfs)

## 📄 Licencia

Proyecto de uso educativo
