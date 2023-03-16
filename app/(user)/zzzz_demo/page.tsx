
import DemoComponent2 from "./DemoComponent2";
import SocialShare from "../../../components/recipe/detailed_view/SocialShare";
export default function Page() {

    return (
        <div className='p-10'>
            {/*<DemoComponent2/>*/}
            {/*<SuccessAlert/>*/}
            {/*<Tester/>*/}
            <SocialShare urlToShare={'https://recipe-webapp.vercel.app/recipe/3f817ce9-cbd9-4bda-879a-76e06e0b3404'}/>
        </div>
    );
}