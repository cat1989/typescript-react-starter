import * as React from 'react'
import './style.scss'

export interface Props {
    greeting: string;
}

export const index = ({ greeting='typescript-react-starter' }: Props) => {
//export const index = (props: { greeting: string }) => {
    return (
        <div className="view">
            <h1>
                <img src="/public/images/logo.svg" alt="" />{ greeting }
            </h1>
        </div>
    )
}