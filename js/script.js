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
       CLEAN HOMEPAGE URL + SECTION NAVIGATION
    ====================================================== */

    const initialHash =
        window.location.hash.replace("#", "");

    const storedTarget =
        sessionStorage.getItem("melisa-scroll-target");


    function getCleanHomePath() {

        return window.location.pathname.replace(
            /index\.html$/,
            ""
        );

    }


    function keepHomeUrlClean() {

        const cleanUrl =
            getCleanHomePath() +
            window.location.search;


        window.history.replaceState(
            null,
            "",
            cleanUrl
        );

    }


    function scrollToHomeSection(targetId, behavior = "smooth") {

        const target =
            document.getElementById(targetId);


        if (!target) {
            return;
        }


        target.scrollIntoView({
            behavior: behavior,
            block: "start"
        });


        keepHomeUrlClean();

    }


    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href").replace("#", "");


                if (!targetId) {
                    return;
                }


                event.preventDefault();

                scrollToHomeSection(targetId);

            }
        );

    });


    keepHomeUrlClean();


    const arrivalTarget =
        storedTarget || initialHash;


    if (arrivalTarget) {

        sessionStorage.removeItem(
            "melisa-scroll-target"
        );


        window.requestAnimationFrame(() => {

            scrollToHomeSection(
                arrivalTarget,
                "auto"
            );

        });

    }


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