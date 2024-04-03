
`az deployment sub what-if -f main.test.bicep -l northeurope -p resourceGroupName=mischa-aci-test`

## Generating the Docs

When updating code, the README must be auto generated. This is done with a powershell script.

First you need to dot source it, then run it:

`. Set-AVMModule.ps1`
`Set-AVMModule -ModuleFolderPath ./avm/res/container-instance/container-group/`

## Links:



202404031425