# npm-package-checker
A command-line tool to verify if a package has been released in a repository (such as Nexus, Artifactory, ...).
## Table of contents
- [So simple to use](#so-simple-to-use)
- [Example of usage from command-line](#example-of-usage-from-command-line)
- [Example-of-usage from continuous integration](#example-of-usage-from-continuous-integration)
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
| Param         | Short | Purpose | 
| ---           | :---: |   ---   |
| --repoUrl     | -r    | The URL of NPM repository (Nexus, Artifactory...) |
| --tag         | -t    | The TAG of component to be checked if it has been published or not |
#### Optionals params
The optionals parameters are:
| Param         | Short | Meaning | 
| ---           | :---: |   ---   |
| --debug       | -d    | Show detailed info about the progress |
| --colors      | -c    | Show color traces |
#### Other params
The util parameters are:
| Param         | Short | Meaning | 
| ---           | :---: |   ---   |
| --help        | -h    | Show command-util help |
| --version     |       | Show version number |

---

## Example of usage from command-line
Lorem ipsum...

---

## Example of usage from continuous integration
Lorem ipsum...

---

## Contributing
Lorem ipsum...

---
