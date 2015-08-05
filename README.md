# license-server

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A server which watches your organization and outputs license information for repos which contain a `package.json` file.

## Usage

### NPM:

[![NPM](https://nodei.co/npm/license-server.png)](https://www.npmjs.com/package/license-server)

### Deploy onto Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

When deploying to Heroku a few environment variables are required:

#### org

The organization where repos to be checked are.

#### gitToken 

This is an api access token to communicate with Github.

To create your personal github access token go here:

1. https://github.com/settings/tokens
2. Press "Generate Token"
3. Ensure "repo" is checked (nothing else is needed)

#### gitHookSecret:

This is a secret token value for Github to communicate via webhooks.

1. Visit your orgs settings/hooks at this link:
`https://github.com/organizations/[Your Org Here]/settings/hooks`
2. Press "Add Webhook"
3. Enter in the url where your app will sit followed by "/git_hook" for instance: http://awesome-company-site.com/git_hook
4. Generate and enter in Secret (https://developer.github.com/webhooks/securing/). This secret is what you'll set when setting `gitHookSecret`
5. Make sure "just push events" is selected.
6. Press "Add Webhook"

## Local Development

Ensure you've set the following environment variables:

```bash
$ export NODE_ENV=development
$ export org=your org #(eg. Jam3)
$ export gitToken=your github access token #(details below)
```

If you're testing webhooks (your server will need to be accessible by github) do the following:

```bash
$ export gitHookSecret=your github webhook secret
```

Optionally you can also do:

```bash
$ export repoRegex=regex value
```

The above will will check which repos licenses will be checked. For instance if the repos you'd like to check started with `project-` you'd do the following:

```
$ export repoRegex=project-.+
```

## License

MIT, see [LICENSE.md](http://github.com/jam3/license-server/blob/master/LICENSE.md) for details.
