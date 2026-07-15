  Omni School Portal (MERN Stack Edition)

An interactive, role-based academic management system built on the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS in a responsive blue-and-white interface.

 Project Overview
Omni School digitizes educational records with strict Role-Based Access Control (RBAC). It enables seamless collaboration between students, teachers, parents, and administrative staff while maintaining academic data integrity through automated record locking.

Role Permissions Matrix

 User Role | Access Scope | Capabilities & Restrictions |

Student Personal Only | View personal academic history, grades, and attendance. Cannot modify data. |
Parent (Optional)* | Permitted Subset | View academic progress and records strictly for linked student IDs. |
Teacher Assigned Sections | Submit and update grades for sections taught. Cannot edit **locked** records. |
 Registrar / Admin | Global Access | Edit enrollment, publish grades, manage user roles, and override locked records. 

Testing & Workability Mode

To allow rapid UI testing and verification across different user views, the authentication system is configured with a flexible test mode:
* **Any Email Allowed:** You can input any validly formatted email address (e.g., `test.teacher@omnischool.edu`). If the account does not exist in MongoDB, it will be dynamically created.
* **Universal Password:** The default password for all test accounts is **`1234`**.
* **Instant Role Switching:** Use the interactive role badges on the login screen to instantly toggle between Student, Parent, Teacher, and Admin views.

 Technology Stack
 Backend: Node.js, Express.js, JSON Web Tokens (JWT) for authentication
Database: MongoDB / Mongoose ODM

Installation & Setup Instructions

### 1. Clone the Repository
```bash
git clone [https://github.com/Paullett3/-omn-school-frontend2.1.git](https://github.com/Paullett3/-omn-school-frontend2.1.git)
cd -omn-school-frontend2.1
