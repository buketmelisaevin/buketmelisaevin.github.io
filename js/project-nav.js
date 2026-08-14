document.addEventListener("DOMContentLoaded", () => {

    const switchers =
        document.querySelectorAll(".project-switcher");


    /* =====================================================
       CLEAN HOMEPAGE NAVIGATION
    ====================================================== */

    document.querySelectorAll("[data-home-target]").forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const target =
                    link.dataset.homeTarget;


                if (!target) {
                    return;
                }


                event.preventDefault();


                sessionStorage.setItem(
                    "melisa-scroll-target",
                    target
                );


                window.location.href =
                    link.href;

            }
        );

    });


    /* =====================================================
       CLEAN SAME-PAGE SECTION LINKS
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href").replace("#", "");

                const target =
                    document.getElementById(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname +
                    window.location.search
                );

            }
        );

    });


    /* =====================================================
       PROJECT SWITCHER
    ====================================================== */

    function closeSwitcher(switcher) {

        const toggle =
            switcher.querySelector(".project-switcher-toggle");

        const menu =
            switcher.querySelector(".project-switcher-menu");


        if (!toggle || !menu) {
            return;
        }


        menu.classList.remove("is-open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    switchers.forEach((switcher) => {

        const toggle =
            switcher.querySelector(".project-switcher-toggle");

        const menu =
            switcher.querySelector(".project-switcher-menu");


        if (!toggle || !menu) {
            return;
        }


        toggle.addEventListener(
            "click",
            () => {

                const willOpen =
                    !menu.classList.contains("is-open");


                switchers.forEach((otherSwitcher) => {
                    closeSwitcher(otherSwitcher);
                });


                if (willOpen) {

                    menu.classList.add("is-open");

                    toggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );


        menu.querySelectorAll("a").forEach((link) => {

            link.addEventListener(
                "click",
                () => {
                    closeSwitcher(switcher);
                }
            );

        });

    });


    /* =====================================================
       CLOSE ON OUTSIDE CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            switchers.forEach((switcher) => {

                if (!switcher.contains(event.target)) {
                    closeSwitcher(switcher);
                }

            });

        }
    );


    /* =====================================================
       KEYBOARD SUPPORT
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            switchers.forEach((switcher) => {
                closeSwitcher(switcher);
            });

        }
    );

});
