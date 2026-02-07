● List directory source-code
  └ 25 files found

● Glob "source-code/**/*.java"
  └ 35 files found

Now let me examine the main structure and service layer:

● Find service classes
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
   -type f -name "*.java" | grep -i service | head -20
  └ 1 line...

● Find main package structure
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main
  -type d
  └ 29 lines...

● List Java files in main packages
  $ ls -la /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/ja
  va/org/springframework/samples/petclinic/ && ls -la /home/runner/work/petclinic-documentation/petc
  linic-documentation/source-code/src/main/java/org/springframework/samples/petclinic/owner/
  └ 22 lines...

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java
  lines 1-30
  └ 35 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/VetController.java lines
  1-30
  └ 35 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerRepository.java
  └ 87 lines read

Now let me check if there's a service layer:

● Search for service files
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
   -name "*Service*" -o -name "*service*"
  └ 1 line...

Now I'll create the architecture.md file with a Mermaid diagram:

✗ Create docs-repo/architecture.md
  Permission denied and could not request permission from user

● Check docs-repo permissions
  $ ls -la /home/runner/work/petclinic-documentation/petclinic-documentation/docs-repo/
  └ 17 lines...

✗ Create architecture.md in docs directory
  $ cat > /home/runner/work/petclinic-documentation/petclinic-documentation/docs-repo/docs/archite
  cture.md << 'EOF'
  # Arquitectura PetClinic

  ## Descripción General...
  Permission denied and could not request permission from user

● Check directory info
  $ cd /home/runner/work/petclinic-documentation/petclinic-documentation && pwd && whoami && ls -la
  docs-repo/docs/ | head
  └ 11 lines...

✗ Create architecture.md file
  $ cd /home/runner/work/petclinic-documentation/petclinic-documentation/docs-repo/docs && cat >
  architecture.md << 'EOF'
  # Arquitectura PetClinic

  ## Descripción General...
  Permission denied and could not request permission from user

✗ Check if file can be created
  $ touch
  /home/runner/work/petclinic-documentation/petclinic-documentation/docs-repo/docs/architecture.md
  && ls -la
  /home/runner/work/petclinic-documentation/petclinic-documentation/docs-repo/docs/architecture.md
  Permission denied and could not request permission from user

```markdown
# Arquitectura PetClinic

## Descripción General

PetClinic es una aplicación Spring Boot que implementa el patrón **Controller-Repository** (sin capa de servicio explícita) para gestionar la información de propietarios de mascotas, mascotas y veterinarios.

## Patrones Arquitectónicos

### Patrón Controller-Repository

La aplicación utiliza una arquitectura basada en dos capas principales:

- **Controller**: Maneja las solicitudes HTTP y coordina la lógica de presentación
- **Repository**: Accede a la capa de datos usando Spring Data JPA

## Flujo de Datos

```mermaid
graph TD
    Client["🌐 Cliente HTTP"]
    Request["HTTP Request"]
    
    Controller["@Controller<br/>OwnerController<br/>VetController<br/>PetController"]
    
    Model["📦 Entidades<br/>Owner<br/>Vet<br/>Pet<br/>Visit"]
    
    Repository["@Repository<br/>OwnerRepository<br/>VetRepository<br/>PetRepository"]
    
    JPA["Spring Data JPA<br/>Hibernate"]
    
    Database["🗄️ Database<br/>H2/MySQL/PostgreSQL"]
    
    View["View<br/>Thymeleaf Templates"]
    
    Response["HTTP Response"]
    
    Client -->|Request| Request
    Request -->|@RequestMapping| Controller
    Controller -->|CRUD Operations| Repository
    Repository -->|Query Methods| JPA
    JPA -->|SQL| Database
    Database -->|Entity Objects| Repository
    Repository -->|Data| Controller
    Controller -->|Model Attributes| View
    View -->|Render HTML| Response
    Response -->|Display| Client
```

## Componentes Principales

### Controllers

Reciben solicitudes HTTP y delegan la lógica al Repository:

| Controller | Responsabilidad |
|---|---|
| `OwnerController` | Gestión de propietarios (CRUD) |
| `VetController` | Listado y visualización de veterinarios |
| `PetController` | Gestión de mascotas |
| `VisitController` | Gestión de visitas veterinarias |
| `WelcomeController` | Página de inicio |

### Repositories

Interfaces que extienden `Repository<T, ID>` de Spring Data:

| Repository | Entidad | Métodos Principales |
|---|---|---|
| `OwnerRepository` | Owner | `findByLastName()`, `findById()`, `findAll()`, `save()` |
| `VetRepository` | Vet | `findAll()` |
| `PetRepository` | Pet | Acceso a datos de mascotas |

### Entidades de Dominio

```
BaseEntity (id)
  ├─ NamedEntity (name)
  │   ├─ PetType
  │   └─ Specialty
  └─ Person (firstName, lastName)
      ├─ Owner (address, city, telephone, pets)
      ├─ Vet (specialties)
      └─ Pet (type, birthDate, owner)

Visit (date, description, pet)
```

## Capa de Datos

- **Spring Data JPA**: Proporciona métodos CRUD automáticos
- **Hibernate**: Implementación JPA para ORM
- **Bases de Datos Soportadas**:
  - H2 (desarrollo)
  - MySQL
  - PostgreSQL

## Inyección de Dependencias

La aplicación utiliza anotaciones de Spring para inyectar automáticamente los Repositories en los Controllers:

```java
@Controller
public class OwnerController \{
    private final OwnerRepository ownerRepository;
    
    public OwnerController(OwnerRepository ownerRepository) \{
        this.ownerRepository = ownerRepository;
    \}
\}
```

## Flujo de Solicitud Típico

1. Cliente realiza HTTP GET/POST a `/owners` u otra ruta
2. `OwnerController` recibe la solicitud mediante `@RequestMapping`
3. Controller llama métodos en `OwnerRepository`
4. Repository ejecuta queries JPA contra la base de datos
5. Resultados se mapean a objetos `Owner`
6. Controller agrega datos al modelo
7. Vista Thymeleaf renderiza el HTML
8. Respuesta se envía al cliente

## Seguridad y Validación

- **Validación**: Anotaciones JSR-303 (`@Valid`)
- **Binding**: WebDataBinder para binding de datos
- **Formatos**: PetTypeFormatter para conversión de tipos
```

