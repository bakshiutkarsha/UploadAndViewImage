import React, { forwardRef, InputHTMLAttributes, memo, ReactNode, Ref, TextareaHTMLAttributes } from 'react';
import './field.scss';

interface CommonProperties {
    label: ReactNode;
    placeholder: string;
    type?: string;
}

type InputProperties = CommonProperties & InputHTMLAttributes<HTMLInputElement> & { mode?: 'input' };

type TextareaProperties = CommonProperties & TextareaHTMLAttributes<HTMLTextAreaElement> & { mode: 'textarea' };

export type FieldProperties<T> = InputProperties | TextareaProperties;

export const FieldComponent = forwardRef(function Component<T>(
    {
        label, 
        placeholder, 
        type, 
        ...props
    }: FieldProperties<T>,
    ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
    return <div className='journal-field__cntr'>

            <label>{label}</label>

            { props.mode === 'textarea' ? (
                <textarea
                className='journal-field__textarea' {...props} ref={ref as Ref<HTMLTextAreaElement>} /> ) :
                <input className='journal-field__input' placeholder={placeholder} {...props} type={type} ref={ref as Ref<HTMLInputElement>}/>
            }
        </div>;
    }) as <T>(p: FieldProperties<T> & { ref?: Ref<HTMLInputElement | HTMLTextAreaElement>  }) => React.ReactElement

export const Field = memo(FieldComponent) as typeof FieldComponent;
