import { getCurrentDate, getCurrentHour } from './time.js';

export enum LOG_LEVEL {
    LOG_ERR     = "ERROR",
    LOG_INFO    = "INFO",
    LOG_WARN    = "WARN",
    LOG_DEBUG   = "DEBUG"
}

const CLI_COLOURS = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

function getColorPerLevel(logLevel: LOG_LEVEL) {
    switch (logLevel) {
        case LOG_LEVEL.LOG_ERR:
            return CLI_COLOURS.fg.red;
        case LOG_LEVEL.LOG_INFO:
            return CLI_COLOURS.fg.blue;
        case LOG_LEVEL.LOG_WARN:
            return CLI_COLOURS.fg.yellow
        case LOG_LEVEL.LOG_DEBUG:
            return CLI_COLOURS.fg.green
        default:
            return CLI_COLOURS.fg.white
    }
}

/**
 * Loga mensagem no terminal a partir do level informado
 * 
 * @param logLevel Valores possíves: ERROR | INFO | WARN | DEBUG 
 * @param msg Mensagem a ser logada
 */
export default function logger(logLevel: LOG_LEVEL, msg: string) {
    const date = getCurrentDate();
    const time = getCurrentHour();
    console.log(
        getColorPerLevel(logLevel), 
        `[${date}] - [${time}]: ${logLevel} - ${msg}`,
        CLI_COLOURS.reset
    );
}