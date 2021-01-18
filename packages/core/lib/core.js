'use strict';

module.exports = core;

const log = require('@shenxiang11/fake-log');
const faker = require('faker/locale/zh_CN');
const yargs = require('yargs');
const pkg = require('../package.json');

function core() {
    const cli = yargs();
    const argv = process.argv.slice(2);

    cli
        .usage('Usage: $0 [command] <option>')
        .demandCommand(1, '至少需要一个命令，先输入 --help 试试吧！')
        .strict()
        .recommendCommands()
        .alias("h", "help")
        .alias("v", "version")
        .wrap(cli.terminalWidth())
        .command({
            command: "lorem [type]",
            describe: "Generates useless placeholder text",
            builder: (yargs) => {
                yargs
                    .positional('type', {
                        describe: 'word|words|sentence|slug|sentences|paragraph|paragraphs|text|lines',
                    });
            },
            handler: (argv) => {
                if (argv.type) {
                    console.log(faker.lorem[argv.type]());
                }
            }
        })
        .command({
            command: "name [type]",
            describe: "Generates useless name text",
            builder: (yargs) => {
                yargs
                    .positional('type', {
                        describe: 'firstName|lastName|findName|jobTitle|gender|prefix|suffix|title|jobDescriptor|jobArea|jobType',
                    });
            },
            handler: (argv) => {
                if (argv.type) {
                    console.log(faker.name[argv.type]());
                }
            }
        })
        .fail((err, msg) => console.log(err, msg))
        .parse(argv);

}
