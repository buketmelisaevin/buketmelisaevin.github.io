document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const header =
        document.getElementById("project-header");


    const progressBar =
        document.getElementById("reading-progress-bar");


    const revealElements =
        document.querySelectorAll(".reveal");


    const walkthroughVideo =
        document.getElementById("vhi-walkthrough-video");


    const videoError =
        document.getElementById("video-error");



    /* =====================================================
       HEADER SHADOW
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


        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (scrollableHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (window.scrollY / scrollableHeight) * 100;


        progressBar.style.width =
            `${Math.min(progress, 100)}%`;

    }



    /* =====================================================
       REVEAL ON SCROLL
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
       VIDEO ERROR HANDLING
    ====================================================== */

    if (walkthroughVideo && videoError) {


        walkthroughVideo.addEventListener(
            "loadedmetadata",
            () => {

                videoError.hidden =
                    true;

            }
        );


        walkthroughVideo.addEventListener(
            "error",
            () => {

                videoError.hidden =
                    false;

            }
        );


        const videoSource =
            walkthroughVideo.querySelector("source");


        if (videoSource) {

            videoSource.addEventListener(
                "error",
                () => {

                    videoError.hidden =
                        false;

                }
            );

        }

    }



    /* =====================================================
       PAUSE VIDEO WHEN OFF SCREEN
    ====================================================== */

    if (
        walkthroughVideo &&
        "IntersectionObserver" in window
    ) {

        const videoObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting &&
                            !walkthroughVideo.paused
                        ) {

                            walkthroughVideo.pause();

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        videoObserver.observe(
            walkthroughVideo
        );

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



    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateHeader();

    updateReadingProgress();


});