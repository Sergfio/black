# Portfolio-Website

Willkommen zum Repository meiner persönlichen Portfolio-Website. Dieses Projekt ist eine moderne und responsive Webanwendung, die meine Fähigkeiten als Frontend-Entwickler präsentiert. Sie ist mit HTML, CSS und JavaScript aufgebaut und verwendet Webpack für das Asset-Management und die Optimierung.

## Inhaltsverzeichnis

- [Portfolio-Website](#portfolio-website)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Über das Projekt](#über-das-projekt)
  - [Technologien](#technologien)
  - [Setup und Installation](#setup-und-installation)
  - [Entwicklung](#entwicklung)
- [oder:](#oder)
- [yarn start](#yarn-start)

## Über das Projekt

Diese Portfolio-Website dient dazu, meine Projekte, Erfahrungen und Fähigkeiten im Bereich Webentwicklung zu präsentieren. Sie legt Wert auf ein sauberes Design, Benutzerfreundlichkeit und Performance. Besonderes Augenmerk wurde auf scrollbasierte Animationen gelegt, um ein ansprechendes Benutzererlebnis zu schaffen.

## Technologien

Das Projekt ist mit den folgenden Kerntechnologien aufgebaut:

-   **HTML5:** Für die Struktur und den Inhalt der Webseite.
-   **CSS3:** Für das Styling und Layout, einschließlich responsiver Design-Prinzipien.
-   **JavaScript (ES6+):** Für interaktive Elemente und dynamische Inhalte.
-   **Webpack:** Als Modul-Bundler für das effiziente Management und die Optimierung von Assets (JS, CSS, Bilder).
-   **ScrollMagic:** Eine JavaScript-Bibliothek zur Steuerung von Animationen basierend auf der Scroll-Position.
-   **GSAP (GreenSock Animation Platform):** Eine leistungsstarke Animationsbibliothek, die oft in Verbindung mit ScrollMagic verwendet wird.
-   **Boxicons:** Eine kostenlose Open-Source-Icon-Bibliothek.
-   **jQuery:** (Indirekt über ScrollMagic genutzt) Eine schnelle, kleine und funktionsreiche JavaScript-Bibliothek.

## Setup und Installation

Um das Projekt lokal einzurichten und zu betreiben, folge diesen Schritten:

1.  **Repository klonen:**
    ```bash
    git clone [https://github.com/DEIN-GITHUB-USERNAME/DEIN-REPO-NAME.git](https://github.com/DEIN-GITHUB-USERNAME/DEIN-REPO-NAME.git)
    cd DEIN-REPO-NAME
    ```
    *(Ersetze `DEIN-GITHUB-USERNAME` und `DEIN-REPO-NAME` durch die tatsächlichen Werte deines GitHub-Repositorys.)*

2.  **Abhängigkeiten installieren:**
    Stelle sicher, dass Node.js und npm (oder Yarn) auf deinem System installiert sind.
    ```bash
    npm install
    # oder wenn du Yarn verwendest:
    # yarn install
    ```

3.  **Bilder verschieben (optional):**
    Wenn du Bilder aus einem anderen Ordner in `src/images/` verschieben möchtest, kannst du folgendes PowerShell-Skript verwenden:
    ```powershell
    $SourcePath = "C:\Pfad\zu\Ihren\aktuellen\Bildern" # Passe diesen Pfad an!
    $DestinationPath = "C:\Pfad\zu\Ihrem\Projekt\src\images" # Passe diesen Pfad an!

    if (-not (Test-Path $DestinationPath)) {
        New-Item -ItemType Directory -Path $DestinationPath -Force
    }

    Get-ChildItem -Path $SourcePath -Include *.jpg, *.jpeg, *.png, *.gif, *.svg -File -Recurse | ForEach-Object {
        Move-Item -Path $_.FullName -Destination $DestinationPath -Force
    }
    Write-Host "Alle unterstützten Bilder wurden nach '$DestinationPath' verschoben."
    ```
    * *(Speichere dies als `.ps1`-Datei und führe sie in PowerShell aus, nachdem du die Pfade angepasst hast.)*

## Entwicklung

Für die lokale Entwicklung und das Testen der Website:

```bash
npm start
# oder:
# yarn start