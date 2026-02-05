● List directory .
  └ 8 files found

● List directory source-code
  └ 25 files found

● Explore source code structure
  $ find ./source-code -type f -name "*.java" -o -name "*.xml" -o -name "*.properties" -o -name
  "*.gradle" -o -name "pom.xml" | head -20
  └ 21 lines...

● List directory source-code/src/main
  └ 9 files found

● List all Java source files
  $ find ./source-code/src/main/java -type f -name "*.java" | sort
  └ 24 lines...

● View pom.xml to understand dependencies
  $ cat ./source-code/pom.xml | head -50
  └ 51 lines...

● View readme for project description
  $ cat ./source-code/readme.md | head -80
  └ 81 lines...

✗ View templates directory
  $ ls -la ./source-code/src/main/resources/templates/ 2>/dev/null | head -20
  Permission denied and could not request permission from user

● Find database and configuration files
  $ find ./source-code/src/main/resources -type f -name "*.sql" -o -name "*.xml" | head -10
  └ 10 lines...

● View database schema
  $ cat ./source-code/src/main/resources/db/h2/schema.sql
  └ 65 lines...

Now I have enough information to generate the Markdown document with architecture analysis:

```markdown
---
id: arquitectura
title: Arquitectura
---

# Arquitectura de Spring PetClinic

## Visión General

Spring PetClinic es una aplicación de ejemplo basada en Spring Boot que demuestra las mejores prácticas en el desarrollo de aplicaciones web Java. La aplicación es una clínica veterinaria que gestiona propietarios de mascotas, mascotas, veterinarios y citas médicas.

**Stack Tecnológico:**
- **Framework:** Spring Boot 2.7.1
- **Build:** Maven o Gradle
- **Base de Datos:** H2 (por defecto), MySQL, PostgreSQL
- **Java:** 1.8 o superior
- **Frontend:** Thymeleaf, Bootstrap 5.1.3

## Estructura del Proyecto

```
src/main/java/org/springframework/samples/petclinic/
├── model/                 # Entidades base
├── owner/                # Gestión de propietarios y mascotas
├── vet/                  # Gestión de veterinarios
└── system/               # Configuración y controladores de sistema
```

## Componentes Principales

### 1. Capa de Modelos

**Paquete: `model`**

- **`BaseEntity`**: Clase base para todas las entidades con identificador único
- **`NamedEntity`**: Extiende BaseEntity, añade propiedad `name`
- **`Person`**: Modelo abstracto para personas (Propietarios y Veterinarios)

### 2. Módulo Owner (Propietarios y Mascotas)

**Paquete: `owner`**

**Entidades:**
- **`Owner`**: Propietario de mascotas
  - Atributos: id, firstName, lastName, address, city, telephone
  - Relaciones: OneToMany con Pet

- **`Pet`**: Mascota
  - Atributos: id, name, birthDate, type_id, owner_id
  - Relaciones: ManyToOne con Owner, ManyToOne con PetType

- **`Visit`**: Cita veterinaria
  - Atributos: id, visitDate, description
  - Relaciones: ManyToOne con Pet

- **`PetType`**: Tipos de mascotas (Perro, Gato, etc.)

**Componentes:**
- **`OwnerRepository`**: Acceso a datos para propietarios
- **`OwnerController`**: Controlador REST para operaciones CRUD de propietarios
- **`PetController`**: Controlador para gestión de mascotas
- **`VisitController`**: Controlador para citas médicas
- **`PetTypeFormatter`**: Formateador de tipos de mascotas
- **`PetValidator`**: Validador de datos de mascotas

### 3. Módulo Vet (Veterinarios)

**Paquete: `vet`**

**Entidades:**
- **`Vet`**: Veterinario
  - Atributos: id, firstName, lastName
  - Relaciones: ManyToMany con Specialty

- **`Specialty`**: Especialidades veterinarias
  - Atributos: id, name

**Componentes:**
- **`VetRepository`**: Acceso a datos para veterinarios
- **`VetController`**: Controlador REST para veterinarios
- **`Vets`**: Contenedor de lista de veterinarios

### 4. Sistema

**Paquete: `system`**

- **`WelcomeController`**: Página de inicio
- **`CrashController`**: Controlador de errores para demostración
- **`CacheConfiguration`**: Configuración de caché de la aplicación

## Modelo de Datos

### Diagrama de Relaciones

```
┌──────────────┐           ┌─────────────┐
│    OWNERS    │───────────│    PETS     │
│──────────────│  1 : N    │─────────────│
│ id (PK)      │           │ id (PK)     │
│ first_name   │           │ name        │
│ last_name    │           │ birth_date  │
│ address      │           │ type_id (FK)│
│ city         │           │ owner_id(FK)│
│ telephone    │           └─────────────│
└──────────────┘                 │
                                 │ 1 : N
                            ┌─────────────┐
                            │   VISITS    │
                            │─────────────│
                            │ id (PK)     │
                            │ pet_id (FK) │
                            │ visit_date  │
                            │ description │
                            └─────────────┘

┌──────────────┐           ┌──────────────┐
│    VETS      │───────────│ SPECIALTIES  │
│──────────────│  N : N    │──────────────│
│ id (PK)      │           │ id (PK)      │
│ first_name   │           │ name         │
│ last_name    │           └──────────────┘
└──────────────┘

┌──────────────┐
│    TYPES     │
│──────────────│
│ id (PK)      │
│ name         │
└──────────────┘
```

### Tablas Principales

| Tabla | Descripción | Índices |
|-------|-------------|---------|
| `owners` | Propietarios de mascotas | last_name |
| `pets` | Mascotas | name |
| `visits` | Citas veterinarias | pet_id |
| `vets` | Veterinarios | last_name |
| `specialties` | Especialidades | name |
| `types` | Tipos de mascotas | name |
| `vet_specialties` | Relación veterinario-especialidad | - |

## Flujo de Solicitudes

### Caso de Uso: Ver Mascotas de un Propietario

```
1. Cliente (Browser)
        ↓
2. OwnerController.showOwner(id)
        ↓
3. OwnerRepository.findById(id)
        ↓
4. Base de Datos (H2/MySQL/PostgreSQL)
        ↓
5. Owner + Pets (Lazy Loaded)
        ↓
6. Vista Thymeleaf (owner_detail.html)
        ↓
7. Respuesta HTML al Cliente
```

## Configuración

### Perfiles de Base de Datos

La aplicación soporta múltiples bases de datos mediante perfiles de Spring:

- **`default`** (h2): Base de datos en memoria H2
- **`mysql`**: MySQL con conexión persistente
- **`postgres`**: PostgreSQL con conexión persistente

**Cambiar perfil:**
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=postgres"
```

### Caché

El sistema implementa caché de Spring para optimizar consultas frecuentes:
- Especialidades de veterinarios
- Tipos de mascotas

**Configuración:** `CacheConfiguration.java`

## Dependencias Principales

```xml
<!-- Spring Boot Web -->
spring-boot-starter-web

<!-- Spring Data JPA -->
spring-boot-starter-data-jpa

<!-- Caché -->
spring-boot-starter-cache

<!-- Actuator -->
spring-boot-starter-actuator

<!-- Frontend -->
WebJars Bootstrap 5.1.3
WebJars Font Awesome 4.7.0
Thymeleaf

<!-- Testing -->
spring-boot-starter-test
```

## Patrones de Diseño

1. **Repository Pattern**: `OwnerRepository`, `VetRepository` para acceso a datos
2. **MVC Pattern**: Controladores, Vistas (Thymeleaf), Modelos
3. **Dependency Injection**: Inyección de dependencias de Spring
4. **Formatter Pattern**: `PetTypeFormatter` para formatos personalizados
5. **Validator Pattern**: Validación de datos con `PetValidator`

## Seguridad y Validación

- Validación de datos en capas de modelo y controlador
- Manejo de excepciones centralizado
- Actuator expuesto para monitoreo

## Puntos de Entrada

- **Aplicación:** `PetClinicApplication.java`
- **Puerto:** 8080
- **URL Base:** `http://localhost:8080/`
- **H2 Console:** `http://localhost:8080/h2-console` (solo con perfil h2)

## Build y Ejecución

### Con Maven
```bash
./mvnw package
java -jar target/*.jar
```

### Con Gradle
```bash
./gradlew build
java -jar build/libs/*.jar
```

### Desarrollo
```bash
./mvnw spring-boot:run
```

## Extensibilidad

La arquitectura de PetClinic está diseñada para ser extensible:

- Agregar nuevas entidades siguiendo el patrón Entity/Repository/Controller
- Implementar nuevas especialidades en el módulo vet
- Extender funcionalidades de Owner y Pet
- Agregar nuevas bases de datos modificando perfiles

## Conclusión

Spring PetClinic demuestra una arquitectura limpia y bien estructurada basada en Spring Boot, con separación clara de responsabilidades, patrones de diseño consolidados y facilidad de extensión.
```

