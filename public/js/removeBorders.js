const allTags = document.querySelectorAll("*");
allTags.forEach((tag) => {
    if (
        !tag.classList.contains("navbar") &&
        !tag.classList.contains("container__form")
    ) {
        tag.style.border = "none";
    }
});
