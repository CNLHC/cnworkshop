
import * as commander from 'commander'

const program = new commander.Command()

program
    .version('0.0.0')
    .command('ali-oss')
    .description('deploy to alibaba object storage service (OSS)')
    .requiredOption('-s, --secret <secret>', 'path to dotenv file that contains access info')
    .requiredOption('-r, --root <root>', 'static file root')
    .action(async (env) => {
        console.log(env.secret)
        const backend = new ((await import('./ali-oss')).default)(
            { GatsbyPublicPath: env.root },
            env.secret
        )
        backend.deploy()
    })

program.parse(process.argv)


