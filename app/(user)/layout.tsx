import '../../styles/globals.css'
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default function Layout({ children }: { children: React.ReactNode}) {

    return(
        <div >
            <Header/>
            <div>
                {children}
            </div>
            <Footer/>

        </div>
    )
}