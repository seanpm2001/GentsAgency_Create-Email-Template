# Create E-mail Template

Create an e-mail template using the Gents Agency e-mail workflow.

## Usage

When you have `npm` >= 6 on your system, you can run

```sh
$ npm init @gentsagency/email-template my-emails
```

or if you have `npm` >= 5 on your system, you can run

```sh
$ npx @gentsagency/create-email-template my-emails
```

This will output:

```
👋 Creating a new e-mail template in ~/my-emails

📥 Installing dependencies & moving files around
☕️ This might take a while

🌱 All set! Let's get you started:

    cd ~/my-emails
    gulp watch

🤞 Good luck, have fun!
```

And you're good to go.

It will install a [`gulp` workflow](https://github.com/gentsagency/gulp-registry-email), create all necessary files & folders and configure both [`eslint`](https://github.com/gentsagency/eslint-config) and [`stylelint`](https://github.com/gentsagency/stylelint-config).

You can also spin up a static file server for easy development with `npm run serve`.
