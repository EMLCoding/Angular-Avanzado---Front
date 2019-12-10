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

# Servicios
Se ha creado un archivo donde se guardan todas las rutas de todos los servicios, y exportandolo podemos usar ese archivo para poder importarlos en cualquier componente de la aplicación, y en caso de modificaciones o nuevos servicios basta con escribirlo en el service.index.ts.

También se crea un modulo para todos los servicios, así luego en el app.module.ts solo hay que añadir el módulo para tener disponibles todos los servicios.

# Atributos Personalizados
Hay atributos en HTML que no pueden ser vinculados a una variable del TS, la primera solución a esto es crear Atributos Personalizados como se ve en el siguiente código.

Archivo HTML:
<div class="progress">
    <!-- aria-valuenow es la propiedad que controla el punto de progreso de la barra de progreso.
        Por defecto no se le puede vincular a una variable de ts, saltaria un error de "Error: Template parse"
        En estos casos se puede añadir [attr.nombrePropiedad]="variable" y ahora si se puede controlar. NOTA: si la propiedad esta separa con "-" aqui se pone una mayuscula solo -->
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" [attr.ariaValuenow]="progreso"          aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" [style.width]="progreso + '%'">
    </div>
</div>

Archivo TS:
    progreso: number = 50

# @Input y @Output
Para que un componente hijo pueda recibir información desde el padre hay que realizar lo siguiente:

    1: Escribir la palabra clave '@Input()' delante de la declaración de la variable en el componente hijo. Ver: incrementador.component.ts
    2: Al llamar al componente hijo desde el html del componente padre hay que escribir el mismo nombre de la variable del ts y el valor que va a tener la variable (<app-incrementador leyenda="mi leyenda"></app-incrementador>). Ver: progress.component.html

Para que un componente hijo pueda enviar información al padre hay que trabajar con eventos utilizando el @Output
Un breve resumen de lo que habría que hacer:

    1: En el componente HIJO hay que declara el Output: @Output() nombreFuncion: EventEmitter<tipoDato> = new EventEmitter();
    2: En el componente HIJO hay que indicar en algún lado cuál es el valor que se envía. Por ejemplo si tenemos una función que calcule un valor lo suyo sería al final de la función poner algo como esto -> this.nombreFuncion.emit( this.variableAEnviar ); Ver: incrementador.component.ts
    3: En el componente PADRE hay que indicar dónde se va a recibir la información enviada por el hijo. En la declaracion del componente hijo (<app-hijo></app-hijo>) se le añade algo como lo siguiente -> (nombreFuncion)="variableQueCambia = $event". Ver progress.component.html

    NOTA: en este caso es solo una variable lo que se cambia, si fuera algo más complejo lo normal es crear una función (en el PADRE) para trabajar con los datos recibidos por el HIJO -> (nombreFuncion)="metodo($event)". 

# ViewChild
La forma de vincular un componente HTML con el TS es utilizando @ViewChild().
En el componente HTML hay que poner un indicador para el elemento que se quiere vincular al ts, utilizando "#". Por ejemplo <input #txt>
Ahora en el TS lo que hay que hacer es declarar el ViewChild de la siguiente forma -> @ViewChild('txt', {static:false}) variable: ElementRef
"variable" es la variable con la que se va a trabajar en TS que es la relacionada con el elemento HTML

Si por ejemplo (en este caso que es un input) se quiere cambiar el valor que tiene el input sería -> this.variable.nativeElement.value = this.progreso; "progreso" es una variable cualquiera con un valor cualquiera

Si se quiere tener el foco en el input con el que se está interactuando sería -> this.variable.nativeElement.focus();

Ver incrementador.component

# Forma alternativa a ViewChild para referenciar un componente HTML desde TS
Existe otra forma de hacer lo mismo que con ViewChild.
Lo primero que hay que hacer es, en el constructor del archivo TS escribir lo siguiente:
    constructor(@Inject(DOCUMENT) private _document) { }

Con esto ya se puede utilizar la varibale _document para referenciar a un componente HTML.
Por ejemplo nos creamos un metodo que cambie el estilo css en función de un string:
    cambiarColor( color: string ) {
        url: string
        this._document.getElementById('tema').setAttribute('href', url);
    }

En este ejemplo la única forma de decir que "_document" es un elemento html en concreto es buscándolo por el "id", en este caso "tema". En el componente html que se quiere referenciar habrá que poner este id. IMPORTANTE: EL ID NO DEBE ESTAR REPETIDO EN NINGÚN OTRO COMPONENTE HTML
    <link id=tema>

De esta forma da igual dónde se encuentre el componente html y donde esté el ts (respecto a la organización de las carpetas), siempre va a poder ser referenciado.

Ver settings.service.ts e index.html



AÑADIDO: También se puede pasar por parámetro de una función un componente html.
Para ello en el HTML hay que poner un indicador con "#" (como se hace con ViewChild) y en el evento (click) (o el que sea) al indicar la función se pone como parámetro el indicador -> (click)="funcion(indicador)"
Ver account-setting.component

# Cambio dinámico de Tema CSS y persistencia de ajustes
Ver settings.service.ts y account-setting.component para ver como se ha realizado el cambio de temas Css y la persistencia de la información con el LocalStorage

# Creacción de Snippets propios
En Mac: En el menú de visual Code dandole a Code -> Preferences -> User snippets.

Ahora se elige el lenguaje con el que se va a trabajar y te crea un json donde se puede escribir código para que al escribir la palabra clave te lo cambie por todo el código indicado en el json.

# Promesas
Con las promesas se pueden crear metodos que devuelvan un resolve o un reject en función de unas condiciones especificadas. Luego con este resultado se puede hacer que se realice cierta acción si por ejemplo la promesa ha devuelto un resolve.

Ver promesas.component

# Observables
Los observables, al igual que el resto de métodos, se ejecuta cuando entramos en el componente en el que está especificado el observable. Sin embargo la particularidad es que si nos movemos a otra página de la aplicación web el observador seguirá ejecutandose de manera asíncrona.

Retry -> Permite volver a ejecutar el observable en caso de que haya devuelto un error. Se puede indicar el número de intentos
Map -> Permite transformar la información que recibe el Observable para poder mostrarla de la manera en la que queremos. Si por ejemplo el observable recibe un objeto con numerosas variables, con el "map" se puede especificar que variable es la que se va a mostrar.
Filter -> Permite filtrar la información que devuelve el observable. Por ejemplo si el observable devuelve números y solo se quieren mostrar los impares entonces se utilizaría el filter.

Ver rxjs.component
También ver breadcrumbs.component para ver cómo se modifica el título de cada página graficas a un observable

# Login de Google
Lo primero de todo es cargar la página de Google API, buscar el proyecto y guardar el ID de cliente. Para este proyecto esta información estaría en: https://console.cloud.google.com/apis/credentials/oauthclient/441659999765-udg5kb9u60e96lfg06pa4vnknc5ft8hl.apps.googleusercontent.com?project=canvas-verve-259910&authuser=1

Lo siguiente es abrir el archivo index.html y en el HEAD añadir las siguientes líneas de código:
<script src="https://apis.google.com/js/platform.js"></script>
    <meta name="google-signin-client_id" content="441659999765-udg5kb9u60e96lfg06pa4vnknc5ft8hl.apps.googleusercontent.com">
El numerito de 'content' habría que cambiarlo por el ID de cliente (en este caso para este proyecto estaría bien así)

Lo siguien es en el archivo login.component.ts hay que declarar la variable que se va a utilizar para manejar la librería de Google (importada previamente)

Seguido de esto, en el mismo archivo, se va a crear el método googleInit():
    Ver código en el propio archivo, el profesor del curso modifica el código oficial de: https://developers.google.com/identity/sign-in/web/listeners

# Guards
Los Guards se utilizan para evitar que se pueda acceder a ciertas partes de la aplicación si no se cumplen unas condiciones. Por ejemplo que no se pueda acceder a los componentes de la aplicación si no se ha hecho login previamente.

Lo primero que hay que hacer es crear el Guard

En el archivo routing de las rutas que queramos proteger habrá que añadir algo como lo siguiente: canActivate: [LoginGuardGuard] dentro del 'path' padre (ver pages.routes.ts)

Ver servicios -> guards y usuario.service

# Lazy Load
Ver app.routes.ts, app.module.ts, pages.routes.ts y pages.modules.ts

# Generar versión de producción
Ejecutar el siguiente comando en la terminal de Visual Studio del proyecto Front: ng build --prod

Luego hay que abrir una nueva terminal y viajar a la carpeta 'dist' del proyecto (esta se genera al utilizar el comando anterior) y ejecutar el comando 'http-server -o' (para que este funcione antes hay que instalar el http-server: npm install http-server -g)

En el archivo 'index.html' de la carpeta 'dist/AdminPro' se ha tenido que comentar la línea '<base href="/">' para que no de problemas con las rutas relativas de la aplicación