@echo off
echo ========================================
echo CV Editor Backend - Build Validation
echo ========================================
echo.

echo Checking .NET SDK...
dotnet --version
if %ERRORLEVEL% neq 0 (
    echo ❌ .NET SDK not found. Please install .NET 8 SDK.
    exit /b 1
)
echo ✅ .NET SDK found
echo.

echo Checking solution file...
if not exist "CVEditor.sln" (
    echo ❌ Solution file not found
    exit /b 1
)
echo ✅ Solution file exists
echo.

echo Checking project files...
if not exist "src\CVEditor.Domain\CVEditor.Domain.csproj" (
    echo ❌ Domain project not found
    exit /b 1
)
echo ✅ Domain project exists

if not exist "src\CVEditor.Application\CVEditor.Application.csproj" (
    echo ❌ Application project not found
    exit /b 1
)
echo ✅ Application project exists

if not exist "src\CVEditor.Infrastructure\CVEditor.Infrastructure.csproj" (
    echo ❌ Infrastructure project not found
    exit /b 1
)
echo ✅ Infrastructure project exists

if not exist "src\CVEditor.API\CVEditor.API.csproj" (
    echo ❌ API project not found
    exit /b 1
)
echo ✅ API project exists

if not exist "src\CVEditor.Tests\CVEditor.Tests.csproj" (
    echo ❌ Tests project not found
    exit /b 1
)
echo ✅ Tests project exists
echo.

echo Cleaning solution...
dotnet clean CVEditor.sln --verbosity quiet
echo ✅ Solution cleaned
echo.

echo Restoring packages...
dotnet restore CVEditor.sln --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Package restoration failed
    exit /b 1
)
echo ✅ Packages restored
echo.

echo Building Domain project...
dotnet build src\CVEditor.Domain --configuration Debug --no-restore --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Domain build failed
    exit /b 1
)
echo ✅ Domain project builds successfully

echo Building Application project...
dotnet build src\CVEditor.Application --configuration Debug --no-restore --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Application build failed
    exit /b 1
)
echo ✅ Application project builds successfully

echo Building Infrastructure project...
dotnet build src\CVEditor.Infrastructure --configuration Debug --no-restore --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Infrastructure build failed
    exit /b 1
)
echo ✅ Infrastructure project builds successfully

echo Building API project...
dotnet build src\CVEditor.API --configuration Debug --no-restore --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ API build failed
    exit /b 1
)
echo ✅ API project builds successfully

echo Building Tests project...
dotnet build src\CVEditor.Tests --configuration Debug --no-restore --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Tests build failed
    exit /b 1
)
echo ✅ Tests project builds successfully

echo.
echo Running unit tests...
dotnet test src\CVEditor.Tests --configuration Debug --no-build --verbosity quiet
if %ERRORLEVEL% neq 0 (
    echo ❌ Some tests failed
    echo Run 'dotnet test src\CVEditor.Tests --verbosity normal' for details
    exit /b 1
)
echo ✅ All tests passed
echo.

echo ========================================
echo 🎉 BUILD VALIDATION SUCCESSFUL! 🎉
echo ========================================
echo.
echo Your C# backend is ready to run!
echo.
echo Next steps:
echo   1. Start the API: dotnet run --project src\CVEditor.API
echo   2. Open Swagger: https://localhost:7001/swagger
echo   3. Test endpoints: https://localhost:7001/api/cvprofiles
echo.
echo The API is configured for your React frontend on:
echo   - http://localhost:3000
echo   - https://localhost:3000