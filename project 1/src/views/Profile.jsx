import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/formValidation";

const Profile = () => {
	const [user, setUser] = useState({
		username: "john_doe",
		email: "john.doe@example.com",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formErrors = validateForm(user);
		if (Object.keys(formErrors).length === 0) {
			alert("Profile updated successfully!");
			navigate("/");
		} else {
			setErrors(formErrors);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="profile-container">
			<h2>Profile</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						value={user.username}
						onChange={handleChange}
						required
					/>
					{errors.username && <p className="error">{errors.username}</p>}
				</div>

				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={user.email}
						onChange={handleChange}
						required
					/>
					{errors.email && <p className="error">{errors.email}</p>}
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						placeholder="Leave empty to keep the current password"
					/>
					{errors.password && <p className="error">{errors.password}</p>}
				</div>

				<button type="submit">Update Profile</button>
			</form>
		</div>
	);
};

export default Profile;
