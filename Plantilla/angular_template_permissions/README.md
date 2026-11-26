# Introduction to Angular Starter kit

> Angular 20: see [MIGRACION_ANGULAR_20.md](MIGRACION_ANGULAR_20.md) for the migration map, scripts, environments, and certificate paths.

Here you can find some guidance for starting a new Angular Web application, starting from this template, which comes with customizations to follow the arquitectural SWA CoE Guidelines regarding Angular applications, as well as some technical features. The aim of this template is to speed up the development of new PWA and to be compliant with the SGS development standards. 

In the SWA CoE we have checked that Angular it's a lightweight easy-to-use library to develop small-medium PWA web applications, that somehow is the most common scenario around SGS. 

# Getting Started

## Duplicate the repo into your Azure DevOps Project
1.	Installation process

The Angular template is under this shared repository: https://dev.azure.com/sgs-dev-artifacts-feed/SGS-SWA-CoE-DevelopmentTemplates/_git/AngularStarterKit

Yo can duplicate the repo into your project following the next steps:

1. Open Git Bash.
Create a bare clone of the repository.

$ git clone --bare https://dev.azure.com/sgs-dev-artifacts-feed/SGS-SWA-CoE-DevelopmentTemplates/_git/AngularStarterKit

2. Mirror-push to the new repository.

$ cd AngularStarterKit.git/

$ git push --mirror https://sgsglobaldev@dev.azure.com/sgsglobaldev/Temp/_git/Temp 

where /Temp/ is your destination Project and git repository where you want to copy the template to ( both must already exist ).

3. Remove the Angular Starterkit temporary local repository you created earlier.

$ cd ..

$  rm -rf AngularStarterKit.git

## Clone and play with the repo

Just clone the repository that is under this [repo url](https://dev.azure.com/sgs-dev-artifacts-feed/SGS-SWA-CoE-DevelopmentTemplates/_git/AngularStarterKit) and follow the steps provided to run the template (see below).

And that's all, now you can start working with the repo based on the template code, just open the folder with Visual studio Code.

Then you can customize the Project name, remove examples etc, add more routes, views, components, services, stores...based on your needs.

# Software dependencies and features
The main dependencies of the template are:

* [Angular](https://Angular.io/)
* [AngularRouter](https://angular.io/guide/router)
* [NgRx](https://ngrx.io/)
* [PrimeNG](https://www.primefaces.org/primeng/)
* [Tyescript support](https://Angular.org/v2/guide/typescript.html)
* MSAL authentication
* MSAL authorization
* Internationalization with ngx-translate
* Routing with guards

Take a look at package.json file to see all the dependencies of the template.

# Run the template

## Prerequisites
Use Node.js 20.19.0 or another version supported by Angular 20.

## Steps
* Access to the repository where you have duplicated/cloned the template.
* Run `npm ci` to install dependencies.
* Run `npm run serve` for HTTPS at `https://localhost:4200/` or `npm run serve:local` for HTTP at `http://localhost:4200/`.

# Setup Angular application with Https certificate
The HTTPS scripts use `src/certs/cert.pem` and `src/certs/key.pem`, already present in the repository. The certificate covers `localhost`. To generate a replacement with `mkcert`, run `npm run create-localhost-certificate` and trust its local CA on your machine.

# Internacionalization

The Template comes with built-in support for internacionalization of labels, that is implemented in the Home view. There are two files in the project structure, under the `assets\i18n` directory.

- en.json, for english labels
- es.json,  for spanish labels

Basically, is a set of key-value pairs, where the key is in the left, and the value in the right.

```
{
  "close": "close",
  "status dialog message...": "status dialog message...",
  "welcome":"Welcome to the SGS angular Starter Kit!",
  "angular introduction": "Angular is a progressive framework for building user interfaces.",
  "explanation": " In the SWA CoE we have checked that it's a lightweight easy-to-use library to develop small-medium PWA web applications, that somehow is the most common scenario around SGS. Some of our products have been developed using Angular, like",
  "and": "and"
}
```

In order to organize better your labels, you can nest them:

```
"dialogDelete": {
    "areYouSure": "Are you sure you want to delete the {name}?",
    "delete": "delete",
    "cancel": "cancel",
    "title": "@:dialogDelete.delete {name}"
  }
```

Of course, you can add as much keys and values in a language file, and all the language files as you'll need. The default language in the template is set to English (`en`).

## Add a new language

To create a new language file, add the file ( e.g. `fr.json` for French for example) to the `i18n` directory. Then create all the labels that are in the other languages files and the respective translations.

## Set a language as default (statically)

Open the `environment.ts` file, and change the value fo the property `language` to `fr` ( prefix of the file created , `fr.json`)

## Use a label in the html code of the template

To use a label in a template, use the `translate` pipe with its key:

```
<b>{{ "Refresh" | translate }}</b>
```

For nested labels:
```
<b>{{ "dialogRefresh.Refresh" | translate }}</b>
```

# Deployment : Variables configuration 
The template defines local, lab, UAT, and production build configurations:

- environment.defaults.ts
- environment.ts (overrides defaults)
- environment.lab.ts (overrides defaults)
- environment.prod.ts (overrides defaults, production=true)

When you run `npm run serve`, `environment.ts` is used. UAT currently uses `environment.prod.ts` because the previous configuration referenced a missing `environment.uat.ts`; see the migration guide before assigning separate UAT endpoints.

When you build the application in production mode with `npm run build`, the file `environment.prod.ts` is used to deploy the configuration of the application. In that case, you'll see that the configuration  values are set to this:

```
  production: true,
  msalConfig: {
    ...defaultEnvironment.msalConfig,
    clientId: '',
    authority: '',
    redirectUri: '',
    postLogoutRedirectUri: '',,
    cacheLocation: '',
    consentScope: [''],
    apiScope: [''],
  },
  apiUrl: '',
  apiVersion: '1.0',
  title: 'Angular Starter Kit',
  appInsights: {
    instrumentationKey: '',
  },
```

The specific content of this variables, depending on the enviroment (dev, uat, production) , must be used running the build command for that environment managed by the angular.json file. 

So, In Azure Devops you'll have to setup two pipelines:
1. Build pipeline, where you build and generate the distribution package for the application in all the environments setup on angular.json build.
2. Release pipeline, one for each environment, where you will select from the dist folder where the application was build.

Suggestion: If you finally use the Starter Kit to develop a business application and you want to setup the Azure DevOps pipelines for the different enviroments, please contact us in the [SWA CoE](mailto:coe@sgs.com) and we'll help you to setup everything the first time.

# Example of env.development file that comes with the Starter kit

```
  apiUrl: '',
  apiVersion: '',

  title: 'APP TITLE',
  version: '',
  build: '',
  applicationId: '',
  language: 'en',
```

* The settings have some default values if misssing, so you can always adjust them for your needs.

Notes:
* `title` it is the title of the app in the index.html and topnavbar component. Defaults to package.json name value.
* `version` it is the version number of the app shown in ABOUT component. Defaults to package.json version value.
* `build` it is the build code of the app. Defaults to Azure $build environment variable.
* `applicationId` it is a guid id that identifies the app calling other apis like the Cognitive Hub used in the endpoint url. No default value.
* `apiUrl` it is the url of the rest api that will be used within the app. No default value.

# MSAL variables configuration 
The following variables should be updated on the corresponding environment.<<env>>.ts file.

```
  clientId: <<guid ID>>,
  authority: 'https://login.microsoftonline.com/sgs.onmicrosoft.com',
  redirectUri: 'https://localhost:4200',
  postLogoutRedirectUri: 'https://localhost:4200',
  cacheLocation: 'localStorage',
  consentScope: ['User.Read'],
  apiScope: ['api://<<guid ID>>/user_impersonation'],
```

* The settings have some default value if misssing, you can always adjust them for your needs.

Notes: 
* clientId: AZURE APP REGISTRATION for the CLIENT_ID registration. [See](https://dev.azure.com/sgs-dev-artifacts-feed/SGS-SWA-CoE-Guidelines/_wiki/wikis/SGS-SWA-CoE-Guidelines.wiki/95/01.-App-Registration-Guidelines)
* authority: URL for AZURE SGS tenant.
* redirectUri: Redirect uri from the front/client app in AZURE APP REGISTRATION.
* consentScope: it is the list of permissions from the front/client app in AZURE APP REGISTRATION. Split by semicolon if multiple.
* apiScope it is the scope of the exposed api from the back/server app in AZURE APP REGISTRATION. Split by semicolon if multiple.

# Devops BUILD pipeline

The angular.json file is the one in charge of setting up the configuration to run with the npm run command.

Each environment now has a configuration under the single `AngularStarterKit` project. Look for

```
"projects": {
    "AngularStarterKit": {
      "architect": {
        "build": {
          "configurations": {
            "uat": {},
            "production": {}
          }
        }
      }
    }

```
The settings used in those projects will allow you to build them and leave the files of each in a subfolder in the `dist` folder something like

```
./dist
      /prod
      /uat
```

The execution of the commands are used from the package.json file with the command aliases.

```
"build-uat": "ng build --configuration=uat",
"build-prod": "ng build --configuration=production",
```

In these examples the execution in a terminal for `npm run build-uat` or `npm run build-prod` will be running the commands for each case, 
and will be reading the configuration from the projects setup in the previous steps.
These commands are used within the azure-pipeline.yml on every build it will create the dist files for each environment folder setup on it like in these example.

```
  - task: Npm@1
    displayName: 'npm build-uat'
    inputs:
      command: 'custom'
      verbose: true
      customCommand: 'run build-uat'
      
  - task: Npm@1
    displayName: 'npm build-prod'
    inputs:
      command: 'custom'
      verbose: true
      customCommand: 'run build-prod'
```

# NPM Dependencies

`package.json` is the source of truth for current Angular 20 dependencies. The main integrations are Angular Material, PrimeNG 20 with Aura, NgRx 20, MSAL Angular 4, ngx-translate 18, and ngx-permissions. Unit tests use Karma and Jasmine; the `e2e` script uses Playwright. For the migration from removed packages and options, see [MIGRACION_ANGULAR_20.md](MIGRACION_ANGULAR_20.md).
