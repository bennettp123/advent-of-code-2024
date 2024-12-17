import { defaults } from 'jest-config'

/** @returns {Promise<import('jest').Config>} */
export default async () => {
    return {
        verbose: true,
        testMatch: [
            ...defaults.testMatch,
            '**/__tests__/**/*.[cm][jt]s?(x)',
            '**/?(*.)+(spec|test).[cm][tj]s?(x)',
        ],
    }
}
