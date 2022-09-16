import { useState, useEffect } from "react";

import styles from "components/home/faq.module.scss"

function FAQ({ item , initialFAQ}) {

	const [activeFAQ, setActiveFAQ] = useState(initialFAQ);
	const toggleFaQ = (number) => {
		const faqs = [...activeFAQ];
		if (faqs.includes(number)) faqs.splice(faqs.indexOf(number), 1);
		else faqs.push(number);
		setActiveFAQ(faqs);
	};

	return (
		<div id={item.title}>
			<h4 className={`${styles.two_title} ${styles.faq}`}>
				{item.title}
			</h4>
			{item.list.map((faq) => {
				return (
					<div key={faq.id}>
						<div
							onClick={() => {
								toggleFaQ(faq.id);
							}}
							className={`${styles.three_title} ${styles.top}`}
						>
							{faq.question}{" "}
							<span
								className="ml-2"
								role="img"
								aria-label={faq.id}
							>
								{faq.emoji}
							</span>
							<span
								className={`${styles.expand_icon} ${
									!activeFAQ.includes(faq.id) && styles.active
								}`}
							></span>
						</div>
						<p
							className={`${styles.three_description} ${
								!activeFAQ.includes(faq.id) && styles.active
							}`}
						>
							{faq.answer}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default FAQ;
