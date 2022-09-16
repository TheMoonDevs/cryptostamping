import progress_styles from "styles/common/progress.module.scss";

function PageLoader({ loading, color }) {
	return (
		<div className="d-block fixed-top w-100">
			<span
				className={`${progress_styles.progress_loader} ${
					loading ? progress_styles.active : progress_styles.none
				} ${
					color === "primary"
						? progress_styles.primary
						: progress_styles.secondary
				}`}
			/>
		</div>
	);
}

export default PageLoader;
