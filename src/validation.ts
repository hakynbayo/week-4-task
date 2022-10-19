import fs from 'fs';
import EmailValidator from 'email-validator';
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  // console.log('Complete the implementation in src/validation.ts');
  let email = '';
  let emailArr: string[] = [];
  let trueEmailArr: string[] = [];

  inputPath.forEach((x) => {
    fs.readFile(x, 'utf-8', (err, data) => {
      for (const mail of data) {
        email += mail;
      }
      email = email.toString();
      emailArr = email.split('\n');
      for (let i = 1; i < emailArr.length - 1; i++) {
        trueEmailArr.push(emailArr[i]);
      }

      trueEmailArr = trueEmailArr.filter((y) => {
        if (EmailValidator.validate(y) === true) {
          return true;
        } else return false;
      });

      const writeStream = fs.createWriteStream(outputFile);
      writeStream.write(`Email \n`);
      writeStream.write(`${trueEmailArr.join('\n')} `);
    });
  });
}

export default validateEmailAddresses;
