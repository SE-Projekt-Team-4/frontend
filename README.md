## Frontend 
Dieser Ordner enthält alle Dateien für das Ausführen der Benutzeroberflächer unserer Webanwendung. Das dazugehörige Repository auf GitHub können Sie hier einsehen: https://github.com/SE-Projekt-Team-4/frontend/

### Lokales Testen
Voraussetzung für das lokale Testen, ist die Installation von Node.js und NPM auf Ihrem Rechner.
Um die React App lokal auf ihrem Rechner zu starten muss vorerst in den Ordner namens "coronaRegistrationFrontend" navigieren. In diesem führen sie in der Konsole (entweder die Integrierte in der Entwicklungsumgebung oder mittels cmd) den Befehl `npm install` aus. Dieser installiert alle nötigen libraries und packages, die benötigt werden, um die App problemfrei zu starten.

Wenn `npm install` komplett durchgelaufen ist, können sie das Befehl `npm run start` ebenfalls in der Konsole ausführen. Mit diesem Befehl wird ein Development Server aufgesetzt, und die app läuft lokal auf [http://localhost:3000]. Natürlich muss zur selben Zeit auch lokal das Backend gestartet werden, damit die React App mit Daten gefüllt wird. Die Anleitung hierfür finden sie im README.md im "backend" Ordner.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

### Einen Build Erstellen 
Wenn in der Konsole das Befehl `npm build` ausgefüllt wird, wird in ein neuer Ordner in "coronaRegistrationFrontend" namens "build" erstellt. Dieser enthält eine Optimierte version der App und ist nun bereit in den ordner "React Apps" innerhalb des backends verschoben zu werden.
