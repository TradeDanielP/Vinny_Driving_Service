var mediaQueryList = window.matchMedia("(max-width: 992px)");

function screenTest(e) {
  if (e.matches) {
    /* La viewport tiene al menos 992 píxeles de ancho */
    console.log('La viewport si tiene 992 píxeles de ancho');
  } else {
    /* La viewport es menor que 992 píxeles de ancho */
    console.log('La viewport NO tiene 992 píxeles de ancho');
  }
}

// Añade el listener
mediaQueryList.addListener(screenTest);

// Llama a la función al cargar la página
screenTest(mediaQueryList);