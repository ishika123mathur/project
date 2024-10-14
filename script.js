// Superclass: User
class User {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Method to authenticate user
    static authenticate(username, password, users) {
        return users.find(user => user.username === username && user.password === password);
    }
}

// Subclass: Admin
class Admin extends User {
    constructor(username, password) {
        super(username, password, 'admin');
    }

    manageUsers() {
        return "Manage Users (Teachers, Students)";
    }

    manageNotices() {
        return "Create / Update / Delete Notices";
    }

    manageTimetables() {
        return "Create / Update / Delete Timetables";
    }

    manageAssignments() {
        return "Create / Delete Assignments";
    }

    manageMarks() {
        return "View and Edit Marks";
    }

    manageAttendance() {
        return "View and Edit Attendance";
    }

    getPermissions() {
        return [
            this.manageUsers(),
            this.manageNotices(),
            this.manageTimetables(),
            this.manageAssignments(),
            this.manageMarks(),
            this.manageAttendance()
        ];
    }
}

// Subclass: Teacher
class Teacher extends User {
    constructor(username, password) {
        super(username, password, 'teacher');
    }

    viewUpdateMarks() {
        return "View / Update Marks";
    }

    markAttendance() {
        return "Mark Attendance";
    }

    createAssignments() {
        return "Create Assignments";
    }

    shareNotes() {
        return "Share Notes";
    }

    viewTimetables() {
        return "View Timetables";
    }

    viewNotices() {
        return "View Notices";
    }

    getPermissions() {
        return [
            this.viewUpdateMarks(),
            this.markAttendance(),
            this.createAssignments(),
            this.shareNotes(),
            this.viewTimetables(),
            this.viewNotices()
        ];
    }
}

// Subclass: Student
class Student extends User {
    constructor(username, password) {
        super(username, password, 'student');
    }

    viewTimetables() {
        return "View Timetables";
    }

    viewNotices() {
        return "View Notices";
    }

    viewMarks() {
        return "View Marks";
    }

    accessNotes() {
        return "Access Notes";
    }

    submitAssignments() {
        return "Submit Assignments";
    }

    getPermissions() {
        return [
            this.viewTimetables(),
            this.viewNotices(),
            this.viewMarks(),
            this.accessNotes(),
            this.submitAssignments()
        ];
    }
}

// List of predefined users
const users = [
    new Admin('admin1', 'adminpass'),
    new Teacher('teacher1', 'teacherpass'),
    new Student('student1', 'studentpass')
];

// Function to login user and check the object type
function loginUser(username, password) {
    const loggedInUser = User.authenticate(username, password, users);
    if (!loggedInUser) {
        throw new Error('Invalid username or password');
    }

    return loggedInUser;
}

// Function to generate buttons based on the logged-in user's permissions
function displayPermissions(user) {
    const permissions = user.getPermissions();
    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.innerHTML = ''; // Clear any existing buttons

    permissions.forEach(permission => {
        const button = document.createElement('button');
        button.innerText = permission;
        button.addEventListener('click', () => checkPermission(permission, user));
        buttonContainer.appendChild(button);
    });
}

// Function to check if the user has permission to perform the clicked action
function checkPermission(action, user) {
    if (user.getPermissions().includes(action)) {
        alert(`Permission granted for: ${action}`);
    } else {
        alert(`Permission denied for: ${action}`);
    }
}

// Event listener for login button
document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const loggedInUser = loginUser(username, password);
        document.getElementById('output').innerText = `Logged in as ${loggedInUser.role}.`;

        // Display buttons based on the user's role and permissions
        displayPermissions(loggedInUser);
    } catch (error) {
        document.getElementById('output').innerText = error.message;
    }
});
