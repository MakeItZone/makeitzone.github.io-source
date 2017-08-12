Title: Regular Accounting Processes
date: 11/08/2017
tags: business

[TOC]

## Process for Simplicity

Accounting is not hard in principle, but without discipline and diligence, even simple things can quickly compound into complexity!

### Daily/Weekly Processes

#### Expenses

- use the reciept, or invoice (print it if it's an online purchase) and enter the transaction into QuickBooks Online (QBO) as an *expense* or *bill* (if it's going to be paid later)
- annotate printed invoice/receipt with "Entered"
- If on Visa, pay off purchase via online banking
- annotate inovoice/receipt with "Paid"
- put it in that months financial records folder

For Visa Purchases

- 1-2 Days Later bill payment will appear in the banking section of QBO
- change the transaction type to *transfer*. Destination account should be the Visa account in QBO

*Note* - The above is for a Visa card that does not provide a means to download a record of transactions. If you can download your Visa transactions, you should be able to import them and then *match* the bill payments from your bank account to the payments on the Visa account.

#### Income

All income (sales, services, rentals, etc) should have an invoice created in QBO. We'll print them when they're paid, for archival purposes.

### Monthly Process

Easiest if this is triggered when the Visa statement arrives.


#### Expenses

- reconcile the Visa statement
    + find, print, enter into QBO, and pay the missed expenses
- Go to the Expenses section of QBO
- Filter the list of expenses by recently paid 

![QBO Transaction Filter]({filename}/images/qbo-filter.png)

- export the list of transactions to your spreadsheet app

![QBO Export Transactions]({filename}/images/qbo-export_transactions.png)

- change the "attachment" column to be "in envelope"
- make sure there are some transactions listed before the range of interest (it's not clear what defines a "recently")
- in the spreadsheet, delete the transactions outside the timeframe of interest
- add a final row with a `=counta()` to count the number of transactions. It should match the number of invoices/paid bills/receipts in the envelope.
- Also add a `sum()` in the final row to calculate the total value of expenses paid this month. This should match the actual outgoing cash this month.
- print this spreadsheet
- take each of the expense reciepts, invoices, check stubs, etc and put them in a (new) envelope. Mark each receipt filed in the envelope in the matching "in envelope" blank box of the printed spreadsheet
- find or note any missing items
    + put an asterisk by any bank charges and note that they're listed on that months bank statement(s)
- staple the spreadsheet to the month's expenses envelope and file it in the folder for that month.

#### Income

- go to "sales" -> "all sales"
- Set the filter to "recently paid"
- export the list to your spreadsheet app
- make sure there are some transactions from before the range of interest (it's not clear what defines "recent")
- modify the "attachments" column to be "in envelope"
- add a new column "Received" that `=total-balance` (to account for partial payments)
- add an extra, final row
- in this new row insert a cell which adds a `=counta()` of all the transactions. This number should match the number of invoices/sales slips in the envelope.
- in this new row insert a cell `=sum(received)`. This should be the actual cash recieved for the month
- print this spreadsheet
- get a new envelope
- mark of income invoices on the spreadsheet as you put them in the envelope
    - find/print any missing ones
- staple the spreadsheet to the months income envelope and file it in the folder for that month  

**Note** 

There a subtle difference between using "recently paid" and filtering eg invoices by a status of "paid" for the month of interest. Filtering by trasaction type and status will only show you transactions that were issued *and* paid in that month. You won't see any transactions that were issued before the period of interest but paid in the time of interest.

### Result

Each month ends up with an archival copy of all funds recieved and paid.

They've been checked, and the total on the summary sheet has been calculated outside of QBO.

### Notes

The data in QBO is *acrual based*. That is the values recorded may not match the actual monies recieved.

The archival paperwork is *cash based*: ie an invoice only appears in one months archive folder, the month the funds where spent/recieved.

eg an invoice issued in June but paid in July appears only in the July archive as thats when it was paid/the funds were received.

If the archives where acrual based, the (unpaid) invoice would be in the June archive, and the payment/reprint (marked as paid) would be in the July archive. That could be nearly 2x more peices of paper to generate, sort, and store!
