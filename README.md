# SCP Site-11 Classified Files Access System

This project is a web-based interface designed for managing and accessing SCP Foundation classified files, ranging from Level 1 to Admin files. It includes password-protected access for each file tier and auto-locking functionality after a period of inactivity.

## Features

- **Access Levels**: Provides access to classified files for Levels 1-4 and Admin level. Each level has its own password.
- **Auto-lock**: Files automatically lock after 5 minutes of inactivity for security purposes.
- **Multiple Attempts**: Allows up to 3 password attempts before locking out the user.
- **Dynamic Lock/Unlock**: Allows toggling between locked and unlocked states for classified files.

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` file in any web browser.
3. To access classified files, click the corresponding "Request Access" button for a level.
4. You will be prompted to enter the password. Upon successful authentication, the files for that level will be unlocked.
5. Files can be re-locked by pressing the "Lock" button that appears after unlocking.

## Access Levels

- **Level 1**: General access (Password: 1111)
- **Level 2**: Mid-tier clearance (Password: 2222)
- **Level 3**: High-tier clearance (Password: 3333)
- **Level 4**: Top-tier clearance (Password: 4444)
- **Admin**: Administrator-level access (Password: 2137)

## Inactivity Timeout

If no activity is detected for 5 minutes after unlocking files, the system will automatically lock the files and require re-authentication.

## Contributing

Feel free to fork this repository and submit pull requests for new features, improvements, or bug fixes.

## License

This project is licensed under the MIT License.

---

**Made by Odin**
