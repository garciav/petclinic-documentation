● List directory .
  └ 8 files found

● Find source code files to understand structure
  $ find ./source-code -type f -name "*.java" -o -name "*.xml" -o -name "*.properties" | head -30
  └ 31 lines...

✗ Count Java source files
  $ find ./source-code/src/main/java -type f -name "*.java" | xargs wc -l | tail -1
  Permission denied and could not request permission from user

● Check pom.xml
  $ head -50 ./source-code/pom.xml | grep -E "artifactId|version" | head -5
  └ 6 lines...

● List main package directories
  $ ls -la ./source-code/src/main/java/org/springframework/samples/petclinic/
  └ 9 lines...

● Count Java files
  $ find ./source-code/src/main/java -type f -name "*.java" | wc -l
  └ 2 lines...

● List model classes
  $ ls ./source-code/src/main/java/org/springframework/samples/petclinic/model/
  └ 2 lines...

● List owner package classes
  $ ls ./source-code/src/main/java/org/springframework/samples/petclinic/owner/
  └ 3 lines...

● List vet package classes
  $ ls ./source-code/src/main/java/org/springframework/samples/petclinic/vet/
  └ 2 lines...

● List directory source-code/src/main/resources
  └ 14 files found

● View main application class
  $ head -30
  ./source-code/src/main/java/org/springframework/samples/petclinic/PetClinicApplication.java
  └ 30 lines...

```markdown
---
id: arquitectura
title: Arquitectura
---

## Descripción General

PetClinic es una aplicación Spring Boot que implementa un sistema de gestión de clínica veterinaria. La arquitectura sigue patrones de arquitectura por capas con una clara separación de responsabilidades entre el modelo de datos, la lógica de negocio y la presentación.

## Stack Tecnológico

- **Framework**: Spring Boot 2.7.1
- **Lenguaje**: Java
- **Gestión de dependencias**: Maven
- **Base de Datos**: Soporta múltiples bases de datos (H2, MySQL, PostgreSQL)
- **Versionado**: spring-petclinic 2.7.1-SNAPSHOT

## Estructura de Paquetes

### Paquete Principal
```
org.springframework.samples.petclinic
```

### Paquetes Funcionales

#### Model
Contiene las entidades base del dominio:
- `BaseEntity`: Clase base para todas las entidades con identificadores
- `NamedEntity`: Clase base para entidades con nombre
- `Person`: Entidad que representa una persona

Estas clases forman la jerarquía de herencia del modelo de datos.

#### Owner
Gestiona la funcionalidad relacionada con propietarios de mascotas:
- `Owner`: Entidad que representa un propietario
- `OwnerRepository`: Acceso a datos para propietarios
- `OwnerController`: Controlador web para operaciones de propietarios
- `Pet`: Entidad que representa una mascota
- `PetType`: Clasificación de tipos de mascotas
- `PetController`: Controlador web para operaciones de mascotas
- `PetTypeFormatter`: Formateador personalizado para tipos de mascotas
- `PetValidator`: Validador para datos de mascotas
- `Visit`: Entidad que representa una visita a la clínica
- `VisitController`: Controlador web para operaciones de visitas

#### Vet
Gestiona la funcionalidad relacionada con veterinarios:
- `Vet`: Entidad que representa un veterinario
- `VetRepository`: Acceso a datos para veterinarios
- `VetController`: Controlador web para operaciones de veterinarios
- `Specialty`: Entidad que representa una especialidad veterinaria
- `Vets`: Contenedor para colecciones de veterinarios

#### System
Gestiona funcionalidades del sistema:
- `CrashController`: Controlador para manejo de errores y excepciones

## Arquitectura por Capas

### Capa de Presentación (Controllers)
Los controladores manejan las solicitudes HTTP y coordinan con la lógica de negocio:
- `OwnerController`: Gestiona solicitudes relacionadas con propietarios
- `PetController`: Gestiona solicitudes relacionadas con mascotas
- `VisitController`: Gestiona solicitudes de visitas
- `VetController`: Gestiona solicitudes de veterinarios

### Capa de Lógica de Negocio (Service)
Implementa la lógica de la aplicación y orquesta operaciones del dominio.

### Capa de Acceso a Datos (Repository)
Proporciona abstracción para acceder a datos:
- `OwnerRepository`: Interfaz de repositorio para propietarios
- `VetRepository`: Interfaz de repositorio para veterinarios

### Capa de Modelo (Model)
Define las entidades del dominio con una jerarquía clara:

```
BaseEntity (id)
  ├── NamedEntity (name)
  │   ├── PetType
  │   ├── Specialty
  │   └── Vet
  └── Person (firstName, lastName)
      ├── Owner (address, city, telephone)
      └── Pet (birthDate, type)
          └── Visit (date, description)
```

## Configuración

La aplicación utiliza archivos de propiedades para la configuración:
- `application.properties`: Configuración por defecto
- `application-mysql.properties`: Configuración específica para MySQL
- `application-postgres.properties`: Configuración específica para PostgreSQL

## Recursos

La aplicación incluye:
- Archivos estáticos en `/static`
- Templates en `/templates`
- Mensajes internacionalizados en `/messages` con soporte para inglés, español y alemán
- Base de datos embebida en `/db` para desarrollo y pruebas

## Componentes Principales

| Componente | Propósito |
|-----------|-----------|
| `PetClinicApplication` | Punto de entrada de la aplicación Spring Boot |
| `OwnerController` | Gestiona operaciones CRUD de propietarios |
| `PetController` | Gestiona operaciones CRUD de mascotas |
| `VisitController` | Gestiona operaciones de visitas |
| `VetController` | Proporciona información de veterinarios |
| `PetValidator` | Valida datos de mascotas |
| `PetTypeFormatter` | Formatea tipos de mascotas para la presentación |

## Flujo de Datos

1. Las solicitudes HTTP llegan a través de los Controllers
2. Los Controllers invocan servicios de lógica de negocio
3. Los Servicios utilizan Repositories para acceder a datos
4. Los Repositories interactúan con la base de datos a través del ORM
5. Los datos se retornan a través de las capas para su presentación

## Validación

El sistema implementa validación en múltiples niveles:
- Validadores especializados como `PetValidator`
- Anotaciones de validación en las entidades del modelo
- Validación en la capa de presentación

## Internacionalización

La aplicación soporta múltiples idiomas:
- Inglés (English)
- Español (Español)
- Alemán (Deutsch)

Los mensajes se configuran mediante archivos de propiedades en `/messages`.
```

