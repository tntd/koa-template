const NodeRSA = require('node-rsa');

const key = new NodeRSA(
	'-----BEGIN PUBLIC KEY-----\n' +
		'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC+3CidvH/snd26rtAJeWT1+/Q6s/+kda9EOLA\n' +
		'DWR2qA0mIpPRf3IT4+VOA7z6lIigbtDaMkvbEA3z2kzl3fes/2mU9cs+GSGC3ODEEz62SN8gst9P\n' +
		'K0Yqvg27yRQAAfVXelH7ffmdTW5q676E+OTF94fH00ecdHLv6Y/5LaOzGQIDAQAB' +
		'-----END PUBLIC KEY-----'
);

const ehrDecrypt = token => {
	const decrypted = key.decryptPublic(token, 'utf8');
	const userObj = JSON.parse(decrypted);
	return userObj;
};

module.exports = ehrDecrypt;
