const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'sql_transactions',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function doTransaction() {
  try {
    await execQuery("BEGIN");

    const accountFrom = 101;
    const accountTo = 102;
    const transferAmount = 1000;


    const senderBalanceResult = await execQuery('SELECT balance FROM account WHERE account_number = ?', [accountFrom]);
    const senderBalance = parseFloat(senderBalanceResult[0].balance);

    if (senderBalance < transferAmount) {
      throw new Error('Insufficient balance!');
    }

    await execQuery('UPDATE account SET balance = balance - ? WHERE account_number = ?', [transferAmount, accountFrom]);

    await execQuery('UPDATE account SET balance = balance + ? WHERE account_number = ?', [transferAmount, accountTo]);

    const senderRemark = 'Transfer to account ' + accountTo;
    const receiverRemark = 'Transfer from account ' + accountFrom;

    await execQuery('INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?), (?, ?, ?)', 
      [accountFrom, -transferAmount, senderRemark, accountTo, transferAmount, receiverRemark]);

    await execQuery("COMMIT");
    console.log('Transaction completed successfully!');
  } catch (error) {
    console.error('Transaction aborted:', error);
    await execQuery("ROLLBACK");
  } finally {
    connection.end();
  }
}

doTransaction();