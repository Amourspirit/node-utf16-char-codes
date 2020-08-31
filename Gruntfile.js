(() => {
  "use strict";
  // Define your library strictly...
})();
module.exports = (grunt) => {
  const isWin = process.platform === "win32";
  const getNodeMajor = () => {
    // https://www.regexpal.com/?fam=108819
    const s = process.version;
    const major = s.replace(/v?(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/, '$1');
    return parseInt(major, 10);
  }
  const nodeMajor = getNodeMajor();
  let isES6Plus = false;
  try {
    let es6Map = new Map();
    es6Map.set('a', 1);
    es6Map.set('b', 2);
    isES6Plus = true;
    grunt.log.writeln('ES6 (es2015) or greater');
    es6Map = null;
  } catch (err) {
    grunt.log.writeln("ES6 not supported :(");
  }
  // #region Functions

  const appendToFile = (file, str) => {
    const options = {
      // If an encoding is not specified, default to grunt.file.defaultEncoding.
      // If specified as null, returns a non-decoded Buffer instead of a string.
      encoding: 'utf8'
    };
    let contents = grunt.file.read(file, options);
    contents += str;
    grunt.file.delete(file, { force: true });
    grunt.file.write(file, contents, options);
  }

  // #endregion
  // #region grunt init config
  grunt.initConfig({
    // pkg: packageData,
    env: {
      dev: {
        NODE_ENV: 'development',
        VERSION: () => {
          const j = grunt.file.readJSON('package.json');
          this.pkg = j;
          return j.version;
        }
      },
      build: {
        NODE_ENV: 'production',
        VERSION: () => {
          const j = grunt.file.readJSON('package.json');
          this.pkg = j;
          return j.version;
        }
      }
    },
    clean: {
      dirs: ['scratch', 'dist', 'lib'],
      lib: ['lib'],
      test: ['scratch']
    },

    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      plugin: ['src/**/*.ts']
    },

    shell: {
      tsc: 'tsc',
      rollup: 'rollup -c'
    },

    copy: {
      d: {
        files: [{
          // cwd: 'lib/',
          src: './lib/main.d.ts',
          dest: './index.d.ts'
          // expand: false
        }]
      },
      final: {
        files: [{
          src: './scratch/nc/main.js',
          dest: './index.js'
        }]
      }
    },
    concat: {
      ext: {
        src: ['./scratch/nc/main.js', 'scratch/nc/ext/codePointAtExt.js', 'scratch/nc/ext/fromCodePointExt.js'],
        dest: './index.js'
      },
      ext_es6: {
        src: ['./lib/es6/main.js', './src/ext/codePointAtExt.js', './src/ext/fromCodePointExt.js'],
        dest: './scratch/es6/main.js'
      }
    },
    terser: {
      main: {
        options: {
          sourceMap: true
        },
        files: {
          'scratch/es6/node_utf16_char_codes.min.js': [
            './scratch/es6/node_utf16_char_codes.js']
        }
      }
    },
  });
  // #endregion
  // #region grunt require and load npm task
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // #endregion
  grunt.registerTask('default', [
    'build'
  ]);
  grunt.registerTask('envcheck', ['version_bump:build', 'env:dev', 'devtest']);
  grunt.registerTask('ver', () => {
    grunt.log.writeln('output from task ver');
    grunt.log.writeln("BUILD_VERSION:" + BUILD_VERSION);
    grunt.log.writeln("packageData.version:" + packageData.version);
  });
  grunt.registerTask('test', [
    'clean:test',
    'compile_test',
    'run_test',
    'run_test_js',
    'clean:test'
  ]);
  grunt.registerTask('run_test', 'run mocha', function () {
    const done = this.async();
    // exec works with $(which mocha) except on travis ci below nodejs version 8
    // exec $(which node) $(which mocha) works on all tested versions
    grunt.log.writeln("Node Major Version:", nodeMajor);
    const mRequire = "--require ts-node/register 'tests/**/*.test.ts'";
    const mEnv = 'env TS_NODE_PROJECT="tsconfig.test.json"';
    let cmd = '';
    if (isWin === true) {
      cmd = `npx ${mEnv} mocha ${mRequire}`; // '.\\node_modules\\.bin\\mocha.cmd;
    } else {
      if (nodeMajor <= 6) {
        cmd = `$(which node) ${mEnv} $(which mocha) ${mRequire}`;
      } else {
        cmd = `npx ${mEnv} mocha ${mRequire}`;
      }
    }
    require('child_process').exec(cmd, (err, stdout) => {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('run_test_js', 'run mocha', function () {
    const done = this.async();
    let cmd = '';
    if (isWin === true) {
      cmd = 'npx mocha tests/**/*.test.js'; // '.\\node_modules\\.bin\\mocha.cmd';
    } else {
      if (nodeMajor <= 6) {
        cmd = '$(which node) $(which mocha) tests/**/*.test.js';
      } else {
        cmd = 'npx mocha tests/**/*.test.js';
      }
    }
    require('child_process').exec(cmd, (err, stdout) => {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('compile_test', 'run mocha', function () {
    const done = this.async();
    let cmd = "tsc --project './tsconfig.test.json'";
    require('child_process').exec(cmd, (err, stdout) => {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('build', [
    'env:build',
    /*
     * Task clean: dirs
     * clean the folder out from any previous build
     */
    'clean:dirs',
    /*
     * Task tslint
     * check the ts files for any lint issues
     */
    'tslint',
    'shell:rollup',
    /*
     * Task shell: tsc
     * run tsc, outputs to /lib
     */
    'shell:tsc',
    'clean:lib'
  ]);

};