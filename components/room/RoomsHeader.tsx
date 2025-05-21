import React, { FC } from 'react'

interface RoomsHeaderProps {
    title: string;
    subtitle: string;
    backgroundImageUrl: string;
}

const RoomsHeader: FC<RoomsHeaderProps> = ({ title, subtitle, backgroundImageUrl }) => {
    return (
        <div className='relative py-24 bg-gradient-to-b from-black/80 to-black/50'>
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            />
            <div className='pt-16 px-4 text-center text-white'>
                <h2 className='font-bold text-3xl'>{title}</h2>
                <p className='mt-4'>
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

export default RoomsHeader