import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	style: ArticleStateType;
	styleHandler: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { styleHandler } = props;
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectedStyles, setSelectedStyles] =
		useState<ArticleStateType>(defaultArticleState);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});
	const setSelectedStylesHandler = (selected: OptionType, type: string) => {
		setSelectedStyles({ ...selectedStyles, [type]: selected });
	};
	const openHandler = () => {
		isOpen && setIsOpen(false);
		!isOpen && setIsOpen(true);
	};
	const resetHandler = () => {
		styleHandler(defaultArticleState);
		setSelectedStyles(defaultArticleState);
	};
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		styleHandler(selectedStyles);
	};
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					openHandler();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form className={styles.form} onSubmit={submitHandler}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={selectedStyles.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(selected) =>
							setSelectedStylesHandler(selected, 'fontFamilyOption')
						}
						title='шрифт'
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={selectedStyles.fontSizeOption}
						onChange={(selected) =>
							setSelectedStylesHandler(selected, 'fontSizeOption')
						}
						title='размер шрифта'
					/>
					<Select
						selected={selectedStyles.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={(selected) =>
							setSelectedStylesHandler(selected, 'fontColor')
						}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedStyles.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={(selected) =>
							setSelectedStylesHandler(selected, 'backgroundColor')
						}
						title='цвет фона'
					/>
					<Select
						selected={selectedStyles.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={(selected) =>
							setSelectedStylesHandler(selected, 'contentWidth')
						}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={resetHandler}
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
