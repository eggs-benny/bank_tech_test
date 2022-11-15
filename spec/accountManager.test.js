const AccountManager = require('../accountManager');

describe('AccountManager', () => {
  beforeEach(() => {
    accountManager = new AccountManager()
  })

  jest
  .useFakeTimers()
  .setSystemTime(new Date('2023-01-10'))

  describe('#printStatement', () => {
    it('prints an empty statement (just headers)', () =>{
      expect(accountManager.printStatement()).toMatch('date || credit || debit || balance')
    })
  })

  describe('#makeDeposit', () => {
    it('returns a statement displaying one deposit', () =>{
      accountManager.makeDeposit(1000)
      expect(accountManager.printStatement()).toMatch('10/01/2023 || 1000.00 || || 1000.00')
    })

    it('returns a statement displaying two deposits', () =>{
      accountManager.makeDeposit(1000)
      accountManager.makeDeposit(2000)
      expect(accountManager.printStatement()).toMatch('10/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00')
    })

    it('returns a statement displaying two deposits & a withdrawal', () =>{
      accountManager.makeDeposit(1000)
      accountManager.makeDeposit(2000)
      accountManager.makeWithdrawal(500)
      expect(accountManager.printStatement()).toMatch('10/01/2023 || || 500.00 || 2500.00\n10/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00')
    })
  })

  describe('Edge Cases', () =>{
    it('rounds deposit / withdrawal to 2 decimal places', () =>{
      accountManager.makeDeposit(1000.013)
      accountManager.makeWithdrawal(500.066)
      expect(accountManager.printStatement()).toMatch('10/01/2023 || || 500.07 || 499.95\n10/01/2023 || 1000.01 || || 1000.01')
    })

    it('returns error if deposit is -ve', () =>{
      const input = () => {
        accountManager.makeDeposit(-1000)
      };
        expect(input).toThrow(Error)
        expect(input).toThrow(`\n***\n***\nDeposit can't be <= 0. If you meant to withdraw, use makeWithdrawal() function.\n***\n***`)
    })

    it('returns error if deposit is 0', () =>{
      const input = () => {
        accountManager.makeDeposit(0)
      };
        expect(input).toThrow(Error)
        expect(input).toThrow(`\n***\n***\nDeposit can't be <= 0. If you meant to withdraw, use makeWithdrawal() function.\n***\n***`)
    })

    it('returns error if withdrawal is -ve', () =>{
      const input = () => {
        accountManager.makeWithdrawal(-1000)
      };
        expect(input).toThrow(Error)
        expect(input).toThrow(`\n***\n***\nWithdrawal can't be <= 0. If you meant to deposit, use makeDeposit() function.\n***\n***`)
    })

    it('returns error if withdrawal is 0', () =>{
      const input = () => {
        accountManager.makeWithdrawal(0)
      };
        expect(input).toThrow(Error)
        expect(input).toThrow(`\n***\n***\nWithdrawal can't be <= 0. If you meant to deposit, use makeDeposit() function.\n***\n***`)
    })
  })
})