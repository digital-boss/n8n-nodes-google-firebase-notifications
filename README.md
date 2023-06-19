# n8n-nodes-google-firebase-notifications



## Try it out

### With docker

The recommended way is using our docker image [Digital Boss' N8N custom nodes docker image](https://hub.docker.com/r/digitalboss/n8n-custom-nodes)


### Link package to local n8n instance

[N8N documentation on custom nodes](https://docs.n8n.io/nodes/creating-nodes/create-n8n-nodes-module.html)

Clone the n8n-nodes-google-firebase-notifications repository and execute:
```bash
# Install dependencies
npm install

# Build the code
npm run build

# Create symlink at your global node_modules cache
npm link
ls -la $(npm -g root) # check created link
```

Create an N8N installation and add the n8n-nodes-google-firebase-notifications to it:
```bash
# Create an N8N installation
cd ..
mkdir n8n-local
cd n8n-local
npm init -y
npm install --save-dev n8n

# "Install" the locally published module
npm link @digital-boss/n8n-nodes-google-firebase-notifications

# Start n8n
npx n8n
```

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
