/** @type {import('@babel/core').TransformOptions} */
export default {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
}
