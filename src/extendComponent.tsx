import React, { forwardRef } from 'react'
import classNames from 'classnames'

/**
 * @experimental
 * - `className` is forwarded with classNames wrapper
 * - Props starting with `on` are extended
 * - customizable set of extendable props
 */
export const extendComponent = <T extends React.ElementType>(
    Component: T,
    defaultProps: React.ComponentPropsWithRef<T>,
    options: Partial<{
        /* extendable: boolean | keyof React.ComponentPropsWithRef<T>, callbackOrder: 'default-first' | 'default-last' | false */
    }> = {},
) => {
    return forwardRef((props: React.ComponentPropsWithoutRef<T>, ref) => {
        let extendedProps = { ...props } as any
        if (extendedProps.className) extendedProps.className = classNames([defaultProps.className, extendedProps.className])
        extendedProps = { ...defaultProps, ...extendedProps }
        for (const [key, value] of Object.entries(defaultProps)) {
            if (key.startsWith('on') && props[key])
                extendedProps[key] = (...args) => {
                    defaultProps[key](...args)
                    props[key](...args)
                }
        }
        //@ts-ignore
        return <Component ref={ref} {...extendedProps} />
    })
}
