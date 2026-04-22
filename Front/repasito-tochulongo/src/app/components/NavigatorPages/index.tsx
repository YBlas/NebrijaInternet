import Link from "next/link";
import "./styles.css";



const NavigatorPages = () => {

    type LinkType = {
        name: string,
        link: string
    }

    const enlaces : LinkType[] = [
        {
            name: "El hogar",
            link: "/"
        },
        {
            name: "Personajicos",
            link: "/characters"
        },
        {
            name: "Lugarcillos",
            link: "/locations"
        },
        {
            name: "Episodios",
            link: "/episodes"
        }
    ]

    return (
        <div className="NavigatorContainer">
            {enlaces.map((e)=>(<Link className="NavigatorLink" key={e.link} href={e.link}>{e.name}</Link>))}
        </div>
    )
}

export default NavigatorPages;