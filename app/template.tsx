import { ViewTransition } from 'react';

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ViewTransition>{children}</ViewTransition>;
}
