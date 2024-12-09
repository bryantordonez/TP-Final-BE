# Documentación de la API de registro de Transacciones

Esta API permite gestionar transacciones de consumos en una tarjeta, como creación, consulta, actualización y eliminación de transacciones. Implementa un sistema de autenticación basado en usuario y contraseña.

## **Endpoints**

### **1. Autenticación**

#### **Registro de Usuario**

**URL:** `/api/auth/register`  
**Método:** `POST`  
**Descripción:** Permite registrar un nuevo usuario en el sistema.  
**Cuerpo de la Solicitud (JSON):**

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Respuestas:**

- **201:** Usuario creado exitosamente.
- **400:** Campos obligatorios no proporcionados.
- **500:** Error interno del servidor.

#### **Inicio de Sesión**

**URL:** `/api/auth/login`  
**Método:** `POST`  
**Descripción:** Autentica a un usuario y genera un token.  
**Cuerpo de la Solicitud (JSON):**

```json
{
  "username": "string",
  "password": "string"
}
```

**Respuestas:**

- **200:** Devuelve el token de autenticación.
- **401:** Credenciales incorrectas.
- **500:** Error interno del servidor.

---

### **2. Gestión de Transacciones**

#### **Obtener Todas las Transacciones**

**URL:** `/api/transactions`  
**Método:** `GET`  
**Descripción:** Devuelve la lista completa de transacciones.  
**Respuestas:**

- **200:** Lista de transacciones.
- **404:** No se encontraron transacciones.
- **500:** Error interno del servidor.

#### **Crear una Nueva Transacción**

**URL:** `/api/addTransaction`  
**Método:** `POST`  
**Descripción:** Crea una nueva transacción.  
**Cuerpo de la Solicitud (JSON):**

```json
{
  "amount": "number",
  "store": "string",
  "date": "string (YYYY-MM-DD)",
  "status": "string" //opcional
}
```

**Respuestas:**

- **201:** Transacción creada exitosamente.
- **400:** Validación fallida.
- **500:** Error interno del servidor.

#### **Actualizar una Transacción**

**URL:** `/api/updateTransaction/:id`  
**Método:** `PUT`  
**Descripción:** Actualiza una transacción existente.  
**Parámetros de URL:**

- `id` (string): ID de la transacción.

**Cuerpo de la Solicitud (JSON):**

```json
{
  "amount": "number",
  "store": "string",
  "date": "string (YYYY-MM-DD)",
  "status": "string"
}
```

**Respuestas:**

- **200:** Transacción actualizada exitosamente.
- **400:** Validación fallida.
- **404:** Transacción no encontrada.
- **500:** Error interno del servidor.

#### **Eliminar una Transacción**

**URL:** `/api/refundTransaction/:id`  
**Método:** `DELETE`  
**Descripción:** Elimina una transacción por su ID.  
**Parámetros de URL:**

- `id` (string): ID de la transacción.

**Respuestas:**

- **200:** Transacción eliminada exitosamente.
- **404:** Transacción no encontrada.
- **500:** Error interno del servidor.

---

## **Requisitos Previos**

1. **Autenticación:**  
   Para acceder a los endpoints protegidos, primero debes autenticarte en `/login`. El token recibido debe incluirse en la cabecera `Authorization` como `Bearer <token>`.

2. **Validaciones:**  
   Los datos enviados en las solicitudes son validados. Si la validación falla, se devolverá un error con los detalles.

---

## **Tecnologías Utilizadas**

- **Node.js** con **Express.js** para el backend.
- **JWT** para autenticación basada en tokens.
- **Bcryptjs** para el manejo seguro de contraseñas.
- **MongoDB** para almacenamiento de datos.

---

## **Cómo Correr la API**

1. Clona este repositorio:

   ```bash
   git clone https://github.com/bryantordonez/TP-Final-BE.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Configura la conexión a MongoDB.
   - Añade una clave secreta para JWT.

4. Inicia el servidor:

   ```bash
   npm run dev
   ```

5. Accede a la API en `http://localhost:<puerto>`.

---


## **Ejemplos de Uso**

### **1. Registro de Usuario**

**Endpoint:** `./api/auth/register`  
**Método:** `POST`  

**Request:**  
```json
{
  "username": "139265.manager",
  "password": "sKfYgf37D",
  "email": "139265.manager@bank.com"
}
```
**Respuesta esperada:**  
```json
{
  "username": "139265.manager",
  "email": "139265.manager@bank.com",
  "_id": "67555e0301210a68b3ff454c"
}
```

---


### **2. Agregar Transacción**

**Endpoint:** `./api/addTransaction`  
**Método:** `POST`  

**Request:**  
```json
{
  "mount" : 6.00,
  "store" : "Uber",
  "date": "01/12/2024 22:30"
}
```

**Respuesta esperada:**  
```json
{
  "mount": 6,
  "store": "Uber",
  "date": "01/12/2024 22:30",
  "status": "pending",
  "_id": "67554f1f5c8b81a4904b109b"
}
```

---

### **3. Actualizar Transacción**

**Endpoint:** `./api/updateTransaction`  
**Método:** `PUT`  

**Request:**  
```json
{
  "mount" : 6.00,
  "store" : "Uber",
  "date": "01/12/2024 22:30",
  "status": "approved"
}
```

**Respuesta esperada:**  
```json
{
  "_id": "67554f1f5c8b81a4904b109b",
  "mount": 6,
  "store": "Uber",
  "date": "01/12/2024 22:30",
  "status": "approved"
}
```
