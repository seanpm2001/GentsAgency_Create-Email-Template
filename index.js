#!/usr/bin/env node

const fs = require('fs-extra');
const cp = require('child_process');
const minimist = require('minimist');
const path = require('path');

const cwd = (() => {
	const argv = minimist(process.argv.slice(2));

	if (argv._ && argv._.length > 0) {
		const dir = argv._.pop();
		return `${process.cwd()}/${dir}`;
	}

	return process.cwd();
})();

const projectName = path.basename(cwd);

const run = (cmd) => new Promise((resolve, reject) => {
	cp.exec(cmd, { cwd }, (err) => {
		if (err) {
			return reject(err);
		}

		return resolve();
	});
});

(async function createEmailTemplate() {
	console.log(`👋 Creating a new e-mail template in ${cwd}`);
	console.log('');
	await fs.ensureDir(cwd);
	await run('npm init --yes --scope=@gentsagency');

	console.log('📥 Installing dependencies & moving files around');
	console.log('☕️ This might take a while');
	console.log('');
	await Promise.all([
		run('npm i --save-dev stylelint@^9 @gentsagency/stylelint-config@^1 gulp@^4 @gentsagency/gulp-registry-emails@^1 http-server'),
		fs.copy(`${__dirname}/templates/gitignore`, `${cwd}/.gitignore`),
		fs.copy(`${__dirname}/templates/editorconfig`, `${cwd}/.editorconfig`),
		fs.copy(`${__dirname}/templates/stylelintrc.js`, `${cwd}/.stylelintrc.js`),
		fs.copy(`${__dirname}/templates/gulpfile.js`, `${cwd}/gulpfile.js`),
		fs.copy(`${__dirname}/templates/gulp`, `${cwd}/gulp`),
	]);

	console.log('🤖 Registering automation scripts');
	console.log('');
	const pkg = await fs.readJson(`${cwd}/package.json`);

	if (!pkg.scripts) {
		pkg.scripts = {};
	}

	Object.assign(pkg.scripts, {
		'lint:css': 'stylelint --fix gulp/css/**/*.css; exit 0;',
		lint: 'npm run lint:css',
		serve: 'http-server ./build -c-1 -o',
	});

	await fs.outputJson(`${cwd}/package.json`, pkg, { spaces: 2 });

	console.log('🌱 All set! Let\'s get you started:');
	console.log('');
	console.log(`    cd ${cwd}`);
	console.log('    gulp watch');
	console.log('');
	console.log('🤞 Good luck, have fun!');
}());
