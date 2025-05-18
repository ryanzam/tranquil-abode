import React from 'react'

const Authlayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>{children}</div>
    )
}

export default Authlayout