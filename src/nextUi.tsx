import React, { ComponentProps, useEffect } from 'react'
import { Autocomplete, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'

type CommonProps = Pick<ComponentProps<'div'> & ComponentProps<'select'>, 'className' | 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onPointerDown' | 'onPointerUp'>

export type NextFieldRule = {
    name: string
    type: 'string' | 'number' | 'boolean'
    label: string
    choices?: string[]
    required?: boolean
    multiline?: boolean
    disabled?: boolean
    disabledReason?: string
    defaultValue?: any
    autocomplete?: string[]
}

const defaultClassName = {} as Record<string, string>

export const setNextFieldClassName = (className: string, type = '') => {
    defaultClassName[type] = className
}

const getClassName = (type: string, userClassName = '') => {
    return `${defaultClassName['']} ${defaultClassName[type]} ${userClassName}`
}

export function NextField({
    rule,
    currentValue,
    currentValueDefault,
    setValue,
    disabled,
    // invalid,
    className,
    highlightColorCheckbox,
    inputColor,
    ...props
}: {
    rule: NextFieldRule
    currentValue
    currentValueDefault?
    disabled?: boolean
    // invalid?: string
    setValue
    className?: string
    highlightColorCheckbox?: string
    inputColor?
} & CommonProps) {
    const { name, type, label, choices, required, multiline, disabled: alwaysDisabled, disabledReason, autocomplete } = rule
    const key = name

    if (alwaysDisabled) disabled = true

    useEffect(() => {
        if (type === 'boolean' && (typeof currentValueDefault === 'string' || typeof currentValue === 'string')) {
            // currentValueDefault = currentValueDefault === 'true'
            // setValue(currentValueDefault ? currentValueDefault === 'true' : currentValue === 'true')
        }
    }, [])

    if (type === 'number' && currentValue && !String(currentValue).endsWith('.') && typeof currentValue === 'string') {
        currentValue = currentValue.replace('$', '')
        currentValue = parseFloat(currentValue)
    }
    if (type === 'number' && currentValueDefault && !String(currentValueDefault).endsWith('.') && typeof currentValueDefault === 'string') {
        currentValueDefault = currentValueDefault.replace('$', '')
        currentValueDefault = parseFloat(currentValueDefault)
    }

    return (
        <>
            {choices ? (
                <Select
                    color={inputColor}
                    label={label}
                    className={getClassName('select', className)}
                    selectedKeys={currentValue !== undefined ? new Set([currentValue]) : undefined}
                    defaultSelectedKeys={currentValueDefault !== undefined ? new Set([currentValueDefault]) : undefined}
                    onSelectionChange={keys => {
                        const newVal = [...keys][0] as string
                        setValue(newVal)
                    }}
                    isRequired={required ?? true}
                    items={choices.map(x => ({ label: x, value: x }))}
                    disabled={disabled}
                    isDisabled={disabled}
                    errorMessage={disabledReason}
                    {...props}
                >
                    {x => {
                        return <SelectItem key={x.value}>{x.label}</SelectItem>
                    }}
                </Select>
            ) : type === 'boolean' ? (
                <Checkbox
                    color={inputColor}
                    isSelected={currentValue !== undefined ? currentValue === true || currentValue === 'true' : undefined}
                    defaultSelected={currentValueDefault === 'true' || currentValueDefault === true}
                    onValueChange={e => setValue(e)}
                    required={required}
                    isRequired={required}
                    disabled={disabled}
                    className={`rounded-lg ${getClassName('checkbox', className)}`}
                    style={{
                        backgroundColor: highlightColorCheckbox,
                    }}
                    classNames={{
                        wrapper: label ? '' : 'mr-0',
                    }}
                    // errorMessage={disabledReason}
                >
                    {label}
                </Checkbox>
            ) : autocomplete ? (
                <Autocomplete
                    color={inputColor}
                    label={label}
                    allowsCustomValue
                    inputValue={currentValue}
                    defaultInputValue={currentValueDefault}
                    onInputChange={e => {
                        return setValue(e)
                    }}
                    isRequired={required ?? true}
                    items={autocomplete.filter(x => x.trim()).map(x => ({ label: x, value: x }))}
                    disabled={disabled}
                    isDisabled={disabled}
                    errorMessage={disabledReason}
                    className={getClassName('autocomplete', className)}
                    {...props}
                >
                    {x => {
                        return <SelectItem key={x.value}>{x.label}</SelectItem>
                    }}
                </Autocomplete>
            ) : (
                <Input
                    color={inputColor}
                    className={getClassName('input', className)}
                    label={label}
                    // type={type === 'string' ? 'text' : type}
                    value={currentValue}
                    defaultValue={currentValueDefault}
                    onChange={e => setValue(e.target.value)}
                    required={required}
                    isRequired={required}
                    min={0}
                    // onClick={e => {
                    //     console.log(e.nativeEvent.composedPath())
                    // }}
                    // onFocus={(e) => {
                    //     console.log('focus', e.nativeEvent.composedPath())
                    // }}
                    // multiline={multiline}
                    disabled={disabled}
                    isDisabled={disabled}
                    errorMessage={disabledReason}
                    {...props}
                />
            )}
        </>
    )
}
