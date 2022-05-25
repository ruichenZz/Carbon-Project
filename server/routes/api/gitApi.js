const Router = require("express-promise-router");
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require("@octokit/rest");
const fs = require('fs');
const router = new Router();

const handleError = (res) => {
	res.json({ "message": "bad" });
}

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 114776,
    privateKey: fs.readFileSync(__dirname + "/../../dailybruin-carbon.2021-05-10.private-key.pem"),
	clientId: process.env.GIT_CLIENT_ID,
	clientSecret: process.env.GIT_CLIENT_SECRET,
	installationId: process.env.GIT_INSTALLATION_ID
  },
});

// check if repo name is available
router.get('/checkNameAvailable/:packageName', async (req, res) => {
	console.log("MESSAGE: Checking if name is available:", req.params.packageName)
	try {
		const _ = await appOctokit.rest.repos.get({
			owner: 'dailybruin',
			repo: req.params.packageName
		});
		res.json(false);
	} catch (error)
	{
		res.json(true);
	}
});


router.get('/getPrivateRepos', async (req, res) => {
	const data = await appOctokit.rest.repos.createUsingTemplate({
		template_owner: 'dailybruin',
		template_repo: 'carbon.flatpage',
		name: 'git-api-test',
		private: true,
		owner: 'dailybruin',
		mediaType: {
			previews: [
			'baptiste'
			]
		}
	});	
	res.json(data);
});

module.exports = router