#!/bin/bash

echo "Building CV Editor Backend Solution..."
echo

echo "Restoring dependencies..."
dotnet restore CVEditor.sln
if [ $? -ne 0 ]; then
    echo "❌ Dependency restoration failed."
    exit 1
fi

echo
echo "Building solution..."
dotnet build CVEditor.sln --configuration Debug --no-restore
if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi

echo
echo "Running tests..."
dotnet test src/CVEditor.Tests/CVEditor.Tests.csproj --configuration Debug --no-build --verbosity normal
if [ $? -ne 0 ]; then
    echo "❌ Tests failed."
    exit 1
fi

echo
echo "✅ Build completed successfully!"
echo
echo "To run the API:"
echo "  dotnet run --project src/CVEditor.API"
echo
echo "API will be available at:"
echo "  https://localhost:7001/api"
echo "  Swagger: https://localhost:7001/swagger"