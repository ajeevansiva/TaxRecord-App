# TaxRecord-App

A full-stack application for managing tax records, built with ASP.NET Core (backend) and Angular (frontend).

## Features
- Add, edit, delete, and view tax records
- Filter, search, and sort tax records
- Responsive UI with Angular
- RESTful API backend with .NET

## Project Structure
- `TaxRecordManager/` - .NET backend
- `Front-End/TaxRecord-frontend/` - Angular frontend

## Getting Started

### Backend (.NET)
1. Navigate to `TaxRecordManager/`
2. Run `dotnet build`
3. Run `dotnet run`

### Frontend (Angular)
1. Navigate to `Front-End/TaxRecord-frontend/`
2. Run `npm install`
3. Run `ng serve -o`

### Key Files

#### Backend
- `Program.cs` - Main entry point for the .NET backend
- `TaxRecordManager.csproj` - Project file
- `Controllers/` - API controllers
- `Models/TaxRecord.cs` - Tax record model
- `Data/TaxRecordContext.cs` - EF Core DB context

#### Frontend
- `src/app/tax-record-form/tax-record-form.component.ts` - Tax record form component
- `src/app/tax-record-list/tax-record-list.ts` - Tax record list component
- `src/app/taxrecord-service.ts` - Angular service for API calls
- `src/app/app.config.ts` - Angular app configuration
- `src/app/app.ts` - Main Angular app bootstrap

## License
MIT
