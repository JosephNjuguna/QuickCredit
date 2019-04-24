// admin dashboard modal
var applicationLoan = document.getElementById('application');
var verifyUser = document.getElementById('verification');
var repaidLoans = document.getElementById('repaid');
var currentLoans = document.getElementById('current');
var loandetail = document.getElementById('loandetail');
var paymentdetail = document.getElementById('repaymentdetail');
// dashboard buttons  
var newLoans = document.getElementById("newLoans");
var userVerification = document.getElementById("userVerification");
var loanRepaid = document.getElementById("repaidLoan");
var notPaidloan = document.getElementById("notPaidloan");
var loan_detail = document.getElementById("loan_detail");
var repayment_detail = document.getElementById("repayment");

// div link loanrepaymentModal"
var span = document.getElementById("loandetailModal");
var span2 = document.getElementById("loanrepaymentModal");


newLoans.onclick = function () {
    applicationLoan.style.display ="flex";
    verifyUser.style.display = "none";
    repaidLoans.style.display ="none";
    currentLoans.style.display = "none";
};

userVerification.onclick = function () {
    applicationLoan.style.display ="none";
    verifyUser.style.display = "flex";
    repaidLoans.style.display ="none";
    currentLoans.style.display = "none";
};

loanRepaid.onclick = function () {
    applicationLoan.style.display ="none";
    verifyUser.style.display = "none";
    repaidLoans.style.display ="flex";
    currentLoans.style.display = "none";
};

notPaidloan.onclick = function () {
    applicationLoan.style.display ="none";
    verifyUser.style.display = "none";
    repaidLoans.style.display ="none";
    currentLoans.style.display = "flex";
};

loan_detail.onclick= function(){
    loandetail.style.display = "flex";
};
repayment_detail.onclick= function(){
    paymentdetail.style.display = "flex";
};
span.onclick = function() {    
    loandetail.style.display = "none";
};
span2.onclick = function() {    
    paymentdetail.style.display = "none";
};


window.onclick = function(event) {
    if (event.target == loandetail) {
        loandetail.style.display = "none";
    }else if(event.target == paymentdetail){
        paymentdetail.style.display = "none";
    }
};