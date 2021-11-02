# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/aspnet:5.0
COPY Funtest/bin/Release/net5.0/ App/
WORKDIR /App
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Funtest.dll