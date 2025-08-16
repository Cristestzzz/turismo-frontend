import React from 'react';
import RegisterForm from '../../components/comunes/RegisterForm';

const RegisterPage: React.FC = () => {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3ffe3' }}>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
