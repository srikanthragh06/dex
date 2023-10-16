const logout_form = document.querySelector("#logout-form");
const signup_form = document.querySelector("#signup-form");
const logout_btn = document.querySelector(".logout");
const signup_btn = document.querySelector(".signup");

logout_btn.addEventListener("click", function () {
    logout_form.submit();
});

signup_btn.addEventListener("click", function () {
    signup_form.submit();
});
