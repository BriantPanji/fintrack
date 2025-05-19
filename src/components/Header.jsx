
import { useState, useEffect, useRef } from "react";



export default function Header() {

    const [header, setHeader] = useState({
        scrolled: false,
        hideHeader: false
    });
    const [showNavbar, setShowNavbar] = useState(false);
    const lastScrollTop = useRef(0);

    // const isNavActive = (e) => {
    //     let pageNow = window.location.href.split("#")[1];
    //     if (pageNow === undefined) pageNow = "home";
    //     if (pageNow === e.split("#")[1]) {
    //         return true;
    //     }
    // }
    const listUrlNav = [
        { name: "Home", url: "#home" },
        { name: "Summary", url: "#summary" },
        { name: "Transaction", url: "#transaction" },
        { name: "History", url: "#history" },
    ];
    const [activeNav, setActiveNav] = useState(listUrlNav[0].url);


    const handleNavShow = () => {
        setShowNavbar(!showNavbar);
    }



    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrolled = currentScroll > 15;
            const hideHeader = currentScroll > lastScrollTop.current && currentScroll > 15;

            setHeader((prevState) => ({
                ...prevState,
                scrolled: scrolled,
                hideHeader: hideHeader
            }));

            lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll; // prevent negative
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);




    return (
        <>
            <header className={`bg-ft-primary *:!selection:text-ft-text text-ft-accent min-h-20 flex px-5 sm:px-8 md:12 xl:px-20 !py-0 items-center justify-between sticky !top-0 z-50 transition-all duration-300 ${ header.hideHeader ? '-translate-y-full' : 'translate-y-0' }`}>
                <a href="/"><h1 className="font-bold leading-0  text-3xl">FinTrack</h1></a>
                
                <button onClick={handleNavShow}  className="sm:hidden flex cursor-pointer max-w-fit max-h-fit items-center justify-center">
                    <i className={`fa-regular text-3xl ${!showNavbar ? 'fa-bars' : 'fa-xmark'}`}></i>
                </button>

                <nav className="hidden sm:flex max-w-[70%] min-h-2 max-h-full text-lg font-medium items-center justify-between pr-14 gap-7">
                    {listUrlNav.map((item, index) => (
                        <a
                            key={index}
                            href={item.url}
                            onClick={() => setActiveNav(item.url)}
                            className={`text-ft-bg decoration ${activeNav === item.url ? 'decoration-ft-accent decoration-1 underline hover:decoration-2' : 'decoration-ft-bg decoration-1 hover:underline '}`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </header>
            <nav className={`sm:hidden min-w-full max-w-full fixed transition-all z-40 duration-250 ${!showNavbar ? 'left-[-100%]' : 'left-0'} ${header.hideHeader ? `min-h-screen max-h-screen top-0` : `!min-h-[calc(100vh-5rem)] !max-h-[calc(100vh-5rem)] top-20`}`}>
                <section className="bg-ft-primary/90 absolute z-50 min-w-[75%] xs:min-w-[60%] max-w-[75%] h-full px-4 py-4 ">
                    <div className="w-full h-full text-ft-bg text-lg font-medium flex flex-col items-start justify-start gap-4">
                        {listUrlNav.map((item, index) => (
                            <a 
                                key={index}
                                href={item.url}
                                onClick={() => {setActiveNav(item.url); handleNavShow()}}
                                className={` bg-ft-primary/75 w-full h-10 flex justify-start items-center rounded-sm hover:rounded-md px-5 hover:scale-101 ${activeNav === item.url ? 'border-l-6 border-l-ft-accent hover:border-l-emerald-700' : ' border-l-0 hover:border-l-4'} transition-all duration-200`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </section>
                <section onClick={handleNavShow} className="fixed top-0 -z-10 min-w-full max-w-full min-h-screen max-h-screen bg-neutral-300/1 backdrop-blur-sm">
                </section>
            </nav>
        </>
    );
}