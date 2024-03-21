dotnet tool install --global dotnet-ef

docker-compose up -d

dotnet ef migrations add MyNewMigration -s Diary.Api -p Diary.Infrastructure

dotnet ef database update MyNewMigration -s Diary.Api -p Diary.Infrastructure
