● List directory .
  └ 8 files found

● Find Java files in source code
  $ find ./source-code/src/main/java -type f -name "*.java" | head -20
  └ 21 lines...

● Explore directory structure
  $ find ./source-code/src/main/java -type d | head -20
  └ 10 lines...

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java
  └ 172 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/VetController.java
  └ 84 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/PetController.java
  └ 120 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/VisitController.java
  └ 98 lines read

Now I'll generate the MDX-compatible API reference document:

```markdown
---
id: api
title: Endpoints
---

## PetClinic API Reference

Referencia de endpoints de la aplicación PetClinic Spring.

### Gestión de Propietarios

#### Crear Propietario

```
GET /owners/new
```

Muestra el formulario para crear un nuevo propietario.

**Respuesta:** Renderiza `owners/createOrUpdateOwnerForm`

```
POST /owners/new
```

Procesa la creación de un nuevo propietario.

**Parámetros:**
- `owner` (body, requerido): Objeto Owner con validación

**Respuestas:**
- Validación correcta: Redirige a `/owners/{id}`
- Errores de validación: Retorna formulario con errores

#### Buscar Propietarios

```
GET /owners/find
```

Muestra el formulario de búsqueda de propietarios.

**Respuesta:** Renderiza `owners/findOwners`

```
GET /owners
```

Procesa búsqueda de propietarios por apellido.

**Parámetros de consulta:**
- `page` (opcional, predeterminado: 1): Número de página
- `owner.lastName` (opcional): Apellido del propietario

**Respuestas:**
- Resultados encontrados: Renderiza lista paginada (`owners/ownersList`)
- Un resultado: Redirige a detalles del propietario
- Sin resultados: Retorna formulario con error

#### Actualizar Propietario

```
GET /owners/{ownerId}/edit
```

Muestra el formulario para editar un propietario.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario

**Respuesta:** Renderiza `owners/createOrUpdateOwnerForm`

```
POST /owners/{ownerId}/edit
```

Procesa la actualización de un propietario.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario

**Parámetros:**
- `owner` (body, requerido): Objeto Owner con validación

**Respuestas:**
- Validación correcta: Redirige a `/owners/{ownerId}`
- Errores de validación: Retorna formulario con errores

#### Ver Detalles del Propietario

```
GET /owners/{ownerId}
```

Obtiene los detalles de un propietario específico.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario

**Respuesta:** Renderiza `owners/ownerDetails` con datos del propietario

### Gestión de Mascotas

#### Crear Mascota

```
GET /owners/{ownerId}/pets/new
```

Muestra el formulario para crear una nueva mascota.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario

**Respuesta:** Renderiza `pets/createOrUpdatePetForm`

```
POST /owners/{ownerId}/pets/new
```

Procesa la creación de una nueva mascota.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario

**Parámetros:**
- `pet` (body, requerido): Objeto Pet con validación
- `owner` (modelo): Propietario asociado

**Respuestas:**
- Validación correcta: Redirige a `/owners/{ownerId}`
- Nombre duplicado: Retorna formulario con error
- Errores de validación: Retorna formulario con errores

#### Actualizar Mascota

```
GET /owners/{ownerId}/pets/{petId}/edit
```

Muestra el formulario para editar una mascota.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario
- `petId` (requerido): ID de la mascota

**Respuesta:** Renderiza `pets/createOrUpdatePetForm`

```
POST /owners/{ownerId}/pets/{petId}/edit
```

Procesa la actualización de una mascota.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario
- `petId` (requerido): ID de la mascota

**Parámetros:**
- `pet` (body, requerido): Objeto Pet con validación
- `owner` (modelo): Propietario asociado

**Respuestas:**
- Validación correcta: Redirige a `/owners/{ownerId}`
- Errores de validación: Retorna formulario con errores

### Gestión de Visitas

#### Crear Visita

```
GET /owners/{ownerId}/pets/{petId}/visits/new
```

Muestra el formulario para crear una nueva visita.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario
- `petId` (requerido): ID de la mascota

**Respuesta:** Renderiza `pets/createOrUpdateVisitForm`

```
POST /owners/{ownerId}/pets/{petId}/visits/new
```

Procesa la creación de una nueva visita.

**Parámetros de ruta:**
- `ownerId` (requerido): ID del propietario
- `petId` (requerido): ID de la mascota

**Parámetros:**
- `visit` (body, requerido): Objeto Visit con validación
- `owner` (modelo): Propietario asociado

**Respuestas:**
- Validación correcta: Redirige a `/owners/{ownerId}`
- Errores de validación: Retorna formulario con errores

### Gestión de Veterinarios

#### Listar Veterinarios (HTML)

```
GET /vets.html
```

Obtiene la lista paginada de veterinarios en formato HTML.

**Parámetros de consulta:**
- `page` (opcional, predeterminado: 1): Número de página

**Respuesta:** Renderiza `vets/vetList` con lista paginada

#### Listar Veterinarios (JSON/XML)

```
GET /vets
```

Obtiene la lista completa de veterinarios en formato JSON.

**Respuesta:** Retorna objeto JSON con lista de veterinarios

```json
{
  "vetList": [
    {
      "id": 1,
      "firstName": "string",
      "lastName": "string",
      "specialties": []
    }
  ]
}
```

## Validación de Datos

### Propietario (Owner)

- El campo `id` no puede ser modificado directamente

### Mascota (Pet)

- La mascota requiere validación personalizada mediante `PetValidator`
- El campo `id` no puede ser modificado directamente para el propietario

### Visita (Visit)

- El campo `id` no puede ser modificado directamente
- Los campos de visita están sujetos a validación

## Paginación

La paginación utiliza los siguientes parámetros:

- `page`: Número de página (comienza en 1)
- `pageSize`: 5 registros por página
- Atributos de respuesta: `currentPage`, `totalPages`, `totalItems`

## Notas de Implementación

- Todos los endpoints de propietarios y mascotas utilizan controladores Spring MVC
- Las mascotas están asociadas a propietarios específicos
- Las visitas están asociadas a mascotas específicas de un propietario
- La paginación está disponible para listados de propietarios y veterinarios
```

