const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config();


const uri = process.env.MONGODB_URL;
const dbName = "assignment_week4Db";

async function transferMoney(accountFrom, accountTo, transferAmount) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collectionAccounts = db.collection('accounts_db');
        const senderAccount = await collectionAccounts.findOne({ account_number: accountFrom });
        const reciverAccount = await collectionAccounts.findOne({ account_number: accountTo });
        if (!senderAccount || !reciverAccount) {
            throw new Error('Sender or receiver account not found.');
        }
        if (senderAccount.balance < transferAmount) {
            throw new Error('Insufficient balance in the sender account.');
        }
        const currentSenderBalance = senderAccount.balance - transferAmount;
        const currentReciverBalance = reciverAccount.balance + transferAmount;
        await collectionAccounts.updateOne(
            { account_number: accountFrom },
            {
                $set: {
                    balance: currentSenderBalance,
                },
                $push: {
                    account_changes: {
                        change_number: new ObjectId(),
                        amount: -transferAmount,
                        changed_date: new Date(),
                        remark: `Transfer ${transferAmount} to account ${accountTo}`
                    }
                }
            }
        );

        await collectionAccounts.updateOne(
            { account_number: accountTo },
            {
                $set: {
                    balance: currentReciverBalance,
                },
                $push: {
                    account_changes: {
                        change_number: new ObjectId(),
                        amount: transferAmount,
                        changed_date: new Date(),
                        remark: `Transfer ${transferAmount} from account ${accountFrom}`
                    }
                }
            }
        );
        console.log('Money transfered successfully.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = transferMoney;