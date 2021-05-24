# Winbonacci Chrome Extension

#### What is it?
This project was developed as part of the interview process for Winston Privacy (https://winstonprivacy.com)

Winbonacci is a chrome extension that maintains a Fibonacci Sequence across all tabs in the browser. The extension works in the following way:
* On start up, it assigns each open tab a value in the Fibonacci sequence starting with N = 1
* On page load complete, it gets the next value in the sequence and assigns it to the tab

#### How is the Fibonacci Sequence maintained?
The extension has an internal tab manager that keeps track of all open tabs by storing the internal Chrome tab ID along with its corresponding Fibonacci properties (N and value) in local storage.
```
{ tabId, n, value}
```

Due to the computation of Fibonacci being expensive, the internal function to compute the Fibonacci value uses memoization. This is the reason why N is saved as part of the tab data.

#### Local Development

##### Installing
```git clone https://github.com/dev-ship-it/winbonacci.git```

```npm install```

##### Running
```npm start```

##### Testing
```npm test```

