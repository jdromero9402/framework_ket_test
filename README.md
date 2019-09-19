# KET - Backend Framework

# 1. Trabajar con el framework

## 1.1 Antes de iniciar

Para la implementación de este framework se requiere tener instalado en la máquina local los siguientes paquetes de software

- Git:
	- https://git-scm.com/
- NodeJS & NPM:
	- **NodeJS**: Se recomienda trabajar con la versión 10.15.3 o superior
		https://nodejs.org/es/
	- **NPM**: Se recomienda trabajar con la versión 6.4.1 o superior

- TypeScript y TypeScript Node:
    `$ npm install -g typescript ts-node`
- Types node: 
	`$ npm install -g @types/node`
	
- MongoDB
	- https://www.mongodb.com/
	- Para instalar en un servidor Linux - Ubuntu
			Install mongodb in Ubuntu 12.04, 14.04 ,16.04 

			1. Import the public key used by the package management system
				
				$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
				
			2. Create a list file for MongoDB.
				- In Ubuntu 12.04 (deprecated):
					echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
					
				- In Ubuntu 14.04:
					echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
					
				- In Ubuntu 16.04:
					echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
					
			3. Reload local package database.
				sudo apt-get update
			4. Install the MongoDB packages.
				sudo apt-get install -y mongodb-org
			
			After installation you can start MongoDB using
				- sudo service mongod start
				- sudo service mongod stop
				- sudo service mongod restart



	
- Debido a que se trabajara con typescript se recomienda el uso de editores de texto que permitan la implementación de plugins para la sintaxis y compilación de dicho lenguaje ya que facilita el desarrollo:
	- **SublimeText**: https://www.sublimetext.com/
	- **Visual studio code**: https://code.visualstudio.com/
	- **Atom**: https://atom.io/
	
## 1.2 Instalación

Para el desarrollo con el framework existen dos posibles caminos que podemos tomar. 
1. **Creación de un proyecto**: Iniciar un proyecto desde cero.
2. **Proyecto existente**: Iniciar un proyecto existente basado en el framework.

## 1.3 Creación de un proyecto
Para la creación de un proyecto de software basado en el framework **KET** se requieren realizar los siguientes pasos:

- Clonar el repositorio al directorio deseado utilizando el siguiente comando:
	`$ git clone https://github.com/kuepa/frameworkBackendKET my_app`
	
- Posicionarnos en el directorio de nuestro proyecto:
	`$ cd my_app`
	
- Eliminar el directorio **.git** (oculto por defecto)
	`$ sudo rm -R .git`
	
- Inicializar el proyecto
	`$ sh init.sh name_package`
	-  **name_package:** Será el nombre del proyecto, debe escribirse sin espacios ni caracteres extraños. Ej: "sis_ket"
- Verificar estado del cliente del framework
	`$ name_package --help` Ej: sis_ket --help
	
	- **NOTA**: El cliente es una herramienta de consola que permite al usuario lanzar tareas y acciones propias del framework y otras configurables por el mismo usuario a través de la consola de comandos del sistema. Este cliente quedará instalado de forma global en el host tomando el **nombre** que hayamos configurado previamente en la inicialización **name_package**

- Configurar proyecto según los criterios locales. Para ello utilizaremos el cliente para lanzar la herramienta que permitirá configurar el proyecto en forma local
	`$ name_package build-project`

- En este momento tenemos un proyecto listo para funcionar por lo tanto solo queda generar su repositorio en Github.
	- `$ git init`
	- `$ git remote add origin https://github.com/user/example.git`
	- `$ git push -u origin master`

## 1.4 Proyecto existente
Para la instalación de un proyecto de software basado en el framework **KET** existente se requieren realizar los siguientes pasos:

- Clonar el repositorio al directorio deseado utilizando el siguiente comando:
	`$ git clone https://github.com/user/example.git my_app`
	
- Posicionarnos en el directorio de nuestro proyecto:
	`$ cd my_app`
	
- Inicializar el proyecto
	`$ sh init.sh name_package`
	-  **name_package:** Será el nombre del proyecto, debe escribirse sin espacios ni caracteres extraños. Ej: "sis_ket"
	
- Verificar estado del cliente del framework
	`$ name_package --help` Ej: sis_ket --help
	
	- **NOTA**: El cliente es una herramienta de consola que permite al usuario lanzar tareas y acciones propias del framework y otras configurables por el mismo usuario a través de la consola de comandos del sistema. Este cliente quedará instalado de forma global en el host tomando el **nombre** que hayamos configurado previamente en la inicialización **name_package**

- Configurar proyecto según los criterios locales. Para ello utilizaremos el cliente para lanzar la herramienta que permitirá configurar el proyecto en forma local
	`$ name_package build-project`

# 2. Introducción al framework

## 2.1. Scaffolding

Si ya has instalado y configurado un proyecto tendrás disponible una estructura de carpetas como se muestra a continuación:

- **app** - (Directorio principal del framework donde se aloja la lógica y funcionalidad del proyecto)
    - controllers
    - middlewares
    - models
	- public
    - resources
        - langs
		- responses
    - routes
    - services
        - default
        - v_versions
	- views
		- email_templates
			- templates
    - app.ts
    - server.ts
- **client** - (Herramienta de consola de comandos)
    - programs
		- structure
        - tasks
    - client.ts
- **config** - (Archivos de configuración y personalización)
    - env.json
    - globals.ts
	- package.json
- **dist** - (Directorio donde se compila el proyecto para producción)
- **ket_modules** - (Módulos CORE del Framework)
    - client
        - programs
            - structure
            - tasks
        index.ts
	- config
		- app_config_files
		- databaseSequelize.js
		- globals.ts
    - middlewares
	- public
    - resources
        - langs
        - responses
            - errors.ts
            - success.ts
	- routes
    - services
        - default
        - v_versions
    - utilities
	- views
		- email_templates
			- layout
			- templates
- **migrations** - (Directorio que aloja las migraciones de base de datos)
- **public** - (Directorio público)
- **resources** - (Recursos)
- **seeders** - (Directorio que aloja los seeders de base de datos)
- **typings**
- **views**
- **.sequelizerc** - (Archivo de configuración Sequelize)
- **nodemon.json** - (Archivo de configuración Nodemon)
- **package.json** - (Archivo de configuración Nodejs)
- **README.md**
- **tsconfig.json** - (Archivo de configuración TypeScript)


## 2.2 Descripción del Scaffolding

### App
------------
El directorio APP es el principal del Framework. Es donde se almacena toda la lógica de programación de un proyecto, persistencia de datos, gestión de servidores, etc.

### - Controllers
------------
Los controladores son la capa de software que actúa como intermediario entre los modelos y la presentación de los datos, para este caso son quienes gestionan el flujo de información y la transforman para adaptar la respuesta necesaria.

Por defecto todos los controladores se almacenan bajo el sub-directorio **"default"** y bajo este se puede seguir una herencia de directorios personalizado.

### - Middlewares
------------
Los middlewares son bloques de funciones que permiten controlar el flujo de una petición y se usan principalmente para restringir o aplicar acciones sobre una petición específica.

Bajo este directorio se almacenan todos los middlewares sin jerarquías.

### - Models
------------
Los modelos son quienes forman la representación de los datos de una Base de datos, contiene la lógica del negocio y los mecanismos de persistencia.

Bajo este directorio se almacenan todos los modelos sin jerarquías.

### - Public
------------
El directorio público a nivel de aplicación permite agregar cualquier tipo de recurso que su contexto lo haga público, es decir, que podrán ser accedidos por cualquier persona a través de una URL. Un ejemplo de ello pueden ser imágenes, archivos css, archivos javascript etc.

Los archivos que acá se alojen seran automaticamente clonados al directorio público de la raíz del proyecto junto con los que se alojen en el directorio public del **CORE**

### - Resources
------------
El directorio "resources" del app se encarga de almacenar diferentes componentes útiles para el framework, se subdivide de la siguiente forma:
- **Langs**: Directorio que aloja los archivos de internacionalización.
- **Responses**: Directorio donde se almacenan todos los formatos de respuesta del sistema.

### - Routes
------------
El directorio "routes" almacena todo lo correspondiente al enrutamiento del proyecto. Cada controlador del sistema tiene también su archivo de enrutamiento por lo cual cada ruta que se desee escribir deberá hacerse dentro del archivo enrutador que corresponda.

Por defecto todos los enrutadores se almacenan bajo el sub-directorio **"default"** y bajo este se puede encontrar una herencia de directorios que corresponderá a la de los controladores.

### - Services
------------
El directorio "services" almacena toda la lógica de funcionamiento del proyecto. Todos los metodos que aqui se alojen deben ser bloques de código que cumplen con solicitudes específicas y retornan cierta información.

Cada servicio tiene la propiedad de ser versionado, lo cual permite que el funcionamiento que contenga pueda ser alterado sin llegar a modificar o dañar su versión anterior.

Por defecto todos los controladores se almacenan bajo el sub-directorio **"default"** y bajo este se puede seguir una herencia de directorios personalizado.

Las versiones se almacenan en directorios que están al nivel de **default** bajo el prefijo **v_folder_name**.

### - Views
------------
El directorio views a nivel de la aplicación es donde el usuario podrá colocar todo lo relacionado a interface y bloques de código html, js, css, templates para emails, etc. Cualquier vista que este en este directorio tendrá prioridad sobre cualquier otra vista en otras jerarquías. La subdivisión de directorios está libre al criterio del usuario.

### - app.ts
------------
Archivo principal del proyecto, se encarga de realizar todas las configuraciones, inicializaciones, declaraciones, etc. que son necesarias para el funcionamiento del proyecto.

### - server.ts
------------
Archivo principal del proyecto, se encarga de inicializar el servidor y lanzar la configuración del proyecto (app.ts)

### Client (Programas)
------------
El directorio "client" almacena todas las tareas y/o procesos recurrentes. Las tareas/procesos que acá se encuentran son comandos que pueden ser ejecutados a través de la consola de comandos del sistema, cumplen una función específica y terminan su ejecución inmediatamente.

Por defecto todos los programas se almacenan bajo el sub-directorio **"programs"** y bajo este se puede seguir una herencia de directorios personalizado.

### Config
------------
Directorio de archivos de configuración. Cuenta con varios archivos que permiten configurar el sistema según entornos de trabajo.
- **env.json**: El archivo env.json es quien contiene todos los parámetros de configuración personalizables.
- **globals.ts**: Almacena parámetros de configuración estáticos para el proyecto. 

### Ket_modules
------------
Es el directorio de los módulos **CORE del framework** y en su interior poseen una estructura similar al del framework.

### Migrations
------------
Las migraciones son como el control de versiones para su base de datos, lo que le permite al equipo modificar y compartir fácilmente el esquema de la base de datos de la aplicación.

### Public
------------
Directorio público del proyecto, es donde se puede almacenar todo aquello que se desee esté accesible desde un navegador a través de una URL (imágenes, audios, videos, etc). Este directorio se crea y alimenta de forma automática por lo tanto el usuario **NO** requiere realizar ningún trabajo en este directorio.

### Resources
------------
El directorio "resources" se encarga de almacenar diferentes componentes útiles para el framework. Este directorio se crea y alimenta de forma automática por lo tanto el usuario **NO** requiere realizar ningún trabajo en este directorio.

### Seeders
------------
Los seeders permiten almacenar datos en la base de datos utilizando una sencilla clase semilla. En este directorio se alojan dichos archivos.

### Typings
------------
Directorio donde se alojan configuraciones particulares para la sintaxis de typescript. Este directorio se crea y alimenta de forma automática por lo tanto el usuario **NO** requiere realizar ningún trabajo en este directorio.

### Views
------------
El directorio views a nivel del proyecto permite consolidar todos los archivos "views" de las demás jerarquías. Este directorio se crea y alimenta de forma automática por lo tanto el usuario **NO** requiere realizar ningún trabajo en este directorio.

### .sequelizerc
------------
Archivo de configuración para la libreria [sequelize](http://docs.sequelizejs.com/ "sequelize")

### nodemon.json
------------
Archivo de configuración para libreria [nodemon](https://www.npmjs.com/package/nodemonhttp:// "nodemon")
### package.json
------------
Archivo de configuración de NodeJS. Contiene gran parte de la configuración del proyecto

### tsconfig.json
------------
Archivo de configuración de TypeScript. Contiene gran parte de la configuración del proyecto


## 2.3 Headers
En cada petición HTTP es posible anexar información adicional a los parámetros mismos, para esto se usan los **Headers**. Cada header cumple una función específica y permite almacenar cierta información. A continuación se presentan algunos headers específicos y la función que cumplen al interior del framework:

- **Versioning**: Permite enviar el versionamiento de la petición. Es utilizado al interior del framework para determinar el punto lógico hacia dónde debe apuntar la petición.
- **Accept-Language**: En este header se permite enviar un string con el idioma o lenguaje con el cual la petición procesa la información y retorna las respuestas.
- **Authorization**: Cabecera de autorización en la cual se puede anexar un token de autenticación que será utilizado por el framework para validar el acceso al sistema.
- **Refresh-Token**: Este header tiene como función determinar si el token de autenticación debe ser refrescado (actualizado) y retornado.
- **Source**: Cabecera que permite almacenar el proyecto que originó la petición.


# 3. Mi proyecto
Si ya has configurado todo el proyecto y estás listo para iniciar la escritura de código es momento de poner en marcha los servicios.

## 3.1 Variables de configuración según el entorno (env.json)
Antes de iniciar los servicios es necesario crear y configurar el archivo de entorno. Para ello seguiremos los siguientes pasos:

- Nos ubicamos en el directorio **./config**
	`$ cd my_app/config`
	
- Crearemos el archivo **env.json** utilizando el siguiente comando
	`$ mkdir env.json`
	
- Como es un archivo de tipo **JSON** utilizaremos la sintaxis que acá corresponde

- Configuraremos el archivo según las necesidades del proyecto y guardaremos la información.

- **NOTA: Recuerda que este archivo es de carácter local y por lo tanto no debe realizarse el versionamiento del mismo**

## 3.2 Descripción del archivo "env.json"
El archivo env.json como ya se mencionó anteriormente es el encargado de brindar la configuración del proyecto a nivel del entorno. A continuación se presentan los elementos que conforman el archivo:

- **environment (string)** **(*)**: Entorno de desarrollo sobre el cual se ejecuta el proyecto (dev) 
- **server_port (number)** **(*)**: Puerto del servidor
- **uploads_dir (string)** **(*)**: URL del directorio uploads (Ex: http://127.0.0.1:3000/uploads ó http://ket-framework.com/uploads)
- **public_dir (string)** **(*)**: URL del directorio publico (Ex: http://127.0.0.1:3000 ó http://ket-framework.com)
- **ecosystem_pm2 (Array[Objects])** **(*)**: Array de objetos que contienen las configuraciones para el lanzamiento del deploy en producción
	- name (string): Nombre que se asignará a los procesos PM2. (Ex: "ket-test")
	- script (string): Ruta relativa del script que se ejecutará con PM2. (Ex: "/usr/local/bin/node")
	- args (string): Complemento del script (Ex: "-r ./node_modules/tsconfig-paths/register ./dist/app/server.js")
	- instance (string | number): Número de conexiones o procesos que se iniciarán. (Ex: 4 | "max")
	- exe_mode (string): (Ex: "cluster")
	- env (Object): Variables de configuración según entorno
		- NODE_ENV (string): (Ex: "development")
	- env_production (Object): Variables de configuración según entorno
		- NODE_ENV (string): (Ex: "production")
- **dist_dir (string)**: Directorio donde se compilan los archivos para lanzar a producción.
- **ssl (Boolean)**: Variable binaria (true, false) que indica si se está usando el protocolo seguro SSL
- **jwt_secret (object)**: Conjunto de claves secretas para la generación de tokens JWT
	- local (string): Token del proyecto local
	- **NOTA**: En este grupo pueden haber tantas llaves como proyectos pueda desencriptar
- **secret_jwt (string)**: Llave secreta para la generación de tokens JWT
- **jwt_exp (object)**: Duración de un token JWT
	- amount (integer): Cantidad numérica (integer) de la duración (Ex: 30)
	- unity (string): Unidad de tiempo (moment: https://momentjs.com/docs/) (Ex: days)
- **database (object)**: Configuración de la BD
	- **driver (string)**: Motor de base de datos a usar (mongodb | mysql | mariadb | postgres | mssql | sqlite)
		**NOTA: Solo se permite una conexión a BD por lo cual solo es posible tener una de las siguientes configuraciones**
	- **mongodb (object)**: Configuración de base de datos MongoDB
		- host (string): (Ex: "localhost:27017")
		- dbname (string)
	- **mysql | mariadb | postgres | mssql (object)**: Configuración de base de datos MySql
		- database (string)
		- host (string)
		- username (string)
		- password (string)
		- port (integer)
		- dialect (string)
	- **sqlite (object)**: Configuración de base de datos Sqlite
		- storage (string): (Ex: "path/to/database.sqlite")
- **default_language (string)**: Lenguaje por defecto del sistema (es | en)
- **languages (array)**: Array de los lenguajes aceptados por el sistema (Ex: ["es","en"])
- **external_api (object)**: Paquete de URLs para conexiones con sistemas externos
	- ket_lms (string): (Ex: http://site-url.com)
	- ket_crm (string): (Ex: http://site-url.com)
	- ket_sis (string): (Ex: http://site-url.com)
	- ket_main (string): (Ex: http://site-url.com)
- **mailer (object):** Configuración de la herramienta para envío de emails
	- **driver (string):** Metodo/Servicio para envio de emails (smtp | ses)
	- **from (string< email@email.com >):** Email que identifica quien envía el email (Ex: email@email.com)
	- **smtp (object):** Configuración del protocolo SMTP para el envío de emails
		- host (string)
		- port (string)
		- username (string)
		- password (string)
		- smtpauth (boolean)
	- **ses (object):** Configuración de Amazon SES para envio de emails
		- credentials (string)
- **attached (object):** Configuración de la herramienta de carga/almacenamiento de archivos
	- **driver (string):** Metodo/Servicio para carga/almacenamiento de archivos (server | s3)
	- **server (object):** Configuración para cargar archivos en servidor local
	- **s3 (object):** Configuración de Amazon S3.

- **aws (Object<{}>)**: Configuración de Amazon Console
	- S3 (Array<{ AmazonS3Config }>): Configuraciones para Amazon S3
	- SES (Array<{ AmazonSESConfig }>): Configuraciones para Amazon SES
	- **AmazonS3Config**: La configuración para amazon S3 debe contar con la siguiente estructura
	
			{
				"key": "Identificador de la configuración",
                "AWS_ACCESS_KEY" : "Llave pública de Amazon (IAM)",
                "AWS_SECRET_ACCESS_KEY" : "Llave secreta de Amazon (IAM)",
                "REGION" : "Región donde se aloja el bucket",
                "Bucket" : "Nombre del bucket"
            }
			
	- **AmazonSESConfig**: La configuración para amazon SES debe contar con la siguiente estructura
	
			{
				"key": "Identificador de la configuración",
                "AWS_ACCESS_KEY" : "Llave pública de Amazon (IAM)",
                "AWS_SECRET_ACCESS_KEY" : "Llave secreta de Amazon (IAM)",
                "REGION" : "Región donde se aloja el bucket"
            }
			
**NOTA: Los elementos marcados con (*) son de carácter obligatorio.**

## 3.3 Deploy del proyecto en desarrollo

Antes de iniciar los servicios es necesario realizar un deploy del proyecto en modo desarrollo, esto hará que las configuraciones se inicializan y se generen las dependencias necesarias para el funcionamiento del proyecto. Adicionalmente 
si estás trabajando en un proyecto ya inicializado seguramente necesitarás que tu proyecto esté actualizado y en su última versión. Este proceso consta de una serie de pasos que deben ejecutarse de forma secuencial, es por esto que el cliente del framework proporciona una herramienta que realiza estos pasos y verifica los requisitos mínimos para el deploy de forma automática. A continuación se describen las acciones que se realizan al momento de generar el deploy:

- Descarga (desde el repositorio de versionamiento) las últimas actualizaciones del proyecto
- Descarga (desde el repositorio de versionamiento) las últimas actualizaciones del **CORE**
- Generación e inicialización de dependencias
- Ejecuta las migraciones de base de datos

El deploy se puede realizar a través del cliente dando uso al siguiente comando:

`$ name_package deploy dev [--not_download_local] [--not_download_core] [--not_migrate]`

- **not_download_local**: Durante el deploy no se descargan cambios del proyecto local
- **not_download_core**: Durante el deploy no se descargan cambios del CORE
- **not_migrate**: Durante el deploy no se realizan migraciones


## 3.4 Iniciar servicios

El cliente del framework provee una herramienta que facilita la inicialización de los servicios. Esta herramienta se encarga de realizar las verificaciones propias del entorno de desarrollo, generar los directorios necesarios y finalmente lanzar los servicios web.

### 3.4.1 Modo desarrollo
------------

A continuación se presenta el comando con el cual se podrá lanzar dicha herramienta en modo desarrollo:

`$ name_package launch`

### 3.4.2 Modo producción
------------

A continuación se presenta el comando con el cual se podrá lanzar dicha herramienta en modo producción:

`$ name_package launch --prod`

# 4. Herramientas del framework

## 4.1 Cliente (Administrador de programas)
El framework proporciona un cliente (Herramienta de consola) para la ejecución de tareas/procesos recurrentes con el objetivo de facilitar y estandarizar el desarrollo y construcción del proyecto.

Está diseñado para contener todas las tareas/procesos que estén relacionadas con el funcionamiento del framework. Las categorías de procesos que se permiten son:

- Instalación y configuración
- Estructuración de la arquitectura del sistema
- Actualizaciones y parches
- Procesos recurrentes

#### - Instalación del proyecto
El cliente trae un instalador que permite al usuario como su nombre lo indica instalar el proyecto y sus dependencias.

`$ name_package build-project --help`

#### Gestión del framework

Algunas de las principales funciones de este cliente son:

- **Generación de nuevas herramientas del cliente**: Esta herramienta permite al usuario generar nuevas herramientas que estarán disponibles en el cliente para su futuro uso.
	`$ name_package generate-client-program --help`

- **Generación de controladores**: Esta herramienta permite al usuario generar nuevos controladores para la escritura de funciones del sistema y junto con estos su enrutador específico.
	`$ name_package generate-controller --help`

- **Generación de templates para emails**: Esta herramienta permite al usuario crear templates que pueden ser usados para el envío de emails.
	`$ name_package generate-email-template --help`

- **Generación de middlewares**: Esta herramienta permite al usuario generar nuevos middlewares para el control del flujo del proyecto.
	`$ name_package generate-middleware --help`

- **Generación de modelos**: Esta herramienta permite generar modelos con el formato requerido para el uso de bases de datos.
	`$ name_package generate-model --help`

- **Generación de servicios**: Esta herramienta permite generar nuevos servicios para la ejecución de procesos lógicos del proyecto.
	`$ name_package generate-service --help`

- **Generación de servicios versionados**: Esta herramienta permite generar nuevos servicios permiten el versionamiento de procesos lógicos del proyecto.
	`$ name_package generate-service-version --help`

- **Generación de utilidades**: Esta herramienta permite generar nuevas utilidades para escritura de código fuente con propósitos generales y encapsulados.
	`$ name_package generate-utility --help`

- **Instalación de paquetes NPM**: Esta herramienta permite la instalación de paquetes NPM tanto a nivel local como del CORE
	`$ name_package install-package --help`
	- **NOTA: Este es el ÚNICO método permitido para la instalación de dependencias.**

Algunos procesos de ejecución recurrente también pueden ser soportados por el framework:

- **Deploy**: Esta herramienta permite hacer el deploy del proyecto en producción y desarrollo.
	`$ name_package deploy --help`
	
- **Lanzar servicios**: Esta herramienta permite poner en marcha los servicios del framework
	`$ name_package launch --help`
	
- **Migrate**: Esta herramienta permite generar y ejecutar las migraciones en Base de datos
	`$ name_package migrate --help`
	
- **Seeders**: Esta herramienta permite generar y ejecutar los seeders en Base de datos
	`$ name_package seed --help`

## 4.2 KORET (ORM)
**KORET** es un ORM lite que permite la gestión de base de datos basadas en Mysql y Mongodb. Esta diseñado específicamente para funcionar en el framework permitiendo interpretar métodos de consulta, creación, actualización y eliminado.

**KORET** funciona a partir de las librerias [mongoose](https://mongoosejs.com/ "mongoose") y [sequelize](http://docs.sequelizejs.com/ "sequelize").

### 4.2.1 Migraciones
------------
Las migraciones permiten administrar y dar seguimiento a los cambios en la base de datos. Con las migraciones puede transferir su base de datos existente a otro estado y viceversa, esas transiciones de estado se guardan en archivos de migración que describen cómo llegar al nuevo estado y cómo revertir los cambios para volver al estado anterior.

**KORET** tiene incluida una herramienta que permite gestionar y dar soporte a dichas migraciones.

#### 4.2.1.1 Generar migraciones
------------
Para generar migraciones puedes lanzar el siguiente comando:

`$ name_package migrate [--create] [--update] [--model]`

- **create**: Nombre con el cual se generará la migración. La migración tendrá una estructura de nueva tabla
- **update**: Nombre con el cual se generará la migración. La migración tendrá una estructura de actualización de tabla
- **model**: Nombre del modelo sobre el cual está creando la migración

#### 4.2.1.2 Ejecutar migraciones
------------
Para lanzar migraciones puedes utilizar el siguiente comando:

`$ name_package migrate [--revert] [--revert_all] [--revert_to]`

- **revert**: Revierte la última migración ejecutada
- **revert_all**: Revierte todas las migraciones
- **revert_to**: Revierte hasta la migración indicada (Se debe proporcionar el nombre completo de la migración Ex: XXXXXXXXXXXXXX-demo-user.js)

### 4.2.2 Seeders
------------
Los seeders son herramientas que permiten administrar y dar seguimiento a los datos en base de datos. Supongamos que queremos insertar algunos datos en algunas tablas de forma predeterminada para ello generamos un archivo seeder e incluimos la lógica que esté relacionada y luego ejecutamos el seeder, esto hará que nuestra data se almacena en nuestra BD.

**KORET** tiene incluida una herramienta que permite gestionar y dar soporte a dichos seeders.

#### 4.2.2.1 Generar un seeder
------------
Para generar un seeder puedes lanzar el siguiente comando:

`$ name_package seed --create seeder-name`

- **create**: Nombre del seeder a generar. Esta cadena de texto se escribe en minuscula separada cada palabra por el carácter (-) (Ex: seeder-name)

#### 4.2.2.2 Ejecutar seeders
------------

Para lanzar seeders puedes utilizar el siguiente comando:

`$ name_package seed [--force] [--class]`

- **force**: Si se proporciona este parámetro el seeder se forzara a ejecutar sin restricciones. Nombre del seeder a ejecutar  (Ex: seeder-name) 
- **class**: Si se proporciona este parámetro se ejecutara solo este seeder, con restricciones. Nombre del seeder a ejecutar  (Ex: seeder-name)

# 5. Deploy del proyecto en producción

Hacer el deploy del proyecto en producción significa que iniciaremos los procesos y servicios necesarios para que nuestra distribución esté disponible a nuestros usuarios, para ello debemos contar con los siguientes requisitos:

- **Hosting**: Dispositivo físico o virtual que aloja nuestro proyecto
- **Servidor HTTP**: Herramienta de software que permite servir contenido en la Web
	- Apache
	- Nginx
- **Node JS**: --
- **Git**: --

## 5.1 Configurar servidor HTTP

Antes que podamos iniciar nuestros proyecto como servicio web es necesario configurar nuestro servidor HTTP. A continuación se muestra una configuración básica según el software utilizado.

### 5.1.1 Apache

Si se ha escogido apache como servidor HTTP se da por entendido que este ya está instalado e inicializado en nuestro Hosting.

#### 5.1.1.1 Proxy reverse
https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04

- Como primer paso es necesario verificar si el módulo proxy de apache está habilitado de lo contrario será necesario habilitarlo.
	- mod_proxy
	- mod_proxy_http
	- mod_proxy_balancer
	- mod_lbmethod_byrequests


			sudo a2enmod proxy
			sudo a2enmod proxy_http
			sudo a2enmod proxy_balancer
			sudo a2enmod lbmethod_byrequests
			
			sudo service apache2 restart


#### 5.1.1.2 Virtual host

- Como primer paso es necesario verificar si el módulo de virtualización de apache está habilitado de lo contrario será necesario habilitarlo.

- Crear un virtual host siguiendo el siguiente patrón

		<virtualhost *:80>
			ServerName kettest.kuepa.com
			ServerAlias *.kettest.kuepa.com

			ProxyPreserveHost On

			ProxyPass / http://127.0.0.1:3000/
			ProxyPassReverse / http://127.0.0.1:3000/

		</virtualhost>

- Habilitar el virtual host para que esté disponible

	`$ sudo service apache2 restart`


### 5.1.2 Nginx (En construcción)

--

## 5.2 Disponibilidad del puerto

Antes de continuar es necesario identificar si el puerto que vamos a usar en nuestro proyecto no está en uso

## 5.3 Generar deploy

El deploy del proyecto consta de una serie de pasos que deben ejecutarse de forma secuencial, es por esto que el cliente del framework proporciona una herramienta que realiza estos pasos y verifica los requisitos mínimos para el deploy de forma automática. A continuación se describen las acciones que se realizan al momento de generar el deploy:

- Detiene los servicios y/o procesos que se ejecutan a nivel del servidor
- Descarga (desde el repositorio de versionamiento) las últimas actualizaciones del proyecto
- Descarga (desde el repositorio de versionamiento) las últimas actualizaciones del **CORE**
- Generación e inicialización de dependencias
- Elimina el directorio actual de distribución
- Reconstruye el directorio de distribución y compila los directorios auxiliares
- Ejecuta las migraciones de base de datos
- Inicia los servicios y/o procesos que se ejecutan a nivel del servidor

El deploy se puede realizar a través del cliente dando uso al siguiente comando:

`$ name_package deploy prod [--not_download_local] [--not_download_core] [--stop_server] [--not_migrate]`

- **not_download_local**: Durante el deploy no se descargan cambios del proyecto local
- **not_download_core**: Durante el deploy no se descargan cambios del CORE
- **stop_server**: Durante el deploy se detienen los servicios
- **not_migrate**: Durante el deploy no se realizan migraciones

# Errores conocidos

- Si se presentan errores de permisos para instalar o ejecutar algunos programas del framework se recomienda utilizar las siguientes líneas según el caso:

		$ sudo chown -R $USER:$GROUP /usr/local/bin
		$ sudo chown -R $USER:$GROUP ~/.npm
		$ sudo chown -R $USER:$GROUP ~/.config

- En algunos casos será necesario configurar las credenciales de Github al sistema

		$ git config --global user.name "John Doe"
		$ git config --global user.email johndoe@example.com



