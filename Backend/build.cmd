@echo off
echo Building CV Editor Backend Solution...
echo.

echo Restoring dependencies...
dotnet restore CVEditor.sln
if %ERRORLEVEL% neq 0 goto :error

echo.
echo Building solution...
dotnet build CVEditor.sln --configuration Debug --no-restore
if %ERRORLEVEL% neq 0 goto :error

echo.
echo Running tests...
dotnet test src\CVEditor.Tests\CVEditor.Tests.csproj --configuration Debug --no-build --verbosity normal
if %ERRORLEVEL% neq 0 goto :error

echo.
echo ✅ Build completed successfully!
goto :end

:error
echo ❌ Build failed with errors.
exit /b 1

:end
echo.
echo To run the API:
echo   dotnet run --project src\CVEditor.API
echo.
echo API will be available at:
echo   https://localhost:7001/api
echo   Swagger: https://localhost:7001/swagger