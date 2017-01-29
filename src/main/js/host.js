function main(args) {
    let host = process.env['__OW_API_HOST']
    let ns = process.env['__OW_NAMESPACE']
    let base = `${host}/api/v1/experimental/web/${ns}`
    if (args.path) {
        return { url: `${base}/${args.path}` }
    } else return { url: base }
}
