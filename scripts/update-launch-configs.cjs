const fs = require('node:fs')
const path = require('node:path')

const launchJson = path.resolve(__dirname, '../.vscode/launch.json')
const launchConfig = fs.existsSync(launchJson)
    ? require(launchJson)
    : { version: '0.2.0', configurations: [] }

const dayNum = process.argv[2]
if (!dayNum) {
    console.error('Please provide a day number')
    process.exit(1)
}

const day = dayNum.padStart(2, '0')

newConfig = {
    type: 'node',
    request: 'launch',
    name: `Launch: Day ${day}`,
    skipFiles: ['<node_internals>/**'],
    program: `\${workspaceFolder}/packages/day-${day}/index.ts`,
    preLaunchTask: `npm: build - packages/day-${day}`,
    outFiles: ['${workspaceFolder}/**/*.js'],
}

launchConfig.configurations.push(newConfig)

fs.mkdirSync(path.resolve(__dirname, '../.vscode'), { recursive: true })
fs.writeFileSync(launchJson, JSON.stringify(launchConfig, null, 2))
