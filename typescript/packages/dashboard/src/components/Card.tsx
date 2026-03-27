import { type ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps {
	children: ReactNode;
	className?: string;
	padding?: "sm" | "md" | "lg";
}

function Card({ children, className = "", padding = "md" }: CardProps) {
	return (
		<div className={`${styles.card} ${styles[padding]} ${className}`}>
			{children}
		</div>
	);
}

interface CardHeaderProps {
	title: string;
	subtitle?: string;
	action?: ReactNode;
}

function CardHeader({ title, subtitle, action }: CardHeaderProps) {
	return (
		<div className={styles.header}>
			<div>
				<h3 className={styles.title}>{title}</h3>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			</div>
			{action && <div className={styles.action}>{action}</div>}
		</div>
	);
}

export { Card, CardHeader };
