● List directory source-code
  └ 25 files found

● Find Java source files
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
   -type f -name "*.java" | head -20
  └ 21 lines...

Now let me read the main Java files to extract API information:

● List directory source-code/src/main/java/org/springframework/samples/petclinic
  └ 11 files found

● Count total Java files
  $ find /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java
   -name "*.java" -type f | wc -l
  └ 2 lines...

● Read main application file
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/PetClinicApplication.java
  └ 36 lines...

● Read BaseEntity
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/model/BaseEntity.java
  └ 52 lines...

● Read Person model
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/model/Person.java
  └ 55 lines...

● Read Owner class
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/owner/Owner.java
  └ 174 lines...

● Read Pet class
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/owner/Pet.java
  └ 85 lines...

● Read Visit class
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/owner/Visit.java
  └ 69 lines...

● Read Vet class
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/vet/Vet.java
  └ 80 lines...

● Read OwnerController
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/owner/OwnerController.java
  └ 168 lines...

● Read OwnerRepository
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/owner/OwnerRepository.java
  └ 83 lines...

● Read VetRepository and VetController
  $ cat /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/
  org/springframework/samples/petclinic/vet/VetRepository.java && echo "---" && cat
  /home/runner/work/petclinic-documentation/petclinic-documentation/source-code/src/main/java/org/sp
  ringframework/samples/petclinic/vet/VetController.java
  └ 139 lines...

```markdown
# API Reference - PetClinic

## Core Models

### BaseEntity
**Package:** `org.springframework.samples.petclinic.model`

Base class for domain objects with identifier property.

#### Properties
- `id: Integer` - Unique identifier (auto-generated)

#### Methods
- `getId(): Integer` - Get the entity identifier
- `setId(Integer id): void` - Set the entity identifier
- `isNew(): boolean` - Check if entity is new (id is null)

---

### Person
**Package:** `org.springframework.samples.petclinic.model`  
**Extends:** `BaseEntity`

Represents a person entity with name attributes.

#### Properties
- `firstName: String` - First name (required, non-empty)
- `lastName: String` - Last name (required, non-empty)

#### Methods
- `getFirstName(): String` - Get first name
- `setFirstName(String firstName): void` - Set first name
- `getLastName(): String` - Get last name
- `setLastName(String lastName): void` - Set last name

---

### NamedEntity
**Package:** `org.springframework.samples.petclinic.model`  
**Extends:** `BaseEntity`

Base class for named entities.

---

## Owner Model

### Owner
**Package:** `org.springframework.samples.petclinic.owner`  
**Extends:** `Person`  
**Entity Table:** `owners`

Represents a pet owner with contact information and associated pets.

#### Properties
- `address: String` - Owner's address (required, non-empty)
- `city: String` - Owner's city (required, non-empty)
- `telephone: String` - Owner's phone number (required, 10 digits)
- `pets: List<Pet>` - List of owner's pets (eager fetch, ordered by name)

#### Methods
- `getAddress(): String` - Get owner's address
- `setAddress(String address): void` - Set owner's address
- `getCity(): String` - Get owner's city
- `setCity(String city): void` - Set owner's city
- `getTelephone(): String` - Get owner's telephone
- `setTelephone(String telephone): void` - Set owner's telephone
- `getPets(): List<Pet>` - Get owner's pets
- `addPet(Pet pet): void` - Add a pet to the owner
- `getPet(String name): Pet` - Get pet by name
- `getPet(Integer id): Pet` - Get pet by ID
- `getPet(String name, boolean ignoreNew): Pet` - Get pet by name with option to ignore new pets
- `addVisit(Integer petId, Visit visit): Owner` - Add a visit to a pet
- `toString(): String` - String representation

---

## Pet Model

### Pet
**Package:** `org.springframework.samples.petclinic.owner`  
**Extends:** `NamedEntity`  
**Entity Table:** `pets`

Represents a pet with type, birth date, and visit history.

#### Properties
- `birthDate: LocalDate` - Pet's birth date (format: yyyy-MM-dd)
- `type: PetType` - Pet's type
- `visits: Set<Visit>` - Collection of visits (eager fetch, ordered by visit date ascending)

#### Methods
- `setBirthDate(LocalDate birthDate): void` - Set pet's birth date
- `getBirthDate(): LocalDate` - Get pet's birth date
- `getType(): PetType` - Get pet's type
- `setType(PetType type): void` - Set pet's type
- `getVisits(): Collection<Visit>` - Get all visits
- `addVisit(Visit visit): void` - Add a visit to the pet

---

### PetType
**Package:** `org.springframework.samples.petclinic.owner`  
**Extends:** `NamedEntity`  
**Entity Table:** `types`

Represents a pet type (e.g., dog, cat).

---

## Visit Model

### Visit
**Package:** `org.springframework.samples.petclinic.owner`  
**Extends:** `BaseEntity`  
**Entity Table:** `visits`

Represents a veterinary visit for a pet.

#### Properties
- `date: LocalDate` - Visit date (format: yyyy-MM-dd, defaults to current date)
- `description: String` - Visit description (required, non-empty)

#### Methods
- `Visit()` - Constructor (initializes date to current date)
- `getDate(): LocalDate` - Get visit date
- `setDate(LocalDate date): void` - Set visit date
- `getDescription(): String` - Get visit description
- `setDescription(String description): void` - Set visit description

---

## Vet Model

### Vet
**Package:** `org.springframework.samples.petclinic.vet`  
**Extends:** `Person`  
**Entity Table:** `vets`

Represents a veterinarian with specialties.

#### Properties
- `specialties: Set<Specialty>` - Set of veterinarian specialties (eager fetch, many-to-many relationship)

#### Methods
- `getSpecialties(): List<Specialty>` - Get sorted list of specialties
- `getNrOfSpecialties(): int` - Get number of specialties
- `addSpecialty(Specialty specialty): void` - Add a specialty to the veterinarian

---

### Specialty
**Package:** `org.springframework.samples.petclinic.vet`  
**Extends:** `NamedEntity`  
**Entity Table:** `specialties`

Represents a veterinary specialty (e.g., radiology, dentistry).

---

### Vets
**Package:** `org.springframework.samples.petclinic.vet`

Container class for Vet collections used for XML/JSON mapping.

---

## Repositories

### OwnerRepository
**Package:** `org.springframework.samples.petclinic.owner`  
**Extends:** `Repository<Owner, Integer>`

Data access layer for Owner entities.

#### Methods
- `findPetTypes(): List<PetType>` - Retrieve all pet types (cached, read-only)
- `findByLastName(String lastName, Pageable pageable): Page<Owner>` - Find owners by last name (pagination, read-only)
- `findById(Integer id): Owner` - Find owner by ID with eager-loaded pets (read-only)
- `save(Owner owner): void` - Save or update an owner
- `findAll(Pageable pageable): Page<Owner>` - Retrieve all owners (pagination, read-only)

---

### VetRepository
**Package:** `org.springframework.samples.petclinic.vet`  
**Extends:** `Repository<Vet, Integer>`

Data access layer for Vet entities.

#### Methods
- `findAll(): Collection<Vet>` - Retrieve all vets (cached, read-only)
- `findAll(Pageable pageable): Page<Vet>` - Retrieve all vets (pagination, cached, read-only)

---

## Controllers

### OwnerController
**Package:** `org.springframework.samples.petclinic.owner`

Handles owner-related HTTP requests.

#### Request Mappings
- `GET /owners/new` - Initialize owner creation form
- `POST /owners/new` - Process owner creation
- `GET /owners/find` - Initialize owner search form
- `GET /owners` - Search and list owners (pagination support)
- `GET /owners/\{ownerId} - Display owner details
- `GET /owners/\{ownerId\}/edit` - Initialize owner edit form
- `POST /owners/\{ownerId\}/edit` - Process owner update

#### Methods
- `initCreationForm(Map<String, Object> model): String` - Show new owner form
- `processCreationForm(Owner owner, BindingResult result): String` - Handle owner creation
- `initFindForm(Map<String, Object> model): String` - Show owner search form
- `processFindForm(int page, Owner owner, BindingResult result, Model model): String` - Handle owner search (default page: 1)
- `showOwner(int ownerId): ModelAndView` - Display owner details
- `initUpdateOwnerForm(int ownerId, Model model): String` - Show edit owner form
- `processUpdateOwnerForm(Owner owner, BindingResult result, int ownerId): String` - Handle owner update

---

### VetController
**Package:** `org.springframework.samples.petclinic.vet`

Handles veterinarian-related HTTP requests.

#### Request Mappings
- `GET /vets.html` - Display vets list (HTML, pagination support)
- `GET /vets` - Retrieve vets as JSON/XML (no pagination)

#### Methods
- `showVetList(int page, Model model): String` - Display paginated vet list (default page: 1)
- `showResourcesVetList(): Vets` - Return vets as resource object for serialization

---

## Application Entry Point

### PetClinicApplication
**Package:** `org.springframework.samples.petclinic`

Spring Boot application entry point.

#### Methods
- `main(String[] args): void` - Start the PetClinic application

---

## Annotations & Constraints

### Validation Annotations
- `@NotEmpty` - Field must not be empty
- `@Digits(fraction=0, integer=10)` - Numeric validation for phone numbers

### JPA Annotations
- `@Entity` - Mark class as JPA entity
- `@Table` - Specify database table name
- `@MappedSuperclass` - Mark as mapped superclass
- `@Column` - Specify column properties
- `@Id` - Mark as primary key
- `@GeneratedValue` - Auto-generate ID values
- `@OneToMany` - One-to-many relationship
- `@ManyToOne` - Many-to-one relationship
- `@ManyToMany` - Many-to-many relationship
- `@JoinColumn` - Specify join column
- `@JoinTable` - Specify join table for many-to-many
- `@OrderBy` - Order collections

### Spring Annotations
- `@SpringBootApplication` - Enable Spring Boot auto-configuration
- `@Controller` - Mark as Spring MVC controller
- `@GetMapping` - Map GET requests
- `@PostMapping` - Map POST requests
- `@PathVariable` - Extract path variables
- `@RequestParam` - Extract query parameters
- `@ModelAttribute` - Bind model attributes
- `@InitBinder` - Customize data binding
- `@ResponseBody` - Serialize response body
- `@Transactional` - Transaction management
- `@Cacheable` - Cache results
- `@DateTimeFormat` - Format date/time fields

---

## Data Pagination

Pagination support via Spring Data `Pageable` interface:
- Default page size: 5 items per page
- Page numbering: 1-indexed (user-facing)
- Query parameter: `page` (default: 1)

---

## Transaction Configuration

- Read-only operations use `@Transactional(readOnly = true)` for optimization
- Write operations (save) are transactional by default

---

## Caching

- `@Cacheable("vets")` - Cache results for all vets queries
- Cache name: "vets"
```

