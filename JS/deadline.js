function updateAllDeadlines() {

    const persistedDate = JSON.parse(localStorage.getItem("date")) || {};


    const deadlineElements = document.querySelectorAll(".js-deadline");
    if (deadlineElements.length > 0) {
        deadlineElements.forEach(element => {
            const notation = element.getAttribute("data-notation");
            const savedDateStr = persistedDate[notation];

            if (!savedDateStr) {
                element.textContent = "Показники ще не надавались";
                element.className = "deadline-badge";
                return;
            }

            const [day, month, year] = savedDateStr.split('.');
            const savedDate = new Date(`${year}-${month}-${day}T00:00:00`);

            const deadlineDate = new Date(savedDate);
            deadlineDate.setDate(deadlineDate.getDate() + 28);

            const now = new Date();
            now.setHours(0, 0, 0, 0);

            const diffTime = deadlineDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let text = "";
            let colorClass = "";

            if (diffDays > 5) {
                text = `Наступна передача через ${diffDays} дн.`;
                colorClass = "green";
            } else if (diffDays > 0) {
                text = `Увага! Залишилось ${diffDays} дн.`;
                colorClass = "orange";
            } else if (diffDays === 0) {
                text = "Дедлайн сьогодні!";
                colorClass = "red";
            } else {
                text = `Прострочено на ${Math.abs(diffDays)} дн!`;
                colorClass = "red";
            }

            element.textContent = text;
            element.className = `deadline-badge ${colorClass} js-deadline`;
        });
    }
    const menuList = document.querySelector(".menu__list");
    if (menuList) {
        const menuLinks = menuList.querySelectorAll(".menu__link");

        menuLinks.forEach(link => {
            const href = link.getAttribute("href");
            const match = href.match(/HTML\/(.+)\.html/);
            if (!match) return;

            const pageName = match[1].replace(/_/g, '-');
            let maxUrgency = 0;

            Object.keys(persistedDate).forEach(key => {
                const normalizedKey = key.replace(/_/g, '-');
                if (normalizedKey.startsWith(pageName)) {
                    const savedDateStr = persistedDate[key];
                    if (!savedDateStr) return;

                    const [day, month, year] = savedDateStr.split('.');
                    const savedDate = new Date(Number(year), Number(month) - 1, Number(day));

                    const deadlineDate = new Date(savedDate);
                    deadlineDate.setDate(deadlineDate.getDate() + 28);

                    const now = new Date();
                    now.setHours(0, 0, 0, 0);

                    const diffTime = deadlineDate - now;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 14) {
                        if (diffDays <= 0) {
                            maxUrgency = Math.max(maxUrgency, 3);
                        } else if (diffDays <= 5) {
                            maxUrgency = Math.max(maxUrgency, 2);
                        } else {
                            maxUrgency = Math.max(maxUrgency, 1);
                        }
                    }
                }
            });

            const listItem = link.closest(".menu__list-item");
            if (listItem) {
                const oldDot = listItem.querySelector(".menu__status-dot");
                if (oldDot) oldDot.remove();

                if (maxUrgency > 0) {
                    const dot = document.createElement("div");

                    if (maxUrgency === 3) {
                        dot.className = "menu__status-dot red";
                        dot.title = "Є термінові або прострочені дедлайни!";
                    } else if (maxUrgency === 2) {
                        dot.className = "menu__status-dot orange";
                        dot.title = "Залишилось менше 5 днів!";
                    } else if (maxUrgency === 1) {
                        dot.className = "menu__status-dot grey";
                        dot.title = "Пройшло більше половини терміну";
                    }

                    listItem.appendChild(dot);
                }
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", updateAllDeadlines);