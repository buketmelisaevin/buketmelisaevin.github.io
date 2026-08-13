document.addEventListener("DOMContentLoaded", () => {

    const html = document.documentElement;

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeMenu =
        document.getElementById("theme-menu");

    const themeOptions =
        document.querySelectorAll(".theme-option");


    const allowedThemes = [
        "elegant",
        "fairytale",
        "tech"
    ];


    /* =====================================================
       APPLY THEME
    ====================================================== */

    function applyTheme(theme) {

        let selectedTheme = theme;

        if (!allowedThemes.includes(selectedTheme)) {
            selectedTheme = "elegant";
        }


        html.setAttribute(
            "data-theme",
            selectedTheme
        );


        localStorage.setItem(
            "melisa-theme",
            selectedTheme
        );


        themeOptions.forEach((option) => {

            const isSelected =
                option.dataset.themeChoice === selectedTheme;


            option.classList.toggle(
                "is-selected",
                isSelected
            );


            if (isSelected) {

                option.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                option.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    /* =====================================================
       LOAD SAVED THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("melisa-theme");


    if (
        savedTheme &&
        allowedThemes.includes(savedTheme)
    ) {

        applyTheme(savedTheme);

    } else {

        applyTheme("elegant");

    }


    /* =====================================================
       OPEN / CLOSE THEME MENU
    ====================================================== */

    if (themeToggle && themeMenu) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    themeMenu.classList.toggle("is-open");


                themeToggle.setAttribute(
                    "aria-expanded",
                    isOpen.toString()
                );

            }
        );


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !themeMenu.contains(event.target) &&
                    !themeToggle.contains(event.target)
                ) {

                    themeMenu.classList.remove(
                        "is-open"
                    );


                    themeToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       SELECT THEME
    ====================================================== */

    themeOptions.forEach((option) => {

        option.addEventListener(
            "click",
            () => {

                const theme =
                    option.dataset.themeChoice;


                applyTheme(theme);


                themeMenu.classList.remove(
                    "is-open"
                );


                themeToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

});