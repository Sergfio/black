// src/main.js

// 1. Dein CSS importieren
// WICHTIG: Dadurch wird style.css von Webpack verarbeitet und in die Seite injiziert.
import "./style.css";

// 2. jQuery importieren (ScrollMagic und ältere Skripte könnten es global erwarten)
// Diese Zeilen stellen sicher, dass jQuery global verfügbar ist, falls benötigt.
import $ from "jquery";
window.jQuery = $; // Stellt jQuery global als 'jQuery' bereit
window.$ = $;     // Stellt jQuery global als '$' bereit

// 3. GSAP importieren (ScrollMagic wird oft mit GSAP für Animationen kombiniert)
// Auch wenn es in deinem aktuellen Code nicht direkt für Animationen genutzt wird,
// ist es ratsam, es zu importieren, wenn du planst, es zu verwenden.
import { gsap } from "gsap";

// 4. ScrollMagic und seine Plugins importieren
// Verwende den direkten ES6-Import für ScrollMagic. Die 'require' Statements sind nicht nötig.
import ScrollMagic from "scrollmagic";
// Import des Debug-Indikatoren-Plugins. Der Pfad ist hier korrigiert.
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

import { createZapAnimationScene } from "./scene.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM vollständig geladen und analysiert. Webpack startet...");

  const controller = new ScrollMagic.Controller();

  const zapScene = createZapAnimationScene(controller, ScrollMaigic);
  document.getElementById("app").innerHTML = "<p>Dynamischer Inhalt von main.js erfolgreich geladen!</p>";
   console.log("Webpack und ScrollMagic-Setup abgeschlossen.");
})

// 5. Stelle sicher, dass der gesamte DOM-Zugriff und die Initialisierung
// erst NACH dem vollständigen Laden des DOMs erfolgen.
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM vollständig geladen und analysiert. Webpack startet...");

  // ScrollMagic Controller initialisieren
  // Dieser Controller überwacht den Scroll-Status und steuert die Szenen.
  const controller = new ScrollMagic.Controller();

  // Erstelle eine Szene für jeden Abschnitt deines Portfolios
  // 'triggerHook' 0.5 bedeutet, dass der Trigger ausgelöst wird, wenn der Trigger-Element
  // die Mitte des Viewports erreicht. Du kannst diesen Wert anpassen (0-1).
  // 'duration' "100%" bedeutet, dass die Szene so lange aktiv ist, wie das Trigger-Element sichtbar ist.

  // Home Sektion Szene
  const homeScene = new ScrollMagic.Scene({
    triggerElement: "#home",
    triggerHook: 0.5,
    duration: "100%",
  })
    .setClassToggle("#home", "active") // Fügt 'active' Klasse hinzu/entfernt sie vom #home Element
    .addIndicators({ name: "Home Scene" }) // Fügt visuelle Debug-Indikatoren hinzu
    .addTo(controller); // Fügt die Szene zum ScrollMagic Controller hinzu

  // About Sektion Szene
  const aboutScene = new ScrollMagic.Scene({
    triggerElement: "#about",
    triggerHook: 0.5,
    duration: "100%",
  })
    .setClassToggle("#about", "active") // Fügt 'active' Klasse hinzu/entfernt sie vom #about Element
    .addIndicators({ name: "About Scene" })
    .addTo(controller);

  // Der "projectsScene" ist in deiner HTML aktuell NICHT vorhanden.
  // Wenn du eine #projects-Sektion HINZUFÜGEN wirst, lass diesen Code hier.
  // Andernfalls, ENTFERNE die gesamte 'projectsScene'-Konstante und alle zugehörigen
  // 'projectsTop' und '[href="#projects"]' Referenzen im Scroll-Event-Listener unten.
  /*
  const projectsScene = new ScrollMagic.Scene({
    triggerElement: "#projects",
    triggerHook: 0.5,
    duration: "100%"
  })
    .setClassToggle("#projects", "active")
    .addIndicators({ name: "Projects Scene" })
    .addTo(controller);
  */

  // Education Sektion Szene
  // Es ist besser, die ID (#education) statt der Klasse (.education) zu verwenden,
  // wenn dies ein einzigartiges Element ist, um Konsistenz zu wahren.
  const educationScene = new ScrollMagic.Scene({
    triggerElement: "#education",
    triggerHook: 0.5,
    duration: "100%",
  })
    .setClassToggle("#education", "active") // Fügt 'active' Klasse hinzu/entfernt sie vom #education Element
    .addIndicators({ name: "Education Scene" })
    .addTo(controller);

  // Contact Sektion Szene
  const contactScene = new ScrollMagic.Scene({
    triggerElement: "#contact",
    triggerHook: 0.5,
    duration: "100%",
  })
    .setClassToggle("#contact", "active") // Fügt 'active' Klasse hinzu/entfernt sie vom #contact Element
    .addIndicators({ name: "Contact Scene" })
    .addTo(controller);

  // Füge einen Scroll-Event-Listener zum Fenster hinzu, um Navigationslinks zu aktualisieren
  // Beachte: document.getElementById("#homeTop") ist syntaktisch falsch (ID hat kein # Präfix).
  // Außerdem ist es sinnvoller, die offsetTop der SEKTIONEN selbst zu verwenden,
  // da diese die tatsächliche Position auf der Seite darstellen, die du verfolgen möchtest.
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY; // Aktuelle Scroll-Position

    // Referenzen zu den HTML-Sektionen holen
    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");
    const educationSection = document.getElementById("education");
    const contactSection = document.getElementById("contact");
    const projectsSection = document.getElementById("projects"); // Wenn du eine #projects Sektion hast

    // Holen der Offset-Positionen der Sektionen
    // Fallback zu Infinity stellt sicher, dass undefinierte Sektionen nicht versehentlich ausgewählt werden
    const homeTop = homeSection ? homeSection.offsetTop : 0;
    const aboutTop = aboutSection ? aboutSection.offsetTop : Infinity;
    const educationTop = educationSection ? educationSection.offsetTop : Infinity;
    const contactTop = contactSection ? contactSection.offsetTop : Infinity;
    const projectsTop = projectsSection ? projectsSection.offsetTop : Infinity; // Muss existieren oder entfernt werden

    // Eine kleine Pufferzone (z.B. 50px) vor dem Erreichen des Sektionsanfangs
    // kann das Umschalten der aktiven Klasse geschmeidiger machen.
    const offset = 50;

    // Hilfsfunktion zum Setzen der 'active'-Klasse für Navigationslinks
    const setActiveNavLink = (activeHref) => {
      document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === activeHref) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    };

    // Logik zum Aktualisieren der aktiven Navigationslinks
    // Prüfe von unten nach oben, um Überschneidungen zu vermeiden.
    if (scrollPosition >= contactTop - offset) {
      setActiveNavLink("#contact");
    } else if (scrollPosition >= educationTop - offset) {
      setActiveNavLink("#education");
    } else if (scrollPosition >= projectsTop - offset && projectsTop !== Infinity) {
      // WICHTIG: Diese Bedingung nur aktiv lassen, wenn du auch eine #projects Sektion hast!
      setActiveNavLink("#projects");
    } else if (scrollPosition >= aboutTop - offset) {
      setActiveNavLink("#about");
    } else {
      // Wenn keine andere Sektion erreicht wurde, ist 'Home' aktiv.
      setActiveNavLink("#home");
    }
  });

  // Beispiel für dynamischen Inhalt im #app-Element
  document.getElementById("app").innerHTML = "<p>Dynamischer Inhalt von main.js erfolgreich geladen!</p>";
  console.log("Webpack und ScrollMagic-Setup abgeschlossen.");
});