const plugins = [
  'babel-plugin-transform-imports',
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/core',
      // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      'libraryName': '@material-ui/icons',
      // Use "'libraryDirectory': ''," se o seu bundler não suportar módulos ES
      'libraryDirectory': 'esm',
      'camel2DashComponentName': false
    },
    'icons'
  ]
  ];

  const presets = [
  [
    "@babel/preset-env",
    {
      "targets": {
        "node": "12"
      }
    }
  ],
  [
    "@babel/preset-typescript",
    {
      "onlyRemoveTypeImports": true
    }
  ],
  "@babel/preset-react"
]
module.exports = { plugins, presets };