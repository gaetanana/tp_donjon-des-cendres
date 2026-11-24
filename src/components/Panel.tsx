import type {ReactNode} from "react";

type PanelProps = {
    title: string,
    className : string,
    children: ReactNode,
}

export function Panel(props: PanelProps) {
    return (
        <section className={props.className}>
            <h2>{props.title}</h2>
            {props.children}
        </section>
    )
}
