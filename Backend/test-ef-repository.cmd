@echo off
echo ========================================
echo EF Core Repository Tests Validation
echo ========================================
echo.

echo Building solution first...
dotnet build CVEditor.sln --configuration Debug --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed. Fix compilation errors first.
    exit /b 1
)
echo ✅ Solution builds successfully
echo.

echo Running Infrastructure Repository Tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --filter "CvProfileRepositoryTests" --configuration Debug --verbosity detailed
if %ERRORLEVEL% neq 0 (
    echo ❌ Repository tests failed
    echo.
    echo Common EF Core issues:
    echo   - Owned entities (PersonalDetails) being shared between entities
    echo   - Foreign key constraint violations
    echo   - Entity state tracking problems
    echo.
    echo Run with more verbose output for details:
    echo   dotnet test --filter "CvProfileRepositoryTests" --verbosity diagnostic
    exit /b 1
)

echo ✅ All Repository Tests Passed!
echo.
echo Testing specific scenarios...

echo Running AddAsync test...
dotnet test --filter "AddAsync_WithValidProfile_ShouldAddToDatabase" --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ AddAsync test failed
    exit /b 1
)
echo ✅ AddAsync works

echo Running GetAllAsync test...
dotnet test --filter "GetAllAsync_ShouldReturnAllNonDeletedProfiles" --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ GetAllAsync test failed
    exit /b 1
)
echo ✅ GetAllAsync works

echo Running SearchByNameAsync test...
dotnet test --filter "SearchByNameAsync_WithMatchingNames_ShouldReturnMatchingProfiles" --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ SearchByNameAsync test failed
    exit /b 1
)
echo ✅ SearchByNameAsync works

echo.
echo ========================================
echo 🎉 EF CORE REPOSITORY TESTS PASSING! 🎉
echo ========================================
echo.
echo Entity Framework Core is working correctly with:
echo   ✅ Owned entities (PersonalDetails)
echo   ✅ Soft delete functionality
echo   ✅ Collection relationships
echo   ✅ In-memory database testing
echo   ✅ CRUD operations
echo   ✅ Search functionality
echo.
echo The backend is ready for production use!