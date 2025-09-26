@echo off
echo ========================================
echo CV Editor Backend - Test Validation
echo ========================================
echo.

echo Building solution first...
dotnet build CVEditor.sln --configuration Debug --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed. Please fix compilation errors first.
    exit /b 1
)
echo ✅ Solution builds successfully
echo.

echo Running AutoMapper configuration tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --filter "AutoMapperTests" --configuration Debug --verbosity detailed
if %ERRORLEVEL% neq 0 (
    echo ❌ AutoMapper tests failed
    exit /b 1
)
echo ✅ AutoMapper tests passed
echo.

echo Running Domain tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --filter "CvProfileTests" --configuration Debug --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ Domain tests failed
    exit /b 1
)
echo ✅ Domain tests passed
echo.

echo Running Application tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --filter "CvProfileServiceTests" --configuration Debug --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ Application tests failed
    exit /b 1
)
echo ✅ Application tests passed
echo.

echo Running Infrastructure tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --filter "CvProfileRepositoryTests" --configuration Debug --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ Infrastructure tests failed
    exit /b 1
)
echo ✅ Infrastructure tests passed
echo.

echo Running all tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --configuration Debug --verbosity normal
if %ERRORLEVEL% neq 0 (
    echo ❌ Some tests are still failing
    echo.
    echo Run individual test categories to identify specific failures:
    echo   dotnet test --filter "AutoMapperTests" --verbosity detailed
    echo   dotnet test --filter "CvProfileTests" --verbosity detailed
    echo   dotnet test --filter "CvProfileServiceTests" --verbosity detailed
    echo   dotnet test --filter "CvProfileRepositoryTests" --verbosity detailed
    exit /b 1
)

echo.
echo ========================================
echo 🎉 ALL TESTS PASSING! 🎉
echo ========================================
echo.
echo Your C# backend is working correctly!
echo The API is ready to integrate with your React frontend.
echo.
echo Next steps:
echo   1. Start the API: dotnet run --project src\CVEditor.API
echo   2. Test endpoints: https://localhost:7001/swagger
echo   3. Update React app to use backend APIs