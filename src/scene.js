// var scene = new ScrollMagic.Scene({ triggerElement: "#trigger1" })
//   // trigger animation by adding a css class
//   .setClassToggle("#animate1", "zap")
//   .addIndicators({ name: "1 - add a class" }) // add indicators (requires plugin)
//   .addTo(controller);
// src/scene.js

// Diese Funktion nimmt den ScrollMagic-Controller entgegen
// und definiert die Szene.
// Dadurch ist der Code modular und wiederverwendbar.
export function createZapAnimationScene(controller, ScrollMagic) {
  if (!controller || !ScrollMagic) {
    console.error("ScrollMagic controller or ScrollMagic library not provided to createZapAnimationScene.");
    return;
  }

  var scene = new ScrollMagic.Scene({ triggerElement: "#trigger1" })
    // Animation auslösen, indem eine CSS-Klasse hinzugefügt wird
    .setClassToggle("#animate1", "zap")
    .addIndicators({ name: "1 - add a class" }) // Indikatoren hinzufügen (benötigt Plugin)
    .addTo(controller);

  console.log("Zap Animation Scene wurde erstellt und zum Controller hinzugefügt.");
  return scene; // Optional: die Szene zurückgeben, falls du sie später referenzieren möchtest
}