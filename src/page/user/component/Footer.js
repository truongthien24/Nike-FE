import React from 'react'

export const Footer = () => {
  return (
    <div className="bg-[#eaeaea] p-[30px] lg:p-[40px] min-h-[300px] lg:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] h-full">
            <div className="flex flex-col items-center justify-around min-h-[220px]">
                <img src="/images/nike-logo.png" className="w-[170px]"/>
                <p className="text-[25px]">@DN-Store</p>
            </div>
        </div>
    </div>
  )
}
