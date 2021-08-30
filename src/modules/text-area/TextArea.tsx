import React, { FC, ReactNode } from "react";
import { Field } from "react-final-form";

import { MaybeWithClassName } from "@app/helper/react/types";

import { InputArea } from "@app/ui/input-area";
import { composeValidators, isRequired } from "@app/utils/validation";

type TextAreaType = {
	name: string;
	type: "text" | "email" | "number";
	placeholder?: string;
	readOnly?: boolean;
	initialValue?: any;
	value?: any;
	step?: string;
	required?: boolean;
	validate?: (value: string) => any;
	before?: string | ReactNode;
	after?: string | ReactNode;
	min?: number;
	max?: number;
};

export const TextArea: FC<TextAreaType & MaybeWithClassName> = ({
	className,
	name,
	placeholder,
	readOnly,
	initialValue,
	required,
	validate,
	before,
	after,
	value,
	step,
	min,
	max,
}) => {
	return (
		<Field
			name={name}
			initialValue={initialValue}
			validate={
				required ? (validate ? composeValidators(isRequired, validate) : isRequired) : validate
			}
			value={value}
		>
			{({ input, meta }) => (
				<InputArea
					className={className}
					name={input.name}
					type={input.type}
					value={input.value}
					onChange={input.onChange}
					onBlur={input.onBlur}
					onFocus={input.onFocus}
					placeholder={placeholder}
					readOnly={readOnly}
					required={required}
					before={before}
					after={after}
					inputProps={{ step, min, max }}
					error={(meta.error && meta.touched ? meta.error : undefined) || meta.submitError}
				/>
			)}
		</Field>
	);
};
