//UI Section
if (document.body.clientWidth < 768) {
    document.getElementById('Teacher-selector').addEventListener('click', () => {
        document.querySelector("body").style.gridTemplateAreas = `"nav nav" "sidebar teacher"`;
        document.querySelector(".teacher").classList.remove('hidden');
        document.querySelector(".notes").classList.add('hidden');
        document.querySelector("body").style.gridTemplateColumns = "0rem 1fr";
        menutoggle = false;
    });
} else {
    document.getElementById('Teacher-selector').addEventListener('click', () => {
        document.querySelector("body").style.gridTemplateAreas = `"nav nav" "sidebar teacher"`;
        document.querySelector(".teacher").classList.remove('hidden');
        document.querySelector(".notes").classList.add('hidden');
    });
}
if (document.body.clientWidth< 768) {
    document.getElementById('Notes-selector').addEventListener('click', () => {
        document.querySelector("body").style.gridTemplateAreas = `"nav nav" "sidebar notes"`;
        document.querySelector(".teacher").classList.add('hidden');
        document.querySelector(".notes").classList.remove('hidden');
        document.querySelector("body").style.gridTemplateColumns = "0rem 1fr";
        menutoggle = false;
    });
} else {
    document.getElementById('Notes-selector').addEventListener('click', () => {
        document.querySelector("body").style.gridTemplateAreas = `"nav nav" "sidebar notes"`;
        document.querySelector(".teacher").classList.add('hidden');
        document.querySelector(".notes").classList.remove('hidden');
    });
}
let menutoggle = false;
document.getElementById("menu").addEventListener('click', () => {
    if (!menutoggle) {
        document.querySelector("body").style.gridTemplateColumns = "1fr 0rem";
        menutoggle = true;
    } else {
        document.querySelector("body").style.gridTemplateColumns = "0rem 1fr";
        menutoggle = false;
    }
});
//teacher-Section
const teacherform = document.querySelector(".teacherform");
const addteacher = document.querySelector('.addteacher');
const teachercancel = document.querySelector('.teachercancel');
teachercancel.addEventListener('click', () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    teacherform.classList.add("hidden");
});
addteacher.addEventListener('click', () => {
    teacherform.classList.remove("hidden");
});
const form = document.querySelector("form");

teacherform.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/user/teacherRegister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        alert(data.message);
        window.location.reload();

    } catch (err) {
        alert("Server error!");
    }
});
async function deleteTeacher(id) {
    const response = await fetch(`/user/deleteteacher/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    document.getElementById(`${id}`).remove();
}
// notes section
const add_course = document.getElementById("add-course");
const subjectform = document.getElementById("subjectform");
const subcancel = document.getElementById("subcancel");
add_course.addEventListener('click', () => {
    subjectform.classList.remove("hidden");
});
subcancel.addEventListener("click", () => {
    subjectform.classList.add("hidden");
});
subjectform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const subname = document.getElementById("subject-name").value;
    const subcode = document.getElementById("subject-code").value;
    const sem = document.getElementById("semester").value;
    try {
        const response = await fetch('/user/subject-form',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subjectname: subname,
                    subjectcode: subcode,
                    semester: sem
                })
            });
        const data = await response.json();
        alert(data.message);
        document.getElementById(String(sem)).innerHTML = document.getElementById(String(sem)).innerHTML + `<span
                                            class="flex flex-col gap-1 px-3 py-2 border-2 text-center bg-violet-200">
                                            <table>
                                                <tr>
                                                    <td class="px-2 py-2">
                                                        <h2>SUBJECT</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-2 py-2 border-b-2">
                                                        <h2>
                                                            ${subname}
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-2 py-2">
                                                        <h2>
                                                            SUB CODE
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-2 py-2">
                                                        <h2>
                                                            ${subcode}
                                                        </h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-2 py-2">
                                                        <button type="button"
                                                            class="edit flex items-center gap-2 px-4 py-2 border-2 rounded hover:bg-white w-full"><img
                                                                class="h-[1.2rem]" src="/svgImg/edit.svg"
                                                                alt="Edit">Edit</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-2 py-2">
                                                        <button type="button"
                                                            class="delete flex items-center gap-2 px-4 py-2 border-2 rounded hover:bg-white w-full"><img
                                                                class="h-[1.2rem]" src="/svgImg/delete.svg"
                                                                alt="Delete">Delete</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </span>`;
        document.getElementById("subject-name").value = '';
        document.getElementById("subject-code").value = '';
        document.getElementById("semester").value = 1;
        subjectform.classList.add("hidden");
    }
    catch (err) {
        alert("Server Error!");
        console.log(err);
    }
});
async function deleteSubject(id) {
    const response = await fetch(`/user/deleteSubject/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    document.getElementById(`${id}`).remove();
}
document.getElementById("Logout-selector").addEventListener('click', async () => {
    await fetch("/user/logout", {
        method: "POST",
        credentials: "include"
    });
    window.location.href = "/";
})