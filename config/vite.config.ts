import { createLogger, defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import chalk from 'chalk';

export default defineConfig(({ command }) => {
    const logger = createLogger();

    const currentTime = new Date();
    const version = `${currentTime.getFullYear()}.${currentTime.getMonth()}.${currentTime.getDate()}.${currentTime.getHours()}.${currentTime.getMinutes()}`;
    logger.info(`App Version: ${chalk.blue(version)}`);

    const commonConfig = {
        root: `${process.cwd()}/src`,
        publicDir: `${process.cwd()}/assets`,
        define: {
            '__VERSION__': JSON.stringify(version),
        },
        plugins: [
            solidPlugin(),
        ]
    };

    if (command === 'serve') {
        return {
            ...commonConfig,
            server: {
                open: true,
            }
        };
    } else {
        return {
            ...commonConfig,
            build: {
                emptyOutDir: true,
                minify:'esbuild',
                outDir: `${process.cwd()}/dist`,
                sourcemap: !process.argv.includes('--deploy'),
                license: true,
            },
        };
    }
});
