import { defaults } from 'jest-config'

/** @returns {Promise<import('jest').Config>} */
export default async () => {
    return {
        verbose: true,
        testMatch: [ ...defaults.testMatch, '**/__tests__/**/*.[cm]js?(x)', '**/?(*.)+(spec|test).[cm]js?(x)']
    }
}
