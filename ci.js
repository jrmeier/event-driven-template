const stage = (process.argv[2] || 'dev')
const childProcess = require('child_process')
const executeCmd = (cmd) => childProcess.execSync(cmd).toString().trim()
const cwd = process.cwd()
const currentBranch = executeCmd('git branch --show-current')
const prevCommitSHA = executeCmd(`git rev-parse --short refs/remotes/origin/${currentBranch}~1`)
const currentCommitSHA = executeCmd(`git rev-parse --short refs/remotes/origin/${currentBranch}`)
const lernaPackages = JSON.parse(executeCmd('npx lerna ls -all --json'))
  .map(lernaPackage => lernaPackage.location.replace(`${cwd}/`, ''))

const lernaPackagesToDeploy = JSON.parse(executeCmd(`npx lerna ls --since ${prevCommitSHA} -all --json`))
  .map(lernaPackage => lernaPackage.location.replace(`${cwd}/`, '')) // ?
const filesUpdatedSinceLastCommit = executeCmd(`git diff --name-only ${prevCommitSHA} ${currentCommitSHA}`).split('\n') // ?

const haveLibsChanged = filesUpdatedSinceLastCommit.some(files => files.includes('libs/')) // ?

const deployChanged = () => {
  if (haveLibsChanged) {
    deploy(lernaPackages)
  } else {
    deploy(lernaPackagesToDeploy)
  }
}

const deploy = (packagesToDeploy = []) => {
  packagesToDeploy.forEach(packageToDeploy => {
    if (packageToDeploy.includes('packages/')) {
      console.log(`${packageToDeploy} is a Package, not deploying.`)
    } else {
      console.log(`Deploying ${packageToDeploy} Stage:${stage}`)
      process.chdir(packageToDeploy)
      childProcess.execSync(`npx serverless deploy --stage ${stage}`, { stdio: 'inherit' })
      // I think this works, but it didn't actually seem to spawn both, it was still consecutive so just going to leave it here for someone more ambitious. This was a test for parralel execution of the deploys.
      // const deployProc = childProcess.spawn('npx', ['serverless', 'deploy', '--stage', stage], { stdio: 'inherit' })
      // deployProc.on('close', (code) => {
      //   console.log('Deploy Proc finished with code:', code)
      // })
      process.chdir(cwd)
    }
  })
}

deployChanged()
