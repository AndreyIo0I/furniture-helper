FROM mcr.microsoft.com/dotnet/sdk:6.0

ENV PATH $PATH:/root/.dotnet/tools

WORKDIR /app

COPY . ./

RUN dotnet tool install --global dotnet-ef

CMD cd src/ExtranetAPI;\
dotnet run -c Release