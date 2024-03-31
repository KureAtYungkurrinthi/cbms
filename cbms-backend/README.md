# Introduction

Committee/Board Management System (CBMS) backend (REST API) repo.

# Getting Started

## Installation process

After download the repository, make sure you edit [configuration file](.env) to match production environment.

Run [bootstrap script](database.sql) on MySQL database, then run the following command:

```shell
npm install # Install dependencies
npm run start # On production environment
npm run dev # Only for development, server with restart automatically after file change
```

## Software dependencies

Node.js v20 and above. Easier way to install is through [Snap](https://snapcraft.io/node).

## API references

https://dev.azure.com/DevOpsGE1/Committee%20Board%20Management%20System/_wiki/wikis

# Build and Test

To connect to development database using my credentials (ask me for access and IP whitelist first):

```shell
mysql -h backend-dev.mysql.database.azure.com -u wang2147 -p CmrpVQTh!SwSKMmcf9Rm8iZ2^wRvr&GE
```

# How To Contribute

1. [Source Control and Branching Strategy](https://www.gitkraken.com/learn/git/git-flow)
2. [Create a pull request to review and merge code - Azure Repos](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops)