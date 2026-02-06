● List directory source-code
  └ 25 files found

● Read source-code/pom.xml lines 1-50
  └ 55 lines read

● Read source-code/readme.md
  └ 163 lines read

● Find Java files in source-code
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src -type f
  -name "*.java" | head -20
  └ 21 lines...

● Find Java package structure
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
   -type d | head -20
  └ 10 lines...

● List main packages
  $ ls -la /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/ja
  va/org/springframework/samples/petclinic/
  └ 9 lines...

● List directory source-code/src/main/resources
  └ 14 files found

● List files in each package
  $ ls /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
  /org/springframework/samples/petclinic/model/ && echo "---" && ls
  /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/or
  g/springframework/samples/petclinic/owner/ && echo "---" && ls
  /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/or...
  └ 8 lines...

```markdown
# Arquitectura de Spring PetClinic

## Descripción General

Spring PetClinic es una aplicación web de gestión de clínica veterinaria construida con **Spring Boot** y **Thymeleaf**. Implementa patrones de arquitectura por capas y utiliza una base de datos relacional con soporte para H2, MySQL y PostgreSQL.

## Stack Tecnológico

- **Framework**: Spring Boot 2.7.1
- **Lenguaje**: Java 8+
- **ORM**: Spring Data JPA
- **Base de Datos**: H2 (por defecto), MySQL 5.7+, PostgreSQL 14+
- **Template Engine**: Thymeleaf
- **Frontend**: Bootstrap 5.1.3, Font Awesome 4.7.0
- **Build Tool**: Maven / Gradle
- **Caché**: Spring Cache

## Estructura de Capas

### 1. Capa de Presentación (Templates & Static)
```
src/main/resources/
├── templates/          # Vistas Thymeleaf
├── static/             # Archivos estáticos (CSS, JS, imágenes)
└── messages/           # Mensajes i18n
```

### 2. Capa de Modelo (Model)
**Paquete**: `org.springframework.samples.petclinic.model`

Entidades base que sirven como padre de todas las clases del dominio:
- `BaseEntity`: Clase abstracta base con ID y fecha de creación
- `NamedEntity`: Extiende BaseEntity, añade atributo `name`
- `Person`: Clase base para personas (Owner, Vet)

### 3. Capa de Controladores

#### Controlador de Propietarios (Owner Module)
**Paquete**: `org.springframework.samples.petclinic.owner`

```
owner/
├── Owner                # Entidad propietario
├── OwnerRepository      # Acceso a datos (Spring Data JPA)
├── OwnerController      # Controlador REST/MVC
├── Pet                  # Entidad mascota
├── PetType              # Tipo de mascota (catálogo)
├── PetController        # Controlador de mascotas
├── PetValidator         # Validaciones de negocio
├── PetTypeFormatter     # Formateador personalizado
├── Visit                # Entidad visita/cita
└── VisitController      # Controlador de visitas
```

#### Controlador de Veterinarios (Vet Module)
**Paquete**: `org.springframework.samples.petclinic.vet`

```
vet/
├── Vet                  # Entidad veterinario
├── VetRepository        # Acceso a datos
├── VetController        # Controlador de veterinarios
├── Specialty            # Especialidades del veterinario
└── Vets                 # DTO para respuestas
```

### 4. Capa de Servicios (Service Layer)
**Paquete**: `org.springframework.samples.petclinic.service`

- `ClinicService`: Interfaz principal de lógica de negocio
- Implementaciones de repositorios y servicios CRUD

### 5. Capa de Configuración (System)
**Paquete**: `org.springframework.samples.petclinic.system`

```
system/
├── CacheConfiguration   # Configuración de caché
├── CrashController      # Manejo de errores
└── PetClinicApplication # Clase principal
```

## Flujo de Datos

```
User Request
     ↓
Thymeleaf Template
     ↓
Controller
     ↓
Repository/Service
     ↓
Spring Data JPA
     ↓
Database (H2/MySQL/PostgreSQL)
```

## Módulos Principales

### Módulo Owner (Propietarios y Mascotas)
Gestiona:
- Propietarios (CRUD)
- Mascotas por propietario
- Tipos de mascotas
- Visitas veterinarias

### Módulo Vet (Veterinarios)
Gestiona:
- Veterinarios disponibles
- Especialidades veterinarias

## Configuración de Base de Datos

### Por Defecto (H2 - En Memoria)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

### MySQL
Activar con: `--spring.profiles.active=mysql`

### PostgreSQL
Activar con: `--spring.profiles.active=postgres`

## Características Clave

- **Caching**: Implementado mediante Spring Cache para optimizar lecturas
- **Validación**: Bean Validation y validadores personalizados (PetValidator)
- **Formateo Personalizado**: PetTypeFormatter para conversión de tipos
- **Control de Transacciones**: Manejado automáticamente por Spring Data JPA
- **Inyección de Dependencias**: Configuración automática de Spring Boot

## Puntos de Entrada

- **Clase Principal**: `PetClinicApplication.java`
- **Puerto**: 8080 (por defecto)
- **URL Base**: `http://localhost:8080`
- **Consola H2**: `http://localhost:8080/h2-console`

## Patrones de Diseño

- **Repository Pattern**: Spring Data JPA Repositories
- **MVC Pattern**: Controllers → Views (Thymeleaf)
- **Dependency Injection**: Spring Framework
- **Service Layer Pattern**: Separación de lógica de negocio
- **Data Transfer Objects (DTO)**: `Vets` para respuestas

## Build & Ejecución

```bash
# Maven
./mvnw clean package
java -jar target/*.jar

# O directamente con Maven
./mvnw spring-boot:run

# Gradle
./gradlew build
java -jar build/libs/*.jar
```
```

