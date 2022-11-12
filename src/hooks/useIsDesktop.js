import { useMediaQuery } from "react-responsive";

const useIsDesktop = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 640px)",
    });

    return isDesktopOrLaptop
}

export { useIsDesktop }