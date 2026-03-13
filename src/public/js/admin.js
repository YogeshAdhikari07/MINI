//UI Section
document.getElementById('Teacher-selector').addEventListener('click',()=>{
    document.querySelector("body").style.gridTemplateAreas=`"nav nav" "sidebar teacher"`;
    document.querySelector(".teacher").classList.remove('hidden');
    document.querySelector(".notes").classList.add('hidden');
});
document.getElementById('Notes-selector').addEventListener('click',()=>{
    document.querySelector("body").style.gridTemplateAreas=`"nav nav" "sidebar notes"`;
    document.querySelector(".teacher").classList.add('hidden');
    document.querySelector(".notes").classList.remove('hidden');
});
//teacher-Section
const teacherform = document.querySelector(".teacherform");
const addteacher = document.querySelector('.addteacher');
const teachercancel = document.querySelector('.teachercancel');
teachercancel.addEventListener('click', () => {
    document.getElementById("username").value="";
    document.getElementById("password").value="";
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
add_course.addEventListener('click',()=>{
    subjectform.classList.remove("hidden");
});
subcancel.addEventListener("click",()=>{
    subjectform.classList.add("hidden");
});
subjectform.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const subname = document.getElementById("subject-name").value;
    const subcode = document.getElementById("subject-code").value;
    const sem = document.getElementById("semester").value;
    try
    {
        const response = await fetch('/user/subject-form',
            {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    subjectname:subname,
                    subjectcode:subcode,
                    semester:sem
                })
            });
        const data = await response.json();
        alert(data.message);
        
    }
    catch(err)
    {
        alert("Server Error!");
        console.log(err);
    }
});