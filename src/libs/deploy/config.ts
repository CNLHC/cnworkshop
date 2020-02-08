
export type DeployConfig = {
    GatsbyPublicPath: string
}
let _cfg: DeployConfig | undefined = undefined


export function getConfig(): DeployConfig {
    if (_cfg)
        return _cfg
    else
        throw Error("get config before init")
}


export function setConfig(config: DeployConfig) {
    _cfg = config
}



