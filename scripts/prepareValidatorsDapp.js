const fs = require('fs');
const Constants = require("../submodules/poa-test-setup/utils/constants");
const constants = Constants.constants;
const utils = require("../submodules/poa-test-setup/utils/utils");

main()

function main() {
	const pathToAddressesJSON = `./submodules/poa-test-setup/${constants.pathToContractRepo}/${constants.addressesSourceFile}`;
	const addresses = JSON.parse(fs.readFileSync(pathToAddressesJSON));

	let moc = JSON.parse(fs.readFileSync(`./submodules/poa-test-setup/${constants.mocKeysFolder}moc.key`, 'utf8'));

	const addition = `
		const local = { 
			"METADATA_ADDRESS": "${addresses.METADATA_ADDRESS}",
			"KEYS_MANAGER_ADDRESS": "${addresses.KEYS_MANAGER_ADDRESS}",
			"POA_ADDRESS": '${constants.poaNetworkConsensusContractAddress}',
			"MOC": '${moc.address}'
		};
	`

	let dappAddresses = `./src/contracts/addresses.js`;
	let addressesFromDapp = fs.readFileSync(dappAddresses, 'utf8');
	let lastImport = `import messages from '../messages'`;
	addressesFromDapp = addressesFromDapp.replace(lastImport, lastImport + addition)
	addressesFromDapp = addressesFromDapp.replace('resolve({addresses: json', 'resolve({addresses: local')

	fs.writeFileSync(dappAddresses, addressesFromDapp);

	console.log("Validators Repo is prepared");
}