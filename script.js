// CARGAR NAVBAR
fetch("/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    iniciarNavbar();
  })
  .catch(err => console.error("Error cargando navbar:", err));


// FUNCIÓN PRINCIPAL
function iniciarNavbar() {

    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay-menu");

    // 🔥 ABRIR / CERRAR MENÚ
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
        overlay.classList.toggle("show");

        // 🔥 si se cierra → limpiar todo
        if (!menu.classList.contains("show")) {
            cerrarTodo();
        }
    });

    // 🔥 EVITAR CIERRE INTERNO
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // 🔥 CERRAR CON OVERLAY
    overlay.addEventListener("click", () => {
        menu.classList.remove("show");
        overlay.classList.remove("show");
        cerrarTodo();
    });

    // 🔥 SUBMENÚ NIVEL 1
    document.querySelectorAll(".dropdown > a").forEach(link => {
        link.addEventListener("click", (e) => {

            if (window.innerWidth <= 900) {
                e.preventDefault();

                const submenu = link.nextElementSibling;
                const isOpen = submenu.classList.contains("show");

                // 🔥 SI YA ESTÁ ABIERTO → CERRAR TODO
                if (isOpen) {
                    cerrarTodo();
                    return;
                }

                // 🔥 abrir limpio
                cerrarTodo();
                submenu.classList.add("show");
            }
        });
    });

    // 🔥 SUBMENÚ NIVEL 2
    document.querySelectorAll(".dropdown-sub .toggle").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            let submenu = btn.parentElement.nextElementSibling;
            const isOpen = submenu.classList.contains("show");

            // 🔥 SI YA ESTÁ ABIERTO → CERRAR SOLO ESE
            if (isOpen) {
                submenu.classList.remove("show");
                return;
            }

            // 🔥 abrir limpio
            document.querySelectorAll(".submenu-sub").forEach(s => {
                s.classList.remove("show");
            });

            submenu.classList.add("show");
        });
    });

    // 🔥 CONTROL DE LINKS
    // 🔥 CONTROL DE LINKS (CORREGIDO)
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        // 🔴 SI NO TIENE LINK REAL (#) → SOLO DESPLIEGA
        if (href === "#" || href === "") {
            e.preventDefault();
            return;
        }

        // ✅ SI TIENE LINK REAL → NAVEGA NORMAL
        menu.classList.remove("show");
        overlay.classList.remove("show");
        cerrarTodo();
    });
});

    // 🔥 FUNCIÓN GLOBAL PARA LIMPIAR TODO
    function cerrarTodo() {
        document.querySelectorAll(".submenu").forEach(s => {
            s.classList.remove("show");
        });

        document.querySelectorAll(".submenu-sub").forEach(s => {
            s.classList.remove("show");
        });
    }
}


// ROBOT
window.addEventListener("load", () => {
    const robot = document.querySelector(".robot");
    if (robot) {
        robot.style.animationPlayState = "running";
    }
});
