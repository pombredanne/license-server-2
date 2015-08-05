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

If you're testing webhooks (your server will need to be accessible by github) do the following:
```
$ export gitHookSecret=your github webhook secret
```

To setup github webhooks and get a secret:

1. Visite your orgs settings/hooks at this link:
https://github.com/organizations/[Your Org Here]/settings/hooks
2. Press "Add Webhook"
3. Enter in the url where your app will sit followed by "/git_hook" for instance: http://awesome-company-site.com/git_hook
4. Generate and enter in Secret (https://developer.github.com/webhooks/securing/). This secret is what you'll set when setting `gitHookSecret`
5. Make sure "just push events" is selected.
6. Press "Add Webhook"

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
