const Transaction = require('./src/transaction');
const AccountBalance = require('./src/accountBalance');
const Statement = require('./src/statement');

class BankAccount {
  constructor() {
    this.accountBalance = new AccountBalance();
    this.statement = new Statement();
  }

  makeDeposit(amount) {
    if (amount <= 0)
      return `Error: Deposit can't be <= 0. To withdraw, use makeWithdrawal() function.`;
    if (isNaN(amount))
      return `Error: input must be a number`
    const transaction = new Transaction();
    Object.assign(transaction, { deposit: amount, withdrawal: 0 });
    this.accountBalance.updateWithTransaction(transaction);
    this.statement.addTransaction(transaction);
  }

  makeWithdrawal(amount) {
    if (amount <= 0)
      return `Error: Withdrawal can't be <= 0. To deposit, use makeDeposit() function.`;
      if (isNaN(amount))
      return `Error: input must be a number`
    const transaction = new Transaction();
    Object.assign(transaction, { deposit: 0, withdrawal: amount });
    this.accountBalance.updateWithTransaction(transaction);
    this.statement.addTransaction(transaction);
  }

  printStatement() {
    return this.statement.printStatement();
  }
}
module.exports = BankAccount;
