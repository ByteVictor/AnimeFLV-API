# AnimeFLV-API              	(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

Este proyecto tiene como objetivo crear una API para interactuar con la web de anime, AnimeFLV de forma sencilla y automatizada.

## Motivación del proyecto 🦾

Como seguidor del anime y activo usuario de esta web, me he visto en más de una ocasión refrescando una y otra vez la página para ver si había salido ya un nuevo capítulo de cualquiera fuera la serie que seguía en ese momento o pasando por 4 links diferentes para descargar algún capítulo.
### ¿Qué se pretende desarrollar? 👨🏻‍💻
El objetivo es automatizar las tareas anteriormente comentadas, en un principio los objetivos son:

 - Crear funciones para marcar series y que se puedan recibir notificaciones cuando haya un nuevo capítulo.
 - Crear funciones que notifiquen la aparición de una nueva serie.
 - Crear funciones que faciliten la descarga automatizada de capítulos.

## Herramientas de desarrollo  🧰

-  **Lenguaje:** Typescript <img align="right" src="https://miro.medium.com/max/1004/1*ZfCTE6kZArxc0Nr_MybXPQ.png" width=20%></img>
    > He elegido este lenguaje debido a que usé JavaScript en anteriores asignaturas y me parece que da un enfoque interesante, así que quiero aprovechar este proyecto para aprender a utilizarlo
-  **Gestor de versiones:** Node Version Manager (nvm). Más información [AQUÍ](https://github.com/nvm-sh/nvm/blob/master/README.md)
    > He elegido este gestor de versiones porque parece ser el mejor mantenido de todos los que he barajado, además hay bastante documentación y su uso está extendido entre los desarrolladores de Node.js y Typescript.
- **Gestor de Dependencias:** Node Package Manager (npm). Más información [AQUÍ](https://www.npmjs.com/package/npm)
    > He elegido este gestor de dependencias porque es el gestor de paquetes por defecto de Node.js, además fue el que utilicé para instalar Typescript en el entorno, así que simplemente he seguido utilizándolo ya que es bastante flexible, versátil y hay mucha documentación.
- **Gestor de tareas (TaskFile: [package.json](https://github.com/ByteVictor/AnimeFLV-API/blob/master/package.json))** Node Package Manager.
    > He elegido npm como gestor de tareas ya que también lo he elegido como gestor de dependencias, de este modo puedo tener varias funciones centralizadas en una sola herramienta lo que simplifica el uso.
    El taskfile que emplea npm es el archivo package.json, es muy util ya que al instalar dependencias con npm automáticamente va añadiendo las dependencias necesarias al fichero y las clasifica como dependencias necesarias o dependencias de desarrollo.
- **Test Framework:** Mocha. Más información [AQUÍ](https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40)
    > He elegido este test framework ya que es un framework ligero, debido a que los tests que vamos a realizar serán tests simples, además me ha parecido buena elección ya que simplificar los tests sigue la "regla de oro" de las buenas prácticas del testing en Node.js y Javascript que pueden consultarse [AQUÍ](https://github.com/goldbergyoni/javascript-testing-best-practices/) 

## Tests
Como hemos comentado anteriormente en el apartado de herramientas hemos seleccionado Mocha como framework para los tests.
Mocha al ser un framework tan ligero no incluye biblioteca de aserciones, así que debemos instalar una, en este caso hemos seleccionado la que parece ser la más utilizada junto con Mocha, **Chai**.
Para instalar ambos empleamos el gestor de paquetes:

>npm install

Con el anterior comando toda la aplicación debería quedar lista para ejecutar tests, pero se pueden ver [los pasos detallados AQUÍ](https://github.com/ByteVictor/AnimeFLV-API/tree/master/docs/instalacion_mochachai/mochchai.md)

La información sobre la instalación de Mocha y otros Frameworks se ha obtenido de [AQUÍ](https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40)

### Para Ejecutar:
>npm run test

El resultado de la ejecución de los primeros tests se puede ver [AQUÍ](https://github.com/ByteVictor/AnimeFLV-API/blob/master/docs/tests/primeraejecucion.png)

### Código

Todo el código de los tests se añadirá al directorio [/tests](https://github.com/ByteVictor/AnimeFLV-API/tree/master/tests).
- El códido de los primeros tests se puede consultar [AQUÍ](https://github.com/ByteVictor/AnimeFLV-API/blob/master/tests/serie.spec.ts)

## Documentos
- [Primera aproximación al código](https://github.com/ByteVictor/AnimeFLV-API/blob/master/src/serie.ts)
Algunos atributos no cuentan con setter debido a que no se contempla que puedan cambiar después de construirse el objeto, si en un futuro son necesarios se añadirán.

- Ver los [PASOS 🦶](https://github.com/ByteVictor/AnimeFLV-API/blob/master/docs/pasos/pasos.md) a realizar 

- Ver [Historias de Usuario📚](https://github.com/ByteVictor/AnimeFLV-API/blob/master/docs/historias_usuario/historiasdeusuario.md )

- La configuración inicial de github puede verse [AQUÍ](https://github.com/ByteVictor/AnimeFLV-API/blob/master/docs/configuracion_inicial/configuracion_inicial.md)

## Autor
[Víctor González Argudo / ByteVictor](https://github.com/ByteVictor) 