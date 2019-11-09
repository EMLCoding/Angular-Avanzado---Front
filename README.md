# AdminPro

# Rutas
En este proyecto se ha utilizado un archivo principal de rutas llamado app.routes.ts
En este archivo se encuentran las rutas "principales" que utilizará la página y estas rutas serán controladas por el <router-outlet> del archivo app.component.html

La idea es modularizar todo lo posible, por ello se crean mas archivos de rutas que van a ir relacionando los componentes, servicios y elementos compartidos.
Es decir, se crea un archivo de rutas para todos los componentes de "pages" --> pages.routes.ts . En este archivo van a ir todas las rutas (que serán rutas hijas) de todos los componentes que se vayan añadiendo en la carpeta "pages". 

Para poder separar la parte "principal" de la página de la parte "hija" (los componentes) se crea un archivo llamado "pages.component.html" el cual tendra otro <router-outlet>. La diferencia entre este y el de app.component.html es que este, el de pages, va a controlar las rutas hijas de pages.routes.ts


# Modulos
Al igual que las rutas, los modulos también deben ir segmentados.
El programa va a tener un archivo de modulos principal llamado app.module.ts y en él deben ir los modulos principales y se van a importar los modulos "hijos" (estos no son hijos como tal como si lo son las rutas)

Hay que crear un modulo para pages, otro para los servicios, otro para shared...

Por ejemplo en el pages.module.ts se va a añadir (en imports) el archivo de rutas de pages, para que luego cuando se importe pages.module.ts en app.module.ts el archivo de rutas de app pueda controlar al archivo de rutas hijas de pages