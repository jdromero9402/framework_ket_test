// @import_dependencies_node Import libraries
import * as fs from 'fs';
import * as path from "path";
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// @end

class BuildProjectProgram {

    private version     = '1.0.0';
    private description = 'Construcción y configuración de un proyecto basado en el framework';
    private command     = 'build-project';

    private example_command = 'build-project';

    constructor() {}

    public config = {
        ket_modules_repo: 'https://github.com/kuepa/coreBackendKET.git',
    
        package_name              : null,
        package_json_dir          : null,
        core_path_dir             : null,
        core_dir                  : 'ket_modules',
        env_file_path             : null,
        env_file_dir              : 'config/',
        env_file_name             : 'env.json',

        version    : null,
        description: null,

        app_config_dir: 'ket_modules/config/app_config_files/',
        app_config_files: {
            'tsconfig'    : {filename: 'tsconfig.json', action: 'copy', target: '/'},
            'express_type': {folder: 'express', action: 'copy', target: 'typings/'},
            'gitignore'   : {filename: 'core.gitignore', action: 'copy', target: '/', alias: '.gitignore'}
        },

        package_json_config: {
            global: 'ket_modules/config/app_config_files/',
            local: 'config/'
        }
    }

    /**
     * Metodo que agrega un programa a la lista de ejecucion
     * @param program Objeto de clase Commander
     */
    addProgram = (program) => {

        //
        // ─── INICIALIZAR EL PROGRAMA DE CONSOLA ──────────────────────────
        //

            program
                .version(this.version)
                .description(this.description)
                .command(this.command)
                .action((options) => {
                    var base_dir                               = __dirname.split('client');
                        this.config.app_config_dir             = base_dir[0] + this.config.app_config_dir;
                        this.config.package_json_config.global = base_dir[0] + this.config.package_json_config.global + 'package.json';
                        this.config.package_json_config.local  = base_dir[0] + this.config.package_json_config.local + 'package.json';
                    
                    this.run();
                });
        //
        // ─────────────────────────────────────────────────────── END ─────
        //
    }

    /**
     * Metodo principal que contiene la logica del programa
     */
    private run = async () => {
        // Build logic

        var base_dir = __dirname.split('client');

        this.config.package_json_dir           = base_dir[0] + 'package.json';
        this.config.core_path_dir              = base_dir[0] + this.config.core_dir;
        this.config.env_file_path              = base_dir[0] + this.config.env_file_dir + this.config.env_file_name;
        
        var clone_ket_modules = await this.cloneKetModules(); // Clonar modulos CORE
        
        if (clone_ket_modules === true) {

            var init_env_file = await this.initEnvFile();

            if (init_env_file === true) {

                var update_package = await this.updatePackageFile(); // Actualizar package.json
    
                if (update_package === true) {
                
                    var build_config_file = await this.buildConfigFiles();
                    
                    if (build_config_file === true) {

                        var install_node_modules = await this.installNodeModules('npm install');

                        if (install_node_modules === true) {
                            console.log(' ------ ¡¡¡CONFIGURACION DEL PROYECTO COMPLETADA!!! ------ ');
                        }
                    }
                }

            }
        }

        process.exit(1); // End program (0 => Success, 1 => Error)
    }

    /**
     * Metodo que permite unir la información de dos package json
     * @param file Ruta donde se aloja el JSON
     * @param package_json JSON sobre el cual se integrara la información
     * @returns  
     */
    private mergePackageJson = (file,package_json) => {
        try {
            fs.statSync(file).isFile();
            var json_config = require(file);
            package_json = this.mergeJson(package_json,json_config);
        } catch (err) {}

        return package_json;
    }

    /**
     * Metodo que permite integrar dos objectos JSON
     * @param target JSON sobre el cual se desea agregar la información
     * @param origin JSON desde el cual se desea obtener la información
     * @returns  
     */
    private mergeJson = (target, origin) => {
        
        if (Array.isArray(origin)) {
            origin.map((element,key) => {
                if (target.indexOf(element) === -1) {
                    target.push(element);
                }
            })
        } else if (typeof origin === 'object') {
            for (const key in origin) {
                if (origin.hasOwnProperty(key)) {
                    const element = origin[key];
                    if (target.hasOwnProperty(key)) {
                        target[key] = this.mergeJson(target[key],element)
                    } else {
                        target[key] = element;
                    }
                }
            }
        } else {
            target = origin;
        }
        return target;
    }

    /**
     * Metodo que permite clonar los modulos CORE
     */
    private cloneKetModules = async () => {
        console.log(`------------------------ Descargando modulos CORE ----------------------------`);
        var response = false;

        var exists = false;
        try {
            var source_lstat = fs.lstatSync( this.config.core_path_dir );
            if (source_lstat.isDirectory()) {
                exists = true;
            }
        } catch(err) {}

        if (exists === true) {
            console.log('El directorio de modulos CORE ya existe');
            response = true;
        } else {
            var process_clone_repo = `git clone ${this.config.ket_modules_repo} ${this.config.core_dir}`;
            response = await this.execProcess(process_clone_repo,"Clonando KET Modules");
        }

        console.log('----------------------------END--------------------------------');
        console.log('\n');

        return response;
    }

    /**
     * Metodo que permite inicializar el archivo de configuración de entorno
     * @returns  
     */
    private initEnvFile = () => {
        
        console.log(`------------------------ Inicializando archivo de configuración de entorno ----------------------------`);

        var response = false;

        try {
            var file_exists = fs.statSync(this.config.env_file_path).isFile();
            console.log('El archivo de configuración ya ha sido creado');
            response = true;
        } catch (e) {
            try {
                var template = "{}";
                fs.writeFileSync(this.config.env_file_path,template);
                console.log("Success: Archivo de configuración de entorno ha sido creado correctamente");
                response = true;
            } catch(err) {
                console.log('Error: Se ha presentado un error al generar el archivo: ' +  err);
                response = false;
            }
        }

        console.log('----------------------------END--------------------------------');
        console.log('\n');

        return response;
    }

    /**
     * Metodo que permite actualizar el archivo package.json con los parametros provistos por el usuario
     */
    private updatePackageFile = async () => {
        
        console.log(`------------------------ Actualizando package.json ----------------------------`);

        var response = false;

        var file             = fs.readFileSync(this.config.package_json_dir, 'utf-8');
        var content_file_arr = file.split('\n');
        
        content_file_arr.forEach((val, index) => {
            
            var line = val;
            
            var split_field = line.split(":");

            if (line.search("name") !== -1) {
                this.config.package_name = split_field[1];
                this.config.package_name = this.config.package_name.replace(',',"");
                this.config.package_name = this.config.package_name.replace('"',"");
                this.config.package_name = this.config.package_name.replace('"',"");
                this.config.package_name = this.config.package_name.trim();
            }
        });

        var package_json = {};

        var process_reset_packagejson = `sh init.sh ${this.config.package_name} 1 0 0`;
        await this.execProcess(process_reset_packagejson);

        // Package JSON original
        package_json = this.mergePackageJson(this.config.package_json_dir,package_json);

        // Package JSON del CORE
        package_json = this.mergePackageJson(this.config.package_json_config.global,package_json);

        // Package JSON Local
        package_json = this.mergePackageJson(this.config.package_json_config.local,package_json);
        
        var template = JSON.stringify(package_json,null,2);

        try {
            fs.writeFileSync(this.config.package_json_dir,template);
            response = true;
            console.log("Success: Package JSON configurado correctamente");
        } catch(err) {
            response = false;
            console.log('Error: Se ha presentado un error actualizar el archivo package.json: ' +  err);
        }

        console.log('----------------------------END--------------------------------');
        console.log('\n');
        return response;
    }

    /**
     * Metodo que permite construir los archivos de configuración necesarios para el funcionamiento del sistema
     * @returns  
     */
    private buildConfigFiles = () => {
        
        var response = true;
        console.log(`------------------------ Configurando archivos del APP ----------------------------`);

        for (const key in this.config.app_config_files) {
            if (this.config.app_config_files.hasOwnProperty(key)) {
                const element = this.config.app_config_files[key];

                if (element.action === "copy") {
                    this.copyConfig(element);
                }
            }
        }

        console.log('----------------------------END--------------------------------');
        console.log('\n');

        return response;
    }
    
    /**
     * Metodo que permite copiar un item de la configuración a su respectivo destino
     * @param config_item Item
     */
    private copyConfig = (config_item) => {

        var base_dir = __dirname.split('client');
        
        if (config_item.hasOwnProperty('folder')) {
            var target_folder = base_dir[0] + config_item.target;
            var source_folder = this.config.app_config_dir + config_item.folder;

            if (!this.dirExists(target_folder)) {
                this.createDirRecursive(target_folder);
            }

            this.copyDirRecursiveSync(source_folder,target_folder);
            console.log(`Directorio ${source_folder} copiado a ${target_folder}`);

        } else {
            var file_origin_path = this.config.app_config_dir + config_item.filename;
            var exists = false;
            try {
                var source_lstat = fs.lstatSync( file_origin_path );
                if (source_lstat.isFile() ) {
                    exists = true;
                }
            } catch(err) {}
    
            if (exists === true) {
                var file = fs.readFileSync(file_origin_path, 'utf-8');

                var new_name_file = config_item.filename;
                if (config_item.hasOwnProperty('alias')) new_name_file = config_item.alias;
                
                var file_target_path = base_dir[0] + config_item.target + new_name_file;
    
                try {
                    var source_lstat = fs.lstatSync( file_target_path );
                    if (source_lstat.isFile() ) {
                        try {
                            fs.unlinkSync(file_target_path);
                        } catch (err) {
                        }
                    }
                } catch(err) {}
    
                try {
                    fs.writeFileSync(file_target_path,file,'utf-8');
                    console.log(`Archivo ${config_item.filename} copiado a ${file_target_path}`);
                } catch (err) {
                }
            }
        }
        
    }

    /**
     * Metodo que verifica si un directorio existe
     * @param dir_path Ruta absoluta del directorio que se desea verificar
     * @returns  
     */
    public dirExists = (dir_path) => {
        var exists = false;
        try {
            var source_lstat = fs.lstatSync( dir_path );
            if (source_lstat.isDirectory()) {
                exists = true;
            }
        } catch(err) {}

        return exists;
    }

    /**
     * Metodo que permite crear directorios si no existen de forma recursiva
     * @param dirpath Ruta absoluta que se desea crear
     * @param [sep] Separador de la ruta
     * @param [permissions]  Permisos que se asignaran a los directorios creados
     */
    public createDirRecursive = (dirpath, sep: string = '/', permissions: string = '0744') => { 
        var parts = dirpath.split(sep); 
        for( var i = 1; i <= parts.length; i++ ) { 
            if (typeof parts[i] !== 'undefined' && parts[i] !== '') {
                var hasExtension = this.getFileExtension(parts[i]);
                if (hasExtension == '') {
                    var current_path = '/' + path.join.apply(null, parts.slice(0, i)) + '/' + parts[i];
                
                    if (!fs.existsSync(current_path)) {
                        fs.mkdirSync( current_path , permissions); 
                    }
                }
            }
        } 
    }

    /**
     * Metodo que permite obtener la extencion de un archivo
     * @param filename Archivo sobre el cual se desea obtener la extension
     * @return Extension del archivo, si no se encuentra una extension retornara vacio ""
     */
    public getFileExtension = (filename) => {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    /**
     * Metodo que permite copiar recursivamente todo lo que exista en un directorio
     * @param source Ruta absoluta del origen de los archivos
     * @param target Ruta absoluta del destino de los archivos
     * @param [exclude] Archivos a excluir
     * @param [permissions] Permisos para creacion de directorios y archivos
     */
    public copyDirRecursiveSync = (source, target, exclude: Array<any> = [], permissions: string = '0744') => {
        
        var files = [];

        //check if folder needs to be created or integrated
        var basename = path.basename( source );
        var targetFolder = path.join( target, basename );

        if ( !fs.existsSync( targetFolder ) ) {
            fs.mkdirSync( targetFolder , permissions);
        }
        
        //copy
        try {
            var source_lstat = fs.lstatSync( source );
            if (source_lstat.isDirectory()) {
                files = fs.readdirSync( source );
                files.forEach(( file ) => {
                    var curSource = path.join( source, file );
                    try {
                        var curSource_lstat = fs.lstatSync( curSource );
                        if ( curSource_lstat.isDirectory() ) {
                            this.copyDirRecursiveSync( curSource, targetFolder, exclude, permissions);
                        } else {
                            this.copyFileSync( curSource, targetFolder, exclude, permissions);
                        }

                    } catch (err) {}
                } );
            }
        } catch(err) {}
    }
    
    /**
     * Metodo que permite copiar un archivo
     * @param source Ruta absoluta del origen del archivo
     * @param target Ruta absoluta del destino del archivo
     * @param [exclude] Archivos a excluir
     * @param [permissions] Permisos para creacion de directorios y archivos
     */
    public copyFileSync = (source, target, exclude: Array<any> = [], permissions: string = '0744') => {
        
        var targetFile = target;

        //if target is a directory a new file with the same name will be created
        if ( fs.existsSync( target ) ) {
            try {
                var target_lstat = fs.lstatSync( target );
                if ( target_lstat.isDirectory() ) {
                    targetFile = path.join( target, path.basename( source ) );
                }
            } catch (err) {}

        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    private installNodeModules = async(process_install) => {
        console.log(`------------------------ Instalando paquetes NODE ----------------------------`);

        var clear_link_modules = 'npx link-module-alias && npx link-module-alias clean || true';
        var process_local = await this.execProcess(clear_link_modules,"Limpiando link de modulos");

        var response = false;

        if (process_local === true) {
            response = await this.execProcess(process_install);

            if (response === true) {
                var init_link_modules = 'npx link-module-alias';
                var process_local = await this.execProcess(init_link_modules,"Inicializando link de modulos");
                console.log('Instalacion completa');
            } else {
                console.log('Ha ocurrido un error al instalar los modulos');
            }
        }
    
        console.log('----------------------------END--------------------------------');
        console.log('\n');

        return response;
    }

    /**
     * Metodo que ejecuta comandos desde consola 
     * @param command_to_exec Comando a ejecutar
     * @param console_message Mensaje para mostrar por consola
     * @returns  
     */
    private execProcess = async (command_to_exec, console_message: string | null = null) => {

        if (console_message && console_message != '') console.log(`------------------------ ${console_message} ----------------------------`);
        var response = false;

        try {
            var { stdout, stderr } = await exec(command_to_exec);
            var message  = `Success - Hemos ejecutado correctamente el siguiente comando ${command_to_exec} \n`;
                message += stdout;

            console.log(message)
            response = true;
        } catch (e) {
            var error_message  = `Error - Se ha presentado un error al ejecutar el siguiente comando ${command_to_exec} \n`;
                error_message += e;

            console.log(error_message)
            response = false;
        }

        if (console_message && console_message != '') console.log('----------------------------END--------------------------------');
        if (console_message && console_message != '') console.log('\n');
        return response;
    }
}

export const buildProjectProgram = new BuildProjectProgram();
export { BuildProjectProgram };
