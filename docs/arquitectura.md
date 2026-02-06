● Find source code files to understand project structure
  $ find ./source-code -type f -name "*.java" -o -name "*.xml" -o -name "*.properties" | head -30
  └ 31 lines...

● List directory source-code
  └ 25 files found

● List all Java source files
  $ find ./source-code/src/main/java -type f -name "*.java" | sort
  └ 24 lines...

● Read source-code/pom.xml lines 1-50
  └ 55 lines read

● Read source-code/readme.md
  └ 163 lines read

● List template files
  $ find ./source-code/src/main/resources/templates -type f | head -20
  └ 13 lines...

● View main application class
  $ cat ./source-code/src/main/java/org/springframework/samples/petclinic/PetClinicApplication.java
  └ 36 lines...

● Check database initialization
  $ ls -la ./source-code/src/main/resources/db/
  └ 8 lines...

Now I'll generate the architecture.md file based on my analysis:

```markdown
# Arquitectura de Spring PetClinic

## Descripción General

Spring PetClinic es una aplicación web de demostración construida con **Spring Boot** que ilustra las mejores prácticas en el desarrollo de aplicaciones modernas con el ecosistema de Spring. La aplicación simula una clínica veterinaria donde se pueden gestionar propietarios, mascotas, veterinarios y citas.

## Stack Tecnológico

### Backend
- **Spring Boot 2.7.1**: Framework principal para la construcción de la aplicación
- **Spring Data JPA**: Acceso a datos y gestión de persistencia
- **Spring Web MVC**: Controladores web y manejo de solicitudes HTTP
- **Spring Cache**: Caché de datos en memoria
- **Spring Boot Actuator**: Monitoreo y métricas de la aplicación

### Base de Datos
- **H2** (por defecto): Base de datos en memoria para desarrollo
- **MySQL**: Soporte para persistencia en MySQL
- **PostgreSQL**: Soporte para persistencia en PostgreSQL

### Frontend
- **Thymeleaf**: Motor de plantillas para vistas
- **Bootstrap 5.1.3**: Framework CSS para estilos responsive
- **WebJars**: Gestión de dependencias frontend

### Build & Testing
- **Maven**: Herramienta de construcción principal
- **Gradle**: Alternativa de construcción
- **JUnit**: Framework de testing
- **Spring Boot Test**: Testing de integración

## Estructura de Directorios

```
spring-petclinic/
├── src/main/java/org/springframework/samples/petclinic/
│   ├── PetClinicApplication.java          # Clase principal de la aplicación
│   ├── model/                             # Entidades base
│   │   ├── BaseEntity.java               # Clase base con ID
│   │   ├── NamedEntity.java              # Clase base con nombre
│   │   └── Person.java                   # Clase base para personas
│   ├── owner/                             # Módulo de propietarios y mascotas
│   │   ├── Owner.java                    # Entidad propietario
│   │   ├── OwnerController.java          # Controlador REST/Web
│   │   ├── OwnerRepository.java          # Acceso a datos
│   │   ├── Pet.java                      # Entidad mascota
│   │   ├── PetController.java            # Controlador de mascotas
│   │   ├── PetType.java                  # Tipo de mascota
│   │   ├── PetTypeFormatter.java         # Formateador personalizado
│   │   ├── PetValidator.java             # Validador de mascota
│   │   ├── Visit.java                    # Entidad visita/cita
│   │   └── VisitController.java          # Controlador de visitas
│   ├── vet/                               # Módulo de veterinarios
│   │   ├── Vet.java                      # Entidad veterinario
│   │   ├── VetController.java            # Controlador de veterinarios
│   │   ├── VetRepository.java            # Acceso a datos
│   │   ├── Specialty.java                # Especialidades veterinarias
│   │   └── Vets.java                     # Contenedor de veterinarios
│   └── system/                            # Módulo del sistema
│       ├── CacheConfiguration.java       # Configuración de caché
│       ├── CrashController.java          # Controlador de errores
│       └── WelcomeController.java        # Controlador de bienvenida
├── src/main/resources/
│   ├── templates/                         # Plantillas Thymeleaf
│   │   ├── fragments/                    # Fragmentos reutilizables
│   │   ├── owners/                       # Vistas de propietarios
│   │   ├── pets/                         # Vistas de mascotas
│   │   ├── vets/                         # Vistas de veterinarios
│   │   ├── welcome.html                  # Página de bienvenida
│   │   └── error.html                    # Página de error
│   ├── db/                                # Scripts de base de datos
│   │   ├── h2/                           # Scripts H2
│   │   ├── mysql/                        # Scripts MySQL
│   │   └── postgres/                     # Scripts PostgreSQL
│   ├── static/                            # Recursos estáticos
│   │   └── resources/css/                # Estilos CSS compilados
│   ├── messages/                          # Mensajes de internacionalización
│   │   ├── messages.properties           # Mensajes por defecto
│   │   ├── messages_en.properties        # Mensajes en inglés
│   │   ├── messages_es.properties        # Mensajes en español
│   │   └── messages_de.properties        # Mensajes en alemán
│   └── application.properties            # Configuración principal
└── src/test/java/                         # Tests de la aplicación
```

## Arquitectura Lógica

### Capas de la Aplicación

#### 1. **Capa de Presentación (Web)**
- **Controladores**: `OwnerController`, `PetController`, `VisitController`, `VetController`
- **Vistas Thymeleaf**: Plantillas HTML dinámicas
- **Responsabilidad**: Manejo de solicitudes HTTP y renderización de vistas

#### 2. **Capa de Lógica de Negocio**
- **Validadores**: `PetValidator` para reglas de negocio
- **Formateadores**: `PetTypeFormatter` para conversión de datos
- **Responsabilidad**: Lógica de validación y transformación de datos

#### 3. **Capa de Acceso a Datos**
- **Repositorios**: `OwnerRepository`, `VetRepository`
- **Tecnología**: Spring Data JPA
- **Responsabilidad**: Operaciones CRUD en la base de datos

#### 4. **Capa de Modelo**
- **Entidades**: `Owner`, `Pet`, `Visit`, `Vet`
- **Clases Base**: `BaseEntity`, `NamedEntity`, `Person`
- **Responsabilidad**: Representación de datos del negocio

### Módulos Principales

#### Módulo Owner (Propietarios y Mascotas)
```
Propietario (Owner)
├── Nombre, teléfono, dirección
├── Relación: 1 a N con Mascotas
└── Mascotas (Pet)
    ├── Nombre, tipo, fecha de nacimiento
    ├── Relación: 1 a N con Visitas
    └── Visitas (Visit)
        ├── Fecha, descripción
        └── Relación: N a 1 con Vet
```

#### Módulo Vet (Veterinarios)
```
Veterinario (Vet)
├── Nombre
├── Especialidades (Specialty)
└── Relación: 1 a N con Visitas
```

## Flujo de Datos

```
Usuario
  ↓
Navegador (HTTP Request)
  ↓
Spring DispatcherServlet
  ↓
Controlador (XxxController)
  ↓
Validador / Formateador
  ↓
Repositorio (Spring Data JPA)
  ↓
Base de Datos (H2/MySQL/PostgreSQL)
  ↓
Respuesta (Thymeleaf Template)
  ↓
Navegador (HTML)
```

## Características Principales

### 1. **Gestión de Propietarios**
- Buscar propietarios
- Crear/editar propietarios
- Visualizar detalles del propietario
- Gestionar mascotas del propietario

### 2. **Gestión de Mascotas**
- Crear/editar mascotas
- Validación de datos de mascotas
- Visualizar información de mascotas
- Programar citas

### 3. **Gestión de Citas (Visitas)**
- Crear citas para mascotas
- Asignar veterinario
- Registrar descripción de la cita

### 4. **Gestión de Veterinarios**
- Listar veterinarios disponibles
- Mostrar especialidades
- Visualizar citas asignadas

### 5. **Configuración del Sistema**
- **Caché**: Caché en memoria para datos que no cambian frecuentemente (veterinarios, tipos de mascotas)
- **Internacionalización**: Soporte multiidioma (EN, ES, DE)
- **Manejo de Errores**: Página de error centralizada

## Configuración de Base de Datos

### H2 (Desarrollo por defecto)
- Base de datos en memoria
- Se reinicia con cada ejecución
- Datos inicializados desde scripts SQL
- Consola H2 disponible en: `http://localhost:8080/h2-console`

### MySQL / PostgreSQL (Producción)
- Activar perfil: `spring.profiles.active=mysql` o `postgres`
- Persistencia en base de datos externa
- Scripts de inicialización específicos por proveedor

## Tecnologías de Caché

- **Cache Provider**: Configurable (ConcurrentHashMap por defecto)
- **Objetos cacheados**: `PetType`, `Vet` (datos de referencia)
- **Configuración**: `CacheConfiguration.java`

## Seguridad

- Validación de entrada en formularios
- Validación del lado del servidor con Bean Validation
- Protección contra inyección SQL (parametrización en JPA)

## Testing

### Tipos de Tests
- **Unit Tests**: Validadores, formateadores
- **Integration Tests**: Controladores, repositorios
- **Test Classes**: `PetClinicIntegrationTests`, `ClinicServiceTests`, `OwnerControllerTests`, etc.

### Ejecución de Tests
```bash
./mvnw test
```

## Construcción y Despliegue

### Build con Maven
```bash
./mvnw clean package
```

### Build con Gradle
```bash
./gradlew build
```

### Crear Imagen Docker
```bash
./mvnw spring-boot:build-image
```

### Ejecutar Aplicación
```bash
java -jar target/spring-petclinic-2.7.1-SNAPSHOT.jar
```

## Propiedades de Configuración

### Archivo: `application.properties`

- `spring.jpa.database-platform`: Dialecto de Hibernate
- `spring.jpa.hibernate.ddl-auto`: Estrategia de generación de esquema
- `spring.datasource.url`: URL de conexión de base de datos
- `spring.cache.type`: Tipo de caché configurado

## Patterns y Mejores Prácticas

### Patrones Utilizados
1. **MVC**: Separación entre Modelo, Vista y Controlador
2. **Repository Pattern**: Abstracción del acceso a datos
3. **DTO/Form Objects**: Objetos de transferencia de datos
4. **Singleton**: Beans de Spring (controladores, repositorios)

### Mejores Prácticas
- Inyección de dependencias mediante Spring
- Separación de responsabilidades
- Validación en múltiples capas
- Reutilización de plantillas (Thymeleaf fragments)
- Internacionalización de textos

## Puntos de Extensión

1. **Agregar nuevos módulos**: Crear nuevos packages en `owner`, `vet`, o crear nuevos
2. **Extender validaciones**: Añadir validadores personalizados
3. **Personalizar caché**: Modificar `CacheConfiguration.java`
4. **Agregar APIs REST**: Crear controladores adicionales
5. **Cambiar persistencia**: Configurar diferentes bases de datos

## Contacto y Referencias

- **Repositorio**: https://github.com/spring-projects/spring-petclinic
- **Documentación**: https://spring-petclinic.github.io/
- **Issues**: https://github.com/spring-projects/spring-petclinic/issues

```

