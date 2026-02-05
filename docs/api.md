● List directory source-code/src/main/java
  └ 7 files found

● Find Java source files
  $ find ./source-code/src/main/java -type f -name "*.java" | head -20
  └ 21 lines...

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/OwnerController.java
  └ 172 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/vet/VetController.java
  └ 84 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/PetController.java
  └ 120 lines read

● Read source-code/src/main/java/org/springframework/samples/petclinic/owner/VisitController.java
  └ 98 lines read

```markdown
---
id: api
title: Endpoints
---

# Pet Clinic API Reference

API endpoints documentation for the Pet Clinic application.

## Owners

### Get All Owners

```
GET /owners
```

Returns a paginated list of all owners, optionally filtered by last name.

**Parameters:**
- `page` (optional, default: 1) - Page number for pagination
- `lastName` (optional) - Filter by owner's last name

**Response:** HTML page with owners list

---

### Create New Owner

```
GET /owners/new
```

Display the form to create a new owner.

**Response:** Owner creation form page

```
POST /owners/new
```

Submit a new owner.

**Request Body:**
- Owner object with name, address, phone, and city fields

**Response:** Redirects to owner details page if successful, or back to form if validation fails

---

### Find Owner Form

```
GET /owners/find
```

Display the owner search form.

**Response:** Owner search form page

---

### View Owner Details

```
GET /owners/{ownerId}
```

Display details for a specific owner including their pets and visits.

**Parameters:**
- `ownerId` (path) - The ID of the owner

**Response:** Owner details page

---

### Update Owner

```
GET /owners/{ownerId}/edit
```

Display the form to edit an owner.

**Parameters:**
- `ownerId` (path) - The ID of the owner

**Response:** Owner edit form page

```
POST /owners/{ownerId}/edit
```

Submit updated owner information.

**Parameters:**
- `ownerId` (path) - The ID of the owner

**Request Body:**
- Owner object with updated fields

**Response:** Redirects to owner details page if successful, or back to form if validation fails

---

## Pets

### Create New Pet

```
GET /owners/{ownerId}/pets/new
```

Display the form to create a new pet for an owner.

**Parameters:**
- `ownerId` (path) - The ID of the owner

**Response:** Pet creation form page

```
POST /owners/{ownerId}/pets/new
```

Submit a new pet for an owner.

**Parameters:**
- `ownerId` (path) - The ID of the owner

**Request Body:**
- Pet object with name, birth date, and type

**Response:** Redirects to owner details page if successful, or back to form if validation fails

---

### Edit Pet

```
GET /owners/{ownerId}/pets/{petId}/edit
```

Display the form to edit a pet.

**Parameters:**
- `ownerId` (path) - The ID of the owner
- `petId` (path) - The ID of the pet

**Response:** Pet edit form page

```
POST /owners/{ownerId}/pets/{petId}/edit
```

Submit updated pet information.

**Parameters:**
- `ownerId` (path) - The ID of the owner
- `petId` (path) - The ID of the pet

**Request Body:**
- Pet object with updated fields

**Response:** Redirects to owner details page if successful, or back to form if validation fails

---

## Visits

### Create New Visit

```
GET /owners/{ownerId}/pets/{petId}/visits/new
```

Display the form to create a new visit record for a pet.

**Parameters:**
- `ownerId` (path) - The ID of the owner
- `petId` (path) - The ID of the pet

**Response:** Visit creation form page

```
POST /owners/{ownerId}/pets/{petId}/visits/new
```

Submit a new visit record for a pet.

**Parameters:**
- `ownerId` (path) - The ID of the owner
- `petId` (path) - The ID of the pet

**Request Body:**
- Visit object with date and description

**Response:** Redirects to owner details page if successful, or back to form if validation fails

---

## Veterinarians

### List All Vets (HTML)

```
GET /vets.html
```

Display a paginated list of all veterinarians.

**Parameters:**
- `page` (optional, default: 1) - Page number for pagination

**Response:** Veterinarians list page with pagination

---

### List All Vets (JSON/XML)

```
GET /vets
```

Return a list of all veterinarians in JSON or XML format.

**Response:**
```json
{
  "vetList": [
    {
      "id": 1,
      "firstName": "James",
      "lastName": "Carter",
      "specialties": ["radiology"]
    }
  ]
}
```

**Response Format:** JSON (with @ResponseBody)

---

## Data Models

### Owner
- `id` - Unique identifier
- `firstName` - Owner's first name
- `lastName` - Owner's last name
- `address` - Street address
- `city` - City
- `telephone` - Phone number
- `pets` - Collection of pets owned

### Pet
- `id` - Unique identifier
- `name` - Pet's name
- `birthDate` - Birth date
- `type` - Pet type (dog, cat, etc.)
- `owner` - Reference to owner
- `visits` - Collection of visit records

### Visit
- `id` - Unique identifier
- `date` - Date of visit
- `description` - Description of visit
- `pet` - Reference to pet

### Veterinarian
- `id` - Unique identifier
- `firstName` - Vet's first name
- `lastName` - Vet's last name
- `specialties` - Collection of specialties

### Pet Type
- `id` - Unique identifier
- `name` - Type name (dog, cat, hamster, etc.)
```

