import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	const handleRegister = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match");
		} else {
			history.push("/login");
		}
	};

	return (
		<div className="register-container">
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<div>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className="error">{error}</p>}
				<button type="submit">Register</button>
			</form>
			<p>
				Already have an account? <a href="/login">Login</a>
			</p>
		</div>
	);
};

export default Register;
