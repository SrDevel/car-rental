# Renta de vehículos

## Descripción
Este proyecto es una aplicación web que permite a los usuarios alquilar vehículos de una empresa de renta de autos. Los usuarios pueden registrarse, iniciar sesión, ver los vehículos disponibles, alquilar un vehículo, ver sus alquileres activos y finalizar un alquiler.

### Recursos necesarios para ejecutar el proyecto
- node.js versión 20.11.1
- base de datos MySQL (Se puede utilizar XAMPP para crear una base de datos local o Docker para crear un contenedor con una base de datos MySQL)
- npm versión 10.2.4

### Pasos para ejecutar el proyecto
1. Clonar el repositorio 
2. Crear una base de datos MySQL
3. Crear un archivo .env o usa la plantilla (.env.template en la raíz del proyecto) y agregar las variables de entorno necesarias
```bash
DB_HOST=localhost
DB_USER=tu-nombre-de-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=nombre-de-tu-base-de-datos
PORT=3000-o-el-puerto-que-desees
```
4. Instalar las dependencias del proyecto
```bash
npm install
```
5. Ejecutar el proyecto
```bash
npm run dev
```
6. Acceder a la aplicación en http://localhost:3000

### Tecnologías utilizadas
- Node.js
- Express
- MySQL
- (Se utilizó el ORM Sequelize para la conexión a la base de datos)

