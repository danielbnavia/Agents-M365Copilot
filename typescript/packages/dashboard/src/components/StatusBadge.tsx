import styles from "./StatusBadge.module.css";

type Variant = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
	label: string;
	variant?: Variant;
}

function StatusBadge({ label, variant = "neutral" }: StatusBadgeProps) {
	return (
		<span className={`${styles.badge} ${styles[variant]}`}>
			{label}
		</span>
	);
}

export default StatusBadge;
