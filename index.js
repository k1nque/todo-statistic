const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function show(file) {
    return file.split('\n').filter(x => x.startsWith('// TODO'));
}

function important(file) {
    return show(file).filter(x => x.indexOf('!') !== -1);
}

function user(file, name) {
    return show(file).filter(x => x.split(';')[0].slice(8) === name)
}

function findComments(func) {
    getFiles()
        .forEach(x => func(x)
            .forEach(y => console.log(y)));
}


function processCommand(command) {
    if (command.split(' ')[0] === 'user') {
        let userName = command.slice(command.indexOf(' ') + 1);
        getFiles(user);
        process.exit(0);
    }
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            findComments(show);
            break;
        case 'important':
            findComments(important);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
