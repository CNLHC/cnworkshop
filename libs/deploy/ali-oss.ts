import * as dotenv from 'dotenv'
import { getConfig, DeployConfig } from './config';
import * as path from 'path'
import { DeployBackend } from './common';

const OSS = require('ali-oss')

class AliOssBackend extends DeployBackend {
    private _ossClient: any;
    constructor(config: DeployConfig, secret: string) {
        super(config)
        dotenv.config({
            path: secret
        })
        const conf = {
            region: process.env.ALI_OSS_REGION,
            bucket: process.env.ALI_OSS_BUCKET,
            accessKeyId: process.env.ALI_OSS_AID,
            accessKeySecret: process.env.ALI_OSS_AK,
        }

        this._ossClient = new OSS(conf)

    }
    localPath2OssPath(fp: string): string {
        const cfg = getConfig()
        return '/' + path.relative(cfg.GatsbyPublicPath, fp)
    }
    async put(fp: string, cb) {

        await this._ossClient.put(this.localPath2OssPath(fp), fp);
        cb(fp)


    }
}




export default AliOssBackend




