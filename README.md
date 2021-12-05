# Nuxt Components
Example on how to have Nuxt project with components installable to other projects.

If you don't want to publish your modules, add repository as dependency this way:
"sazkabet-template": "git+ssh://git@bitbucket.org:isobarczechrepublic/sazkabet-template.git",

Everytime you update source repository, you have to install it again on all repositories using source repository to force update.

## TODOs:
- for now external dependencies from node_modules have to have absolute path (e.g. @import '../../node_modules/bourbon/core/bourbon'; instead of @import '~bourbon';)
