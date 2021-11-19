const {Command, flags} = require('@oclif/command')
const {open, mkdir, writeFile, close} = require('fs')
const [html, css, js] = require('./boilerplate')

class WdfsCommand extends Command {
  async run() {
    const {flags} = this.parse(WdfsCommand)
    const path = flags.path || '.'

    /* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
    // creating index.html at root
    open(`${path}/index.html`, 'w', (fileioerror, _fd) => {
      if (fileioerror) {
        return this.error(fileioerror)
      }
      // write boilerplate html
      writeFile(`${path}/index.html`, html, e => {
        if (e) {
          return this.error(e)
        }
      })
      close(_fd, e => {
        if (e) {
          return this.error(e)
        }
      })
      return this.log('|__      ', 'index.html')
    })

    // create src directory at root
    mkdir(`${path}/src`, (srcdirioerror, _dirfdo) => {
      if (srcdirioerror) {
        return this.error(srcdirioerror)
      }

      // create js directory in the src directory
      mkdir(`${path}/src/js`, (jsdirioerror, _dirfdi) => {
        if (jsdirioerror) {
          return this.error(jsdirioerror)
        }

        open(`${path}/src/js/script.js`, 'w', (jsfileioerror, _fd) => {
          if (jsfileioerror) {
            return this.error(jsfileioerror)
          }
          // write boilerplate js
          writeFile(`${path}/src/js/script.js`, js, e => {
            if (e) {
              return this.error(e)
            }
          })
          close(_fd, e => {
            if (e) {
              return this.error(e)
            }
          })
          return this.log('|______  ', 'src/js/script.js')
        })
        return this.log('|____    ', 'src/js')
      })

      // create scss directory in the src directory
      mkdir(`${path}/src/scss`, (cssdirioerror, _dirfdo) => {
        if (cssdirioerror) {
          return this.error(cssdirioerror)
        }

        // create style.scss file in scss directory
        open(`${path}/src/scss/style.scss`, 'w', (cssfileioerror, _fd) => {
          if (cssfileioerror) {
            return this.error(cssfileioerror)
          }
          // write boilerplate style
          writeFile(`${path}/src/scss/style.scss`, '@import "global";', e => {
            if (e) {
              return this.error(e)
            }
          })
          close(_fd, e => {
            if (e) {
              return this.error(e)
            }
          })
          return this.log('|______  ', 'src/scss/style.scss')
        })

        // create _global.scss parcel in scss directory
        open(`${path}/src/scss/_global.scss`, 'w', (cssfileioerror, _fd) => {
          if (cssfileioerror) {
            return this.error(cssfileioerror)
          }
          // write boilerplate global style
          writeFile(`${path}/src/scss/_global.scss`, css, e => {
            if (e) {
              return this.error(e)
            }
          })
          close(_fd, e => {
            if (e) {
              return this.error(e)
            }
          })
          return this.log('|______  ', 'src/scss/_global.scss')
        })
        return this.log('|____    ', 'src/scss')
      })
      return this.log('|__      ', 'src')
    })
  }
}

WdfsCommand.description = `wdfs
Create basic file structure for web development project
...
USAGE
  wdfs [flags]

FLAGS
  --help    Show help for command
  --version Show dfs version
  --path    Path to the folder where the files needs to be created

EXAMPLES
  $ wdfs
  $ wdfs --path ./dir

LEARN MORE
  Read the manual at https://github.com/ashis-kumar-dev/wdfs

FEEDBACK
  Open an issue in github.com/ashis-kumar-dev/wdfs/issues
`

WdfsCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  // add --path flag to provide directory path for project
  path: flags.string({char: 'p', description: 'path to the project directory'}),
}

module.exports = WdfsCommand
