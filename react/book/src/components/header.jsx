export function Header(){

    // a header possui apenas a logo do site
    return (
        <header className="flex items-center justify-center gap-x-3 w-screen h-16 bg-[#2A4D69] rounded-b-full">
            <div className="w-12 h-12">
                <img src="icon/logo.png" alt="Logo do site" className="w-full"/>
            </div>
            <div className="font-['Alice'] text-3xl text-[#FFB6B9]">
                <p>FavBook</p>
            </div>
        </header>
    )
}