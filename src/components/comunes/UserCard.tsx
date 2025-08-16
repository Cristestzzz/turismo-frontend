import React from 'react';
import './UserCard.mode.css';

interface UserCardProps {
	name: string;
	email: string;
	avatarUrl?: string;
	role?: 'Turista' | 'Empresa';
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatarUrl, role = 'Turista' }) => {
	return (
		<div className="usercard-container">
			<div className="usercard-avatar">
				{avatarUrl ? (
					<img src={avatarUrl} alt="avatar" />
				) : (
					<span className="usercard-avatar-placeholder">👤</span>
				)}
			</div>
			<div className="usercard-info">
				<div className="usercard-name">{name}</div>
				<div className="usercard-email">{email}</div>
				<div className="usercard-role">{role}</div>
			</div>
		</div>
	);
};

export default UserCard;
