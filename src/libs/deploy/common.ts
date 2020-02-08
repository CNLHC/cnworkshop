import * as path from 'path'
import { getConfig, DeployConfig, setConfig } from './config';
import * as glob from 'glob'
import * as ProgressBar from 'progress'


export abstract class DeployBackend {
    private cfg: DeployConfig
    constructor(config: DeployConfig) {
        setConfig(config)
        this.cfg = config
    }
    // put a local file to backend
    abstract put(fp: string, onComplete: (fp: string) => void): void;

    private getAbsPath(relativePath: string): string {
        return path.resolve(process.cwd(), relativePath)
    }

    deploy() {
        glob("/**/*", {
            root: this.getAbsPath(this.cfg.GatsbyPublicPath),
            nodir: true
        }, (er, files) => {
            var bar = new ProgressBar('[:bar] :current/:total :percent ', {
                total: files.length,

            });
            files.forEach(object => {
                this.put(object, (_fp) => {
                    bar.tick(1, {})
                })
            })
        })
    }


}
