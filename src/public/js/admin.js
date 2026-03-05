const teacherform = document.querySelector(".teacherform");
const addteacher = document.querySelector('.addteacher');
const teachercancel = document.querySelector('.teachercancel');
teachercancel.addEventListener('click',()=>{
    teacherform.classList.add("hidden");
});
addteacher.addEventListener('click',()=>{
    teacherform.classList.remove("hidden");
});
const form = document.querySelector("form");

teacherform.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔥 stop refresh

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