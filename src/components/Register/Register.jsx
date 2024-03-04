// import styles from "./Register.module.css";
// import { useState } from "react";

// export default function Register(props) {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   // Errors
//   const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [password2Error, setPassword2Error] = useState("");

//   // Constants
//   const USERNAME_LOWER = 3;
//   const USERNAME_UPPER = 15;
//   const PASSWORD_LOWER = 6;
//   const PASSWORD_UPPER = 20;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUsernameError("");
//     setPasswordError("");
//     setPassword2Error("");

//     try {
//       if (rangeCheck(username, USERNAME_LOWER, USERNAME_UPPER)) {
//         if (passwordValidations(password, PASSWORD_LOWER, PASSWORD_UPPER)) {
//           await saveData();
//         }
//       }
//     } catch (error) {
//       setUsernameError(error.message);
//     }
//   };

//   function rangeCheck(input, lowerBound, upperBound) {
//     if (input.length >= lowerBound && input.length <= upperBound) {
//       return true;
//     }
//     throw new Error(
//       `Username has to be between ${lowerBound} and ${upperBound}`
//     );
//   }

//   function passwordValidations(input, lowerBound, upperBound) {
//     try {
//       if (rangeCheck(input, lowerBound, upperBound)) {
//         if (input === password2) {
//           if (validatePassword(password)) {
//             return true;
//           } else {
//             throw new Error(
//               `Your password must contain a digit, an uppercase and lower case character!`
//             );
//           }
//         } else {
//           throw new Error(`You must enter the same password!`);
//         }
//       }
//     } catch (error) {
//       setPasswordError(error.message);
//       setPassword2Error(error.message);
//     }
//   }

//   function validatePassword(password) {
//     const uppercaseRegex = /[A-Z]/;
//     const lowercaseRegex = /[a-z]/;
//     const digitRegex = /[0-9]/;

//     const containsUppercase = uppercaseRegex.test(password);
//     const containsLowercase = lowercaseRegex.test(password);
//     const containsDigit = digitRegex.test(password);

//     return containsUppercase && containsLowercase && containsDigit;
//   }

//   // async function saveData() {
//   //   try {
//   //     console.log(`Start.`);
//   //     const response = await fetch("/saveData", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email }), // Send the email in the request body
//   //     });
//   //     console.log(`End.`);
//   //     if (!response.ok) {
//   //       console.error("Response status:", response.status);
//   //       console.log(response.url);
//   //       throw new Error("Failed to save data");
//   //     }
//   //     console.log("Data saved successfully!");
//   //   } catch (error) {
//   //     console.error("Error saving data:", error);
//   //   }
//   // }

//   async function saveData() {
//     try {
//       console.log("Sending POST request...");
//       const response = await fetch("/saveData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });
//       console.log("Response received:", response);
//       // Handle response here
//     } catch (error) {
//       console.error("Error sending POST request:", error);
//     }
//   }

//   function autoFill() {
//     setEmail(`test@test.com`);
//     setUsername(`testUser`);
//     setPassword(`Testpw123`);
//     setPassword2(`Testpw123`);
//   }

//   return (
//     <>
//       <form
//         className={styles["register-form"]}
//         onSubmit={(e) => handleSubmit(e)}
//       >
//         <h1>Register</h1>
//         <div className={styles.labelAndError}>
//           <label htmlFor="email">Email</label>
//         </div>
//         <div className={styles["input-container"]}>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="your.email@gmail.com"
//           />
//         </div>
//         <div className={styles.labelAndError}>
//           <label htmlFor="username">Username</label>
//           {usernameError && <div className={styles.error}>{usernameError}</div>}
//         </div>
//         <div className={styles["input-container"]}>
//           <input
//             id="username"
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//             placeholder="your-username..."
//           />
//         </div>
//         <div className={styles.labelAndError}>
//           <label htmlFor="password">Password</label>
//           {passwordError && <div className={styles.error}>{passwordError}</div>}
//         </div>
//         <div className={styles["input-container"]}>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             placeholder="********"
//           />
//         </div>
//         <div className={styles.labelAndError}>
//           <label htmlFor="password2">Repeat Password</label>
//           {password2Error && (
//             <div className={styles.error}>{password2Error}</div>
//           )}
//         </div>
//         <div className={styles["input-container"]}>
//           <input
//             id="password2"
//             type="password"
//             name="password2"
//             value={password2}
//             onChange={(e) => {
//               setPassword2(e.target.value);
//             }}
//             placeholder="********"
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <button
//         className={styles["link-btn"]}
//         onClick={() => props.onFormSwitch("Login")}
//       >
//         Already have an account? Login here.
//       </button>
//       <button onClick={autoFill}>Autofill</button>
//     </>
//   );
// }
