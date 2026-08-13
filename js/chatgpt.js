document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("project-header");

    const progressBar =
        document.getElementById("reading-progress-bar");

    const revealElements =
        document.querySelectorAll(".reveal");


    /* =====================================================
       HEADER
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 20) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    }


    /* =====================================================
       READING PROGRESS
    ====================================================== */

    function updateReadingProgress() {

        if (!progressBar) {
            return;
        }


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (window.scrollY / documentHeight) * 100;


        progressBar.style.width =
            `${Math.min(progress, 100)}%`;

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(
                element
            );

        });

    }


    /* =====================================================
       SCROLL
    ====================================================== */

    function handleScroll() {

        updateHeader();
        updateReadingProgress();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateReadingProgress
    );


    /* INITIAL STATE */

    updateHeader();
    updateReadingProgress();

});