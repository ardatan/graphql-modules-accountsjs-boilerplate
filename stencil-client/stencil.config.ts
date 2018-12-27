import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  commonjs: {
    include: ['./node_modules/**'],
    namedExports: {
      './node_modules/graphql-anywhere/lib/async.js': ['graphql'],
      './node_modules/graphql/language/parser.mjs': ['default'],
      './node_modules/apollo-utilities/lib/index.js': ['default']
    },
    extensions: ['.js', '.mjs']
  } as any,
  plugins: [
    {
      transform(source, id, context){
        return {
          code:
            source.replace(`var wrap = require('optimism').wrap;`, '')
            .replace('export { wrap }', 'export { wrap } from "optimism";'),
            id
        }
      }
    }
  ]
};
