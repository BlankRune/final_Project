document.addEventListener("DOMContentLoaded", () => {

    // Skills animation
    setTimeout(() => {
        const html = document.querySelector(".html");
        const css = document.querySelector(".css");
        const java = document.querySelector(".java");
        const python = document.querySelector(".python");

        if (html) html.style.width = "40%";
        if (css) css.style.width = "35%";
        if (java) java.style.width = "50%";
        if (python) python.style.width = "30%";
    }, 100);

    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item");
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const currentItem = question.closest(".faq-item");
            const isActive = currentItem.classList.contains("active");

            faqItems.forEach(item => item.classList.remove("active"));
            if (!isActive) currentItem.classList.add("active");
        });
    });

    // PROJECT MODAL
    const viewButtons = document.querySelectorAll(".view-project-btn");
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDescription");
    const modalImg = document.querySelector(".modal-img");
    const modalCode = document.getElementById("modalCode");
    const backBtn = document.querySelector(".back-btn");

    viewButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
                const projectNum = btn.getAttribute("data-project");
                const content = document.getElementById(`project-${projectNum}`);

                modalTitle.textContent = content.querySelector(".project-title").textContent.trim();
                modalDesc.textContent = content.querySelector(".project-desc").textContent.trim();
                modalImg.src = content.querySelector(".project-image").textContent.trim();
                let code = content.querySelector(".project-code").textContent;

                let lines = code.split("\n");

                /* remove empty top/bottom */
                while (lines.length && lines[0].trim() === "") lines.shift();
                while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

                /* detect smallest left indent */
                let minIndent = Infinity;

                lines.forEach(line => {
                    if (line.trim() !== "") {
                        let spaces = line.match(/^ */)[0].length;
                        minIndent = Math.min(minIndent, spaces);
                    }
                });

                /* remove only common indent */
                lines = lines.map(line => line.slice(minIndent));

                modalCode.textContent = lines.join("\n");

                modal.classList.add("active");
        });
    });

    backBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    });

});