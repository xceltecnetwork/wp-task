# AirFleet Starter Theme

[![pipeline status](https://gitlab.com/codersclan/airfleet-starter-theme/badges/master/pipeline.svg)](https://gitlab.com/codersclan/airfleet-starter-theme/commits/master)

In this document we provide documentation regarding the overall project (e.g. deployment, environment, overall structure).

For information geared towards development, please check the theme's README file at [wp-content/themes/airfleet/README.md](wp-content/themes/airfleet/README.md).

See [CHANGELOG.md](CHANGELOG.md) for latest changes.





## Summary

- [Environments](#environments)
- [gitignore](#gitignore)
- [Deployment](#deployment)
- [Continuous Integration](#continuous-integration)
- [Renaming the theme](#renaming-the-theme)
- [Creating a local environment](#creating-a-local-environment)
- [Creating an external environment](#creating-an-external-environment)





## Environments

- Production: [https://airfleettheme.wpengine.com/](https://airfleettheme.wpengine.com/).
- Staging: N/A.

Update this section with the relevant environments for your project.





## gitignore

The general philosophy is to exclude everything but the theme and a few selected configuration files in the root.

Core WordPress files should almost never be customized.

Plugins should rarely be stored in git, unless it's an entirely custom plugin, or a hotfix for an existing plugin that cannot be solved any other way (in this case you might only need to store the modified file).

If you want to add standard plugins, manage them directly through the WP Admin. If the plugin is a requirement for the theme, you can add it to the theme's dependencies and it will be automatically installed (more information in the [theme's README file](wp-content/themes/airfleet/README.md)).





## Deployment

Deployment is done through DeployHQ. Deployment is managed by the tech lead and automatic deployments should occur on the `master`/`staging` branch.

More information on configuring DeployHQ is available in section [Creating a new environment](#creating-a-new-environment).


### Excluding files from deployment

Files can be [excluded from deployment](https://www.deployhq.com/blog/excluding-files-with-deployignore) by customizing `.deployignore`.




## Continuous Integration

GitLab's CI is setup through file `.gitlab-ci.yml`. It will spin up a Docker image and install the theme's dependencies and run lint/i18n/build commands to make sure they do not fail.

This will run every time code is pushed to the repository and is visible on each merge request. If the pipeline fails, the merge request should not be accepted.

### Build errors when optimizing images

If you're getting a failed pipeline with an `imagemin` error caused by jpegtran similar to the following:

```
asset optimizationError: spawn (...)/node_modules/jpegtran-bin/vendor/jpegtran ENOENT
```

You can add the following commands to `.gitlab-ci.yml`, just before `yarn install`:

```bash
sudo apk add autoconf automake file build-base nasm musl zlib-dev libjpeg-turbo libjpeg-turbo-dev libpng libpng-dev
yarn add jpegtran-bin
```

Alternatively, if the pipeline is failling with errors from one of the other image optimizers, you can try the following commands that address all optimizers:

```bash
sudo apk add autoconf automake alpine-sdk file build-base nasm musl zlib zlib-dev libjpeg-turbo libjpeg-turbo-dev libpng libpng-dev gifsicle
yarn add jpegtran-bin gifsicle optipng-bin svgo
node node_modules/pngquant-bin/lib/install.js
node node_modules/jpegtran-bin/lib/install.js
node node_modules/optipng-bin/lib/install.js
```






## Renaming the theme

The most straightforward way is to keep the original theme's folder name (you can give it a different name for WP Admin).

If you do change the folder, make sure to do a wide search for "/airfleet" and replace all occurrences. There are several configs that rely on this path (`.gitignore`, `.deployignore`, `.gitlab-ci.yml`, etc.).





## Creating a local environment

In this section we describe the process of creating a local environment from scratch.

This tutorial is also available in video format: [How to create a local environment](https://www.youtube.com/watch?v=ZSbpWwTsTZk).


### 1. Create the environment

#### 1.1. Install Local by Flywheel

Donwload and install [Local by Flywheel](https://localbyflywheel.com/), now simply named Local.

At the time of writing, you will be prompted to download a beta version (version 5+). This version supports Mac, Linux, and Windows (older versions only supported Mac and Windows).

#### 1.2. Create a new site

Open the Local application, go to the `Local Sites` section and create a new site.

- Give it the name of the project. Expand `Advanced Options` for local domain and local site path.
    - Local domain: copy from development URL at `wp-content/themes/airfleet/config.json` or pick any domain of your choosing and update the config in the theme (see [Getting Started](wp-content/themes/airfleet/README.md#getting-started)).
    - Local path: any of your choosing, but I suggest using the repository name as the last part for convenience.
- Choose your WordPress username and password. This is only temporary, as we will overwrite it when we import the database from the dump.
- (Optional) Once the site has been created, go to the SSL tab and click the `Trust` button.

Notes:

- If running an older version of Local (version 3-) choose `Custom` environment and select PHP 7.3+, nginx, and the latest MySQL version.


### 2. Import the content

You should have received an email with a link to download a dump from the production or staging environment. You will copy the dump over to your local environment by taking the following steps.

#### 2.1. Copy all files and folders

Download and extract the dump and copy all the files and folders to your `app/public/` local path, **except** the following:

- `wp-config.php`.
- `wp-content/mu-plugins/`.

#### 2.2. Update wp-config.php if needed

The majority of the projects don't have any special configuration in `wp-config.php`. However, for those that do, you will have to manually copy the configurations from the `wp-config.php` from the dump into your local environment, since we didn't replace `wp-config.php` in the previous step.

We don't want to simply replace everything in `wp-config.php`, otherwise it would screw with the configurations of the local environment. The `wp-config.php` from the dump also has a lot of settings from WP Engine that are not pertinent to a local setup and should not be copied over.

As a general rule, you will want to copy everything from the dump **except**:

- `# Database Configuration`.
- `# Security Salts, Keys, Etc`.
- Everything between `# Localized Language Stuff` and `# WP Engine Settings`.

Like mentioned previously, for most sites (including the AirFleet Starter Theme itself), nothing needs to be copied. However, there will be a few exceptions that require some custom settings. In that case, you will need to determine if those are relevant or not to your local environment, or check with the tech lead of the project if you are not sure.

#### 2.3. Import the database

- Open the Local application, go to `Local Sites`, select the site, go to `Database` tab and open `Adminer`.
- Click `Import`. Under `File upload` pick the file `wp-content/mysql.sql` from the dump and run the import.

Note: If you have just installed Local by Flywheel and you get the following error when trying to open `Adminer`:

```
No Extension
None of the supported PHP extensions (MySQLi, MySQL, PDO_MySQL) are available.
```

Then you might need to restart your computer.

If that doesn't solve your issue then refer to the following threads for more information:

- [No Extension None of the supported PHP extensions (MySQLi, MySQL, PDO_MySQL) are available](https://localwp.com/community/t/no-extension-none-of-the-supported-php-extensions-mysqli-mysql-pdo-mysql-are-available/14990).
- [Adminer gives No extension message on Windows](https://localwp.com/community/t/adminer-gives-no-extension-message-on-windows/14605).

### 2.4. Update the site URL

- Open the Local application, go to `Local Sites`, right-click the site and select `Open Site Shell`.
- Navigate to the WordPress directory of your project within the shell.
- **Update the following commands** with the URLs of the external and local environment and run them:

```bash
wp search-replace https://airfleettheme.wpengine.com http://airfleet-theme.local --dry-run
```

It should state how many replacements will be made.

After confirming the results, remove the `dry-run` parameter and run it for good:

```bash
wp search-replace https://airfleettheme.wpengine.com http://airfleet-theme.local
```

### 2.5. Visit the site

Your local environment should now be created. You can now visit the site and admin to confirm the installation.

Open the Local application, go to `Local Sites`, select the site and click the `Admin` or `View Site` button.

Since you migrated the database, you need to login with an account that is available in the database you imported.


### 3. Setup the project

#### 3.1. Clone the repository

- Clone the repository: `git clone https://gitlab.com/codersclan/airfleet-starter-theme.git` (update with the URI of your repository).
- Open the Local application, go to `Local Sites`, right-click the site and select `Show Folder`.
- Browse to the `app/public/` folder.
- Move the contents of the repository into this folder (move all files and folders including the hidden `.git` folder).

Note: this assumes the repository matches the root of the WordPress site (such as this one). Some repositories only store the theme's code. In that case you need to move the contents to the proper sub-folder under `app/public/`.

#### 3.2. Install the theme

Check the theme's README file at [wp-content/themes/airfleet/README.md](wp-content/themes/airfleet/README.md) and follow its installation instructions.









## Creating an external environment

In this section we go through the steps of configuring WP Engine, DeployHQ, and GitLab for a new project.

The tech lead will be doing these steps. If you are only developing you don't need to do these.


### 1. WP Engine

#### 1.1. Login to WP Engine and add a new site and environment

#### 1.2. Create a WordPress admin account for yourself

- In the environment page in WP Engine, open phpMyAdmin.
- Select the database.
- Go to the SQL tab.
- Update the first command with your details and execute them all (you can run them all in one go):

```
INSERT INTO `wp_users` (`user_login`, `user_pass`, `user_nicename`, `user_email`, `user_status`)
VALUES ('AirFleet - Name', MD5('your password'), 'your-name', 'name@codersclan.net', '0');

INSERT INTO `wp_usermeta`(`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES (NULL, (Select max(id) FROM wp_users), 'wp_capabilities', 'a:1:{s:13:"administrator";s:1:"1";}');

INSERT INTO `wp_usermeta`(`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES (NULL, (Select max(id) FROM wp_users), 'wp_user_level', '10');
```

#### 1.3. Make sure the site is not indexable

During development, the site should not be indexable by search engines.

Go to `WP Admin > Settings > Reading > Search Engine Visibility` and make sure `Discourage search engines from indexing this site` is checked.

#### 1.4. Add WordPress users

Go to `WP Admin > Users` and create accounts in WordPress for the projects managers and developers who are working on the project.

#### 1.5. Update the general settings of the site

Go to `WP Admin > Settings > General`, set the title and tagline. Make sure `WordPress Address (URL)` and `Site Address (URL)` are using HTTPS.

#### 1.6. Update permalink settings

Go to `WP Admin > Settings > Permalinks` and set `Common Settings` to `Post name`.

#### 1.7. Delete sample pages and posts

Go to `WP Admin > Posts` and `WP Admin > Pages` and delete the sample posts/pages.

#### 1.8. Create homepage

Go to `WP Admin > Pages`, create an empty homepage and publish it.

Note: if you [don't see the Gutenberg editor](https://stackoverflow.com/c/codersclan/questions/177), go to the top right corner and click on your name. Make sure `Disable the visual editor when writing` is NOT checked and update the profile (even if you didn't change the option) - in case you see an error about a missing nickname, fill that field also.

Go to `WP Admin > Settings > Reading` and change `Your homepage displays` to `A static page (select below)` and select the page you created.

#### 1.9. Create SFTP user for DeployHQ

In the environment page in WP Engine, go to `SFTP users`.

Add a new user for DeployHQ deployments.

Give it the name `deployhq-production` (or `deployhq-prod` if the name is to long). WP Engine will automatically prepend the site name to it, so the final name will be `sitename-deployhq-production`.

Make sure you note down the password and connect with FTP to confirm the credentials are working.

#### 1.10. Enable caching and CDN

In the environment page in WP Engine, go to `Utilities`, under `Cache options`, enable `Object caching`.

Go to `CDN` page and enable CDN for the main domain.

If it's a transferrable install, you won't be able to enable these options.

#### 1.11. Create a backup point

In the environment page in WP Engine, go to `Backup points` and select `Back up now`.

#### 1.12. Create the staging environment

In the site page in WP Engine, add a staging environment. Pick the production backup point previously created.

Create a SFTP user for DeployHQ for the staging environment, using the same instructions as previously (but choose a name ending in `-staging`).


### 2. GitLab

#### 2.1. Create the repository in GitLab

Create the repository in GitLab by forking [codersclan/airfleet-starter-theme](https://gitlab.com/codersclan/airfleet-starter-theme).

Alternatively, create an empty repository and create a `master` branch. Since GitLab doesn't automatically create a `master` branch, a quick way to do so is to add a readme file using the provided button in the repository page.

#### 2.2. Create staging branch

Use the create button in the GitLab repository page to add a new branch. Name it `staging`.

#### 2.3. Set protected branches

In the GitLab repository page, go to `Settings > Repository`, expand `Protected Branches`, select the `staging` branch, set `Allowed to merge` to `Maintainers` and `Allowed to push` to `Maintainers`.

#### 2.4 Pipeline status badge

In the GitLab repository page, go to `Settings > CI / CD`, expand `General pipelines`, under `Pipeline status` copy the markdown code and add it at the top of your readme file.

#### 2.5 Customize project

Update the readme file for this project:

- Update the title at the top with the name of the project.
- Update the pipeline badge (step 2.4).
- Update the [Environments](#environments) section.

Update the theme:

- Open `wp-content/themes/airfleet/config.json` and set the development URL to something appropriate.
- (Optional) Update the screenshot at `wp-content/themes/airfleet/theme/screenshot.png` (see [Screenshot](wp-content/themes/airfleet/README.md#screenshot)).
- (Optional) Update the theme's name at `wp-content/themes/airfleet/theme/style.css`.


### 3. DeployHQ

#### 3.1. Create project in DeployHQ

#### 3.2. [Connect the repository](https://www.deployhq.com/support/projects/creating-a-project/manually)

- Go to the GitLab repository page and copy the clone `git@` URI.
- Go to the project in DeployHQ, go to `Repository > Configuration`, paste the URI, and copy the SSH Public Key. Don't save yet.
- Go to the GitLab repository page, go to `Settings > Repository`, expand `Deploy Keys`, and add the SSH key from DeployHQ (write access is not needed).
- Save the repository settings in DeployHQ.

#### 3.3. Create production server

- Go to the project in DeployHQ and select `Servers & Groups`.
- Create a new server.
- Name it `Production`.
- Select SSH/SFTP and enter the SFTP user created previously in WP Engine and the other SFTP information.
- If you are deploying to a specific sub path in WP Engine, enter the `Deployment Path` (that is not needed if you are forking from AirFleet Starter Theme). Be sure to create the full folder path through SFTP before doing a deployment, otherwise the deployment will fail to find the folder.
- Select the correct branch under `Deployment Options` and check `Automatically deploy when this branch is pushed to?`.

#### 3.4. Create staging server

Repeat previous steps to create the staging server.

#### 3.5. [Enable automatic deployments](https://www.deployhq.com/support/deployments/automatic-deployments)

- Go to the project in DeployHQ and select `Automatic Deployments`. Copy the `Webhook URL`.
- Go to the GitLab repository page, go to `Settings > Integrations` and add the webhook (default settings will suffice).

#### 3.6. Configure the build

- Go to the project in DeployHQ and select `Build Pipeline`.
- Go to `Build Configuration`.
- Add cached files in `Cached Files` section. Add the following directories:
    - `wp-content/themes/airfleet/node_modules/**`
    - `wp-content/themes/airfleet/vendor/**`
    - `wp-content/themes/airfleet/.yarn/**`
    - `wp-content/themes/airfleet/.composer-cache/**`
    - `wp-content/themes/airfleet/.imagemin-cache/**`
- Go back to `Build Pipeline`.
- Add a new build command:

```bash
cd ./wp-content/themes/airfleet
composer config -g cache-dir "$(pwd)/.composer-cache"
composer global require hirak/prestissimo --no-interaction --ansi
composer install --prefer-dist --no-dev --no-ansi --no-interaction --no-progress
yarn install --pure-lockfile --cache-folder .yarn
yarn build
```

Note: Update the path above if using a different theme folder.

#### 3.7. Do the first deployment

Do the first deployment to make sure everything is working properly.

Either do a small commit, which should trigger the automatic deployment, or do a manual deployment.

#### 3.8. Connect DeployHQ with Slack

To update a Slack channel with notifications regarding deployments, do the following steps:

- Go to the project in DeployHQ and select `Integrations`.
- Click on `New Integration`, select `Slack` and click on `Create Integration`.
- Login to Slack, select the channel and install.




### 4. WordPress

#### 4.1. Enable theme

Go `WP Admin > Appearance > Themes` and activate the correct theme.

#### 4.2. Install plugin dependencies

Once the theme is activated, a few messages will appear at the top of WP Admin for installing the plugin dependencies from the theme. Use the links to install the plugins. Then refresh the page and activate the plugins.

#### 4.3. Delete default themes

I recommend deleting the default themes that come with WordPress. They can always be reinstalled from the marketplace and it avoids update notifications for the themes.

#### 4.4. Configure WP Sync DB

This plugins allows easy environment syncing between production/staging and local environments.

- On the production server, go to `WP Admin > Tools > Migrate DB`.
    - Go to `Settings` tab.
    - Check `Accept pull requests allow this database to be exported and downloaded`.
    - Copy `Connection Info`.
- On the local server, go to `WP Admin > Tools > Migrate DB`.
    - On `Migrate` tab, select `Pull` and paste the connection info.
    - If the site is behind HTTP authentication, an error will be shown and you will be able to enter the credentials.
    - Check `Media Files` and check `Save Migration Profile`.
    - Save or migrate and save the profile.

#### 4.5. Create Style Guide page

Create a new page and select the Style Guide template. You can do this by selecting `Pages > Add New`, and then on the menu at the right side of the screen, expand `Page Attributes` and select `Style Guide` from the `Template` dropdown menu. Publish it privately (in the same right-side menu, select `Status & Visibility` and next to `Visibility` select `Private`).

The Style Guide should be maintained with examples of the custom components, blocks, and other features that are built for the project. Check the [theme's README file](wp-content/themes/airfleet/README.md) for more information.


#### 4.6 Configure WP Rocket

Check the section on [WP Rocket in the theme's README](wp-content/themes/airfleet/README.md#wp-rocket).