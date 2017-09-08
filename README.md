Do uruchomienia (skompilowania) projektu niezbędne jest środowisko NodeJS.

W pierwszym kroku należy upewnić się, że został zainstalowany GULP-CLI. Aby zainstalować należy użyć komendy:

# npm install -g gulp-cli

W następnym kroku należy uruchomić komendę

# npm install

będąc w głównym folderze projektu, w celu zainstalowania bibliotek. Po instalacji projekt jest gotowy do uruchomienia:

# gulp serve:dist

Po wykonaniu powyższej komendy projekt będzie dostępny pod adresem http://localhost/.

Aby jedynie zbudować projekt (bez uruchamiania serwera) należy uruchmoić komende:

# gulp build

Zbudowany projekt tworzy się w folderze 'dist/', warstwa klienta w folderze 'dist/client' (która umieściłem pod adresem: https://g-zwolinski.github.io/ w celu prezentacji).

Menu w sekcji 'PORTFOLIO' może być obsługiwane za pomocą klaiwszy kierunkowych (w lewo oraz prawo), pojawiającymi się strzałkami w prawym dolnym rogu menu, jak i gestami 'swipe'.