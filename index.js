#!/usr/bin/env node

const request = require('request');
const chalk = require('chalk');
const argv = require('yargs')
    .usage('Usage: npm-package-checker -r [repositoryUrl] -t [versionTag] -d -c') 
    .demand(['repoUrl', 'tag'])
    .alias('r', 'repoUrl')
    .describe('r', 'Repository URL of component (Nexus, Artifactory...)')
    .requiresArg('r')
    .alias('t', 'tag')
    .describe('t', 'NPM component version (package.json)')
    .requiresArg('t')
    .alias('d', 'debug')
    .describe('d', 'Show detailed info about the progress')
    .alias('c', 'colors')
    .describe('c', 'Show color traces')
    .help('h')
    .alias('h', 'help')
    .boolean('debug')
    .boolean('colors')
    .version(() => { return 'The current installed version of <npm-package-checker> is ' + require('./package.json').version })
    .epilog('----------------------\n Sema García - 2016\n----------------------')
    .showHelpOnFail(true, 'Specify --help for available options')
    .recommendCommands()
    .argv;

const LEVEL_LOG = { SUCCESS: 0, FAILURE: 1, INFO: 2 };
let colors = argv.colors;
let verboseMode = !!argv.debug;
let componentUrl = argv.repoUrl;
let componentVersion = argv.tag;

let red = (colors) ? chalk.bold.red : (traceMessage) => traceMessage;
let green = (colors) ? chalk.bold.green : (traceMessage) => traceMessage;
let blue = (colors) ? chalk.bold.blue : (traceMessage) => traceMessage;

/**
 * Ends the execution with a success message (green color if -c options is enabled/specified).
 * @param successMessage: print a successful trace and ends the process with OK.
 */
let endsSuccessfully = (successMessage) => {
    process.stdout.write(green('[npm-package-checker] OK :: ' + successMessage + '\n'));
    process.exit = 0;  // Ok  
};

/**
 * Ends the execution with a failure message (red color if -c options is enabled/specified).
 * @param errorMessage: print an error trace and ends the process with KO.
 */
let endsWithFailure = (errorMessage) => {
    process.stderr.write(red('[npm-package-checker] Error :: ' + errorMessage + '\n'));
    process.exit = 1;  // Error  
};

/**
 * Print a trace if the debug flag is enabled and, moreover, it could be colorize the trace according to its type.
 * @param level: [ SUCCESS | FAILURE | INFO ] The type trace: success (green), failure (red) and info (blue).
 * @param message: trace to log.
 */
let trace = (level, message) => {
    if(verboseMode) {
        switch (level) {
            case LEVEL_LOG.SUCCESS:
                return green(message);
            case LEVEL_LOG.FAILURE:
                return red(message);
            case LEVEL_LOG.INFO:
                return blue(message);
            default:
                return message;
        }
    }
};

/**
 * Main process
 */
let makeRequest = () => {
    // Attention... async request, manage it with callback/promise
    trace(LEVEL_LOG.INFO, `[npm-package-checker] :: Starting process...`);
    request(componentUrl, (error, response, body) => {
        trace(LEVEL_LOG.INFO, `[npm-package-checker] :: Request made to: ${componentUrl}`);

        // Check the result (HTTP status code)
        if (!error && response.statusCode == 200) {
            trace(LEVEL_LOG.INFO, `[npm-package-checker] :: Request successful, searching component version <${componentVersion}>`);

            // search tag version
            let res = '';
            try {
                res = JSON.parse(body);
                trace(LEVEL_LOG.SUCCESS, `[npm-package-checker] :: request completed!`);
                if(res['versions'][componentVersion]) {
                    endsWithFailure(`The TAG <${componentVersion}> was found and there is a component published with that version.`);
                } else {
                    endsSuccessfully(`The TAG <${componentVersion}> was not found.`);
                }
            } catch(err) {
                trace(LEVEL_LOG.FAILURE, `[npm-package-checker] :: Error catched!`);
                endsWithFailure(`Error parsing JSON from response. Error: ${err}`);
            };            
        } else {
            // print HTTP error and status code
            let statusCode = (response) ? response.statusCode : '-';
            endsWithFailure(`Error querying Nexus NPM repository. HTTP Error: ${statusCode}, Error: ${error}`);
        }
    });
};

// Let's go... Execute!
makeRequest();
