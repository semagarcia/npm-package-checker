# npm-package-checker
A command-line tool to verify if a package has been released in a repository (such as Nexus, Artifactory, ...).
## Table of contents
- [So simple to use](#so-simple-to-use)
- [Example of usage from command-line](#example-of-usage-from-command-line)
- [Example-of-usage from continuous integration](#example-of-usage-from-continuous-integration)
- [Future features or improvements](#future-features-or-improvements)
- [Contributing](#contributing)

---

## So simple to use
The __npm-package-checker__ command utility has been designed to...
### Installing from npmjs repository
The first step (and my own advice) is to install it globally:
```bash
$> npm install -g npm-package-checker
```
### Executing the util
In order to be able to execute it, write the following command:
```bash
$> npm-package-checker
```
### Specifying parameters (mandatories and optionals)
__npm-package-checker__ has some parameters, which two of them are mandatories and the rest are optionals.
#### Required params
The required parameters are:

| Parameter     | Short form | Purpose |
| ---           | :---:      |   ---   |
| --repoUrl     | -r         | The URL of NPM repository (Nexus, Artifactory...) |
| --tag         | -t         | The TAG of component to be checked if it has been published or not |

#### Optionals params
The optionals parameters are:

| Parameter     | Short form | Purpose |
| ---           | :---:      |   ---   |
| --debug       | -d         | Show detailed info about the progress |
| --colors      | -c         | Show color traces |

#### Other params
Other parameters are:

| Parameter     | Short form | Purpose |
| ---           | :---:      |   ---   |
| --help        | -h         | Show command-util help |
| --version     |            | Show version number |

---

## Example of usage from command-line
After installing it (at the moment is only focused to use it from the terminal), choose from the following modes:
  * Simple usage, wrong usage:

    ```bash
    $> npm-package-checker
    ```
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/npm-cli-simple-usage.png "")
    
  * Simple usage, tag published:
  
    ```bash
    $> npm-package-checker --repoUrl 'http://registry.npmjs.org/npm-package-checker' --tag '1.0.0' -c
    ```
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/cli-found-no-colors.png "")
    
  * Simple usage, tag inexistent:
  
    ```bash
    $> npm-package-checker --repoUrl 'http://registry.npmjs.org/npm-package-checker' --tag '0.0.1' 
    ```
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/cli-not-found.png "")
    
  * Enabling traces.
  
    ```bash
    $> npm-package-checker --repoUrl 'http://registry.npmjs.org/npm-package-checker' --tag '0.0.1' --debug
    ```
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/cli-not-found.png "")
    
  * Enabling colors.
  
    ```bash
    $> npm-package-checker --repoUrl 'http://registry.npmjs.org/npm-package-checker' --tag '0.0.1' --debug --colors
    ``` 
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/cli-not-found-colors.png "")
    
  * Component published, enabled colors.
  
    ```bash
    $> npm-package-checker --repoUrl 'http://registry.npmjs.org/npm-package-checker' --tag '1.0.0' --colors
    ``` 
    ![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/cli-found.png "")

---

## Example of usage from continuous integration
To take advantage of that use, you could integrate this powerful script into your CI server (for instance, Jenkins, Travis, Go...). If
you are publishing frontend components (not necessarily web components) in a repository (Nexus, Artifactory or even in npmjs repo), one
step before of that could be the check if the current version of its package.json has been upgraded correctly (useful when the policy is to
avoid override the same version; instead of that, the developer always have to increment, at least, the patch version).

That script, in a few words, will check if the version that you are trying to publish exists or not in the repo, stopping the process. The 
steps to integrate it are:
  1. Add "Execute from the command line (shell)" in the desired job.
  2. Call the script directly (if it was installed globally) with specific params (in future versions this script could automatically search
    the package.json in order to extract the version of the component).
  3. Save and execute it!    

Failed execution:

![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/jenkins_fail.png "")

Successful execution:

![npm-package-checker](https://raw.githubusercontent.com/semagarcia/npm-package-checker/gh-pages/images/jenkins_ok.png "")

---

## Future features or improvements
That feature list will be populated with comments, suggestions and requests of the community.
- [x] Initial version: check if a version has been released in a repo.
- [ ] Search and extract automatically the version of package.json.

---

## Contributing
If you are interested to contribute with that project, you could perform it via:
- Opening an issue.
- Pull Request.
- Writing me.

---
