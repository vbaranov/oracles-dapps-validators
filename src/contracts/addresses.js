import helpers from './helpers'
import helpersGlobal from '../helpers'
import messages from '../messages'
		const local = { 
			"METADATA_ADDRESS": "0xa7896bed4ea8383d012c8c4665bfaa73b4412a45",
			"KEYS_MANAGER_ADDRESS": "0xd9f058b5e16c211837be058af8cbe31f28117567",
			"POA_ADDRESS": '0x8bf38d4764929064f2d4d3a56520a76ab3df415b',
			"MOC": '0x130c2af760c9d4ea466b6fb6e0ec2636884b3e70'
		};
	
	
/*const local = {
  METADATA_ADDRESS: '0xcBB2912666c7e8023B7ec78B6842702eB26336aC',
  KEYS_MANAGER_ADDRESS: '0x2b1dbc7390a65dc40f7d64d67ea11b4d627dd1bf',
  POA_ADDRESS: '0x83451c8bc04d4ee9745ccc58edfab88037bc48cc',
  MOC: '0xCf260eA317555637C55F70e55dbA8D5ad8414Cb0'
}*/

export default (web3Config) => {
    let branch;
    
    switch (web3Config.netId) {
        case '77':
            branch = 'sokol'
            break;
        case '99':
            branch = 'core'
            break;
        default:
            branch = 'core'
            break;
    }
    return new Promise((resolve, reject) => {
        fetch(helpers.addressesURL(branch)).then((response) => { 
            response.json().then((json) => {
                resolve({addresses: local, web3Config});
            })
        }).catch(function(err) {
            let addr = helpers.addressesURL(branch);
            let msg = `
                Something went wrong!<br/><br/>
                ${messages.wrongRepo(addr)}
            `
            helpersGlobal.generateAlert("error", "Error!", msg);
            reject(err);
        });
    })
}
