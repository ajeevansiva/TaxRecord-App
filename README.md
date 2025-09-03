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

### Local Development

#### Backend (.NET)
1. Navigate to `TaxRecordManager/`
2. Run `dotnet build`
3. Run `dotnet run`

#### Frontend (Angular)
1. Navigate to `Front-End/TaxRecord-frontend/`
2. Run `npm install`
3. Run `ng serve -o`

### Docker Compose (Recommended)

1. Make sure Docker is installed and running.
2. In the project root (`TaxRecordManager/`), run:
	 ```sh
	 docker-compose build
	 docker-compose up
	 ```
	 - To run in detached mode (in the background):
		 ```sh
		 docker-compose up -d
		 ```
	 - To stop the containers:
		 ```sh
		 docker-compose down
		 ```
3. The API will be available at [http://localhost:5097](http://localhost:5097)
4. The frontend will be available at [http://localhost:4200](http://localhost:4200)

### Key Files

#### Backend
- `Program.cs` - Main entry point for the .NET backend
- `TaxRecordManager.csproj` - Project file
- `Controllers/` - API controllers
- `Models/TaxRecord.cs` - Tax record model
- `Data/TaxRecordContext.cs` - EF Core DB context
- `Dockerfile` - Docker build for backend

#### Frontend
- `src/app/tax-record-form/tax-record-form.component.ts` - Tax record form component
- `src/app/tax-record-list/tax-record-list.ts` - Tax record list component
- `src/app/taxrecord-service.ts` - Angular service for API calls
- `src/app/app.config.ts` - Angular app configuration
- `src/app/app.ts` - Main Angular app bootstrap
- `Dockerfile` - Docker build for frontend

#### Orchestration
- `docker-compose.yml` - Multi-container orchestration for full stack app

