● Explorar estructura Java
  $ find ./source-code/src/main/java -type f -name "*.java" | head -50
  └ 24 lines...

● List directory source-code/src/main/java
  └ 7 files found

✗ Contar líneas de código Java
  $ find ./source-code/src/main/java -type f -name "*.java" | xargs wc -l | tail -1
  Permission denied and could not request permission from user

✗ Leer archivos Java principales
  $ cat ./source-code/src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java
  ./source-code/src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java
  ./source-code/src/main/java/org/springframework/samples/petclinic/model/Person.java
  ./source-code/src/main/java/org/springframework/samples/petclinic/owner/Owner.java
  ./source-code/src/main/java/org/springframework/samples/petclinic/owner/Pet.java ...
  Permission denied and could not request permission from user

● List directory source-code/src/main/java/org/springframework/samples/petclinic/model
  └ 10 files found

● Read source-code/src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java
  └ 56 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java
  └ 52 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/model/Person.java
  └ 72 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/Owner.java
  └ 178 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/Pet.java
  └ 89 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/Visit.java
  └ 73 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/PetType.java
  └ 35 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/Vet.java
  └ 84 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/Specialty.java
  └ 37 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java
  └ 172 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/PetController.java
  └ 120 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/VisitController.java
  └ 98 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/VetController.java
  └ 84 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerRepository.java
  └ 87 lines read

Ahora genero la referencia de API en Markdown:

```markdown
# Referencia de API - PetClinic

## Modelos de Dominio

### BaseEntity
Clase base para todas las entidades con propiedad de identificador.

**Propiedades:**
- `id: Integer` - Identificador único (auto-generado)

**Métodos:**
- `Integer getId()` - Obtiene el ID de la entidad
- `void setId(Integer id)` - Establece el ID de la entidad
- `boolean isNew()` - Verifica si la entidad es nueva (ID nulo)

---

### NamedEntity
Extiende `BaseEntity` y agrega la propiedad de nombre.

**Propiedades:**
- `id: Integer` - (heredado de BaseEntity)
- `name: String` - Nombre de la entidad

**Métodos:**
- `String getName()` - Obtiene el nombre
- `void setName(String name)` - Establece el nombre
- `String toString()` - Retorna la representación en texto (nombre)

---

### Person
Extiende `BaseEntity` y representa una persona.

**Propiedades:**
- `id: Integer` - (heredado de BaseEntity)
- `firstName: String` - Nombre (requerido)
- `lastName: String` - Apellido (requerido)
- `customerDocumentId: String` - ID de documento del cliente
- `gender: String` - Género

**Métodos:**
- `String getFirstName()` / `void setFirstName(String firstName)`
- `String getLastName()` / `void setLastName(String lastName)`
- `String getCustomerDocumentId()` / `void setCustomerDocumentId(String id)`

---

## Módulo Owner (Propietarios)

### Owner
Extiende `Person` y representa un propietario de mascotas.

**Tabla Base:** `owners`

**Propiedades:**
- `id: Integer` - (heredado)
- `firstName: String` - (heredado)
- `lastName: String` - (heredado)
- `address: String` - Dirección (requerida)
- `city: String` - Ciudad (requerida)
- `telephone: String` - Teléfono (requerido, máx 10 dígitos)
- `pets: List<Pet>` - Lista de mascotas asociadas

**Métodos:**
- `String getAddress()` / `void setAddress(String address)`
- `String getCity()` / `void setCity(String city)`
- `String getTelephone()` / `void setTelephone(String telephone)`
- `List<Pet> getPets()` - Obtiene todas las mascotas
- `void addPet(Pet pet)` - Agrega una mascota nueva
- `Pet getPet(String name)` - Obtiene mascota por nombre
- `Pet getPet(Integer id)` - Obtiene mascota por ID
- `Pet getPet(String name, boolean ignoreNew)` - Obtiene mascota por nombre (opción de ignorar nuevas)
- `Owner addVisit(Integer petId, Visit visit)` - Agrega una visita a una mascota

**Relaciones:**
- `1:N` con `Pet` (cascade: ALL, fetch: EAGER)

---

### Pet
Extiende `NamedEntity` y representa una mascota.

**Tabla Base:** `pets`

**Propiedades:**
- `id: Integer` - (heredado)
- `name: String` - (heredado)
- `birthDate: LocalDate` - Fecha de nacimiento (formato: yyyy-MM-dd)
- `type: PetType` - Tipo de mascota
- `visits: Set<Visit>` - Conjunto de visitas asociadas

**Métodos:**
- `LocalDate getBirthDate()` / `void setBirthDate(LocalDate birthDate)`
- `PetType getType()` / `void setType(PetType type)`
- `Collection<Visit> getVisits()` - Obtiene todas las visitas
- `void addVisit(Visit visit)` - Agrega una visita

**Relaciones:**
- `N:1` con `PetType`
- `1:N` con `Visit` (cascade: ALL, fetch: EAGER)

---

### PetType
Extiende `NamedEntity` y representa el tipo de mascota.

**Tabla Base:** `types`

**Propiedades:**
- `id: Integer` - (heredado)
- `name: String` - Nombre del tipo (ej: Cat, Dog, Hamster)

---

### Visit
Extiende `BaseEntity` y representa una visita veterinaria.

**Tabla Base:** `visits`

**Propiedades:**
- `id: Integer` - (heredado)
- `date: LocalDate` - Fecha de la visita (formato: yyyy-MM-dd, por defecto: hoy)
- `description: String` - Descripción de la visita (requerida)

**Métodos:**
- `LocalDate getDate()` / `void setDate(LocalDate date)`
- `String getDescription()` / `void setDescription(String description)`

**Constructor:**
- `Visit()` - Crea una visita con la fecha actual

---

## Módulo Vet (Veterinarios)

### Vet
Extiende `Person` y representa un veterinario.

**Tabla Base:** `vets`

**Propiedades:**
- `id: Integer` - (heredado)
- `firstName: String` - (heredado)
- `lastName: String` - (heredado)
- `specialties: Set<Specialty>` - Conjunto de especialidades

**Métodos:**
- `List<Specialty> getSpecialties()` - Obtiene especialidades ordenadas por nombre
- `int getNrOfSpecialties()` - Cuenta el número de especialidades
- `void addSpecialty(Specialty specialty)` - Agrega una especialidad

**Relaciones:**
- `N:N` con `Specialty` (tabla: vet_specialties, fetch: EAGER)

---

### Specialty
Extiende `NamedEntity` y representa la especialidad de un veterinario.

**Tabla Base:** `specialties`

**Propiedades:**
- `id: Integer` - (heredado)
- `name: String` - Nombre de la especialidad (ej: dentistry)

---

## Repositorios

### OwnerRepository
Interfaz de acceso a datos para entidades `Owner`.

**Métodos:**

#### `List<PetType> findPetTypes()`
Recupera todos los tipos de mascota ordenados por nombre.

**Parámetros:** Ninguno

**Retorna:** `List<PetType>` - Lista de tipos de mascotas

**Propiedades:** Solo lectura, transaccional

---

#### `Page<Owner> findByLastName(String lastName, Pageable pageable)`
Busca propietarios por apellido (búsqueda por prefijo).

**Parámetros:**
- `lastName: String` - Apellido a buscar (búsqueda comienza con este valor)
- `pageable: Pageable` - Información de paginación

**Retorna:** `Page<Owner>` - Página de propietarios coincidentes

**Propiedades:** Solo lectura, transaccional

---

#### `Owner findById(Integer id)`
Obtiene un propietario por su ID.

**Parámetros:**
- `id: Integer` - ID del propietario

**Retorna:** `Owner` - El propietario encontrado (con mascotas cargadas)

**Propiedades:** Solo lectura, transaccional

---

#### `void save(Owner owner)`
Guarda o actualiza un propietario.

**Parámetros:**
- `owner: Owner` - Propietario a guardar

**Retorna:** Ninguno

---

#### `Page<Owner> findAll(Pageable pageable)`
Obtiene todos los propietarios con paginación.

**Parámetros:**
- `pageable: Pageable` - Información de paginación

**Retorna:** `Page<Owner>` - Página de propietarios

**Propiedades:** Solo lectura, transaccional

---

## Controladores

### OwnerController
Controlador MVC para gestionar operaciones con propietarios.

**Rutas:**

#### `GET /owners/new`
Inicializa el formulario de creación de propietario.

**Retorna:** Vista `owners/createOrUpdateOwnerForm`

---

#### `POST /owners/new`
Procesa la creación de un nuevo propietario.

**Parámetros:**
- `owner: Owner` - Propietario a crear (validado)
- `result: BindingResult` - Resultado de validación

**Retorna:** Vista de formulario si hay errores, redirige a `/owners/\{id} si éxito

---

#### `GET /owners/find`
Inicializa el formulario de búsqueda de propietarios.

**Retorna:** Vista `owners/findOwners`

---

#### `GET /owners`
Busca propietarios por apellido con paginación.

**Parámetros:**
- `page: int` - Número de página (default: 1)
- `owner: Owner` - Propietario con criterios de búsqueda
- `result: BindingResult` - Resultado de validación
- `model: Model` - Modelo de vista

**Retorna:** 
- Vista de formulario si no hay resultados
- Redirige a `/owners/\{id} si encuentra exactamente 1
- Vista `owners/ownersList` si hay múltiples resultados

---

#### `GET /owners/\{ownerId\}/edit`
Inicializa el formulario de edición de propietario.

**Parámetros:**
- `ownerId: int` - ID del propietario
- `model: Model` - Modelo de vista

**Retorna:** Vista `owners/createOrUpdateOwnerForm`

---

#### `POST /owners/\{ownerId\}/edit`
Procesa la actualización de un propietario.

**Parámetros:**
- `owner: Owner` - Propietario actualizado (validado)
- `result: BindingResult` - Resultado de validación
- `ownerId: int` - ID del propietario

**Retorna:** Vista de formulario si hay errores, redirige a `/owners/\{ownerId} si éxito

---

#### `GET /owners/\{ownerId}
Muestra los detalles de un propietario.

**Parámetros:**
- `ownerId: int` - ID del propietario

**Retorna:** ModelAndView con vista `owners/ownerDetails`

---

### PetController
Controlador MVC para gestionar mascotas de propietarios.

**Ruta Base:** `/owners/\{ownerId}

**Métodos Auxiliares:**

#### `@ModelAttribute("types")`
Carga todos los tipos de mascota disponibles.

**Retorna:** `Collection<PetType>`

---

#### `@ModelAttribute("owner")`
Carga el propietario basado en ownerId.

**Retorna:** `Owner`

---

#### `@ModelAttribute("pet")`
Carga o crea una mascota.

**Parámetros:**
- `ownerId: int`
- `petId: Integer` (opcional)

**Retorna:** `Pet` (nueva o existente)

---

**Rutas:**

#### `GET /owners/\{ownerId\}/pets/new`
Inicializa el formulario de creación de mascota.

**Retorna:** Vista `pets/createOrUpdatePetForm`

---

#### `POST /owners/\{ownerId\}/pets/new`
Procesa la creación de una nueva mascota.

**Parámetros:**
- `owner: Owner`
- `pet: Pet` - Mascota a crear (validada)
- `result: BindingResult`
- `model: ModelMap`

**Retorna:** Vista de formulario si hay errores o duplicado, redirige a `/owners/\{ownerId} si éxito

---

#### `GET /owners/\{ownerId\}/pets/\{petId\}/edit`
Inicializa el formulario de edición de mascota.

**Parámetros:**
- `owner: Owner`
- `petId: int`
- `model: ModelMap`

**Retorna:** Vista `pets/createOrUpdatePetForm`

---

#### `POST /owners/\{ownerId\}/pets/\{petId\}/edit`
Procesa la actualización de una mascota.

**Parámetros:**
- `pet: Pet` - Mascota actualizada (validada)
- `result: BindingResult`
- `owner: Owner`
- `model: ModelMap`

**Retorna:** Vista de formulario si hay errores, redirige a `/owners/\{ownerId} si éxito

---

### VisitController
Controlador MVC para gestionar visitas veterinarias.

**Ruta Base:** `/owners/\{ownerId\}/pets/\{petId}

**Métodos Auxiliares:**

#### `@ModelAttribute("visit")`
Carga o crea una visita asociada a una mascota.

**Parámetros:**
- `ownerId: int`
- `petId: int`
- `model: Map<String, Object>`

**Retorna:** `Visit` (nueva)

---

**Rutas:**

#### `GET /owners/\{ownerId\}/pets/\{petId\}/visits/new`
Inicializa el formulario de creación de visita.

**Parámetros:**
- `petId: int`
- `model: Map<String, Object>`

**Retorna:** Vista `pets/createOrUpdateVisitForm`

---

#### `POST /owners/\{ownerId\}/pets/\{petId\}/visits/new`
Procesa la creación de una nueva visita.

**Parámetros:**
- `owner: Owner`
- `petId: int`
- `visit: Visit` - Visita a crear (validada)
- `result: BindingResult`

**Retorna:** Vista de formulario si hay errores, redirige a `/owners/\{ownerId} si éxito

---

### VetController
Controlador MVC para gestionar veterinarios.

**Rutas:**

#### `GET /vets.html`
Muestra la lista de veterinarios con paginación (HTML).

**Parámetros:**
- `page: int` - Número de página (default: 1)
- `model: Model` - Modelo de vista

**Retorna:** Vista `vets/vetList` con paginación

---

#### `GET /vets`
Retorna la lista de veterinarios en formato JSON/XML.

**Retorna:** `Vets` (contenedor de lista de veterinarios) - Serializable a JSON/XML

---

## Validaciones

### Anotaciones de Validación Utilizadas:

- `@NotEmpty` - Campo requerido (no vacío)
- `@Digits(fraction = 0, integer = 10)` - Número específico de dígitos (teléfono)
- `@DateTimeFormat(pattern = "yyyy-MM-dd")` - Formato de fecha

### Validadores Personalizados:

- `PetValidator` - Valida que una mascota sea válida en el contexto de su propietario
```

