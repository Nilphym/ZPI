# ZPI

## Frontend Routing Guide
https://github.com/remix-run/react-router/blob/v6.0.0-beta.4/docs/advanced-guides/migrating-5-to-6.md

## Frontend Changelog
### Zmiany v1.0.0.:
- struktura importowania - w kazdym glownym folderze w src (components, containers, pages, providers) znajduje się index.js, w którym zaimportowane są wszystkie jsx'y z tego folderu, wtedy można importować spoza tego folderu za pomocą import { Component } from './containers' (jest to named export), zeby dzialalo trzeba wyexportowac bez defaulta nowy komponent i wyexportowac go w pliku index.js, nadal działa poprzedni styl importowania
- zmiany mock serwera - teraz kazde nowe dane w mock serwerze nazywane są jako feature, zeby stworzyc nowy feature musisz w folderze /data stworzyc plik na tej samej zasadzie, co te co juz sie w nim znajduja i zaimportowac go do listy w MockServer.jsx
- powstał folder /providers - przenesione zostaly z serwisów do niego MockServer i AuthManager
- zmiany w /services - teraz znajdują się tam pojedyńcze pliki .js zamiast folderów
- redux - do każdej akcji można odwoływać się poprzez import { action } from './redux/store' zamiast import { action } from './redux/reducers/something/somethingSlice', przy tworzeniu nowego reducera potrzebny dodatkowy export w pliku store.js, nadal działa poprzedni styl importowania
- komponent Layout - został wyniesiony do folderu /src
- komponent NoMatch - został przeniesiony do folderu /pages
