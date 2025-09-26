# CV Editor Backend

A clean architecture .NET 8 backend API for the CV Editor application, built with SOLID principles, TDD practices, and modern C# patterns.

## Architecture

This solution follows Clean Architecture principles with the following layers:

### 🏗️ **Domain Layer** (`CVEditor.Domain`)
- **Entities**: Core business objects (`CvProfile`, `WorkExperience`, `Education`, etc.)
- **Value Objects**: Immutable objects (`PersonalDetails`)
- **Repositories**: Interface contracts for data access
- **Domain Services**: Business logic interfaces
- **No dependencies** on external frameworks

### 🚀 **Application Layer** (`CVEditor.Application`)
- **Services**: Business logic implementation
- **DTOs**: Request/Response models for API
- **Mapping**: AutoMapper profiles for object transformation
- **Validation**: Business rule validation
- **Dependencies**: Domain layer only

### 💾 **Infrastructure Layer** (`CVEditor.Infrastructure`)
- **Database**: Entity Framework Core with SQL Server
- **Repositories**: Concrete implementations of domain interfaces
- **Data Configurations**: EF Core entity configurations
- **External Services**: File operations, template processing
- **Dependencies**: Domain layer

### 🌐 **API Layer** (`CVEditor.API`)
- **FastEndpoints**: High-performance API endpoints
- **Authentication**: JWT/OAuth ready
- **Swagger**: Auto-generated API documentation
- **CORS**: Configured for React frontend
- **Dependencies**: Application + Infrastructure layers

### 🧪 **Tests** (`CVEditor.Tests`)
- **Unit Tests**: Domain logic, services, repositories
- **Integration Tests**: Database operations, API endpoints
- **Test Frameworks**: xUnit, FluentAssertions, Moq
- **In-Memory Database**: For isolated testing

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server (LocalDB for development)
- Visual Studio 2022 or VS Code

### Running the API

1. **Clone and navigate to backend directory**
   ```bash
   cd CVEditor/Backend
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the API**
   ```bash
   dotnet run --project src/CVEditor.API
   ```

4. **Access Swagger Documentation**
   - Open `https://localhost:7001/swagger`
   - API will be available at `https://localhost:7001/api`

### Running Tests

```bash
# Run all tests
dotnet test

# Run tests with coverage
dotnet test --collect:"XPlat Code Coverage"

# Run specific test project
dotnet test src/CVEditor.Tests
```

### Database Setup

The API uses SQL Server LocalDB by default. The database will be created automatically on first run.

**Connection String** (in `appsettings.json`):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CVEditorDb;Trusted_Connection=true;MultipleActiveResultSets=true;"
  }
}
```

## 📋 API Endpoints

### CV Profiles
- `GET /api/cvprofiles` - Get all CV profiles
- `GET /api/cvprofiles/{id}` - Get specific CV profile
- `POST /api/cvprofiles` - Create new CV profile
- `PUT /api/cvprofiles/{id}` - Update CV profile
- `DELETE /api/cvprofiles/{id}` - Delete CV profile (soft delete)
- `GET /api/cvprofiles/search?name={name}` - Search profiles by name

## 🏛️ Key Features

### SOLID Principles Implementation
- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Extensible without modification
- **Liskov Substitution**: Proper inheritance hierarchies
- **Interface Segregation**: Focused, cohesive interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Domain-Driven Design
- **Entities** with business logic and invariants
- **Value Objects** for immutable concepts
- **Aggregate Root** pattern for data consistency
- **Repository** pattern for data access abstraction

### Test-Driven Development
- **Unit Tests** for business logic
- **Integration Tests** for data access
- **Mocked Dependencies** for isolated testing
- **FluentAssertions** for readable test assertions

### Modern C# Features
- **Records** for immutable DTOs
- **Nullable Reference Types** for better null safety
- **Pattern Matching** and expression syntax
- **Async/Await** throughout the codebase

## 🔧 Configuration

### Database Provider
Currently configured for SQL Server. To use another provider:

1. Update `CVEditor.Infrastructure.csproj` with appropriate EF package
2. Modify `Program.cs` to use different provider
3. Update connection string format

### CORS Policy
Configured for React development server on `http://localhost:3000`. Update `Program.cs` to modify allowed origins.

### Logging
Uses Serilog with console and file logging. Logs are written to `logs/cvEditor-{date}.log`.

## 🚀 Migration Strategy

### From Frontend to Backend
The backend is designed to replace JavaScript logic in the frontend:

1. **Profile Management**: Move from localStorage to database
2. **Data Validation**: Server-side validation with business rules
3. **Template Processing**: Server-side HTML/PDF generation
4. **File Operations**: Server-side import/export handling

### Frontend Integration
Update React app to:
- Replace local state management with API calls
- Remove client-side business logic
- Use DTOs returned by backend APIs
- Handle server validation errors

## 📊 Performance Considerations

- **Entity Framework Optimizations**: Includes/projection for efficient queries
- **Async/Await**: Non-blocking I/O operations
- **Caching**: Ready for Redis/in-memory caching
- **Query Filters**: Automatic soft-delete filtering
- **Connection Pooling**: Built-in with EF Core

## 🔒 Security Features

- **Soft Delete**: Data preservation with `IsDeleted` flag
- **Input Validation**: Server-side validation at API level
- **SQL Injection Protection**: EF Core parameterized queries
- **CORS Configuration**: Controlled cross-origin requests
- **Authentication Ready**: JWT/OAuth integration points

## 📈 Future Enhancements

- **User Authentication**: Multi-user support with JWT
- **Caching Layer**: Redis for performance
- **File Storage**: Azure Blob/AWS S3 integration
- **Email Services**: Profile sharing via email
- **Audit Logging**: Track all profile changes
- **Background Jobs**: Async PDF generation
- **Rate Limiting**: API throttling for security
- **Health Checks**: Monitoring and diagnostics

---

Built with ❤️ following Clean Architecture, SOLID principles, and TDD practices.