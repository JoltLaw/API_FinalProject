
;(function(global) {
    "use strict"
    const bank = function(firstName, lastName, balance){
       
        return new bank.init(firstName, lastName, balance)
        
    }
    
    bank.prototype = {
        
        addnSubtract: function(amount, adding) {
            var bal;
        if (adding === false) {
           bal = parseFloat(self.Balance) - parseFloat(amount);
           self.history.push("Withdraw or Payment Made: -" + amount);
         } 
        
        else if (adding === true) {
           bal = parseFloat(self.Balance) + parseFloat(amount);
           self.history.push("Deposite Made: +" + amount);
        } 
        
        if (isNaN(bal)) {
            self.history.push("Failed transaction. Reason: NaN");
            self.history.push("Current balance: " + self.Balance)
            return
        }
        self.Balance = bal
        self.history.push("Current balance: " + self.Balance)
    }, 
    }
    
    bank.init = function (firstName, lastName, balance) {
        self = this;
        self.FirstName = firstName || "default";
        self.LastName = lastName || "default";
        self.Balance = balance;
        self.history = [];
    }


    bank.init.prototype = bank.prototype;
    global.bank = global.b$ = bank
    })(window);