import env from '../env';

const banner = (registeredUrls: any): void => {
    const log = console.log;

    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
        log(``);
        log('-------------------------------------------------------');
        log(`Aloha, your app is ready on ${route()}${env.app.routePrefix}`);
        log(`To shut it down, press <CTRL> + C at any time.`);
        log(``);
        log('-------------------------------------------------------');
        log(`Name                  : ${env.app.name}`);
        log(`Description           : ${env.app.description}`);
        log(`Environment           : ${env.node}`);
        log(`Version               : ${env.app.version}`);
        log(``);
        log(`Log Level             : ${env.log.level}`);
        log(`Combined Log File     : ${env.log.combinedOutput}`);
        log(`Error Log File        : ${env.log.errorOutput}`);
        log(``);
        log(`API Info              : ${route()}${env.app.routePrefix}`);
        // if (env.swagger.enabled) {
        //     log(`Swagger      : ${route()}${env.swagger.route}`);
        // }
        // if (env.monitor.enabled) {
        //     log(`Monitor      : ${route()}${env.monitor.route}`);
        // }
        log('-------------------------------------------------------');
        log('');
        log('Registered APIs');
        registeredUrls.forEach((item: any, index: number): void => {
            log(`${index+1}: ${item.method} ${route()}/${item.path}`);
        });
        log('-------------------------------------------------------');
        log('');
    } else {
        log(`Application is up and running.`);
    }
}

export default banner;