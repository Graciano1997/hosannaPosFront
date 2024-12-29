import Card from "./Card";
import Title from "./Title";

const Dashboard=()=>{
    return(
        <>
        <Title/>
        <div class="flex flex-wrap justify-center  gap-4 mt-4 p-5 ">
        <Card info={{title:'Entrada Mensal'}}/>
        <Card info={{title:'Stock'}}/>
        <Card/>
        <Card width={500} />
        <Card width={500} />
        </div>
        </>
    )
};

export default Dashboard;