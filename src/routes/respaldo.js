const { exec } = require("child_process");

exec("mongodump -d sample_airbnb -o/respaldo", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});



//sudo node respaldo.js