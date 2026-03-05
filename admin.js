const bcrypt = require('bcrypt');
const pass = '0000';
const passGenerator = async (pass)=>{
    passEncrypted = await bcrypt.hash(pass,10);
    console.log(passEncrypted);
}
passGenerator(pass);