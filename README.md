# ShipNow API - Pre-Entrega Módulo 7 (Multer & Tests)

API RESTful para la gestión de envíos, usuarios, pedidos y carga de documentación desarrollada con Node.js, Express y MongoDB (Mongoose).

---

## 🛠️ Tecnologías e Integraciones

- **Runtime:** Node.js (ES Modules)
- **Framework Web:** Express.js (Arquitectura desacoplada `app.js` / `server.js`)
- **Base de Datos:** MongoDB & Mongoose
- **Carga de Archivos:** Multer (Imágenes y documentos PDF/JPEG/PNG/WEBP, máx 5MB)
- **Logger:** Winston (Consola y archivos de log)
- **Documentación:** Swagger UI (`/api/docs`)
- **Testing:** Mocha, Chai, Supertest, Cross-env

---

## 📂 Estructura del Proyecto

```text
multer/
├── src/
│   ├── config/          # Configuración de Multer, DB y Swagger
│   ├── controllers/     # Controladores (User, Order, Mocks, etc.)
│   ├── middlewares/     # Errores globales y MulterError middleware
│   ├── models/          # Esquemas Mongoose (Users, Orders, Products)
│   ├── routes/          # Routers Express
│   ├── services/        # Capa de servicios
│   ├── utils/           # Logger de Winston y constantes
│   └── app.js           # Instancia de Express desacoplada
├── tests/               # Test suites por módulo y setup.js con hooks
├── uploads/             # Archivos subidos (.gitignore)
│   ├── documents/       # Documentos de usuario
│   ├── receipts/        # Comprobantes de pedidos
│   └── profiles/        # Avatares / Perfiles
├── .env.example
├── .gitignore
├── package.json
└── server.js            # Listener HTTP

📁 Carga de Archivos (Multer)
El proyecto incluye un middleware centralizado en src/config/multer.config.js con las siguientes características:

Storage dinámico: Asigna carpetas de destino automáticamente (uploads/documents, uploads/receipts) según el endpoint o el campo recibido.

Nombres únicos: Renombra cada archivo usando un sufijo timestamp + random ([fieldname]-[timestamp]-[random].[ext]).

Filtro de extensiones: Acepta exclusivamente archivos application/pdf, image/jpeg, image/png y image/webp.

Límite de tamaño: Restricción máxima de 5 MB por archivo.

Persistencia de Metadatos: En MongoDB únicamente se almacenan los metadatos de los archivos (name, originalName, reference, mimeType, size, uploadedAt, docType), manteniendo la base de datos liviana.

Endpoints de Carga:
POST /api/users/:uid/documents (multipart/form-data)

Campo de archivo: document

Campo adicional: docType (DNI, Licencia, Comprobante, CUIT)

POST /api/orders/:oid/receipts (multipart/form-data)

Campo de archivo: receipt

🧪 Ejecución de Tests Funcionales
Asegurarse de estar posicionados en la carpeta del proyecto (multer) e instalar las dependencias:

npm install

Para correr la suite completa de pruebas funcionales de manera limpia e idempotente:
npm test

Cobertura de Tests (15/15 passing):
Módulo de Mocks (POST /api/mocks/seed) - Generación e inserción de datos mock y validación de 400.

Módulo de Pedidos (/api/orders) - Creación (201), validación de datos (400), consulta por ID (200 / 404) y actualización de estado (200 / 400).

Sistema (Logger & Swagger) - Nivelación de logs y acceso a la interfaz Swagger.

Carga de Archivos (Multer) - Archivo faltante (400), tipo de documento inválido (400) y entidad inexistente (404).

Módulo de Usuarios (/api/users) - Obtención de listado (200) y rutas inexistentes (404).

📖 Documentación OpenAPI / Swagger
Con el servidor en ejecución (npm start o npm run dev), acceder a la interfaz Swagger interactiva en:
http://localhost:8080/api/docs
