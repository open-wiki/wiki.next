// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//

const {createAppAuth} = require("@octokit/auth-app");
const {Octokit} = require('@octokit/rest')
const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth:  {
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    installationId: process.env.INSTALLATION_ID
  }
});

export default async (req, res) => {
  let createOrUpdateFileContentsParams = {
    owner: 'open-wiki',
    repo: 'wiki-bot',
    path: 'test.md',
    message: 'created by probot',
    content: Buffer.from('# test content').toString('base64'),
  }
  try {
    await octokit.repos.getContent({
      owner: 'open-wiki',
      repo: 'wiki-bot',
      path: 'test.md',
    })
        .then((existingPage) => {
          createOrUpdateFileContentsParams.sha = existingPage.data.sha;
        })
  } catch (error) {
    if (error.status !== 404) {
      console.log(error)
      res.status(error.status)
    }
  }
  let response = await octokit.repos.createOrUpdateFileContents(createOrUpdateFileContentsParams)
  res.status(response.status).json({response: response})
}