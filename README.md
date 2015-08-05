# license-server

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a server which is used to watch repos at Jam3 and output the license of a repo

## Usage

[![NPM](https://nodei.co/npm/license-server.png)](https://www.npmjs.com/package/license-server)

## Local Development

Ensure you've set the following environment variables:
```
$ export NODE_ENV=development
$ export org=your org #(eg. Jam3)
$ export gitToken=your github access token #(details below)
```

To create your personal github access token go here:

1. https://github.com/settings/tokens
2. Press "Generate Token"
3. Ensure "repo" is checked (nothing else is needed)

If you're testing webhooks (your server will need to be accisble by github) do the following:
```
$ export gitHookSecret=your github webhook secret
```

Optionally you can also do:
```
$ export repoRegex=regex value
```

The above will will check which repos licenses will be checked. For instance if the repos you'd like to check started with `project-` you'd do the following:
```
$ export repoRegex=project-.+
```

## License

MIT, see [LICENSE.md](http://github.com/jam3/license-server/blob/master/LICENSE.md) for details.
