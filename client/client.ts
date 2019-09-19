#!/usr/bin/env ts-node

// @import_dependencies_node Import libraries
import * as fs from "fs";
var program = require("commander");
import { buildProjectProgram as installer } from "./programs/structure/buildProjectProgram";
// @end

// @import_config_files Import config files
// @end

class Client {

    public run = async() => {

        // @initialize_installer_program
        installer.addProgram(program);
        // @end

        // @initialize_programs
        var base_dir = __dirname.split('client');
        var core_path = base_dir[0] + 'ket_modules/';

        try {
            var source_lstat = fs.lstatSync( core_path );
            if (source_lstat.isDirectory()) {
                var clientUtility = require('@ket_modules/utilities/clientUtility').clientUtility;
                clientUtility.startClient(program);
            }
        } catch(err) {};
        // @end

        program.parse(process.argv);
    }

}

const _client = new Client();
_client.run();