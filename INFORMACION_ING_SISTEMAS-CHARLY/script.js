document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================
       1. BOTÓN "VOLVER ARRIBA" (btnTop)
    ========================================== */
    const btnTop = document.getElementById("btnTop");

    if (btnTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 450) {
                btnTop.classList.add("show");
            } else {
                btnTop.classList.remove("show");
            }
        });

        btnTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ==========================================
       2. CIERRE AUTOMÁTICO DEL MENÚ MÓVIL
    ========================================== */
    const menu = document.getElementById("menuPrincipal");
    const links = document.querySelectorAll(".navbar-nav .nav-link");

    if (menu && links.length > 0) {
        links.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 992) {
                    // Obtiene o crea la instancia de Bootstrap Collapse de forma segura
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menu);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    /* ==========================================
       3. ESTADO ACTIVO DEL MENÚ (SCROLLSPY)
    ========================================== */
    const sections = document.querySelectorAll("section[id], header[id]");

    if (sections.length > 0 && links.length > 0) {
        const actualizarEstadoNavegacion = () => {
            let actual = "";
            const posicionScroll = window.scrollY;

            sections.forEach(seccion => {
                const seccionSuperior = seccion.offsetTop - 130;
                const alturaSeccion = seccion.offsetHeight;

                if (posicionScroll >= seccionSuperior && posicionScroll < seccionSuperior + alturaSeccion) {
                    actual = seccion.getAttribute("id");
                }
            });

            // Si estamos al final de la página, activa el último enlace
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                actual = sections[sections.length - 1].getAttribute("id");
            }

            links.forEach(link => {
                link.classList.remove("active");
                if (actual && link.getAttribute("href") === `#${actual}`) {
                    link.classList.add("active");
                }
            });
        };

        // Escuchar evento scroll con RequestAnimationFrame para rendimiento óptimo
        let ejecutandoScroll = false;
        window.addEventListener("scroll", () => {
            if (!ejecutandoScroll) {
                window.requestAnimationFrame(() => {
                    actualizarEstadoNavegacion();
                    ejecutandoScroll = false;
                });
                ejecutandoScroll = true;
            }
        });

        // Ejecución inicial para establecer el estado al cargar la página
        actualizarEstadoNavegacion();
    }
});