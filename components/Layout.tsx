import Head from 'next/head';
import React, { FC } from 'react';

const Layout: FC = (props) => {
	return (
		<>
			<div className="min-h-screen overflow-hidden">{props.children}</div>
		</>
	);
};

export { Layout };
