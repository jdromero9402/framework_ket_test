#!/bin/bash

# Declaración de variables
ERROR='\033[0;31m'
SUCCESS='\033[0;32m'
NC='\033[0m' # No Color

ERROR_PREFIX="${ERROR}Error -${NC}"
SUCCESS_PREFIX="${SUCCESS}Success - ${NC}"

PACKAGE_NAME=$1
INSTALL_PACKAGE_JSON='SI'
INSTALL_NPM_MODULES='SI'
INSTALL_CLIENT='SI'

if [ "$2" ]
then
    if test $2 = '0'
    then
        INSTALL_PACKAGE_JSON='NO'
    fi
fi

if [ "$3" ]
then
    if test $3 = '0'
    then
        INSTALL_NPM_MODULES='NO'
    fi
fi

if [ "$4" ]
then
    if test $4 = '0'
    then
        INSTALL_CLIENT='NO'
    fi
fi

PACKAGE_JSON=./package.json

if [ ! $PACKAGE_NAME ]
then
    echo "$ERROR_PREFIX No has proporcionado un nombre para el proyecto";
    exit;
fi

echo "\n$SUCCESS_PREFIX Iniciando proceso de instalación"

if test $INSTALL_PACKAGE_JSON = 'SI'
then
    PROCESS_PACKAGEJSON=""
    echo '\n\n-------------------- INSTALACIÓN DE PACKAGE.JSON --------------------'
    PROCESS_PACKAGEJSON="$SUCCESS_PREFIX package.json instalado correctamente"
    echo '{\n  "name": "'$PACKAGE_NAME'",\n  "version": "1.0.0",\n  "scripts": {\n    "client": "npm link"\n  },  "preferGlobal": true,  "bin": "./client/client.ts",\n  "dependencies":{\n  },\n  "devDependencies": {\n    "commander": "^2.20.0",\n    "@types/node": "^12.0.10",\n    "ts-node": "~7.0.0",\n    "typescript": "~3.5.3",\n    "tslib": "^1.10.0"\n  }\n}' > $PACKAGE_JSON
    echo $PROCESS_PACKAGEJSON
    echo '---------------------------------------------------------------------'
fi

if test $INSTALL_NPM_MODULES = 'SI'
then
    PROCESS_INSTALL_NPM=""
    echo '\n\n-------------------- INSTALANDO MODULOS NPM --------------------'
    npx link-module-alias && npx link-module-alias clean || true
    npm install
    npx link-module-alias
    PROCESS_INSTALL_NPM="$SUCCESS_PREFIX Modulos NPM instalados correctamente"
    echo $PROCESS_INSTALL_NPM
    echo '---------------------------------------------------------------------'
fi

if test $INSTALL_CLIENT = 'SI'
then
    PROCESS_INSTALL_CLIENT=""
    echo '\n\n-------------------- INSTALANDO CLIENTE --------------------'
    npm run client
    PROCESS_INSTALL_CLIENT="$SUCCESS_PREFIX Cliente instalado correctamente"
    echo $PROCESS_INSTALL_CLIENT
    echo '---------------------------------------------------------------------'

    echo '\n\n-------------------- CONFIGURACIÓN INICIAL FINALIZADA --------------------'
    echo "$SUCCESS_PREFIX Hemos finalizado la configuración inicial ahora puedes proceder a instalar el framework.\nPara ello puedes utilizar el cliente de instalación usando el siguiente comando:\n"
    echo "$ ${SUCCESS} $PACKAGE_NAME build-project${NC}"
    echo '---------------------------------------------------------------------'
fi

exit