import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [style, setStyle] = useState(defaultArticleState);
	const styleHandler = (selected: ArticleStateType) => {
		setStyle(selected);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--bg-color': style.backgroundColor.value,
					'--container-width': style.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm style={style} styleHandler={styleHandler} />
			<Article />
		</main>
	);
};
