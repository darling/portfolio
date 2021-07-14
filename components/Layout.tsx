import { FC } from 'react';

const Layout: FC = (props) => {
	return <div className="min-h-screen bg-gray-900">{props.children}</div>;
};

export { Layout };
