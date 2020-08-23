import { exec } from 'child_process';
import { calGoogleCode } from './getCode.js';
function connect() {
  calGoogleCode();
  exec('ls -l', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
export { connect };
