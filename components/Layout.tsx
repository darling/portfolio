import Head from 'next/head';
import React, { FC } from 'react';

const Layout: FC = (props) => {
	return (
		<>
			<div className="min-h-screen bg-gray-900 overflow-scroll">
				{props.children}
			</div>
		</>
	);
};

export { Layout };
